const url = new URL(window.location.href);
const movieId = url.searchParams.get("id");
const movieTitle = url.searchParams.get("title");

const APILINK = 'http://localhost:8000/api/v1/reviews/';

const main = document.getElementById("reviews");
const title = document.getElementById("title");
title.innerHTML = "Reviews for " + movieTitle;

$(document).ready(function () {
  function returnReviews(url) {
    fetch(url + "movie/" + movieId)
      .then((res) => res.json())
      .then((data) => {
        showReviews(data);
      });
  }

  function showReviews(movies) {
    movies.forEach(review => {
      const div_card = document.createElement("div");

      div_card.innerHTML = `
        <div class="row">
          <div class="column">
            <div class="card" id="${review._id}">
              <p><strong>Review: </strong>${review.review}</p>
              <p><strong>User: </strong>${review.user}</p>
              <p><a href="#" onclick="editReview('${review._id}', '${review.review}', '${review.user}')">Edit</a> || <a href="#" onclick="deleteReview('${review._id}')">Delete</a></p>
            </div>
          </div>
        </div>`;

      main.appendChild(div_card);
    })
  }

  function editReview(id, review, user) {
    const element = document.getElementById(id);
    const reviewInputId = "review" + id;
    const userInputId = "user" + id;

    element.innerHTML = `
      <p><strong>Review: </strong><input type="text" id="${reviewInputId}" value="${review}"></p>
      <p><strong>User: </strong><input type="text" id="${userInputId}" value="${user}"></p>
      <p><a href="#" onclick="saveReview('${reviewInputId}', '${userInputId}', '${id}')">Save</a></p>
      `
  }

  function saveReview(reviewInputId, userInputId, id) {

  }

  returnReviews(APILINK);

});

