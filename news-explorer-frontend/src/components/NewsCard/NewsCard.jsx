import "../NewsCard/NewsCard.css";

const NewsCard = ({
  article,
  onCardLike,
  onCardDelete,
  isLoggedIn,
  savedArticles = [],
}) => {
  const isSaved = savedArticles.some((savedArticle) => {
    return savedArticle.url === article.url;
  });
};

export default NewsCard;
