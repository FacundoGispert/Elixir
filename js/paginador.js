var paginaActual;
    if (urlParams.get('pag') && urlParams.get('pag') !== 0){
        paginaActual = (urlParams.get('pag') / 12)
    } else{
        paginaActual = 0
    }

    $.ajax({
            type: "GET",
            url: `http://localhost:3000/counter${urlquery}`,
            success: function (response) {
                const paginador = document.getElementById("listaPag")
                const cantidadPaginas = (Math.ceil(response.length / 12))
                for (let i = paginaActual; i < paginaActual+4; i++){
				if (i === cantidadPaginas)
				{
				break;
				}
                if (paginaActual === 0){
                paginador.innerHTML += `
                <li class="page-item"><button class="page-link" name="pag" value="${i*12}">${i +1}</button></li>`
                } else {
                    paginador.innerHTML += `
                    <li class="page-item"><button class="page-link" name="pag" value="${(i-1)*12}">${i}</button></li>`
                }
            }
        }
        });



        if (paginaActual === 0 ){
            paginador.innerHTML += `
                <li class="page-item"><button class="page-link" name="pag" value="${i*12}">${i +1}</button></li>`
        } else if(paginaActual === 1 ) {
            paginador.innerHTML += `
            <li class="page-item"><button class="page-link" name="pag" value="${i*12}">${i +1}</button></li>`
        }