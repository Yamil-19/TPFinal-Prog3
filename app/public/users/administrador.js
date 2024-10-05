console.log('Esta es la seccion del administrador')

document.getElementById('Cerrar-Sesion').addEventListener("click", () => {
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    alert("Cookie eliminada");
    document.location.href = '/api/';
})

const obtenerTiposReclamos = async () => {
    const response = await fetch("http://localhost:3000/api/administrador/reclamos/tipos")
    if (!response.ok) {
        console.log('Errooor')
    } else {
        const data = await response.json()
        const tbody = document.querySelector('#tabla_reclamos')
        tbody.innerHTML = ''

        data.forEach((dato) => {
            const tr = document.createElement('tr')
            const tdDescripcion = document.createElement('td')
            const tdModificar = document.createElement('td')
            const btnModificar = document.createElement('button')
            const tdEliminar = document.createElement('td')
            const btnEliminar = document.createElement('button')
            
            tdDescripcion.textContent = dato.descripcion
            btnModificar.textContent = 'Modificar'
            btnModificar.className = 'boton_cancelar'
            btnEliminar.textContent = 'Eliminar'
            btnEliminar.className = 'boton_cancelar'
            
            btnModificar.addEventListener('click', async () => {
                await modificarTipoReclamo(dato.idTipoReclamo, tr)
            })
            btnEliminar.addEventListener('click', async () => {
                await eliminarTipoReclamo(dato.idTipoReclamo, tr)
            })

            tdModificar.appendChild(btnModificar)
            tdEliminar.appendChild(btnEliminar)
            tr.appendChild(tdDescripcion)
            tr.appendChild(tdModificar)
            tr.appendChild(tdEliminar)
            tbody.appendChild(tr);
        })
    }
}

const modificarTipoReclamo = () => {
    
}
const eliminarTipoReclamo = () => {

}