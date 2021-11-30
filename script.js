// window.alert("Please Click on Search Button")
const myfunction = async function () {
  try {
    const res = await fetch(
      "https://api.themoviedb.org/3/search/movie?api_key=5d98a7a1405b8032e28c31e19e4d10a9&language=en-US&query=bah&page=1&include_adult=false"
    );

    const data = await res.json();
    // console.log(data);

    show(data);
  } catch (err) {
    console.log(err);
  }
};

function show(data) {
  document.getElementById("show-all-data").style.display = "block";
  document.getElementById("message").style.display = "none";
  document.getElementById("all-movie").innerHTML = "";
  for (let i of data.results) {
    html = `
        <div class="movie">
            <img src="https://www.themoviedb.org/t/p/w220_and_h330_face/${i.poster_path}" alt="">
            <p class="movie-id">${i.id}</p>
            <div class="movie-data">
                <p class="title">${i.original_title}</p>
                <p class="other"><span>Popularity :- </span>${i.popularity}</p>
                <p class="lang other"><span>Language :- </span>${i.original_language}</p>
                <p class="other"><span>Release Data :- </span>${i.release_date}</p>
            </div>
        </div>`;

    document.getElementById("all-movie").insertAdjacentHTML("beforeend", html);
  }

  rahul();
}

function rahul() {
  const data = document.querySelectorAll(".movie");
  data.forEach(function (main) {
    main.addEventListener("click", function () {
      let id = main.querySelector(".movie-id").textContent;
      myData(id);
    });
  });
}

const myData = async function (id) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=5d98a7a1405b8032e28c31e19e4d10a9`
    );
    const data = await res.json();
    // console.log(data);
    mainData(data);
  } catch (err) {
    console.log(err);
  }
};

function mainData(data) {
  let timeFormat = `${(data["runtime"] / 60) ^ 0}:` + (data["runtime"] % 60);
  let gener = data["genres"];
  let data1 = gener.map((i) => {
    return i["name"];
  });
  document.getElementById("one-data").innerHTML = "";
  html = `

        <div class="one-movie-data">
            <img
            src="https://www.themoviedb.org/t/p/w220_and_h330_face${data["poster_path"]}"
            alt=""
            />
            <div class="more-data">
                <h1>${data["original_title"]}</h1>
                <p class="more-p"><span>Release Date :- </span>${data["release_date"]}</p>
                <p class="more-p"><span>Rating :- </span>${data["vote_average"]}</p>
                <p class="more-p"><span>Run-Time :- </span>${timeFormat} hr</p>
                <div class="again-data">
                    <p class="more-p again-more-p"><span>Movie Language :- </span>${data["original_language"]}</p>
                    <p class="more-p"><span>Gener :- </span>${data1}</p>
                </div>
            </div>
        </div>
        <div class="overview">
            <p class="overview-P"><span>Movie Overview :-  </span>  
            ${data["overview"]}
            </p>
        </div>
     `;

  document.getElementById("one-data").insertAdjacentHTML("beforeend", html);
}

// let preBtn = document.querySelector("#pre");

var num = 1;
// var again = 19;

const pageNumber = async function (type) {
  // document.getElementById("next").style.backgroundColor = "none";
  if (type === "next") {
    num++;
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=5d98a7a1405b8032e28c31e19e4d10a9&language=en-US&query=bah&page=${num}&include_adult=false`
      );

      const data = await res.json();
      // console.log(data);
      show(data);
      if (num === 19) {
        document.getElementById("next").removeAttribute("onclick");
        // document.getElementById("next").style.backgroundColor = "#6b6969";
      } 
    } catch (err) {
      console.log(err);
    }
  } else if (type === "pre") {
    num--;
    console.log(num);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=5d98a7a1405b8032e28c31e19e4d10a9&language=en-US&query=bah&page=${num}&include_adult=false`
      );

      const data = await res.json();
      // console.log(data);
      show(data);
      if (num === 1) {
        document.getElementById("pre").removeAttribute("onclick");
      }
    } catch (err) {
      console.log(err);
    }
  } else if (num === 1) {
    document.querySelector("#pre").style.width = "300px";
  }
};
