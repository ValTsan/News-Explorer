import "./SavedNewsHeader.css";
import SavedCardList from "../SavedCardList/SavedCardList";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext, React } from "react";

function SavedNewsHeader({
  savedArticles,
  isLoggedIn,
  handleCardLike,
  handleCardDelete,
  setActiveModal,
  searchQuery,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="saved-news-header">
      <div className="saved-news-header__container">
        <div className="saved-news-header__top">
          <h1 className="saved-news-header__title">Saved articles</h1>
        </div>
        <p className="saved-news-header__subtitle">
          {currentUser?.name}, you have {savedArticles.length} saved articles
        </p>

        <p className="saved-news-header__keywords">
          By keywords: {searchQuery}
        </p>
      </div>
      <SavedCardList
        isLoggedIn={isLoggedIn}
        savedArticles={savedArticles}
        handleCardLike={handleCardLike}
        handleCardDelete={handleCardDelete}
        setActiveModal={setActiveModal}
        searchQuery={searchQuery}
      />
    </div>
  );
}

export default SavedNewsHeader;
