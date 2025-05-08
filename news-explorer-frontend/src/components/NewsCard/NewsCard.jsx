import { useState, useContext } from "react";
import "../NewsCard/NewsCard.css";
import { useLocation } from "react-router-dom";
import { UserArticleContext } from "../../contexts/UserArticleContext";
import { Link } from "react-router-dom";

function NewsCard({
  article,
  isLoggedIn,
  onCardLike,
  onCardDelete,
  savedArticles = [],

  handleSaveArticle,
  handleDeleteArticle,
  setActiveModal,
}) {
  // Check if the article is saved
  // const isSaved = savedArticles.some(
  //   (savedArticle) => savedArticle.url === article?.url
  // );

  // Handle bookmark button click
  // const handleBookmarkClick = () => {
  //   if (isSaved) {
  //     onCardDelete(article);
  //   } else {
  //     onCardLike(article);
  //   }
  // };

  // const isSaved = userArticles.some((savedArticle) => {
  //   return savedArticle.link === article.url;
  // });

  const location = useLocation();
  const { userArticles } = useContext(UserArticleContext);
  const [isClicked, setIsClicked] = useState(false);

  const source =
    location.pathname === "/"
      ? article.source.name.toUpperCase().split(".")[0]
      : article.source.name.toUpperCase().split(".")[0];

  const dateInWords = new Date(
    location.pathname === "/" ? article.publishedAt : article.date
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const isSaved = userArticles.some((savedArticle) => {
    return savedArticle.link === article.url;
  });

  const handleSaveClick = () => {
    if (isLoggedIn) {
      isSaved === true ? setIsClicked(false) : setIsClicked(true);
      handleSaveArticle(article);
      return;
    }
    setActiveModal("login");
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
}

export default NewsCard;
