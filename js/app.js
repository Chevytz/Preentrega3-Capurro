const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito")
const modalContainer = document.getElementById("modal-container")
const cantidadCarrito = document.getElementById("cantidadCarrito");


// Uso del OR post chequeo del local storage y uso del get ítem
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Método para recorrer el array y mostrar los productos en la web

productos.forEach((product) => { 
    let content = document.createElement ("div");
    content.className= "card"
    content.innerHTML= `  
    <img src="${product.img}">
    <h3>${product.nombre}</h3>
    <p class="price">${product.precio} $</p>
    `;

    shopContent.append(content);
    
    let comprar = document.createElement ("button");
    comprar.innerText = "comprar";
    comprar.className = "comprar";

    content.append (comprar);

    comprar.addEventListener ("click", () =>{
    
        const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id); 
        if (repeat) {
            carrito.map((prod) => {
                if(prod.id === product.id) {
                    prod.cantidad++;   
                }
            });
        } else {
            carrito.push({
                id: product.id,
                img: product.img,
                nombre: product.nombre,
                precio: product.precio,
                cantidad: product.cantidad,
            });
            carritoCounter ();
            saveLocal();
        }       
    });
});

//Set ítem para guardar los productos pedidos del carrito en local

const saveLocal=() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}





