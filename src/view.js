// Caching DOM
import {createArticle as Article} from "./article.js";

let view;

export function getInstance() {
    return view ? view : new View();
}

class View {
    #DOM;

    constructor() {
        this.#DOM.main = document.querySelector('main');
        this.#DOM.srcSel = document.querySelector('#srcSel');

    }

    get DOM() {
        return this.#DOM;
    }

    updateSources(json) {
        this.#DOM.srcSel.innerHTML =
            json.sources
                .map(source => `<option value="${source.id}">${source.name}</option>`)
                .join('\n');
    }

    updateNews(json) {
        this.#DOM.main.innerHTML = '';
        this.#DOM.main.innerHTML =
            json.articles.map(Article).join('\n');
    }
}