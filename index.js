const titulo1 = document.getElementById('titulo1')
const div = document.getElementById('mueblesOpc')
const mensCompra = document.getElementById('mensajeCompra')
const divProductos = document.getElementById('divProductos')
const infoUsuario = {}

const productosArray = []

class mueble {
  constructor(id, name, price, description) {
    this.id = id
    this.name = name
    this.price = price
    this.description = description
  }
}

const mesa1 = new mueble(1, 'mesa khal', 3600, 'Mesa colo cafe claro acabado mate, con 2 patas en la parte de enmedio')
productosArray.push(mesa1)
const mesa2 = new mueble(2, 'mesa aerys', 4950, 'Mesa color beige acabado brilloso, con 4 patas en cada esquina')
productosArray.push(mesa2)
const mesa3 = new mueble(3, 'mesa robert', 5500, 'Mesa color gris ozford, con vidrio, cuenta con 4 patas en cada esquina')
productosArray.push(mesa3)
const mesa4 = new mueble(4, 'mesa danerys', 6100, 'Mesa color cafe obscuro con vidrio, cuenta con 2 patas en la parte de enmedio')
productosArray.push(mesa4)

const silla1 = new mueble(5, 'silla zoro', 1600, 'Silla blanca acabado brilloso, respaldo con acabado tejido')
productosArray.push(silla1)
const silla2 = new mueble(6, 'silla luffy', 1900, 'Silla cafe obscuro, respaldo uniforme')
productosArray.push(silla2)
const silla3 = new mueble(7, 'silla sanji', 1070, 'Silla cafe claro acabado mate, con resplado de tela')
productosArray.push(silla3)
const silla4 = new mueble(8, 'silla robin', 2100, 'Silla beige, con respaldo y asiento acolchonados')
productosArray.push(silla4)


const carrito = []

let seguirComprando = true
let totalCompra = 0
let decision = 0 
let totalProductos = 0
let i = 0 
let mostrar = 1


main()

function main ( ){
    console.log (localStorage)
    mostrarMuebles() 
    elegirMueble()
    totalProductos = 0
    totalCompra = 0
    carritoStorage()
    
}



function mostrarMuebles(){
    
    const parrafoNuevo = document.createElement ('p')
    parrafoNuevo.innerText ='  Por el momento estos son los muebles que ofrecemos:  ' 
    div.append(parrafoNuevo)

    // for (i=0; i<productosArray.length;i++){
    //     let parrafoOpc = document.createElement ('p')
    //     parrafoOpc.innerText =` ${productosArray[i].id}     ${productosArray[i].name}     ${productosArray[i].price}`
    //     parrafoOpc.setAttribute('class',`parraOpc${productosArray[i].id}`)
    //     div.append(parrafoOpc)
    // }

    productosArray.forEach((producto) => {
        divProductos.innerHTML += `
        <div id="${producto.id}" class="card cardProducto card w-25">
        <div class="card-body">
        <h5 class="card-title">${producto.name}</h5>
        <p class="card-text card-cdescription text-center"> ${producto.description} </p>
        <p class="card-text card-cprice">$${producto.price}</p>
        </div>
        </div>
        
        `
    })
}
// `<div class="card" style="width: 18rem;">
//   <img src="..." class="card-img-top" alt="...">
//   <div class="card-${productosArray[i].id}">
//     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//   </div>
// </div>`


function elegirMueble(){
    const listaMueble = document.getElementById('listaMueble')
    productosArray.forEach(elemento =>{
        let opcionMueble = document.createElement('option')
        opcionMueble.innerText =` ${elemento.id} :   ${elemento.name} `
        opcionMueble.setAttribute('class',`opcionMueble${elemento.id}`)
        listaMueble.append(opcionMueble)
    } )
}


const botonAgregar = document.getElementById('botonAgregar')
botonAgregar.onclick =() => {
    const indexMueble = listaMueble.selectedIndex
    //console.log(muebleSeleccionado)
    carrito.push(productosArray[indexMueble])
    totalCompra=totalCompra+productosArray[indexMueble].price
    totalProductos=totalProductos+1
    //console.log(carrito , totalCompra , totalProductos)
}


const botonQuitar = document.getElementById('botonQuitar')
botonQuitar.onclick = () => {
    
    const pError = document.createElement ('p')
    if (totalProductos === 0){
        
        pError.innerText ='  Por el momento no tienes algun mueble seleccionado  ' 
        mensCompra.append(pError)
        //console.log(carrito , totalCompra , totalProductos)
    }else {
        const indexMueble = listaMueble.selectedIndex
        const indexCarrito = carrito.indexOf(productosArray[indexMueble])

        if (indexCarrito === -1){
            pError.innerText ='  Este mueble, no se encuentra en tu carrito  ' 
            mensCompra.append(pError) 
         //   console.log(carrito , totalCompra , totalProductos) 
        } else {
            totalCompra=totalCompra-carrito[indexCarrito].price
            totalProductos=totalProductos-1
            carrito.splice(indexCarrito,1)
            
          //  console.log(carrito , totalCompra , totalProductos)

        }
    }
}

const botonMostrar = document.getElementById('botonMostrar')
botonMostrar.onclick = () => {
        carrito.forEach(elemento =>{
            const pCarrito = document.createElement('p')
            pCarrito.innerText =` ${elemento.id} :   ${elemento.name}        $ ${elemento.price}`
            pCarrito.setAttribute('class',`opcionMueble${elemento.id}`)
            mensCompra.append(pCarrito)
        } )

        const pCarritoD1 = document.createElement('p')
        pCarritoD1.innerText =` ................. `
        mensCompra.append(pCarritoD1)

        const pTotal = document.getElementById('pTotal')
        const pCarritoT = document.createElement('p')
        pCarritoT.innerText =` Cantidad de porductos : ${totalProductos}   TOTAL : $ ${totalCompra} `
        pTotal.append(pCarritoT)
        
        const pCarritoD2 = document.createElement('p')
        pCarritoD2.innerText =` ................. `
        pTotal.append(pCarritoD2)
    
}

const botonGuardar = document.getElementById('botonGuardar')
botonGuardar.onclick =() => {

    const carritoJSON = JSON.stringify(carrito)
    localStorage.setItem('carritoJSON',carritoJSON)
    console.log (carritoJSON)


}

const botonBorrar = document.getElementById('botonBorrar')
botonBorrar.onclick = () => {
    // const carritoJSON = JSON.stringify(carrito)
    // localStorage.setItem('carritoJSON',carritoJSON)
    localStorage.clear()
    console.log (localStorage)
    let indCar = carrito.length
    carrito.splice(0,indCar)
    
    totalCompra=0
    totalProductos=0
    
}

function carritoStorage (){
    
    const objStorageJSoN = JSON.parse(localStorage.getItem ('carritoJSON'))
    if(objStorageJSoN.id !== ""){
        objStorageJSoN.forEach(elemento =>{
            carrito.push(elemento)
            totalCompra=totalCompra+objStorageJSoN.price
            totalProductos=totalProductos+1
        })
    }
}
