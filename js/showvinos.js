export default class Tarjeta{
    constructor(productos){
        this.productos = productos;
    }

    armarTarjeta(){
        let tarjetas = []
        for (let producto of this.productos) {
          let imagen = producto.CodFoto ? "img/finales/" + producto.CodFoto +".jpg" : "img/DSC_1187.jpg"
           let tarjeta = `
            <div class="col-lg-4 col-md-6 mb-4">
            <div class="card h-100">
              <a href="#"><img class="card-img-top" src="${imagen}" alt=""></a>
              <div class="card-body">
                <h5 class="card-title">
                  <a href="#">${producto.NombreProducto}</a>
                </h5>
                <p class="card-text">${producto.NombreVarietal}</p>
                <h5>$${producto.PrecioCaja}</h5>
                <p>Caja x 6 unidades</p>
              </div>
              <div class="card-footer">
              <div class="col-xs-2">
              <input type="number" value="1" min="1" max="10" id="cantidad${producto.idVinos}"> 
              </div>
                <button class="btn btn-primary btn-block" name="${producto.idVinos}">Agregar</button>  
         
              </div>
            </div>
          </div>`
            
            
            tarjetas.push(tarjeta)
            
           
        }
        
        return tarjetas
    }
}