import "../Main/Main.css";
import SearchForms from "../SearchForm/SearchForm";
import AboutMe from "../AboutMe/AboutMe";
import Results from "../Results/Results";

function Main({
  handleSearch,
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
}) {
  return (
    <main className="main">
      <h1 className="main__title">What's going on in the world?</h1>
      <p className="main__subtitle">
        Find the news on any topic and save them in your personal account.
      </p>
      <SearchForms handleSearch={handleSearch} />
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
        />
      )}

      <AboutMe />
    </main>
  );
}
export default Main;
