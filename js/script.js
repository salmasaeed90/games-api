// import { Details } from "./details.module.js";
// import { Home } from "./home.module.js";
// import { Ui } from "./ui.module.js";

// const Home = new Home();
// const Details = new Details();
// const Ui = new Ui();

const nav_link = document.querySelectorAll(".nav-link");

const cards = document.querySelectorAll(".add-card");
const details = document.querySelector(".details");
const close_icon = document.querySelector(".close-icon");
const show_data = document.querySelector(".show-data");
nav_link.forEach((link) => {
  link.addEventListener("click", () => {
    //add and remove active class
    document.querySelector(".navbar-nav .active").classList.remove("active");
    link.classList.add("active");
    activeCategoryLink(link);
    // const category = link.getAttribute('data-caregory');
    const category = link.dataset.category;
    // call api function => response data
    getGame(category);
  });
});

function activeCategoryLink(link) {
  //add and remove active class
  document.querySelector(".navbar-nav .active").classList.remove("active");
  link.classList.add("active");
}
async function getGame(cat) {
  const loading = document.querySelector(".lds-roller");
  loading.classList.remove("d-none");
  const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${cat}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "00b8c29c7cmshf8407f952261cf6p1a9226jsn7ff71a388d02",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  };
  const api = await fetch(url, options);
  const response = await api.json();
  // console.log(response);
  loading.classList.add("d-none");
  dispalyApiData(response);
  // return response;
  ///close details
  close_icon.addEventListener("click", () => {
    details.classList.add("d-none");
    show_data.classList.remove("d-none");
  });
}
getGame("mmorpg");

function dispalyApiData(data) {
  let card = "";

  for (let i = 0; i < data.length; i++) {
    card += `
    <div  class="add-card col-lg-3 col-md-6 col-sm">
    <div class=" card bg-dark border border-1 border-black"
              style="width: 16rem"
            >
              <img data-id='${data[i].id}' src="${
      data[i].thumbnail
    }" class="card-img-top w-auto m-2" />
              <div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                  <h5 class="card-title text-white fs-6 text-1">${
                    data[i].title
                  }</h5>
                  <a
                    href=""
                    class="btn text-capitalize text-white fw-bold text-1"
                    >free</a
                  >
                </div>
                <p data-id='${
                  data[i].id
                }'  class="card-text text-secondary text-2">
                  ${data[i].short_description.split(" ").slice(0, 5).join(" ")}
                </p>
              </div>
              <div
                class="card-body border-black border-top d-flex align-items-center justify-content-between"
              >
                <a 
                  href="#"
                  class="card-link bg-secondary px-2 rounded rounded-1 text-decoration-none text-white text-2"
                  >${data[i].genre}</a
                >
                <a
                  href="#"
                  class="card-link bg-secondary px-2 rounded rounded-1 text-decoration-none text-white text-2"
                  >${data[i].platform}</a
                >
              </div>
            </div>
            </div>
    `;
  }
  document.querySelector(".add-card").innerHTML = card;
}

// details code
///show details
cards.forEach((card) => {
  card.addEventListener("click", (e) => {
    show_data.classList.add("d-none");
    details.classList.remove("d-none");
    const cardId = e.target.dataset.id;
    getDetails(cardId);
  });
});
async function getDetails(id) {
  const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "00b8c29c7cmshf8407f952261cf6p1a9226jsn7ff71a388d02",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  };
  const api = await fetch(url, options);
  const response = await api.json();
  console.log(response);
  displayDetails(response);
  return response;
}

function displayDetails(data) {
  let col = `
  <div class="col-lg-4 col-md-6 col-sm">
  <div class="img">
    <h2>Details Game</h2>
    <img src="${data.thumbnail}" class="w-100">
  </div>
</div>
<div class="col-lg-8 col-md-6 col-sm">
  <div class="game-info ">
    <h4>${data.title}</h4>
    <p>Ctegory: <span class="details-btn bg-info text-black px-2 rounded-1">${data.genre}</span></p>
    <p>Plateform: <span  class="details-btn bg-info text-black px-2 rounded-1">${data.platform}</span></p>
    <p>Status: <span  class="details-btn  bg-info text-black px-2 rounded-1">${data.status}</span></p>
    <p>${data.description}</p>
    <a href = '${data.game_url}' class="show-details bg-warning btn rounded-1 px-2">Show Game</a>
  </div>
</div>
  `;
  document.querySelector(".details-info").innerHTML = col;
}
