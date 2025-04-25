import React from "react";
import SavedCardList from "../SavedCardList/SavedCardList";
import "./SavedNewsHeader.css";

const SavedNewsHeader = ({ savedArticles }) => {
  return (
    <div className="saved-news-header">
      <div className="saved-news-header__container">
        <div className="saved-news-header__top">
          <h1 className="saved-news-header__title">Saved articles</h1>
        </div>
        <p className="saved-news-header__subtitle">
          Valerie, you have 5 saved <br />
          articles
        </p>
        <p className="saved-news-header__keywords">By keywords:</p>
      </div>
      <SavedCardList savedArticles={savedArticles} />
    </div>
  );
};

export default SavedNewsHeader;
