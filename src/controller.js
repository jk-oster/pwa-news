import {getInstance as News} from "./news.js";
import {getInstance as View} from "./view.js";

let controller;

export function getInstance() {
    return controller ? controller : new Controller();
}

class Controller {
    async init() {
        const news = News();
        const view = View();

        news.subscribe('updateSources', view, view.updateSources);
        news.subscribe('updateNews', view, view.updateNews);
        // news.subscribe('updateSaved', view, view.updateSaved);

        // Check if serviceWorker is supported
        if ('serviceWorker' in navigator) {
            try {
                // register ServiceWorker
                await navigator.serviceWorker.register('sw.js');
                console.log("serviceWorker registered");
            } catch (error) {
                console.log("serviceWorker reg failed", error);
            }
        } else console.log('serviceWorker is not supported');

        if (window.indexedDB) {
            // news.updateSaved();
            view.DOM.main.addEventListener('click', e => {
                if (e.target.id.includes('save_')) {
                    const article = view.getArticleById(e.target.id.replace('save_', ''));
                    news.save(article);

                }
            });
        } else {
            console.log('indexedDB is not supported');
            document.querySelector('#savedArticles').remove();
        }

        await news.updateNews();
        await news.updateSources();
        view.DOM.srcSel.value = news.defaultSrc;
        view.DOM.srcSel.addEventListener('change', e => {
            news.updateNews(e.target.value);
        });
    }
}


