import React from "react";
import "./SavedCardList.css";
import NewsCard from "../NewsCard/NewsCard";

function SavedCardList({
  article,
  savedArticles,
  handleCardLike,
  handleCardDelete,
  setActiveModal,
  isLoggedIn,
}) {
  // const handleDeleteClick = () => {
  //   onCardDelete(article); // Call the delete function passed from props
  // };

  return (
    <div className="saved-cards">
      {savedArticles?.map((article) => (
        <NewsCard
          key={article._id || article.url}
          article={article}
          isLoggedIn={isLoggedIn}
          handleCardLike={handleCardLike}
          handleCardDelete={handleCardDelete}
          savedArticles={savedArticles}
          setActiveModal={setActiveModal}
        />
      ))}
    </div>
  );
}

export default SavedCardList;
