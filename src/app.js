// URL: https://www.youtube.com/watch?v=gcx-3qi7t7c

// Using API: https://newsapi.org
const apiKey = '505743fe8c214f2287dca0c6e2cc7703';

// Caching DOM
const main = document.querySelector('main');
const srcSel = document.querySelector('#srcSel');
const defaultSrc = 'the-washington-post';
let articleId = 0;

// Main function
window.addEventListener('load', async () => {
    updateNews();
    await updateSources();
    srcSel.value = defaultSrc;
    srcSel.addEventListener('change',  e => {
        updateNews(e.target.value);
    });

    // Check if serviceWorker is supported
    if('serviceWorker' in navigator){
        try{
            // register ServiceWorker
            await navigator.serviceWorker.register('sw.js');
            console.log("serviceWorker registered");
        } catch (error) {
            console.log("serviceWorker reg failed", error);
        }
    }
});

async function updateSources() {
    const response = await fetch(`https://newsapi.org/v2/sources?apiKey=${apiKey}`);
    const json = await response.json();
    srcSel.innerHTML =
        json.sources
            .map(source => `<option value="${source.id}">${source.name}</option>`)
            .join('\n');
}

async function updateNews(source = defaultSrc) {
    main.innerHTML = '';
    const response = await fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&sortBy=top&apiKey=${apiKey}`);
    const json = await response.json();
    main.innerHTML =
        json.articles.map(createArticle).join('\n');
}

function createArticle(article) {
    return `
    <div class="article" id="${articleId++}">
      <a href="${article.url}">
        ${article.urlToImage ? articleImg(article) : ""}
        <div>
            <h2>${article.title}</h2>
            <p>${article.description}</p>
        </div>
      </a>
    </div>
  `;
}

function articleImg(article) {
    return `<img src="${article.urlToImage}" alt="${article.title}">`;
}
