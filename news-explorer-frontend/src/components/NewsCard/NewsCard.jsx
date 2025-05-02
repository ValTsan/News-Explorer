import "../NewsCard/NewsCard.css";

const NewsCard = ({
  article,
  onCardLike,
  onCardDelete,
  isLoggedIn,
  savedArticles = [],
}) => {
  // Check if the article is saved
  const isSaved = savedArticles.some(
    (savedArticle) => savedArticle.url === article?.url
  );

  // Handle bookmark button click
  const handleBookmarkClick = () => {
    if (isSaved) {
      onCardDelete(article);
    } else {
      onCardLike(article);
    }
  };

  return (
    <div className="news-card">
      <img
        className="news-card__image"
        src={article?.urlToImage || "default-image.jpg"}
        alt={article?.title || "News Image"}
      />
      <p className="news-card__date">
        Date:{""}
        {article?.publishedAt
          ? new Date(article.publishedAt).toLocaleDateString()
          : "Unknown Date"}
      </p>
      <div className="news-card__content">
        <h3 className="news-card__title">
          {article?.title || "Untitled Article"}
        </h3>
        <p className="news-card__description">
          {article?.description || "No description available."}
        </p>
        <div className="news-card__actions">
          {isLoggedIn ? (
            <button
              className={`news-card__bookmark ${isSaved ? "saved" : ""}`}
              onClick={handleBookmarkClick}
              aria-label={
                isSaved ? "Remove from saved articles" : "Save article"
              }
            ></button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
