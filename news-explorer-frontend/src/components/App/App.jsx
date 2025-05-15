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
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { getItems, saveArticle } from "../../utils/ThirdPartyAPI";
import { UserArticleContext } from "../../contexts/UserArticleContext";

function App() {
  const [currentUser, setCurrentUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [articles, setArticles] = useState([]);
  const [activeModal, setActiveModal] = useState("");
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

  console.log("isLoggedin", isLoggedIn);

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
        console.log(res);
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
      // Create user data object
      const userData = {
        name: values.name,
        email: values.email,
        id: values.email, // Using email as ID for now
      };

      // Store user data for later use
      localStorage.setItem("userData", JSON.stringify(userData));

      // Reset states
      setIsLoggedIn(false);
      setCurrentUser(null);

      // Show success modal
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

  // const handleCardLike = (article) => {
  //   const token = getItems();
  //   console.log(token);
  //   if (!token) return;
  //   console.log(article);

  //   const articleId = saveArticle(article);
  //   article.articleId = articleId;
  //   console.log(article.articleId);

  //   // Article ID logged for confirmation
  //   console.log("Article ID:", articleId);

  //   //Split Search query into individuals keywords
  //   article.keywords = searchQuery.split("");

  //   // Article with attached keywords logged for confirmation
  //   console.log(
  //     "Article with attached keywords:",
  //     article.keywords.slice(0, 2)
  //   );

  //   // Pass the articleId and article object to the API
  //   savedArticles(article, token)
  //     .then((likedArticle) => {
  //       setSavedArticles([...savedArticles, likedArticle]);
  //       console.log("Article saved successfully:", likedArticle);
  //     })
  //     .catch(console.error("Error saving article:", error));
  // };

  // const handleSavedArticles = () => {};

  const handleCardLike = (article) => {
    const token = getItems();
    if (!token) return;

    // Call the saveArticle API function
    saveArticle(article, token)
      .then((savedArticle) => {
        // Update the savedArticles state with the new article
        setSavedArticles([...savedArticles, savedArticle]);
        console.log("Article saved successfully:", savedArticle);
      })
      .catch((error) => {
        console.error("Error saving article:", error);
      });
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

      // Log the fetched articles for debugging
      console.log("Fetched articles for query:", news);

      setArticles(news);
      if (news.length === 0) {
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
                        handleLoginClick={handleLoginClick}
                        isLoggedIn={isLoggedIn}
                        handleLogout={handleLogout}
                        isLoading={isLoading}
                        handleSearch={handleSearch}
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
