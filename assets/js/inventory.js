    // Declare Index Table & edit index
    let carrito = [];
    let indiceEdicion = -1;

    //

    // Modals & Modal Triggers

    const deleteModal = document.getElementById('deleteModal');
    const editModal = document.getElementById('editModal');
    const observeModal = document.getElementById('observeModal');

    // Index Table Functions

    function agregarProducto() {
      const referencia = document.getElementById('referencia').value;
      const cantidad = document.getElementById('cantidad').value;
      const precio = document.getElementById('precio').value;
      const talla = document.getElementById('talla').value;

      const producto = { 
        referencia, 
        cantidad: parseInt(cantidad), 
        precio: parseFloat(precio), 
        talla,
        observacion: ''
      };
      carrito.push(producto);
      actualizarCarrito();
      limpiarFormulario();
    }

    function limpiarFormulario() {
      document.getElementById('referencia').value = '';
      document.getElementById('cantidad').value = '';
      document.getElementById('precio').value = '';
      document.getElementById('talla').value = 'S';
    }

    function actualizarCarrito() {
      const tbody = document.getElementById('carrito');
      tbody.innerHTML = '';

      let total = 0;
      carrito.forEach((producto, index) => {
        const subtotal = producto.cantidad * producto.precio;
        total += subtotal;

        const fila = `
          <tr>
            <td>${producto.referencia}</td>
            <td>${producto.cantidad}</td>
            <td>${producto.precio}</td>
            <td>${producto.talla}</td>
            <td>${subtotal.toFixed(2)}</td>
            <td>
              <button class="btn-action btn-delete" data-bs-toggle="modal" data-bs-placement="top" data-bs-title="Eliminar" data-bs-target="#deleteModal">🗑️</button>
              <button class="btn-action btn-edit" data-bs-toggle="modal" data-bs-target="#editModal" onclick="editarProducto(${index})">✏️</button>
              <button class="btn-action btn-observe" data-bs-toggle="modal" data-bs-target="#observeModal" onclick="observarProducto(${index})">📝</button>
            </td>
          </tr>
        `;
        tbody.innerHTML += fila;
      });

      document.getElementById('total').innerText = total.toFixed(2);
    }


    function eliminar(index){
      carrito.splice(index, 1);
      actualizarCarrito();
    }

    function editarProducto(index) {
      indiceEdicion = index;
      const producto = carrito[index];
      
      document.getElementById('editReferencia').value = producto.referencia;
      document.getElementById('editCantidad').value = producto.cantidad;
      document.getElementById('editPrecio').value = producto.precio;
      document.getElementById('editTalla').value = producto.talla;
    }

    function cerrarModal() {
      indiceEdicion = -1;
    }

    function guardarEdicion() {
      if(indiceEdicion === -1) return;
      
      carrito[indiceEdicion] = {
        referencia: document.getElementById('editReferencia').value,
        cantidad: parseInt(document.getElementById('editCantidad').value),
        precio: parseFloat(document.getElementById('editPrecio').value),
        talla: document.getElementById('editTalla').value,
        observacion: carrito[indiceEdicion].observacion || ''
      };
      
      actualizarCarrito();
    }

    function observarProducto(index) {
      indiceEdicion = index;
      document.getElementById('observaciones').value = carrito[index].observacion || '';
    }

    function guardarObservacion() {
      if(indiceEdicion === -1) return;
      
      carrito[indiceEdicion].observacion = document.getElementById('observaciones').value;
      cerrarModal();
    }