$(document).ready(function () {
  displayList(); //Al cargar la pagina llamamos  ala funcion que genera las cards
  if (localStorage.getItem("favsList")) {
    favList = JSON.parse(localStorage.getItem("favsList")); //Verificamos si en el LS hay Data para dibujar las cards del listado
    printfav();
  }
});

//Funcion que lla a la API y luego recorre los elementos para dibujar las cards en el DOM

function displayList() {
  const selectGenre = document.getElementById("typeGame");
  let urlList = selectGenre.addEventListener("change", (e) => {
    let option = e.target.value;
    let GETURL =  option;
    console.log(GETURL)
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

          //Funcion que escucha el click de Agregar, busca cual es el elemento mediuante el ID
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
            //Ejecutamos la funcion que busca en el LS si existe o no (Se encuentra en el otro documento JS)
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


//FUNCION PARA VALIDAR EL FORMULARIO Y USAR EL METODO POST
let btnSend = document.getElementById('sendForm').addEventListener('click', async () => {
  const { value: email } = await Swal.fire({ //SweetAlert que pide direccion email
    title: 'Dirección de email',
    input: 'email',
    inputPlaceholder: 'johnDoe@email.com',
    showCancelButton: true,
    cancelButtonColor: 'rgb(223, 91, 15)',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'Enviar!',
    background: "rgba(99,31,235,0.8)",
    color: "#ffffff",
  })
  if (email) {
    await Swal.fire({
      title : `Email ingresado: ${email}`,
      background: "rgba(99,31,235,0.8)",
      color: "#ffffff",
      confirmButtonColor: 'rgb(223, 91, 15)',
    }), 
      fetch('https://jsonplaceholder.typicode.com/posts', { //Metodo Post de JSONPlaceHolder
      method: 'POST',
      body: JSON.stringify({
        title: 'email',
        body: `${email}`,
        userId: 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  }
})

//Variable que da la fecha de la pagina en el footer

let dateFooter = document.getElementById('datePag')
dateFooter.textContent = new Date().getFullYear();
 //La probe por el cambio de año

//Nota importante, verificar que los elemento del HTML que van a recibir todo el contenido esten debidamente identificados con el ID!!!