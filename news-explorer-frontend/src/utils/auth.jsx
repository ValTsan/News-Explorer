export const authorize = (email, password) => {
  return new Promise((resolve, reject) => {
    resolve({ token: "Fake Token", user: { email, password } });
  });
};

export const checkToken = (token) => {
  return new Promise((resolve, reject) => {
    resolve({
      data: { name: "Fake User", email: "fake@email.com", id: 'fake-id"' },
    });
  });
};

export const likeArticle = (article, token) => {
  const articleJson = {
    articleId: article.articleId,
    title: article.title,
    description: article.description,
    urlToImage: article.urlToImage,
    publishedAt: article.publishedAt,
    sourceName: article.sourceName,
    keywords: article.keywords || [],
    url: article.url,
  };

  return request(`${BASE_URL}/article/${article.articleId}/like`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(articleJson),
  });
};
