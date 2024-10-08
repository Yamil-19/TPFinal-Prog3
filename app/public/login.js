document.getElementById('login-form').addEventListener("submit", async (e) => {
    e.preventDefault()
    try {
        const response = await fetch("http://localhost:3000/api/login", {
            method: 'POST',
            headers:  {'Content-Type' : 'application/json'} ,
            body: JSON.stringify({
                nombre: e.target.nombre.value,
                contrasenia: e.target.contraseña.value})
        })
        if (!response.ok) {
            console.log('Errooor')
        } else {
            const resultado = await response.json()
            window.location.href = resultado.redirect;
        }
    } catch (error) {
        console.log(`El error es: ${error}`)
    }
})