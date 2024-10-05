
document.getElementById('reclamoCliente-form').addEventListener("submit", async (e) => {
    // console.log(e.target.tipo.selectedIndex + 1)
    e.preventDefault()
    try {
        const response = await fetch("http://localhost:3000/api/cliente/reclamo", {
            method: 'POST',
            headers:  {'Content-Type' : 'application/json'} ,
            body: JSON.stringify({
                idTipo: e.target.tipo.selectedIndex + 1,
                asunto: e.target.asunto.value,
                descripcion: e.target.descripcion.value,
                activo: 1
            })
        })
        if (!response.ok) {
            console.log('Errooor')
        } else {
            obtenerReclamo()
        }
        
    } catch (error) {
        console.log(`El error es: ${error}`)
    }
})

document.getElementById('cerrarSesion').addEventListener("click", () => {
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    alert("Cookie eliminada");
    document.location.href = '/api/';
})


const obtenerReclamo = async () => {
    const response = await fetch("http://localhost:3000/api/cliente/reclamo")
    if (!response.ok) {
        console.log('Errooor')
    } else {
        const data = await response.json()
        const tbody = document.querySelector('#tabla_datos')
        tbody.innerHTML = ''

        data.forEach((dato) => {
            const tr = document.createElement('tr')
            const tdAsunto = document.createElement('td')
            const tdDescripcion = document.createElement('td')
            const tdFechaCreado = document.createElement('td')
            const tdCancelar = document.createElement('td')
            const btnCancelar = document.createElement('button')
            
            tdAsunto.textContent = dato.asunto
            tdDescripcion.textContent = dato.descripcion
            tdFechaCreado.textContent = dato.fechaCreado
            btnCancelar.textContent = 'Cancelar'
            
            btnCancelar.className = 'boton_cancelar'
            
            btnCancelar.addEventListener('click', async () => {
                await cancelarReclamo(dato.idReclamoEstado, tr)
            })

            tdCancelar.appendChild(btnCancelar)
            tr.appendChild(tdAsunto)
            tr.appendChild(tdDescripcion)
            tr.appendChild(tdFechaCreado)
            tr.appendChild(btnCancelar)
            tbody.appendChild(tr);
        })
    }
}
const cancelarReclamo = async (idReclamo, reclamo) => {
    try {
        const response = await fetch(`http://localhost:3000/api/cliente/reclamo/${idReclamo}`, {
            method: 'PATCH',
            headers:  {'Content-Type' : 'application/json'} ,
            body: JSON.stringify({
                descripcion: 'Cancelado',
                activo: 0
            })
            })
        if (!response) {
            console.log('Error al cancelar el reclamo')
        } else {
            alert(`Reclamo ${idReclamo} cancelado correctamente`)
            
            reclamo.innerHTML = ''
        }
    } catch (error){
        console.log('Error al cancelar el reclamo: ', error)
    }
    
}


obtenerReclamo()

document.getElementById("actualizar-perfil").addEventListener("submit", async (e) => {
    e.preventDefault()
    console.log('esta enviando los datos')
    try {
        const response = await fetch("http://localhost:3000/api/cliente/perfil/actualizar", {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                nombre: e.target.nombre.value,
                apellido: e.target.apellido.value,
                correoElectronico: e.target.correoElectronico.value,
                contraseña: e.target.contraseña.value
            })
        })
        if (!response.ok) {
            console.log('Errooor')
        } else {
            document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            alert("Cookie eliminada");
            document.location.href = '/api/';
        }
    } catch (error) {
        console.log(`El error es: ${error}`)
    }
})