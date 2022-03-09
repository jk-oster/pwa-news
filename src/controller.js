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

        // Check if serviceWorker is supported
        if ('serviceWorker' in navigator) {
            try {
                // register ServiceWorker
                await navigator.serviceWorker.register('sw.js');
                console.log("serviceWorker registered");
            } catch (error) {
                console.log("serviceWorker reg failed", error);
            }
        }

        await news.updateNews();
        await news.updateSources();
        view.DOM.srcSel.value = news.defaultSrc;
        view.DOM.srcSel.addEventListener('change', e => {
            news.updateNews(e.target.value);
        });
    }
}


