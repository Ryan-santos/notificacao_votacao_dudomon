const som = new Audio('sons/notifica.mp3');
let lugarPopUp = document.querySelector('#pop-up')
let lugarIcone = document.querySelector('#pop-up #icone')
let lugarConteudo = document.querySelector('#pop-up #conteudo')

async function fetchDados() {
    try {
        const response = await fetch('https://dados-site-dudomon.herokuapp.com/get_votacao_resultado')
        const dadosResultados = await response.json()

        if(dadosResultados[0] == 1 && verificaPopUp()){
            lugarPopUp.classList.add('votacao-open')

            let duracaoAt = dadosResultados[1] /// dutacao atual que foi pega do sever
            let linha = dadosResultados[2]

            lugarIcone.innerHTML=`<i class="fas fa-vote-yea"></i>`

            lugarConteudo.innerHTML=`
            <div class="title-votacoa"> 
                <h1>Votação iniciada!</h1>
                <div class="info-votacao">
                    <div><img src="icones-lenes/${linha}.svg">${linha}</div>
                    <div><i class="fas fa-clock"></i><span id="timer">--:--</span></div>
                </div>
            </div>
            <p>Vote no campeão em que você quer ver o Dudomon jogar na proxima partida!. <i class="fas fa-arrow-down"></i></p>
            <div class="container-atalhos"><div id="comando">!votar</div><div id="link">https://dudomon.epizy.com/votacao/</div></div>`
                        
            startTimer(duracaoAt)

            aviso(opc = true)

        }else if(dadosResultados[0] == 2 && verificaPopUp()){
            lugarPopUp.classList.add('votacao-res')

            let personagen = dadosResultados[3]

            lugarIcone.innerHTML=`<i class="fas fa-vote-yea"></i>`

            lugarConteudo.innerHTML=`
            <h1>Vencedor da votação</h1>
            <div class="res-votaco">
                <div id="vencedor">
                    <span><i class="fas fa-crown"></i></span>
                    <img src="${personagen[1]}">
                    <div class="texto">
                        <h2>${personagen[0]}</h2>
                        <p>${personagen[2]} dos votos</p>
                    </div>
                </div>
            </div>
            <p>Fiquem ligados para a proxima votação.</p>`

            aviso(opc = true)

            setTimeout(function() {
                lugarPopUp.classList.remove('votacao-res')
                aviso(opc = false)
            }, 60000)
        }
    } catch(error) {
        console.log(error)
    }
}

function startTimer(duracaoAt) {
    let timer = duracaoAt, minutes, seconds;
    let Interval = setInterval(rodaTimer, 1000);

    function rodaTimer() {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        
        if (--timer < 0) {
            clearInterval(Interval)
            setTimeout(function() {
                aviso(opc = false)
                setTimeout(function() {
                    lugarPopUp.classList.remove('votacao-open')
                    fetchDados()
                }, 1500)
            }, 1000)
        } 

        document.querySelector('#timer').innerText = `${minutes}:${seconds}`;
    }
}

