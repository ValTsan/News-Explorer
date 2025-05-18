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

  const getUniqueKeywords = () => {
    const keywords = savedArticles
      .map((article) => article.keyword)
      .filter(Boolean);

    const uniqueKeywords = Array.from(new Set(keywords));
    if (uniqueKeywords.length <= 3) {
      return uniqueKeywords.join(", ");
    }

    const firstTwo = uniqueKeywords.slice(0, 2);
    const remainingCount = uniqueKeywords.length - 2;

    return `${firstTwo.join(", ")}, and ${remainingCount} other${
      remainingCount > 1 ? "s" : ""
    }`;
  };

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
          By keywords: {getUniqueKeywords()}
        </p>
      </div>
      {/* <SavedCardList
        isLoggedIn={isLoggedIn}
        savedArticles={savedArticles}
        handleCardLike={handleCardLike}
        handleCardDelete={handleCardDelete}
        setActiveModal={setActiveModal}
        searchQuery={searchQuery}
      /> */}
    </div>
  );
}

export default SavedNewsHeader;
