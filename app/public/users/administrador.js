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
            tdDescripcion.textContent = dato.descripcion
            tr.appendChild(tdDescripcion)
            
            
            const tdOpciones = document.createElement('td')

            
            const btnActivar = document.createElement('button')
            btnActivar.textContent = 'Activar'
            btnActivar.style.width = '100px'
            btnActivar.disabled = dato.activo === 1
            btnActivar.addEventListener('click', async () => {
                await activarReclamoTipo(dato.idReclamoTipo, dato.descripcion, tr)
            })
            tdOpciones.appendChild(btnActivar)
            
            const btnDesactivar = document.createElement('button')
            btnDesactivar.textContent = 'Desactivar'
            btnDesactivar.style.width = '100px'
            btnDesactivar.disabled = dato.activo === 0
            btnDesactivar.addEventListener('click', async () => {
                await desactivarReclamoTipo(dato.idReclamoTipo, dato.descripcion, tr)
            })
            tdOpciones.appendChild(btnDesactivar)
            
            const btnModificar = document.createElement('button')
            btnModificar.textContent = 'Modificar'
            btnModificar.style.width = '200px'
            btnModificar.addEventListener('click', async () => {
                await modificarReclamoTipo(dato.idReclamoTipo, tr)
            })
            tdOpciones.appendChild(btnModificar)

            const btnAceptar = document.createElement('button')
            btnAceptar.textContent = 'Aceptar'
            btnAceptar.hidden = true
            btnAceptar.style.width = '100px'
            btnAceptar.addEventListener('click', async () => {
                await mostrarBotonModificar(tr)
            })
            tdOpciones.appendChild(btnAceptar)

            const btnCancelar = document.createElement('button')
            btnCancelar.textContent = 'Cancelar'
            btnCancelar.hidden = true
            btnCancelar.style.width = '100px'
            btnCancelar.addEventListener('click', async () => {
                await mostrarBotonModificar(tr)
            })
            tdOpciones.appendChild(btnCancelar)

            tr.appendChild(tdOpciones)
            tbody.appendChild(tr);
        })
    }
}

obtenerTiposReclamos()

const modificarReclamoTipo = (asd, fila) => {
    fila.children[1].children[2].hidden = true
    fila.children[1].children[3].hidden = false
    fila.children[1].children[4].hidden = false
    console.log("se apretó modificarTipoReclamo")
}

const mostrarBotonModificar = (fila) => {
    fila.children[1].children[2].hidden = false
    fila.children[1].children[3].hidden = true
    fila.children[1].children[4].hidden = true
}

const activarReclamoTipo = async (idReclamoTipo, desc, fila) => {
    try {
        const response = await fetch(`http://localhost:3000/api/administrador/reclamos/tipos/activar/${idReclamoTipo}`, {
            method: 'PATCH',
            headers:  {'Content-Type' : 'application/json'} ,
            body: JSON.stringify({
                descripcion: desc,
                activo: 1
            })
            })
        if (!response) {
            console.log('Error al activar el reclamoTipo')
        } else {
            console.log(`ReclamoTipo ${idReclamoTipo} activado correctamente`)
            fila.children[1].children[0].disabled = true
            fila.children[1].children[1].disabled = false

        }
    } catch (error){
        console.log('Error al activar el reclamoTipo: ', error)
    }
}

const desactivarReclamoTipo = async (idReclamoTipo, desc, fila) => {
    try {
        const response = await fetch(`http://localhost:3000/api/administrador/reclamos/tipos/desactivar/${idReclamoTipo}`, {
            method: 'PATCH',
            headers:  {'Content-Type' : 'application/json'} ,
            body: JSON.stringify({
                descripcion: desc,
                activo: 0
            })
            })
        if (!response) {
            console.log('Error al desactivar el reclamoTipo')
        } else {
            console.log(`ReclamoTipo ${idReclamoTipo} desactivado correctamente`)
            fila.children[1].children[0].disabled = false
            fila.children[1].children[1].disabled = true
        }
    } catch (error){
        console.log('Error al desactivar el reclamoTipo: ', error)
    }
}










// const eliminarTipoReclamo = async (idReclamoTipo, reclamo) => {  // <-----
//     try {
//         const response = await fetch(`http://localhost:3000/api/cliente/reclamo/${idReclamo}`, {
//             method: 'PATCH',
//             headers:  {'Content-Type' : 'application/json'} ,
//             body: JSON.stringify({
//                 activo: 0
//             })
//             })
//         if (!response) {
//             console.log('Error al cancelar el reclamo')
//         } else {
//             alert(`Reclamo ${idReclamo} cancelado correctamente`)
            
//             reclamo.innerHTML = ''
//         }
//     } catch (error){
//         console.log('Error al cancelar el reclamo: ', error)
//     }
// }