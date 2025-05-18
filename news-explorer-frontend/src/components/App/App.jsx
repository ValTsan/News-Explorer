import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import "../App/App.css";

import Main from "../Main/Main";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import SuccessModal from "../SuccessModal/SuccessModal";
import { fetchNews } from "../../utils/newsAPI";
import { setToken, removeToken } from "../../utils/token";
import { authorize, checkToken } from "../../utils/auth";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import SavedCardList from "../SavedCardList/SavedCardList";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import {
  getItems,
  saveArticle,
  deleteArticle,
} from "../../utils/ThirdPartyAPI";
import { UserArticleContext } from "../../contexts/UserArticleContext";

function App() {
  const [currentUser, setCurrentUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [articles, setArticles] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  useEffect(() => {}, [activeModal]);
  const [searchQuery, setSearchQuery] = useState("");
  const [savedArticles, setSavedArticles] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [visibleArticles, setVisibleArticles] = useState(3);
  const showMoreArticles = () => {
    setVisibleArticles((prev) => prev + 3);
  };

  const isSavedNews = location.pathname === "/saved-news";

  const navigate = useNavigate();

  const userContext = {
    currentUser,
    setCurrentUser,
  };

  const userArticleContext = {
    articles,
    setArticles,
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
    authorize(values.email, values.password)
      .then((res) => {
        setToken(res.token);
        if (res.token) {
          checkToken(res.token)
            .then((userData) => {
              setCurrentUser(userData.data);
              setIsLoggedIn(true);
              closeActiveModal();
              navigate("/");
            })
            .catch((err) => {
              console.error("Failed to get user data", err);
            });
        }
      })
      .catch((err) => {
        console.error("Failed attempt to login", err);
      });
  };

  const handleRegistration = (values) => {
    if (!values) return;

    try {
      const userData = {
        name: values.name,
        email: values.email,
        id: values.email,
      };
      localStorage.setItem("userData", JSON.stringify(userData));

      setIsLoggedIn(false);
      setCurrentUser(null);

      closeActiveModal();
      setActiveModal("success");

      console.log("Registration successful:", userData);
    } catch (err) {
      console.log(`There is an error in handleUserRegistration: ${err}`);
    }
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
    if (!token) {
      console.log("No token found - user might not be logged in");
      return;
    }
    console.log("Article received in handleCardLike:", article);

    const articleToSave = {
      title: article.title,
      description: article.description,
      url: article.url,
      urlToImage: article.urlToImage,
      publishedAt: article.publishedAt,
      keyword: searchQuery,
      _id: article.url,
      sourceName: article.sourceName,
    };

    saveArticle(articleToSave, token)
      .then((savedArticle) => {
        setSavedArticles((prevArticles) => {
          console.log("Previous articles:", prevArticles);
          const isArticleAlreadySaved = prevArticles.some(
            (saved) => saved.url === articleToSave.url
          );
          if (isArticleAlreadySaved) {
            return prevArticles;
          }
          return [...prevArticles, articleToSave];
        });
        console.log("Article saved successfully:", savedArticle);
      })
      .catch((error) => {
        console.error("Error saving article:", error);
      });
  };

  const handleCardDelete = (article) => {
    const token = getItems();
    if (!token) return;

    const savedArticle = savedArticles.find(
      (saved) => saved.url === article.url || saved.link === article.url
    );

    console.log("Found saved article to delete:", savedArticle);

    if (savedArticle) {
      const articleUrl = savedArticle.url;
      console.log("Article ID:", articleUrl);

      deleteArticle(articleUrl, token)
        .then(() => {
          setSavedArticles((prevArticles) =>
            prevArticles.filter((a) => a._id !== articleUrl)
          );
          console.log("Article deleted successfully:", articleUrl);
        })
        .catch((error) => {
          console.error("Error deleting article:", error);
        });
    } else {
      console.log("Article not found in saved articles for deletion");
    }
  };

  const handleSearch = async (searchQuery) => {
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

      // Add the search query as keyword to each article
      const newsWithKeywords = news.map((article) => ({
        ...article,
        keyword: searchQuery,
      }));

      setArticles(newsWithKeywords);
      if (newsWithKeywords.length === 0) {
        setError("No articles found");
        setArticles([]);
        return;
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
          <UserArticleContext.Provider value={userArticleContext}>
            <div
              className={
                isSavedNews
                  ? "page__content-saved-news-active"
                  : "page__content"
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
                        setActiveModal={setActiveModal}
                        handleLoginClick={handleLoginClick}
                        isLoggedIn={isLoggedIn}
                        handleLogout={handleLogout}
                        isLoading={isLoading}
                        handleSearch={handleSearch}
                        isSubmitted={isSubmitted}
                        articles={articles}
                        error={error}
                        handleCardLike={handleCardLike}
                        handleCardDelete={handleCardDelete}
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
                      <div>
                        <SavedNewsHeader
                          isLoggedIn={isLoggedIn}
                          savedArticles={savedArticles}
                          handleCardDelete={handleCardDelete}
                          setActiveModal={setActiveModal}
                          searchQuery={searchQuery}
                        />
                        <SavedCardList
                          isLoggedIn={isLoggedIn}
                          savedArticles={savedArticles}
                          handleCardLike={handleCardLike}
                          handleCardDelete={handleCardDelete}
                          setActiveModal={setActiveModal}
                          searchQuery={searchQuery}
                        />
                      </div>
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
              <SuccessModal
                isOpen={activeModal === "success"}
                onClose={closeActiveModal}
                setActiveModal={setActiveModal}
              />
            </div>
          </UserArticleContext.Provider>
        </CurrentUserContext.Provider>
      </div>
    </>
  );
}

export default App;
