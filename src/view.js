let view;

export function getInstance() {
    return view ? view : new View();
}

class View {
    #DOM;

    constructor() {
        // Caching #DOM
        this.#DOM = {
            main: document.querySelector('main'),
            srcSel: document.querySelector('#srcSel'),
            modal: document.querySelector('#modal')
        };

        this.canSave = false;
    }

    get DOM() {
        return this.#DOM;
    }

    updateSources(json) {
        this.#DOM.srcSel.innerHTML =
            json.sources
                .map(source => createScrOption(source)).join('\n');
    }

    updateNews(json) {
        this.#DOM.main.innerHTML = '';
        this.#DOM.main.innerHTML = printArticleList(json.articles, this.canSave);
    }

    updateSaved(articles) {
        this.#DOM.modal.innerHTML = printArticleList(articles, false);
    }

    getArticleById(id) {
        const elem = document.querySelector('art_' + id);
        return {
            id: id,
            title: elem.querySelector('h2').innerText,
            url: elem.querySelector('a').href,
            urlToImage: elem.querySelector('img').src,
            description: elem.querySelector('p').innerText
        }
    }
}

function printArticleList(articles, canSave) {
    return articles.map(article => createArticle(article, canSave)).join('\n');
}

function createArticle(article, canSave) {
    return `
    <div class="article" id="art_${article.id}">
      <a href="${article.url}">
        ${article.urlToImage ? articleImg(article) : ""}
        <div>
            <h2>${article.title}</h2>
            <p>${article.description}</p>
            ${canSave ? btnSaveArticle(article.id) : ""}
        </div>
      </a>
    </div>
  `;
}

function articleImg(article) {
    return `<img src="${article.urlToImage}" alt="${article.title}">`;
}

function btnSaveArticle(id) {
    return `<button id="save_${id}">Save</button>`;
}

function createScrOption(src) {
    return `<option value="${src.id}">${src.name}</option>`
}