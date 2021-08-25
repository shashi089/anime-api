const header = document.createElement("h1"); // for title
header.innerHTML = "MyAnimeList";

// to create search box
const searchBox = document.createElement("div");
searchBox.setAttribute("class", "search-box");

searchBox.innerHTML = `<form id="search_form">
<input placeholder="Search Anime..." name="search" id="search" type="text">
<button class=”search-btn” type=”submit”>Search</button> </form>
<div id="output"></div>`;
document.body.append(header, searchBox);

//function to search Anime and fetch API
async function getAnime(event) {
  event.preventDefault();
  const searchValue = document.querySelector("#search").value; // get value from seach box
  const response = await fetch(
    `https://api.jikan.moe/v3/search/anime?q=${searchValue}&page=1`
  );
  const data = await response.json();
  data.results.forEach((anime) => createAnime(anime));
}

// function to create Anime list
function createAnime(anime) {
  const searchResults = document.createElement("div");
  searchResults.setAttribute("class", "anime-group");
  searchResults.innerHTML = ` 
          <h4>${anime.title}</h4>
      <img src=${anime.image_url} >
      <p>Episodes : ${anime.episodes}</p>
      <p>Start Date: ${new Date(anime.start_date).toDateString()} </p>
      <p>End Date: ${new Date(anime.end_date).toDateString()}</p>
      <p>IMDB Rate : ${anime.score}</p>
      <p>Type : ${anime.type}</p>
      `;

  const output = document.querySelector("#output");
  output.append(searchResults);
}

function pageLoad() {
  document.querySelector("#search_form").addEventListener("submit", getAnime);
}
window.addEventListener("load", pageLoad);
