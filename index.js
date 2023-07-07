const cartTotPos = document.getElementById("cartTotPos");
const URL = "https://striveschool-api.herokuapp.com/api/product/";
const authorization =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE3YjhkZTEyYjUwYzAwMTQ5ZTRlZjAiLCJpYXQiOjE2ODg3MTM0MzksImV4cCI6MTY4OTkyMzAzOX0.LMjNooIC5bk_vY4nfmrvWymI_JBo4Re7zmhN9rEe0Co";

const spinner = document.querySelector(".spinner-border");

const getRemoteDate = () => {
  fetch(URL, {
    headers: {
      Authorization: authorization,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        if (res.status === 404) {
          throw new Error("Not found");
        } else if (res.status === 500) {
          throw new Error("Internal Server Error");
        } else {
          throw new Error("Errore nella chiamata API");
        }
      }
    })

    .then((data) => {
      spinner.classList.add("d-none");
      let row = document.getElementsByClassName("rowCard")[0];
      data.forEach((element) => {
        let newCol = document.createElement("div");
        newCol.classList.add(
          "col",
          "col-6",
          "col-md-4",
          "col-lg-3",
          "d-flex",
          "align-items-stretch"
        );
        newCol.innerHTML = `
            <div class="card border-success">
              <img src="${element.imageUrl}" class="card-img-top" alt="..." />
              <div class="card-body d-flex flex-column">
                <h5 class="card-title" >${element.name}</h5>
                <p class="card-text flex-grow-1"><span>${element.description}</span></p>
                <p class="card-text fw-bold"><span>${element.brand}</span> - $ <span>${element.price}</span></p></p>
                <div class="d-flex flex-column gap-2 justify-content-between flex-xl-row">
                <a href="./detail.html?id=${element._id}" class="infoButton btn btn-success">Scopri di più</a>
                <a href="./back-office.html?id=${element._id}"class="editButton btn btn-warning">Modifica</a>
              </div>
              </div>
            </div>
              `;
        row.appendChild(newCol);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

getRemoteDate();
