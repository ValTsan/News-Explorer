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

  // console.log("isLoggedIn:", isLoggedIn);
  // console.log("savedArticles:", savedArticles);
  // console.log("current article url:", article?.url);
  // console.log("isSaved:", isSaved);

  // Handle bookmark button click
  const handleBookmarkClick = () => {
    console.log("Bookmark clicked");
    console.log("isLoggedIn:", isLoggedIn);

    // console.log("setActiveModal:", typeof setActiveModal);

    if (!isLoggedIn) {
      console.log("User not logged in, attempting to open modal");
      setShowSignInText(true);
      // setTimeout(() => setActiveModal("login"), 0);
      setActiveModal("login");
      console.log("Called setActiveModal with 'login'");
      return;
    }
    if (isSaved) {
      // console.log("Attempting to delete article");
      // console.log("handleCardDelete:", handleCardDelete);
      handleCardDelete(article);
    } else {
      // console.log("Attempting to save article");
      handleCardLike(article);
    }
  };

  return (
    <div className="news-card">
      {article.keyword && (
        <div className="news-card__keyword">{article.keyword}</div>
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
          {/* <span className="news-card__source">{source}</span> */}
        </div>
      </div>
    </div>
  );
}

export default NewsCard;
