(function(){

    const botaoLoginGoogle = $('#login-google')
    var   database         = firebase.database()
    const botaoEnviar      = $('#enviar')
    let   userRef          = database.ref('users/')
    let   participantesRef = database.ref('participantes/')
    const botaoDica        = $('#dica')
    const botaoEnquete     = $('#enquete')

    $(document).ready(function () {
        console.log("FUNCIONAAA")
    })

    botaoLoginGoogle.click(function(e) {
        e.preventDefault()
        console.log("1")
        var googleAuthProvider = new firebase.auth.GoogleAuthProvider

        return firebase.auth().signInWithPopup(googleAuthProvider)
            .then( function(data) {
                console.log("2")
                console.log(data)
                var idToken = data.credential.idToken
                var usuarioAux = {nome: data.user.displayName, usuario: data.user.displayName, senha:"",
                    email: data.user.email}
                console.log(usuarioAux)

                // mDatabase.ref.child('users').setValue(idToken)



                localStorage.setItem('usuario', JSON.stringify(usuarioAux))


                // userRef.limitToFirst(5).on('value', function(data) {
                //     console.log(data.child("-Lmuj7p5zlsHIvrxZVc7").child('email').val())
                //     data.forEach(function (childSnapshot) {
                //       console.log(childSnapshot.key)
                //       console.log(childSnapshot.child("email").val())
                //     })
                // })

                userRef.orderByChild('email').equalTo(usuarioAux.email).once('value', snapshot => {
                    if(snapshot.exists()){
                    }else{
                        userRef.push({
                            username: usuarioAux.usuario,
                            email: usuarioAux.email
                        })
                    }
                })
            })
            .catch( function(error) {
                console.log(error)
            })

    })

    function verifyParticipants() {
        participantesRef.once('value', function(snapshot) {
            snapshot.forEach(function (childSnapShot){
                if(childSnapShot.child('email').val() == user.email){
                    id = childSnapShot.key
                    database.ref('participantes/' + id).remove()
                }
            })
        })
    }

    botaoEnviar.click(function(e) {
        e.preventDefault()
        let id = 0
        let qntdBolas = $('#quantidadeBolas').val()
        let user = getUser()

        // userRef.orderByChild('email').equalTo(JSON.parse(localStorage.getItem('usuario')).email).set({
        //     quantidadeBolas: qntdBolas
        // })

        // verifyParticipants()

        // firebase.database().ref('participantes/').once('value').then(function(snapshot){
        //     snapshot.forEach(function(childSnapShot) {
        //         if(childSnapShot.child('email').val() == user.email){
        //             id = childSnapShot.key
        //         }
        //     })
        // })

        participantesRef.orderByChild('email').equalTo(user.email).once('value', snapshot => {
            if(snapshot.exists()){
                console.log("E só dps passa por aqui")
                snapshot.forEach(function(childSnapShot) {
                            if(childSnapShot.child('email').val() == user.email){
                                id = childSnapShot.key
                                console.log(id)
                                database.ref('participantes/' + id).remove()
                            }
                        })
            }else{
            }
            console.log("Passa por aqui")
            participantesRef.push({
                username : user.usuario,
                email    : user.email,
                nota     : qntdBolas
            })
        })


        // console.log(id)
        // database.ref('participantes/' + id).remove()



        // userRef.on('value', function(data) {
        //     // console.log(data.child("-Lmuj7p5zlsHIvrxZVc7").child('email').val())
        //     data.forEach(function (childSnapshot) {
        //
        //         if(childSnapshot.child("email").val() == user.email){
        //             id = childSnapshot.key
        //
        //             database.ref('users/' + id).update({
        //                 quantidadeBolas: qntdBolas
        //             })
        //
        //         }
        //     })
        // })


    })



    function getUser() {
        return JSON.parse(localStorage.getItem('usuario'))
    }

    botaoEnquete.click(function (e) {
        e.preventDefault()
        console.log("Entra")
        let user = getUser()
        participantesRef.orderByChild('email').equalTo(user.email).on('value', function(snapshot) {
            if(snapshot.exists()) {
                window.location = '/untitled1/src/final.html'
            }else {
                window.location = '/untitled1/src/enquete.html'
            }
        })
    })



    // botaoDica.click(function() {
    //     int random
    //
    //     if(random == 0) {
    //
    //     }
    // })






})()