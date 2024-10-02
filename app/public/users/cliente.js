// const tr = document.createElement('tr')
// const table = document.getElementById('datos')
// const td = document.createElement('td')
// const listaDatos = [...tr]
document.getElementById('reclamoCliente-form').addEventListener("submit", async (e) => {
    e.preventDefault()
    try {
        const response = await fetch("http://localhost:3000/api/cliente/reclamo", {
            method: 'POST',
            headers:  {'Content-Type' : 'application/json'} ,
            body: JSON.stringify({
                asunto: e.target.asunto.value,
                descripcion: e.target.descripcion.value,
                activo: 1
            })
        })
        if (!response.ok) {
            console.log('Errooor')
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

            tdCancelar.appendChild(btnCancelar)
            tr.appendChild(tdAsunto)
            tr.appendChild(tdDescripcion)
            tr.appendChild(tdFechaCreado)
            tr.appendChild(btnCancelar)
            tbody.appendChild(tr);
        })
        
    }
}

obtenerReclamo()
