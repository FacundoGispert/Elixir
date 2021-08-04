import Tarjeta from "./showvinos.js"


// CONFIGURACION FILTRO

const botonFiltro = document.getElementById("botonFiltro")
botonFiltro.addEventListener("click", function(e) {
    const formulario = document.getElementById("formFilter")
    const valorBodega = formulario[1].value
    const valorCategoria = formulario[0].value
    const valorPrecio = formulario[2].value

    var urlquery = window.location.search;
    var urlParams = new URLSearchParams(urlquery);
    var navigationParams = [];
    navigationParams[formulario[1].name] = valorBodega
    navigationParams[formulario[0].name] = valorCategoria
    navigationParams[formulario[2].name] = valorPrecio
    navigationParams['pag'] = 0

    
    for (var key of urlParams.keys()){
        if (navigationParams.hasOwnProperty(key) === false){
            navigationParams[key] = urlParams.get(key); 
        } 
        
    }
    
    let theNewRouteIs = "?";
    
    for (let key in navigationParams){
    theNewRouteIs += key+'='+navigationParams[key]+'&';
    }
    
    window.location.href = window.location.origin + window.location.pathname + theNewRouteIs;
    

})


// CONFIGURACION PAGINADOR
const boton = document.getElementById("listaPag")
boton.addEventListener("click", function navTo(e){
    if (e.target.className === "page-link"){
    var urlquery = window.location.search;
    var urlParams = new URLSearchParams(urlquery);
    var navigationParams = [];
    navigationParams[e.target.name] = e.target.value;

    
    for (var key of urlParams.keys()){
        
    if (key !== e.target.name){
    navigationParams[key] = urlParams.get(key);

    } 

    }
    
    let theNewRouteIs = "?";
    
    for (let key in navigationParams){
    theNewRouteIs += key+'='+navigationParams[key]+'&';
    }
    
    window.location.href = window.location.origin + window.location.pathname + theNewRouteIs;
    e.preventDefault()
}

})





$(function () {

    //Cantidad de productos en carrito
    document.getElementsByClassName('circulo')[0].textContent = localStorage.length
    
    
    
 
    

    const urlquery = window.location.search;
    const urlParams = new URLSearchParams(urlquery);

    

   // CREACION FILTRO BODEGA
   $.ajax({

    type: "GET",
    url: "http://localhost:3000/bodega",
    async : false,
    success: function (response) {
        const bodega = document.getElementById("state_id1")
        for (const datos of response) {
            if (datos.NombreBodega === " "){
                continue
            }
            bodega.innerHTML += `
            <option value="${datos.idBodega}" id="bod${datos.idBodega}">${datos.NombreBodega}</option>
            `
        }


    }
});

// CREACION FILTRO CATEGORIAS

$.ajax({
    type: "GET",
    url: "http://localhost:3000/categoria",
    async : false,
    success: function (response) {
        const bodega = document.getElementById("state_id")
        for (const datos of response) {
            bodega.innerHTML += `
            <option value="${datos.idCategoria}" id="cat${datos.idCategoria}">${datos.NombreCategoria}</option>
            `
        }


    }
});

    // CREACION FILTRO VARIETAL
    $.ajax({

        type: "GET",
        url: `http://localhost:3000/varietal${urlquery}`,
        async : false,
        success: function (response) {
            const bodega = document.getElementById("state_id3")
            for (const datos of response) {
                if (datos.NombreVarietal === " "){
                    continue
                }
                bodega.innerHTML += `
                <option value="${datos.idVarietal}" id="var${datos.idVarietal}">${datos.NombreVarietal}</option>
                `
            }


        }
    });


    
    $.ajax({
        type: "GET",
        url: `http://localhost:3000/filter${urlquery}`,
        async : false,
        success: function (response) {
            const contenedor = document.getElementById("itemsContainer")
            const tarjeta = new Tarjeta(response)
            const muestraTotal = tarjeta.armarTarjeta()
            if (muestraTotal.length !== 0){
            for (const datos of muestraTotal) {
                contenedor.innerHTML += datos
            }
        } else if (muestraTotal.length === 0){
            contenedor.innerHTML = '<h1>No hay resultados para mostrar</h1>'
        }
            
            
            contenedor.addEventListener("click", (event) => {
                if (event.target.className === "btn btn-primary btn-block"){
                    let objeto = response.find((elem) => elem.idVinos == event.target.name)
                    const cantidadVino = document.getElementById(`cantidad${objeto.idVinos}`).value
                    objeto = {...objeto,
                    cantida: cantidadVino}
                    localStorage.setItem(`vino${objeto.idVinos}`, JSON.stringify(objeto))
                    // Cantidad carrito
                    document.getElementsByClassName('circulo')[0].textContent = localStorage.length
                }
            })
        

        }
   
    });

    const catego = urlParams.get('categoria')
    const bodega = urlParams.get('bodega')
    const precio = urlParams.get('precio')
    const varietal = urlParams.get('varietal')
 

    if (catego && catego != "") {
      let a = document.getElementById(`cat${catego}`)
      a.setAttribute("selected", "selected")
    }

    if (bodega && bodega != "") {
      let a = document.getElementById(`bod${bodega}`)
      a.setAttribute("selected", "selected")
    }

    if (varietal && varietal != "") {
        let a = document.getElementById(`var${varietal}`)
        a.setAttribute("selected", "selected")
      }

    if (precio && precio != "") {
      let a = document.getElementById(`${precio}`)
      a.setAttribute("selected", "selected")
    }
   


    var paginaActual;
    if (urlParams.get('pag') && urlParams.get('pag') !== 0){
        paginaActual = (urlParams.get('pag') / 12)
    } else{
        paginaActual = 0
    }



    // CREACION PAGINADOR

    
    $.ajax({
            type: "GET",
            url: `http://localhost:3000/counter${urlquery}`,
            success: function (response) {
                const paginador = document.getElementById("listaPag")
                const cantidadPaginas = (Math.ceil(response.length / 12))
                let allElements = []
                let selectElement;
                for (let i = 0; i < cantidadPaginas; i++){
                    allElements.push(`<li class="page-item"><button class="page-link" name="pag" value="${i*12}">${i +1}</button></li>`)
                    
            }
                if (paginaActual <= 2){
                    selectElement = allElements.slice(0, 5)
                } else if (paginaActual > (cantidadPaginas-4)){
                    if(allElements.length >= 5){
                        selectElement = allElements.slice((cantidadPaginas-5), cantidadPaginas+1)
                    } 
                    else{
                        selectElement = allElements.slice(0,cantidadPaginas+1)
                    }

                } else {
                    selectElement = allElements.slice((paginaActual-2),(paginaActual+3))
                }
                for (const elemento of selectElement) {
                    paginador.innerHTML += elemento
                }




        }
        });
        

});

