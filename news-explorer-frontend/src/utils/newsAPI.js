const apiKey = "b7753775943941279d75b73a5c75bf53";
const newsApiBaseUrl =
  process.env.NODE_ENV === "production"
    ? "https://nomoreparties.co/news/v2/everything"
    : "https://newsapi.org/v2/everything";

// Function to fetch news articles from the News API
export const fetchNews = async (query) => {
  const endpoint = `${newsApiBaseUrl}?q=${encodeURIComponent(
    query
  )}&apiKey=${apiKey}&pageSize=100&from=${getFormattedDate(
    7
  )}&to=${getFormattedDate(0)}`;

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error("Failed to fetch news articles");
    }

    const data = await response.json();
    console.log("Raw article data:", data.articles[0]);
    console.log("Fetched articles from API:", data.articles);

    // Map through the articles and format them
    const articles = data.articles.map((article) => ({
      sourceName: article.source.name,
      title: article.title,
      publishedAt: formatDate(article.publishedAt),
      description: article.description,
      urlToImage: article.urlToImage,
      url: article.url,
      keyword: query,
    }));

    return articles;
  } catch (error) {
    throw error;
  }
};

// Formats the date for the API request (7 days ago)
export const getFormattedDate = (daysAgo) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split("T")[0];
  // Format as YYYY-MM-DD
};

// Formats the date for display
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString(undefined, options);
};

export const api = {
  fetchNews,
  getFormattedDate,
  formatDate,
};
