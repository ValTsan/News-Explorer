import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import "../App/App.css";

import Main from "../Main/Main";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import { fetchNews } from "../../utils/newsAPI";
import { setToken, removeToken } from "../../utils/token";
import { authorize, checkToken } from "../../utils/auth";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { getItems, saveArticle } from "../../utils/ThirdPartyAPI";

function App() {
  const [currentUser, setCurrentUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [activeModal, setActiveModal] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [visibleArticles, setVisibleArticles] = useState(3);
  const showMoreArticles = () => {
    setVisibleArticles((prev) => prev + 3);
  };
  const [savedArticles, setSavedArticles] = useState([]);
  const isSavedNews = location.pathname === "/saved-news";

  console.log(isLoggedIn);

  const navigate = useNavigate();

  const userContext = {
    currentUser,
    setCurrentUser,
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleLoginModal = (e) => {
    e.preventDefault();
    setActiveModal("login");
  };

  const handleRegisterModal = (e) => {
    e.preventDefault();
    setActiveModal("register");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleLogin = (values) => {
    if (!values) {
      return;
    }
    authorize(values)
      .then((res) => {
        console.log(res);
        setToken(res.token);
        if (res.token) {
          authorize(res).then((user) => {
            setCurrentUser(user);
            setIsLoggedIn(true);
            closeActiveModal();
            navigate("/");
          });
        }
      })
      .catch((err) => {
        console.error("Failed attempt to login", err);
      });
  };

  const handleRegistration = (values) => {
    if (!values) return;

    checkToken(values)
      .then((res) => {
        console.log(res);
        localStorage.Storage.addItem("jwt");
        setIsLoggedIn(true);
        setCurrentUser(res.data);
        closeActiveModal();
        setActiveModal("Sucess");
      })
      .catch((res) => {
        console.log(`There is an error in handleUserRegistration: ${res}`);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
    removeToken();
  };

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  const handleCardLike = (article) => {
    const token = getItems();
    console.log(token);
    if (!token) return;
    // console.log(article);
    const articleId = saveArticle(article);
    article.articleId = articleId;
    console.log(article.articleId);

    // conlose.log("Article ID:", articleId);
    // Article ID logged for confirmation

    //Split Search query into individuals keywords
    article.keywords = searchQuery.split("");

    // console.log("Article with attached keywords:", article.keywords.slice(0,2));
    // Article with attached keywords logged for confirmation

    // Pass the articleId and article object to the API
    savedArticle(article, token)
      .then((likedArticle) => {
        setSavedArticles([...savedArticles, likedArticle]);
        console.log("Article saved successfully:", likedArticle);
      })
      .catch(console.error("Error saving article:", error));
  };

  const handleCardDelete = (article) => {
    const token = getToken();
    if (!token) return;

    const savedArticle = savedArticles.find(
      (saved) => saved.url === article.url
    );

    if (savedArticle) {
      const articleId = savedArticle._id;
      console.log("Article ID:", articleId);
      // Article ID logged for confirmation
      Auth.deleteArticle(articleId, token)
        .then(() => {
          console.log("Article deleted successfully", articleId);
          // Remove the article from the savedArticles state

          setSavedArticles((prevArticles) =>
            prevArticles.filter((a) => a._id !== articleId)
          );
          console.log("Article deleted successfully");
        })
        .catch((error) => {
          console.error("Error deleting article:", error);
        });
    } else {
      console.log("Article not found in saved articles for deletion");
    }
  };

  // HANDLE SEARCH LOGIC
  const handlSearch = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setError("Please enter a search query");
      return;
    }

    setIsLoading(true);
    setError(null);
    setIsSubmitted(true);
    setSearchQuery(searchQuery);

    try {
      const news = await fetchNews(searchQuery);

      // Log the fetched articles for debugging
      console.log("Fetched articles for query:", news);

      setArticles(news);
      if (news.lenght === 0) {
        setError("No articles found");
      }
    } catch (err) {
      console.error("Error fetching articles:", err);
      setError("An error occurred while fetching articles");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="page">
        <CurrentUserContext.Provider value={userContext}>
          <div
            className={
              isSavedNews ? "page__cotent-saved-news-active" : "page__content"
            }
          >
            <Header
              handleLoginClick={handleLoginClick}
              handleLogin={handleLogin}
              isLoggedIn={isLoggedIn}
              handleLogout={handleLogout}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Main
                      handleLoginClick={handleLoginClick}
                      isLoggedIn={isLoggedIn}
                      handleLogout={handleLogout}
                      isLoading={isLoading}
                      handleSearch={handlSearch}
                      isSubmitted={isSubmitted}
                      articles={articles}
                      error={error}
                      handleCardLike={handleCardLike}
                      onCardDelete={handleCardDelete}
                      savedArticles={savedArticles}
                      searchQuery={searchQuery}
                      visibleArticles={visibleArticles}
                      showMoreArticles={showMoreArticles}
                    />
                  </>
                }
              />
              <Route
                path="/saved-news"
                element={
                  <ProtectedRoute
                    isLoggedIn={isLoggedIn}
                    setActiveModal={setActiveModal}
                  >
                    <SavedNewsHeader
                      isLoggedIn={isLoggedIn}
                      handleLogout={handleLogout}
                      savedArticles={savedArticles}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
            <LoginModal
              isOpen={activeModal === "login"}
              onClose={closeActiveModal}
              setActiveModal={setActiveModal}
              handleLogin={handleLogin}
              onLogin={handleLogin}
              handleRegisterModal={handleRegisterModal}
            />
            <RegisterModal
              isOpen={activeModal === "register"}
              onClose={closeActiveModal}
              setActiveModal={setActiveModal}
              handleLoginModal={handleLoginModal}
              handleRegistration={handleRegistration}
            />
          </div>
        </CurrentUserContext.Provider>
      </div>
    </>
  );
}

export default App;
