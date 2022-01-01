$(document).ready(function () {
  displayList();

  if (localStorage.getItem("favsList")) {
    favList = JSON.parse(localStorage.getItem("favsList"));
    printfav();
  }
});


function displayList() {
  const selectGenre = document.getElementById("typeGame");
  let urlList = selectGenre.addEventListener("change", (e) => {
    let option = e.target.value;
    const defaultUrl = "https://www.freetogame.com/api/games";
    let GETURL = option || defaultUrl;
    $.get(GETURL).done(function (result, state) {
      //Usamos el metodo GET de JQ
      if (state === "success") {
        let games = result; //Asignamos el resultado a una variable que es la que tiene todo los datos
        games.forEach((gameCard) => {
          let cardContainer = document.createElement("div");
          cardContainer.className = "card";
          mainContainer.appendChild(cardContainer);

          let image = document.createElement("img");
          image.src = `${gameCard.thumbnail}`;
          image.setAttribute("alt", `${gameCard.short_description}`);
          cardContainer.appendChild(image);

          let title = document.createElement("h5");
          title.className = "nameTitle";
          title.textContent = `${gameCard.title}`;
          cardContainer.appendChild(title);

          let console = document.createElement("h6");
          console.className = "platform";
          console.textContent = `${gameCard.platform}`;
          cardContainer.appendChild(console);

          let genre = document.createElement("p");
          genre.className = "genre";
          genre.textContent = `${gameCard.genre}`;
          cardContainer.appendChild(genre);

          let anchor = document.createElement("a");
          anchor.textContent = "Enlace";
          anchor.href = `${gameCard.freetogame_profile_url}`;
          anchor.setAttribute("target", "_blank");
          cardContainer.appendChild(anchor);

          let btnAddGame = document.createElement("button");
          btnAddGame.className = "button btnAddToList";
          btnAddGame.id = `${gameCard.id}`;
          btnAddGame.textContent = "Favorito";
          cardContainer.appendChild(btnAddGame);

          //FUNCION QUE ESCUCHA EL CLICK AL BOTON QUE ES EL QUE TIENEN EL ID Y CREA LAS CARDS EN LA SECCION DEL LISTADO
          document.getElementById(`${gameCard.id}`).addEventListener("click", (e) => {
            Swal.fire({
              icon: "success",
              title: `${gameCard.title}`,
              text: "Agregado a Favoritos",
              toast: true,
              position: "bottom-end",
              showConfirmButton: false,
              timer: 1500,
              background: "rgba(99,31,235,0.8)",
              color: "#ffffff",
            });
            //EJECUTAMOS LA FUNCION QUE VA A BUSCAR SI EL ELEMENTO EXISTE O NO DENTRO DEL ARRAY
            getList(games.find((g) => g.id == `${gameCard.id}`));


            //   if (getList = undefined) {

            //       icon = document.createElement("i")
            //       icon.className = "far fa-bookmark";
            //       title.appendChild(icon)

            //     }
            printfav(e);
          });
        });
      }
    });
  });
}

//FUNCIONES PARA EL MENU LATERAL

let openListFav = document.getElementById("openList");
openListFav.addEventListener("click", () => {
  document.getElementById("cart").style.width = "50vw";
});

let btnCloseList = document.getElementById("closeBtn");
btnCloseList.addEventListener("click", () => {
  document.getElementById("cart").style.width = "0";
});


//FUNCION PARA VALIDAR EL FORMULARIO

const form = document.getElementById('formGames');

const inputs = document.querySelectorAll('#formGames input');

const expresions = {
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
}

const inputsValue = {
  email: false
}

const validateForm = (e) => {
  if (expresions.email.test(e.target.value)) {
    document.getElementById('usermail').classList.add('iptValueValid')
    document.getElementById('usermail').classList.remove('iptValueError')
    document.getElementById('errorMsgE').classList.remove('errorMsg')
  } else {
    document.getElementById('usermail').classList.remove('iptValueValid')
    document.getElementById('usermail').classList.add('iptValueError')
    document.getElementById('errorMsgE').classList.add('errorMsg')
  }
}



inputs.forEach((input) => {
  input.addEventListener('keyup', validateForm);
  input.addEventListener('blur', validateForm)
})

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if ('email') {
    form.reset();
  } else {
    document.getElementById('errorMsgE').classList.add('errorMsg')
  }
})

//Nota importante, verificar que los elemento del HTML que van a recibir todo el contenido esten debidamente identificados con el ID!!!