import { formatDate } from "../utils/newsAPI";

export function getItems() {
  return new Promise((resolve, reject) =>
    resolve([
      {
        _id: "65f7368dfb74bd6a92114c85",
        title: "Some news article",
        url: "put some actual article URL here",
      },
      {
        _id: "65f7368dfb74bd6a92114c55",
        title: "Some news article",
        url: "some actual article URL here",
      },
    ])
  );
}

export function saveArticle(article) {
  // article is a result from the NewsAPI
  return new Promise((resolve, reject) => {
    resolve({
      _id: "65f7371e7bce9e7d331b11a0",
      urlToImage: article.urlToImage,
      title: article.title,
      publishedAt: formatDate(article.publishedAt),
      description: article.description,
      link: article.url,
    });
  });
}
