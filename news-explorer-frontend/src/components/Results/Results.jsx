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
  handleCardLike,
  handleCardDelete,
  savedArticles,
  isLoggedIn,
  setActiveModal,
}) {
  if (isLoading) {
    return (
      <div className="results">
        <div className="results__container">
          <div className="results__preloader">
            <Preloader />
            <div className="results__preloader-text">Searching for news...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="results__error">
        <img
          className="results__image"
          src={notFoundImage}
          alt="Not Found Image"
        ></img>
        <p>
          <span className="results__not-found-title">Nothing found</span>{" "}
        </p>
        <span className="results__not-found-description">
          Sorry, but nothing matched your search terms.
        </span>
      </div>
    );
  }

  return (
    <div className="results__container">
      <div className="results__page-title">Search Results</div>
      {Array.isArray(articles) && articles.length > 0 && (
        <div className="results__cards">
          {articles.slice(0, visibleArticles).map((article, index) => {
            return (
              <NewsCard
                key={article._id || article.url}
                article={article}
                isLoggedIn={isLoggedIn}
                handleCardLike={handleCardLike}
                handleCardDelete={handleCardDelete}
                savedArticles={savedArticles}
                setActiveModal={setActiveModal}
              />
            );
          })}
        </div>
      )}
      {visibleArticles < articles.length && (
        <button className="result-show-more" onClick={showMoreArticles}>
          Show More
        </button>
      )}
    </div>
  );
}

export default Results;
