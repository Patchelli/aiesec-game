
var mapa = []
var jogada = 0
var jogador = 1
var escolha1 = 0
var escolha2 = 0
var posicao1 = 0
var posicao2 = 0
var pontuacao1 = 0
var pontuacao2 = 0
var doisJogadores = false
var mesa = document.getElementById("espacoCartas")
var jogador1 = document.getElementById("jogador1")
var jogador2 = document.getElementById("jogador2")
var select1 = document.getElementById("nJogadores")
var select2 = document.getElementById("nTabuleiro")
var btnNovo = document.getElementById("btnNovo")
var centesimas = 0;
var segundos = 0;
var minutos = 0;
function pararCronometro () {
	clearInterval(control);
}
function iniciarCronometro () {
	if (centesimas < 99) {
		centesimas++;
		if (centesimas < 10) { centesimas = "0"+centesimas }
		document.getElementById("centesimas").innerHTML = ":"+centesimas;
	}
	if (centesimas == 99) {
		centesimas = -1;
	}
	if (centesimas == 0) {
		segundos ++;
		if (segundos < 10) { segundos = "0"+segundos }
		document.getElementById("segundos").innerHTML = ":"+segundos;
	}
	if (segundos == 59) {
		segundos = -1;
	}
	if ( (centesimas == 0)&&(segundos == 0) ) {
		minutos++;
		if (minutos < 10) { minutos = "0"+minutos }
		document.getElementById("minutos").innerHTML = ":"+minutos;
	}
	if (minutos == 59) {
		minutos = -1;
	}
}
function configurarTabuleiro(nTabuleiro) {
    var cont = 0
    mesa.innerHTML = ""


    for (var i=0; i<nTabuleiro; i++) {
        for (var j=0; j<nTabuleiro; j++) {
            cont++
            mesa.innerHTML += "<div class='divCarta' id='divCarta"+cont+"'></div>"
            document.getElementById("divCarta"+cont+"").innerHTML += "<a id='link"+cont+"' href='javascript:escolhaDeCarta("+cont+")'><img id='carta"+cont+"' src='img/cartas/dorso.jpg' /></a>"
        }
        mesa.innerHTML += "<br />" 
    }
}
function embaralhar(array) {
    var indice_atual = array.length, valor_temporario, indice_aleatorio;
    while (0 !== indice_atual) {
        indice_aleatorio = Math.floor(Math.random() * indice_atual);
        indice_atual -= 1;
        valor_temporario = array[indice_atual];
        array[indice_atual] = array[indice_aleatorio];
        array[indice_aleatorio] = valor_temporario;
    }
}
function mapearCartas(nPares) {
    mapa = [];

    for (i=1; i<=nPares; i++){
        for (j=0; j<2; j++){
            mapa.push(i)
        }
    }
    embaralhar(mapa)
}
function virarCarta(cartaEscolhida,revelar) {

    if (revelar) {
    
        document.getElementById("link"+cartaEscolhida).setAttribute("class","disable")
        document.getElementById("carta"+cartaEscolhida).setAttribute("class","animacao-carta")
    } else {
    
        document.getElementById("link"+cartaEscolhida).setAttribute("class","")
    }

    window.setTimeout(function(){
        if (revelar)
            document.getElementById("carta"+cartaEscolhida).setAttribute("src","img/cartas/carta (" + mapa[cartaEscolhida-1] + ").jpg")
        else
            document.getElementById("carta"+cartaEscolhida).setAttribute("src","img/cartas/dorso.jpg")        
    },250)

    window.setTimeout(function(){
        document.getElementById("carta"+cartaEscolhida).setAttribute("class","")        
    },750)
}
function pontuaJogador(jogadorUm) {
    if (jogadorUm)
        jogador1.innerHTML = "<span class='label'>P1</span><span>" + ++pontuacao1 + "</span>"
    else
        jogador2.innerHTML = "<span class='label'>P2</span><span>" + ++pontuacao2 + "</span>"
}
function verificaPontuacao(){
    if (escolha1 != escolha2) {
        window.setTimeout(function(){
            virarCarta(posicao1,false)
            virarCarta(posicao2,false)
        },500)

        if (doisJogadores)
            jogador++
        
    } else if (doisJogadores)        
        pontuaJogador(jogador%2 != 0)
    else if (++pontuacao1 == (select2.value*select2.value/2)) {
        pontuacao1 = 0
        pararCronometro()
        btnNovo.removeAttribute("hidden")
    }
}
function escolhaDeCarta(cartaEscolhida) {
    var carta = mapa[cartaEscolhida-1]

    if (jogada == 0) {
        virarCarta(cartaEscolhida,true)
        posicao1 = cartaEscolhida
        escolha1 = carta
        jogada++
    }

    else {
        virarCarta(cartaEscolhida,true)
        posicao2 = cartaEscolhida
        escolha2 = carta
        jogada = 0

        verificaPontuacao()
    }
}
function novoJogo() {

    var nJogadores = select1.value
    var nTabuleiro = select2.value
    if(nJogadores=="" || nTabuleiro=="") {
        mesa.innerHTML += "<h1>Preencha todos os campos do formulário</h1>"
        return
    }
    
    pontuacao1 = 0
    doisJogadores = false
    if (nJogadores == 2) {
        pontuacao2 = 0
        doisJogadores = true
        jogador1.removeAttribute("class")
        btnNovo.removeAttribute("hidden")
        jogador1.innerHTML = "<span class='label'>P1</span><span>0</span>"
        jogador2.innerHTML = "<span class='label'>P2</span><span>0</span>"
    } else {
        jogador2.innerHTML = ""
        btnNovo.setAttribute("hidden","true")
        centesimas = 0; segundos = 0; minutos = 0;
        jogador1.setAttribute("class","cronometro")
        jogador1.innerHTML = "<span id='minutos'>00</span><span id='segundos'>:00</span><span id='centesimas'>:00</span>"
        control = setInterval(iniciarCronometro,10);
    }

    configurarTabuleiro(nTabuleiro)

    var nPares = nTabuleiro*nTabuleiro/2
    mapearCartas(nPares)
}