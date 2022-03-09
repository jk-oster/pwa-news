export function createArticle(article) {
    return `
    <div class="article" id="${articleId++}">
      <a href="${article.url}">
        ${article.urlToImage ? articleImg(article) : ""}
        <div>
            <h2>${article.title}</h2>
            <p>${article.description}</p>
            <button>Save</button>
        </div>
      </a>
    </div>
  `;

}

function articleImg(article) {
    return `<img src="${article.urlToImage}" alt="${article.title}">`;
}

let articleId = 0;
