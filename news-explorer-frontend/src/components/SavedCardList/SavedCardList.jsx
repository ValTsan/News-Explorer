import "../SavedCardList/SavedCardList.css";
import { useContext } from "react";
import { UserArticleContext } from "../../contexts/UserArticleContext";
import NewsCard from "../NewsCard/NewsCard";

function SavedCardList({ handleDeleteArticle }) {
  const { userArticles } = useContext(UserArticleContext);

  return (
    <>
      <ul className="saved-cards">
        {userArticles?.map((article) => {
          return (
            <NewsCard
              handleDeleteArticle={handleDeleteArticle}
              article={article}
              key={article.image}
            />
          );
        })}
      </ul>
    </>
  );
}
export default SavedCardList;
