class Favorito {
  constructor(games) {
    this.nombre = games.title;
    this.consola = games.platform;
    this.genero = games.genre;
    this.id = games.id;
    this.url = games.freetogame_profile_url;
    this.date = new Date().toLocaleDateString();
  }

}

//FUNCION PARA GUARDAR EN EL LS
const setLs = (list, games) => {
  localStorage.setItem(list, JSON.stringify(games));
};

let favList = []; //Array que guarda los elementos antes de ir al LS

function getList(gameCart) { //Funcion invocada para verificar la existencia de los elemento en el LS
  let findGame = favList.find((g) => g.id === gameCart.id);

  if (findGame === undefined) { //Sino existe crea un uevo Obj de clase Favorito y lo envia al LS
    let gameToCart = new Favorito(gameCart);
    favList.push(gameToCart);
    setLs("favsList", favList);
  } else { //Si existe arroja un mensaje de error
    let position = favList.findIndex((g) => g.id === gameCart.id);
    console.log("Posicion en el Array ", position);
    Swal.fire({
      icon: 'info',
      title: "Hey!!!",
      text: "Ya es un favorito.",
      showConfirmButton: false,
      timer: 1500,
      background: "rgba(99,31,235,0.8)",
      color: "#fff"
    });
  }
}

let  getLs = () => JSON.parse(localStorage.getItem("favsList"));




const printfav = () => {

let lsFunc = getLs();
  //Nos traemos el listado del LS
  
  //Tomamos el elemento que va a recibir los datos para el Listado
  let cartItemsList = document.getElementById("cartItemsList");
  cartItemsList.textContent = "";
  let containerList= document.createElement("div");
  containerList.className = "cartItemList";
  containerList.id= "containerList";
  cartItemsList.appendChild(containerList);
  //Aca se dibuja el cart
  lsFunc.forEach((element) => {
    let gameCart = document.createElement("div");
    gameCart.className = "ItemList";
    gameCart.id = "row" + `${element.id}`;
    containerList.appendChild(gameCart);

    let titleCart = document.createElement("p");
    titleCart.innerHTML = `${element.nombre}`;
    gameCart.appendChild(titleCart);

    let consoleCart = document.createElement("p");
    consoleCart.innerHTML = `${element.consola}`;
    gameCart.appendChild(consoleCart);

    let genreCart = document.createElement("p");
    genreCart.innerHTML = `${element.genero}`;
    gameCart.appendChild(genreCart);

    let urlCart = document.createElement("a");
    urlCart.textContent = "Enlace";
    urlCart.href = `${element.url}`;
    urlCart.setAttribute("target", "_blank");
    gameCart.appendChild(urlCart);

    let dateAdd = document.createElement("p");
    dateAdd.textContent = `${element.date}`;
    gameCart.appendChild(dateAdd)

    let btndltGame = document.createElement("input");
    btndltGame.type = "button";
    btndltGame.value = "X";
    btndltGame.id = `${element.id}`;
    btndltGame.className = "dltRow";
    gameCart.appendChild(btndltGame);

    // asignamos el evento click al boton para eliminar la fila
    btndltGame.addEventListener("click", () => {

      //Buscamos dentro del Array de la lista el Index del elemento
      btndltGame = lsFunc.findIndex((g) => g.id == `${element.id}`);
      console.log("Que encuentra", btndltGame);

      //Disparamos modal que pregunta si se quiere eliminar el favorito
      Swal.fire({
        title: 'Eliminar favorito?',
        text: `${element.nombre}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: 'rgb(223, 91, 15)',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si, Eliminar!',
        background: "rgba(99,31,235,0.8)",
        color: "#ffffff",
      }).then((result) => {
        if (result.isConfirmed) {
          //Si se confirma borramos del array el elemento
          let dltArray = lsFunc.splice(btndltGame, 1);
          favList.splice(btndltGame, 1);
          console.log("Que Borra", lsFunc);
          let dltRow = document.getElementById("row" + `${element.id}`).remove();
          console.log('lista de borrados', dltArray)
          //Actualizamos el LS
          localStorage.setItem("favsList", JSON.stringify(lsFunc));
        }
      })
    });

    //Funcion para ordenar segun el nombre del juego presionando la palabra titulo
    let elementList = document.getElementById('listTitle');
    elementList.addEventListener('click', (e) => {
      console.log(e.target)
      if (e.target.id = 'listTitle') {
        getLs.sort((o1, o2) => {
          if (o1.nombre < o2.nombre) {
            return -1
          } else if (o1.nombre > o2.nombre) {
            return 1;
          } else {
            return 0
          }
        });
        localStorage.setItem("favsList", JSON.stringify(getLs));
      }
      printfav();
    })
  });
};

//Funcion para borrar todo el listado


function deleteAllLs() {
  let btnDlt = document.getElementById('dltAll');
  btnDlt.addEventListener('click', (e) => {

    Swal.fire({
      title: 'Eliminar todo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: 'rgb(223, 91, 15)',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, Eliminar!',
      background: "rgba(99,31,235,0.8)",
      color: "#ffffff",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear()
        let container = document.getElementById('containerList');
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        };
        container.parentNode.removeChild(container);
        
      }
    })
  })
};



getLs();
deleteAllLs();