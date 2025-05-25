import "../Main/Main.css";
import SearchForms from "../SearchForm/SearchForm";
import AboutMe from "../AboutMe/AboutMe";
import Results from "../Results/Results";

function Main({
  isLoading,
  error,
  articles,
  handleCardDelete,
  handleCardLike,
  savedArticles,
  searchQuery,
  visibleArticles,
  showMoreArticles,
  isLoggedIn,
  isSubmitted,
  setActiveModal,
}) {
  return (
    <main className="main">
      {isSubmitted && (
        <Results
          isLoading={isLoading}
          error={error}
          articles={articles}
          handleCardDelete={handleCardDelete}
          handleCardLike={handleCardLike}
          savedArticles={savedArticles}
          searchQuery={searchQuery}
          visibleArticles={visibleArticles}
          showMoreArticles={showMoreArticles}
          isLoggedIn={isLoggedIn}
          setActiveModal={setActiveModal}
        />
      )}

      <AboutMe />
    </main>
  );
}
export default Main;
