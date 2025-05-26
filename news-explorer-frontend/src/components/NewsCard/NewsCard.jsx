import "../NewsCard/NewsCard.css";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function NewsCard({
  article,
  isLoggedIn,
  handleCardLike,
  handleCardDelete,
  setActiveModal,
  savedArticles = [],
  searchQuery,
}) {
  const location = useLocation();
  const [showSignInText, setShowSignInText] = useState(false);

  // Check if the article is saved
  const isSaved =
    isLoggedIn &&
    savedArticles.some(
      (savedArticle) =>
        savedArticle.url === article?.url || savedArticle.link === article?.url
    );

  const isOnSavedNews = location.pathname === "/saved-news";

  // Handle bookmark button click
  const handleBookmarkClick = () => {
    if (!isLoggedIn) {
      setShowSignInText(true);

      setActiveModal("login");

      return;
    }
    if (isSaved) {
      handleCardDelete(article);
    } else {
      handleCardLike(article);
    }
  };

  return (
    <div className="news-card">
      {article.keyword && (
        <div className="news-card__keyword">
          {article.keyword.charAt(0).toUpperCase() +
            article.keyword.slice(1).toLowerCase()}
        </div>
      )}
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
          <button
            className={`news-card__bookmark ${
              isOnSavedNews
                ? "news-card__delete-icon"
                : isLoggedIn && isSaved
                ? "saved"
                : ""
            }`}
            onClick={handleBookmarkClick}
            aria-label={
              isOnSavedNews
                ? "Delete article"
                : isSaved
                ? "Remove from saved articles"
                : "Save article"
            }
          ></button>
          {!isLoggedIn && !isOnSavedNews && showSignInText && (
            <span className="news-card__signin-text">Sign in to bookmark</span>
          )}
        </div>
      </div>
      <span className="news-card__source">{article.sourceName}</span>
    </div>
  );
}

export default NewsCard;
