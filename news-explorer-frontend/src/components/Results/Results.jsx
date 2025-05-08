import React, { useState } from "react";
import "./Results.css";
import NewsCard from "../NewsCard/NewsCard";
import Preloader from "../Preloader/Preloader";
import notFoundImage from "../../assets/not-found.svg";

function Results({
  isLoading,
  error,
  articles,
  showMoreArticles,
  visibleArticles,
  onCardLike,
  onCardDelete,
  savedArticles,
  isLoggedIn,
}) {
  if (isLoading) {
    return (
      <div className="results result_type_preloader">
        <Preloader />
        <div>Searching for news...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="results">
        <img
          className="results-image"
          src={notFoundImage}
          alt="Not Found Image"
        ></img>
        <p>
          <span className="results-not-found-title">Nothing found</span>{" "}
        </p>
        <span className="results-not-found-description">
          Sorry, but nothing matched your search terms.
        </span>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="results">
        <img
          className="results-image"
          src={notFoundImage}
          alt="Not Found Image"
        ></img>
        <p>
          <span className="results-not-found-title">Nothing found.</span>
        </p>
        <span className="results-not-found-description">
          Sorry, but nothing matched your search terms.
        </span>
      </div>
    );
  }

  return (
    <div className="results-list">
      <div className="results-list__page-title">Search Results</div>
      {Array.isArray(articles) && (
        <div className="results-list__cards">
          {articles.slice(0, visibleArticles).map((article, index) => {
            console.log("Rendering article:", article.title || article);
            return (
              <NewsCard
                key={index}
                article={article}
                savedArticles={savedArticles}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
                isLoggedIn={isLoggedIn}
              />
            );
          })}
        </div>
      )}

      {visibleArticles < articles.length &&
        console.log(
          "visibleArticles",
          visibleArticles
        )(
          <button className="show-more" onClick={showMoreArticles}>
            Show More
          </button>
        )}
    </div>
  );
}

export default Results;
