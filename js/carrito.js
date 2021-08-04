const envase = document.getElementById("contenedoritems")
document.getElementsByClassName('circulo')[0].textContent = localStorage.length
for (let i of Object.values(localStorage)){
    let a = JSON.parse(i)
    let foto = a.CodFoto ? a.CodFoto : "DSC_1186"
    envase.innerHTML += `
    <ul class="cart_list">
        <li class="cart_item clearfix">
            <div class="cart_item_image"><img src="img/Finales/${foto}.jpg" alt=""></div>
            <div class="cart_item_info row flex-md-row flex-column justify-content-between">
                <div class="cart_item_name cart_info_col col-sm-3">
                    <div class="cart_item_title">Producto</div>
                    <div class="cart_item_text">${a.NombreProducto}</div>
                </div>
                <div class="cart_item_quantity cart_info_col col-sm-3">
                    <div class="cart_item_title">Cantidad</div>
                    <div class="cart_item_text">${a.cantida}</div>
                </div>
                <div class="cart_item_price cart_info_col">
                    <div class="cart_item_title">Precio</div>
                    <div class="cart_item_text">$${a.PrecioCaja}</div>
                </div>
                <div class="cart_item_total cart_info_col">
                    <div class="cart_item_title">Total</div>
                    <div class="cart_item_text" id="totalPrice">$${a.cantida*a.PrecioCaja}</div>
                    <br>
                    <input type="submit" value="Eliminar" class="delete" name="vino${a.idVinos}" style="color: blue; font-size: 12px; border: none; background: none; padding: 0;" />
                </div>
            </div>
            </div>
        </li>
    </ul>
`
}
const precioFinal = document.getElementById("orderTotal")
let valorTotal = Object.values(localStorage).map((elem) => JSON.parse(elem)).reduce((sum, valor) => {
    return sum + (parseInt(valor.PrecioCaja)*valor.cantida)},0)

precioFinal.innerHTML = `$${valorTotal}`

const precio = document.getElementById("precioTotalProductos")
precio.value = valorTotal


envase.addEventListener("click", (e) => {
    if (e.target.className === 'delete'){
        localStorage.removeItem(e.target.name)
        location.reload()
    }
} )