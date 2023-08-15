// changuito de compra

const pintarCarrito = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex"; 
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `
        <h1 class="modal-header-title">Changuito</h1>
    `;
    modalContainer.append(modalHeader);
    
    const modalbutton = document.createElement ("h1");
    modalbutton.innerText = "X";
    modalbutton.className = "modal-header-button";

    modalbutton.addEventListener("click", ()=> {
        modalContainer.style.display= "none"
    })

    modalHeader.append(modalbutton);

    carrito.forEach((product) => {
        let carritoContent = document.createElement ("div");
        carritoContent.className = "modal-content";
        carritoContent.innerHTML = `
            <img src="${product.img}">
            <h3>${product.nombre}</h3>
            <p>${product.precio} $</p>
            <span class="restar"> - </span>
            <p>Cantidad: ${product.cantidad}</p>
            <span class="sumar"> + </span>
            <p>Total: ${product.cantidad * product.precio}</p>
            <span class="delete-product"> ❌ </span>
            `;

        modalContainer.append(carritoContent)
    
        // Usando query selector para darle funcion a los botones de suma y resta del carriten
        let restar = carritoContent.querySelector(".restar")
        restar.addEventListener ("click", () => {
            if (product.cantidad !== 1) {
            product.cantidad--;
            }
            
            pintarCarrito ();
        })

        let sumar = carritoContent.querySelector(".sumar")
        sumar.addEventListener ("click", () => {
            product.cantidad++;

            pintarCarrito ();
        })

        let eliminar = carritoContent.querySelector(".delete-product")
        eliminar.addEventListener("click", ()=> {
            eliminarProducto(product.id);
        });

        /*
        let eliminar = document.createElement("span");
        eliminar.innerText = "❌";
        eliminar.className ="delete-product";
        carritoContent.append (eliminar);

        eliminar.addEventListener("click", eliminarProducto)
*/
    });
// variable para calcular el total
    const total = carrito.reduce ((acc, el) => acc + el.precio * el.cantidad, 0);

    const totalCompra = document.createElement("div");
    totalCompra.className = "total-content";
    totalCompra.innerHTML = `Total a pagar: ${total}$`;
    modalContainer.append (totalCompra);
};

verCarrito.addEventListener("click", pintarCarrito);

// Uso de filtro y return para hacer la funcion de eliminar los productos que quiera el usuario.
//uso de storage para resetear carrito en caso de eliminar
const eliminarProducto = (id) => {
    const foundId = carrito.find ((element) => element.id === id);
    carrito = carrito.filter((carritoId) => { 
        return carritoId !== foundId;
    });
    carritoCounter ();
    saveLocal();
    pintarCarrito ();
};

const carritoCounter = () => {
    cantidadCarrito.style.display = "block";

    const carritoLength = carrito.length;
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));

    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};

carritoCounter();