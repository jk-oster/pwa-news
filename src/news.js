import Subject from "./subject.js";


let news;

export function getInstance() {
    return news ? news : new News();
}

class News extends Subject {

    #defaultSrc;
    #apiKey;

    constructor() {
        super();
        this.#defaultSrc = 'the-washington-post';
        this.#apiKey = '505743fe8c214f2287dca0c6e2cc7703';
    }

    get defaultSrc() {
        return this.#defaultSrc;
    }

    async updateSources() {
        const response = await fetch(`https://newsapi.org/v2/sources?apiKey=${this.#apiKey}`);
        const json = await response.json();
        super.notify('updateSources', json);
    }

    async updateNews(source = this.#defaultSrc) {
        const response = await fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&sortBy=top&apiKey=${this.#apiKey}`);
        const json = await response.json();
        super.notify('updateNews', json);
    }
}