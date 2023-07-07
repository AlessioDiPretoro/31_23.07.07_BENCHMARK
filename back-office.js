const formReference = document.querySelector("form");
const resetButton = document.querySelector(".btn-warning");
const okButton = document.querySelector(".btn-primary");
const nameInput = document.getElementById("nameProduct");
const descriptionInput = document.getElementById("descriptionProduct");
const brandInput = document.getElementById("brandProduct");
const imgInput = document.getElementById("imgProduct");
const priceInput = document.getElementById("priceProduct");

const URL = "https://striveschool-api.herokuapp.com/api/product/";
const authorization =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE3YjhkZTEyYjUwYzAwMTQ5ZTRlZjAiLCJpYXQiOjE2ODg3MTM0MzksImV4cCI6MTY4OTkyMzAzOX0.LMjNooIC5bk_vY4nfmrvWymI_JBo4Re7zmhN9rEe0Co";

const addressBarContent = new URLSearchParams(location.search);
const eventId = addressBarContent.get("id");

if (eventId) {
  document.querySelector(".btn-primary").innerText = "Modifica prodotto";
  document.querySelector("h1").innerText = "Modifica dettagli prodotto";
  const deleteButton = document.querySelector(".btn-danger");
  deleteButton.classList.remove("d-none");
  deleteButton.addEventListener("click", function () {
    fetch(URL + eventId, {
      method: "DELETE",
      headers: {
        Authorization: authorization,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          // abbiamo eliminato l'evento con successo!
          alert("EVENTO ELIMINATO!");
          location.assign("index.html");
        } else {
          // c'è stato un problema nell'eliminazione dell'evento
          throw new Error("Problema nell'eliminazione dell'evento");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  fetch(URL + eventId, {
    headers: {
      Authorization: authorization,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Errore nel recupero dei dettagli dell'evento");
      }
    })
    .then((detail) => {
      nameInput.value = detail.name;
      descriptionInput.value = detail.description;
      brandInput.value = detail.brand;
      imgInput.value = detail.imageUrl;
      priceInput.value = detail.price;
    })
    .catch((err) => console.log(err));
}

formReference.addEventListener("submit", (e) => {
  e.preventDefault();
});

resetButton.addEventListener("click", () => {
  nameInput.value = "";
  descriptionInput.value = "";
  brandInput.value = "";
  imgInput.value = "";
  priceInput.value = "";
});

okButton.addEventListener("click", (e) => {
  e.preventDefault();

  const newProduct = {
    name: nameInput.value,
    description: descriptionInput.value,
    brand: brandInput.value,
    imageUrl: imgInput.value,
    price: priceInput.value,
  };
  console.log("ecco i valori recuperati dal form:", newProduct);

  let urlToUse;
  if (eventId) {
    urlToUse = URL + "/" + eventId;
  } else {
    urlToUse = URL;
  }

  let methodToUse;
  if (eventId) {
    methodToUse = "PUT";
  } else {
    methodToUse = "POST";
  }

  fetch(urlToUse, {
    method: methodToUse,
    body: JSON.stringify(newProduct),
    headers: {
      Authorization: authorization,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        alert("EVENTO SALVATO!");
        nameInput.value = "";
        descriptionInput.value = "";
        brandInput.value = "";
        imgInput.value = "";
        priceInput.value = "";
        // location.assign('index.html')
      } else {
        throw new Error("Errore nel salvataggio dell'evento");
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
