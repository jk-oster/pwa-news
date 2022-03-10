import Subject from "./subject.js";
/*
import Dexie from "https://unpkg.com/dexie/dist/dexie.js";
*/

let news;

export function getInstance() {
    return news ? news : new News();
}

class News extends Subject {

    #defaultSrc;
    #apiKey;
    #saved;

    // #db;

    constructor() {
        super();
        this.#defaultSrc = 'the-washington-post';
        this.#apiKey = '505743fe8c214f2287dca0c6e2cc7703';
        this.#saved = [];
        /*this.#db = new Dexie("NewsDB");
        this.#db.version(1).stores({
            news: `id, name, age`
        });*/
    }

    get defaultSrc() {
        return this.#defaultSrc;
    }

    /*save(article) {
        this.#db.news.put(article);
        super.notify('updateSaved', article);
    }

    loadSaved() {
        this.#db.collection('news').get().then(article => {
            super.notify('updateSaved', article);
            console.log(article);
        });
    }*/


    async updateSources() {
        const response = await fetch(`https://newsapi.org/v2/sources?apiKey=${this.#apiKey}`);
        const json = await response.json();
        super.notify('updateSources', json);
    }

    async updateNews(source = this.#defaultSrc) {
        const response = await fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&sortBy=top&apiKey=${this.#apiKey}`);
        const json = await response.json();
        /*const articles = [...json.articles].map(article => article.id = this.id++);
        console.log(articles);*/
        super.notify('updateNews', json);
    }
}