let numAnucio = 0
function anucios() {
    if(verificaPopUp()){
        switch (numAnucio) {
            case 0:
                lugarIcone.innerHTML=`<img src="imgens/logo_gadoscup.png">`
    
                lugarConteudo.innerHTML=`
                <h1>GADO'S CUP</h1>
                <p>Campeonato amador organizando pelo dudomon e mods, com premiação em dinheiro, todo o Valor das inscrições será convertido em premiação. Venha participar!</p>
                <div class="container-atalhos"><div id="comando">!gadoscup</div><div id="link">https://dudomon.epizy.com/gadosCup</div></div>`
    
                aviso(opc = true)
    
                tiraAnuncio()
                break
            case 1:
                lugarIcone.innerHTML=`<i class="fas fa-users"></i>`
    
                lugarConteudo.innerHTML=`
                <h1>SEM TIME PRA GADO'S CUP ?</h1>
                <p>Você está procurando jogador para completar ou montar seu time na gado's cup ? Veja nossa lista de jogadores que estão a procura de um time.</p>
                <div class="container-atalhos"><div id="comando">!fagadoscup</div><div id="link">https://dudomon.epizy.com/semtime</div></div>`
    
                aviso(opc = true)
                
                tiraAnuncio()
                break
            case 2:
                lugarIcone.innerHTML=`<img src="imgens/rifa.png">`
    
                lugarConteudo.innerHTML=`
                <h1>RIFA</h1>
                <p>Comprando a rifa, com o valor de 25 reais vocé tem grandes chances de ganhar um Legion 2 Pro, Smarphone gamer muito potente que roda tudo da play store com folga.</p>
                <div class="container-atalhos"><div id="comando">!rifa</div><div id="link">https://rifei.co/rifei-me-rifadudomon</div></div>`
    
                aviso(opc = true)
                
                tiraAnuncio()
                break
            case 3: 
                lugarIcone.innerHTML=`<i class="fas fa-music"></i>`
    
                lugarConteudo.innerHTML=`
                <h1>JUKEBOX</h1>
                <p>Agora vocês podem pedir músicas para ouvirem enquanto curtem a live, peça já a sua e só 2 conto!</p>
                <div class="container-atalhos"><div id="comando">!jukes</div><div id="link">http://dudomon.epizy.com/musica</div></div>`
    
                aviso(opc = true)
                
                tiraAnuncio()
                break
            case 4: 
                lugarIcone.innerHTML=`<i class="fas fa-bullhorn"></i>`
    
                lugarConteudo.innerHTML=`
                <div></div>
                <h1 style="font-size: 3rem;"><i class="fas fa-angle-double-right"></i> SEU ANÚNCIO AQUI <i class="fas fa-angle-double-left"></i></h1>
                <div></div>`
    
                aviso(opc = true)
                
                tiraAnuncio()
                break
            case 5: 
                lugarIcone.innerHTML=`<img src="imgens/site.png">`
    
                lugarConteudo.innerHTML=`
                <h1>Já acessaram nosso site ?</h1>
                <p>Acesse o nosso site para ficar por dentro de tudo que rola nas lives e muito mais, desenvolvido pelo nosso querido mod <br> Ryan ( xSuperPerfect ) Santos.</p>
                <div class="container-atalhos"><div id="comando">!site</div><div id="link">https://dudomon.epizy.com</div></div>`
    
                aviso(opc = true)
                
                tiraAnuncio()
                break
            case 6: 
                lugarIcone.innerHTML=`<i class="fas fa-store"></i>`
    
                lugarConteudo.innerHTML=`
                <h1>Já acessaram nossa lojinha ?</h1>
                <p>Acesse nossa lojinha e troque seus pontos obtidos só por assistir a live por: mensagens para ser lidas em live, sustos, áudios engraçados, e muito mais!</p>
                <div class="container-atalhos"><div id="comando">!loja</div><div id="link">https://StreamElements.com/dudomon/store</div></div>`
    
                aviso(opc = true)
                
                tiraAnuncio()
                break
            case 7: 
                lugarIcone.innerHTML=`<i class="fas fa-star"></i>`
    
                lugarConteudo.innerHTML=`
                <h1>Ajude a bater a meta de subs!</h1>
                <p>Se batermos a meta de subs vai rolar um sorteio de gift card na live onde apenas os subs podem participar, afinal sem eles não tem sorteio! Então escorrega esse sub ai.</p>
                <div class="container-atalhos"><div id="comando">!meta</div><div id="comando">!prime</div></div>`
    
                aviso(opc = true)
                
                tiraAnuncio()
                break
            case 8: 
                lugarIcone.innerHTML=`<i class="fas fa-bullhorn"></i>`
    
                lugarConteudo.innerHTML=`
                <div></div>
                <h1 style="font-size: 3rem;"><i class="fas fa-angle-double-right"></i> SEU ANÚNCIO AQUI <i class="fas fa-angle-double-left"></i></h1>
                <div></div>`
    
                aviso(opc = true)
                
                tiraAnuncio()
                break
        }
    }

    function tiraAnuncio() {
        setTimeout(function() {
            if(verificaPopUp()){
               aviso(opc = false) 
            }
          
            if(numAnucio == 8){
                numAnucio = 0
            }else{
                numAnucio++ 
            }
        }, 60000) // duracao do anuncio 60000 = 1min
    }
}

function verificaPopUp() {
    if((!!(lugarPopUp.className.split(' ').indexOf('votacao-open') + 1)) == false && (!!(lugarPopUp.className.split(' ').indexOf('votacao-res') + 1)) == false){
        return true
    }else{
        return false
    }
}

function aviso(opc){
    if(opc == true){
        lugarPopUp.classList.add('aparece')
        // som.play()
    }else if(opc == false){
        lugarPopUp.classList.remove('aparece')
    }
}

let ChamaFetchDados = setInterval(fetchDados, 10000) // delay de chamada de verificação de votacao
let ChamaAnuncios = setInterval(anucios, 240000) // delay 4min de chamada do anuncio