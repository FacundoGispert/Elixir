$(function () {
    
    const query = window.location.search


    $.ajax({
        type: "GET",
        url: `http://localhost:3000/filter${query}`,
        success: function (response) {
            const contenedor = document.getElementById("itemsContainer")
            for (const datos of response) {
                contenedor.innerHTML += `
            <div class="col-lg-4 col-md-6 mb-4">
            <div class="card h-100">
              <a href="#"><img class="card-img-top" src="img/5.png" alt=""></a>
              <div class="card-body">
                <h5 class="card-title">
                  <a href="#">${datos.nombrevino}</a>
                </h5>
                <h5>${datos.precio}</h5>
                <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur!</p>
              </div>
              <div class="card-footer">
                <small class="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>
              </div>
            </div>
          </div>`
            }
            
        }
   
   
   
   
   
   
    });



});