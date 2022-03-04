// URL: https://www.youtube.com/watch?v=gcx-3qi7t7c

const apiKey = '505743fe8c214f2287dca0c6e2cc7703';
const main = document.querySelector('main');
const srcSel = document.querySelector('#srcSel');
const defaultSrc = 'the-washington-post';

window.addEventListener('load', async () => {
    await updateSources();
    srcSel.value = defaultSrc;
    updateNews();

    srcSel.addEventListener('change',  e => {
        updateNews(e.target.value);
    });
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
    <div class="article">
      <a href="${article.url}">
        <h2>${article.title}</h2>
        <img src="${article.urlToImage}" alt="${article.title}">
        <p>${article.description}</p>
      </a>
    </div>
  `;
}
