(function() {

    const botaoSubmit = $('#submit')


    botaoSubmit.click(function (e) {
        e.preventDefault()

        let genero       = $('#genero').val()
        let escolaridade = $('#nivel-escolaridade').val()
        let area         = $('#area').val()

        var usuario = {genero: genero, escolaridade: escolaridade, area: area}

        localStorage.setItem('usuario', JSON.stringify(usuario))

        window.location = '/untitled1/src/index.html'

    })

})()