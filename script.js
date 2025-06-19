
const locationDiv = document.getElementById("location");
const newsSection = document.getElementById("news-section");
const chatbox = document.getElementById("chatbox");
let newsList = [];
let newsIndex = 0;

async function getLocationAndNews() { 
  const res = await fetch("https://ipapi.co/json/");
  const data = await res.json();
  const city = data.city;
  const country = data.country_name;
  locationDiv.innerText = `${city}, ${country}`;
  getNews(city);
}

// Fetch 10 news articles for user's city
async function getNews(city) {
 const res = await fetch(`https://newsapi.org/v2/everything?q=${city}&pageSize=10&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`);
  const data = await res.json();
  newsList = data.articles;
  if (newsList.length > 0) {
    showNewsArticle();
    setInterval(showNewsArticle, 15000);
  } else {
    newsSection.innerHTML = "<p>No news found for this location.</p>";
  }
}

// Rotate through news every 15 seconds
function showNewsArticle() {
  const article = newsList[newsIndex];
  newsSection.innerHTML = `
    <div class="card">
      <div class="row g-0">
        ${article.urlToImage ? `
        <div class="col-md-4">
          <img src="${article.urlToImage}" class="img-fluid rounded-start" alt="News Image">
        </div>` : ''}
        <div class="col-md-8">
          <div class="card-body">
            <h5>${article.title}</h5>
            <p class="text-muted">${article.source.name} • ${new Date(article.publishedAt).toLocaleTimeString()}</p>
            <a href="${article.url}" target="_blank" class="btn btn-outline-primary btn-sm">Read More</a>
          </div>
        </div>
      </div>
    </div>
  `;
  newsIndex = (newsIndex + 1) % newsList.length;
}



getLocationAndNews();

console.log(COHERE_API_KEY)
