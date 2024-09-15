import React, { useState } from 'react';
import ProductCard from './Components/ProductCard'

const productos = [
  { id: 1, nombre: 'Empanada', precio: 1.5, imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpt7lyE520hle8CnjTp2D6UL921CJgFrN5sA&s' },
  { id: 2, nombre: 'Pizza', precio: 3, imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTI2hdQeNVlyu20ReOpJcNwdgW0ER5hwxnauQ&s' },
  { id: 3, nombre: 'Hamburguesa', precio: 6, imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYV2CdnEGHMIqS4Glfr_L6Rb191bVmUbfjrA&s' },
  { id: 4, nombre: 'Salchipapa', precio: 6.5, imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJW6q1VA15_BuQ1sFF6_JFzB67ap6ZhKpH1Q&s' }
];

const TiendaVirtual = () => {
  const [carrito, setCarrito] = useState([]);
  const [buscar, setBuscar] = useState('');

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const vaciarItem = (idProducto) => {
    const index = carrito.findIndex((item)=>item.id===idProducto);
    if(index !== -1){
      const newCarrito = [...carrito];
      newCarrito.splice(index, 1);
      setCarrito(newCarrito);
    }
  };

  const filter = productos.filter((producto)=> producto.nombre.toLowerCase().includes(buscar.toLowerCase()))

  return (
    <div className="container">
      <h1>Mi Tienda Virtual</h1>

      <input type="text" onChange={(e)=>setBuscar(e.target.value)}/>
      
      <div className="productos-grid">
        {filter.length>0? filter.map((producto) => (
          <ProductCard 
            key={producto.id} 
            producto={producto} 
            onAgregarAlCarrito={agregarAlCarrito}
          />
        )):(<p>No se encuentra registro</p>)}
      </div>
      
      <div className="carrito">
        <h2>Carrito</h2>
        <div className="boton-agregar">
          <p>{carrito.length} artículos</p>
          <button onClick={() => vaciarCarrito()}>Vaciar carrito</button>
        </div>
        <ul className="mt-2">
          {carrito.map((item, index) => (
            <div key={index} className="carrito-item ">
              <img 
                src={item.imagen} 
                alt={item.nombre} 
                               
              />
              <span>{item.nombre} - ${item.precio}</span>
              <button onClick={() => vaciarItem(item.id)}>Eliminar item</button>
            </div>
          ))}
        </ul>
        <p className="carrito-total">
          Total: ${carrito.reduce((sum, item) => sum + item.precio, 0)}
        </p>
      </div>
    </div>
  );
};

export default TiendaVirtual;