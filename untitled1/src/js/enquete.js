(function() {
    const database              = firebase.database()
    const participantesRef      = database.ref('participantes/')
    const botaoEnviar           = $('#enviar')
    let random                  = 0

    $(document).ready(function () {
        // alert("DICA!!!")
        verifyAccount()
        // case1()
    })
    
    function verifyAccount() {
        let user = getUser()
        participantesRef.orderByChild('email').equalTo(user.email).on('value', function(snapshot) {
            if(snapshot.exists()) {
                window.location = '/untitled1/src/final.html'
            }else{
                dicaRandomica()
            }
        })
    }
    
    function dicaRandomica() {
        random = Math.floor(Math.random() * (4 + 1)) + 1
        console.log(random)
        switch(random) {
            case 1 :
                case1();
                break;
            case 2 :
                case2();
                break;
            case 3 :
                case3();
                break;
            case 4 :
                case4();
                break;
            case 5 :
                alert("SEM DICA!!!");
                break;
        }
    }

    function case1() {
        participantesRef.orderByChild('tipo').equalTo(1).limitToLast(1).on('value', function(snapshot) {
           snapshot.forEach(function (childSnapShot) {

               alert('email: ' + childSnapShot.child('email').val() + '\r\n' +
                     'chute: ' + childSnapShot.child('nota').val())
           })
        })
    }

    function case2() {
        participantesRef.orderByChild('tipo').equalTo(2).limitToLast(4).on('value', function(snapshot) {
            snapshot.forEach(function (childSnapShot) { 
                alert('DICA: Mostrando chute dos últimos 4' +  '\r\n' +
                      'email: ' + childSnapShot.child('email').val() + '\r\n' +
                      'chute: ' + childSnapShot.child('nota').val())
            })
        })
    }

    function case3() {
        participantesRef.orderByChild('tipo').equalTo(3).on('value', function(snapshot) {
            snapshot.forEach(function (childSnapShot) {
                alert('DICA: Mostrando chute de todos' +  '\r\n' +
                    'email: ' + childSnapShot.child('email').val() + '\r\n' +
                    'chute: ' + childSnapShot.child('nota').val())
            })
        })
    }

    function case4() {
        let total = 0
        let media = 0
        let qntd  = 0
        participantesRef.orderByChild('tipo').equalTo(4).on('value', function(snapshot) {
            if(snapshot.exists()){
                snapshot.forEach(function (childSnapShot) {
                    total += childSnapShot.child('nota').val()
                    qntd  += 1
                })
                media = total/qntd
                alert('DICA: Média dos chutes é ' + media)
            }
        })
    }

    botaoEnviar.click(function (e) {
        e.preventDefault()
        let user      = getUser()
        let qntdBolas = $('#quantidadeBolas').val()
        participantesRef.push({
            username : user.usuario,
            email    : user.email,
            nota     : qntdBolas,
            tipo     : random
        })

    })

    function getUser() {
        return JSON.parse(localStorage.getItem('usuario'))
    }


})()