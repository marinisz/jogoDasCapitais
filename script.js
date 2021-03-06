var btnEscolha = document.querySelector("#btnEscolha")
var numPlayer = 0;
var btnResposta = document.querySelector("#btnResposta")
var tabuleiro = document.querySelector(".tabuleiro")
var escolhaPlayer = document.querySelector(".escolhaPlayer")
var numAntigo = getRandom(0, 26)
var jogadorAtual = 1;
var pontuacao = [0, 0, 0, 0]
var estadoAtual = ""
var estadoAnterior = ""
var estados = ["Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará", "Distrito Federal", "Espírito Santo", "Goiás", "Maranhão", "Minas Gerais", "Mato Grosso do Sul", "Mato Grosso", "Pará", "Paraíba", "Pernambuco", "Piauí", "Paraná", "Rio de Janeiro", "Rio Grande do Norte", "Rondônia", "Roraima", "Rio Grande do Sul", "Santa Catarina", "Sergipe", "São Paulo", "Tocantins"]
var cidades = ["Rio Branco", "Maceio", "Macapa", "Manaus", "Salvador", "Fortaleza", "Brasilia", "Vitoria", "Goiania", "Sao Luis", "Belo Horizonte", "Campo Grande", "Cuiaba", "Belem", "Joao Pessoa", "Recife", "Teresina", "Curitiba", "Rio de Janeiro", "Natal", "Porto Velho", "Boa Vista", "Porto Alegre", "Florianopolis", "Aracaju", "Sao Paulo", "Palmas"]
var acertos = 0
var estadosInGame = estados;

//funcoes

//pega o numero de jogadores e carrega o jogo
btnEscolha.addEventListener("click", function (e) {
    numPlayer = document.querySelector("#numPlayer").value
    if (numPlayer > 0) {
        escolhaPlayer.innerHTML = ""
        tabuleiro.innerHTML = `<div id="menuPlayers" class="mt-2">
    <h3 id="escolhido" class="player1 mb-0 mr-2">Player 1</h3>
    <h3 id="naoEscolhido" class="player2 mb-0 mr-2">Player 2</h3>
    <h3 id="naoEscolhido" class="player3 mb-0 mr-2">Player 3</h3>
    <h3 id="naoEscolhido" class="player4 mb-0 mr-2">Player 4</h3>
</div>
<div class="corpoGame">
    <h1 id="estado"></h1>
    <div class="row">
    <span id="respostaErrada"></span>
    <span id="respostaCerta"></span>
    </div>
    
    <input id="respostaUsuario" type="text" placeholder="Insira aqui sem acento">
    <button onclick="jogar()" id="btnResposta" class="btn btn-primary my-2">Responder</button>
</div>
<div class="contador">
    <table class="table table-striped  mt-2 table-hover">
        <thead>
            <th>Player 1</th>
            <th>Player 2</th>
            <th>Player 3</th>
            <th>Player 4</th>
        </thead>
        <tbody id="tbody">
            <tr id="playerTr">
                <td id="td1">0</td>
                <td id="td2">0</td>
                <td id="td3">0</td>
                <td id="td4">0</td>
            </tr>
        </tbody>
    </table>
</div>
</div> 
</div>
<div class="col">`;
        insereEstado(numAntigo)
    }else{
        document.querySelector("#error").innerHTML = "Insira Jogadores"
    }

})

//pega um numero randomico de 1 a 26
function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//pega a resposta do usuario e vê se ta certo
function jogar() {
    var player1 = document.querySelector(".player1")
    var player2 = document.querySelector(".player2")
    var player3 = document.querySelector(".player3")
    var player4 = document.querySelector(".player4")
    var respostaUsuario = document.querySelector("#respostaUsuario").value
    confereResposta(respostaUsuario, jogadorAtual)
    insereEstado(numAntigo)
    console.log(jogadorAtual)
    if (numPlayer > 1) {
        if (jogadorAtual < numPlayer) {
            jogadorAtual++;
        } else {
            jogadorAtual = 1;
        }
        if (jogadorAtual === 1) {
            player1.id = "escolhido"
            player2.id = "naoEscolhido"
            player3.id = "naoEscolhido"
            player4.id = "naoEscolhido"

        }
        else if (jogadorAtual === 2) {
            player1.id = ""
            player1.id = "naoEscolhido"
            player2.id = "escolhido"
            player3.id = "naoEscolhido"
            player4.id = "naoEscolhido"
        }
        else if (jogadorAtual === 3) {
            player1.id = "naoEscolhido"
            player2.id = "naoEscolhido"
            player3.id = "escolhido"
            player4.id = "naoEscolhido"
        }
        else if (jogadorAtual === 4) {
            player1.id = "naoEscolhido"
            player2.id = "naoEscolhido"
            player3.id = "naoEscolhido"
            player4.id = "escolhido"
        }
    }
    numAntigo = getRandom(0, 26-acertos)
    estadoAnterior = 
    insereEstado(numAntigo)
    tableInsert()
    confereVencedor()
}

//muda o nome do estado para proxima pergutna
function insereEstado(numero) {
    var estado = document.querySelector("#estado")
    estado.innerHTML = estadosInGame[numero]
}

function confereResposta(resposta, numeroPlayer) {
    var respostaUsuario = document.querySelector("#respostaUsuario")
    var correcao = document.querySelector("#respostaErrada")
    var correta = document.querySelector("#respostaCerta")
    respostaUsuario.value = ""
    if (resposta.toUpperCase() === cidades[numAntigo].toUpperCase()) {
        pontuacao[numeroPlayer - 1] += 1
        correcao.innerHTML = ""
        correta.innerHTML = "Correta"
        estadosInGame.splice(numAntigo, 1)
        cidades.splice(numAntigo, 1)
        acertos++;
    } else {
        correcao.innerHTML = "Resposta anterior correta: " + cidades[numAntigo]
        correta.innerHTML = ""
    }
}

function confereVencedor() {
    
    for (let i = 0; i < pontuacao.length; i++) {
        if (pontuacao[i] === 3) {
            let vencedor = pontuacao.indexOf(3)+1
            let msg = criaMsg()
            alert("Jogador " + vencedor + " é o vencedor!" + msg)
            document.location.reload(true);
        }
    }
}

//insere os dados na tabela
function tableInsert() {
    var td1 = document.querySelector("#td1")
    var td2 = document.querySelector("#td2")
    var td3 = document.querySelector("#td3")
    var td4 = document.querySelector("#td4")

    for (let i = 0; i < numPlayer; i++) {
        if (i === 0) {
            td1.innerHTML = pontuacao[i]
        }
        else if (i === 1) {
            td2.innerHTML = pontuacao[i]
        }
        else if (i === 2) {
            td3.innerHTML = pontuacao[i]
        }
        else if (i === 3) {
            td4.innerHTML = pontuacao[i]
        }
    }
}

//pega resposta com enter
addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        jogar();
    }
});

function criaMsg(){
    let result = ""
    for(let i=0; i<numPlayer; i++) {
        result += "\nJogador "+(i+1)+": "+pontuacao[i]+" Pts"
    }
    return result;
}
