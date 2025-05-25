


const apiKey = "1224961";   //API key


 //waite for DOM load
document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("searchBtn");
  searchBtn.addEventListener("click", searchMovie);
});
function searchMovie() {
  const title = document.getElementById("movieInput").value.trim();  //input
  const details = document.getElementById("movieDetails");           //to   
  const error = document.getElementById("errorMessage");         //to show error message

  details.classList.add("hidden");
  error.classList.add("hidden");
  details.innerHTML = "";            //hides previous result orerror//
  error.innerText = "";               //clear previous contant

  if (title === "") {
    error.innerText = "Please enter a movie title.";  //if in put isempty shows an error
    error.classList.remove("hidden");
    return;
  }
//fetch data anf there any error,shows error and if success loops through arrey
//and print movie poster,title and year etc
  fetch(`https://www.omdbapi.com/?s=${title}&apikey=${apiKey}&type=movie`)
    .then((res) => res.json())
    .then((data) => {
      if (data.Response === "False") {
        error.innerText = data.Error;
        error.classList.remove("hidden");
      } else {
        details.innerHTML = data.Search.map(movie => `
          <div class="movie-card">
            <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200"}" alt="Movie Poster">
            <div class="movie-info">
              <h2>${movie.Title} (${movie.Year})</h2>
            </div>
          </div>
        `).join("");
        details.classList.remove("hidden");
      }
    })
    //catchesif any failure
    .catch((err) => {
      error.innerText = "An error occurred. Please try again.";
      error.classList.remove("hidden");
      console.error(err);
    });
}