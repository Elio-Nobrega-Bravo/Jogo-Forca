// Seletores
let tela = document.querySelector("canvas");
let botonNuevoJuegoDesaparecido = document.getElementById("btn-novo-jogo").style.display = "none"
let btnSairDesaparecer = document.getElementById("btn-sair").style.display = "none"
let divAgregarPalavra = document.getElementById("adicionar-palavra").style.display = 'none';
let btnNovoJogo = document.getElementById("btn-novo-jogo");
let btnSair = document.getElementById("btn-sair");
let btnCancelar = document.getElementById("btn-cancelar");

let palavras = ['ALURA', 'FORCA', 'HTML', 'ORACLE', 'JAVASCRIPT', 'LOGICA', 'PROGRAMA', 'DESAFIO'];
let tabuleiro = document.getElementById('forca').getContext('2d');
let palavraSecreta = "";
let letras = [];
let palavraCorreta = "";
let erros = 8;
let letrasIncorretas = [];
let numeroDeErros = 8
let letraEscolhida = [];

// Captura id "inicia-jogo" no click e direciona a rotina que inicia o jogo
document.getElementById("iniciar-jogo").onclick = () => {
  iniciarJogo();
}

// Captura id "btn-guardar" e Salva a palavra adicionada
document.getElementById("btn-salvar").onclick = () => {
  salvarPalavra(); 
}

// Atualiza Tela ao clicar em "novo jogo"
btnNovoJogo.addEventListener("click", function () {
  location.reload();
});

// Atualiza Tela ao Clicar em "sair"
btnSair.addEventListener("click", function () {
  location.reload();
});

// Atualiza Tela ao Clicar em "cancelar"
btnCancelar.addEventListener("click", function () {
  location.reload();
});

// Sorteia a Palavra
function escolherPalavraSecreta() {
  let palavra = palavras[Math.floor(Math.random() * palavras.length)]
  palavraSecreta = palavra
  return palavra
}

// Verifica a Letra Clicada
function verificarLetraClicada(key) {
  if (letras.length < 1 || letras.indexOf(key) < 0) {
    letras.push(key)
    return false    
  }
  else {
    letras.push(key)
    return true
  }
}

function adicionarLetraCorreta(i) {
  palavraCorreta += palavraSecreta[i].toUpperCase()
}

function adicionarLetraIncorreta(letter) {
  if (palavraSecreta.indexOf(letter) <= 0) {
    erros -= 1
  }
}

function verificarFimDeJogo(letra) {

  // Checa se a letra foi incluída no array de letras certas ou erradas
 if(letraEscolhida.length < palavraSecreta.length) {

    // Inclui letras digitadas no array
    letrasIncorretas.push(letra);    

    // Valida se atingiu número máximo de erros para exibir mesagem "Fim de Jogo"
    if (letrasIncorretas.length > numeroDeErros) {
      exibirDerrota()
    }
    else if(letraEscolhida.length < palavraSecreta.length) {
      adicionarLetraIncorreta(letra)
      escreverLetraIncorreta(letra, erros)
    }
  }
 } 

// Verifica Vitoria de Usuário
function verificarVencedor(letra) {
  letraEscolhida.push(letra.toUpperCase());
  if (letraEscolhida.length == palavraSecreta.length) {
    exibirVitoria()    
  }
}

// Impede que tecla Shift e outras sejam escritas
function verificarLetra(keyCode) {
  if (typeof keyCode === "number" && keyCode >= 65 && keyCode <= 90) {
    return true;
  } else {
    return false;
  }
}

// Desaparece com botões da tela de home e mostra Tela de Adicionar Palavra
function mostrarTelaAdicionarPalavra() {
  document.getElementById("div-desaparece").style.display = 'none';
  document.getElementById("adicionar-palavra").style.display = "block";
}

// Salva a palavra escrita pelo Usuário
function salvarPalavra() {
  
  // Captura a Digitação
  let novaPalavra = document.getElementById('input-nova-palavra').value;

  // Inclui Palavra digitada no array de palavras
  if(novaPalavra !== ""){
    palavras.push(novaPalavra.toUpperCase());
    alert('A palavra digitada foi salva');    
  
    // Desaparece com a Tela Adicionar Palavra
    document.getElementById("adicionar-palavra").style.display = "none";
    iniciarJogo();
  }
  else{
    alert("Nenhuma palavra foi digitada")
  }
}

// Inicia o Jogo
function iniciarJogo() {

  // Desaparece com botões da Tela Home
  document.getElementById("div-desaparece").style.display = 'none';

  // Chama Função Desenha Canvas
  desenharCanvas();

  // Chama Função Sorteiar Palavra 
  escolherPalavraSecreta();

  // Chama a Função Desenha Linhas
  desenharLinhas();

  // Faz aparecer os botões "Novo Jogo" e "Sair"
  document.getElementById("btn-novo-jogo").style.display = "block"
  document.getElementById("btn-sair").style.display = "block"

  // Captura a Letra Digitada
  document.onkeydown = (e) => {

    // Coloca a Letra Digitada em Maiúscula
    let letra = e.key.toUpperCase()

    // Verifica se Usuário perdeu
    if (letrasIncorretas.length <= numeroDeErros) {
      if (!verificarLetraClicada(e.key) && verificarLetra(e.keyCode)) {
        if (palavraSecreta.includes(letra)) {
          adicionarLetraCorreta(palavraSecreta.indexOf(letra))
          for (let i = 0; i < palavraSecreta.length; i++) {
            if (palavraSecreta[i] === letra) {
              escreverLetraCorreta(i)
              verificarVencedor(letra)
            }
          }
        }

        // Se foi cometido mais erros que o permitido, chama as funcões que desenham
        // a forca e Mensagem Fim de Jogo
        else {
          if (!verificarLetraClicada(e.key) && !verificarVencedor(letra)) return
          desenharForca(erros)
          verificarFimDeJogo(letra)
        }
      }
    }
    else {
      alert('Você atingiu o limíte de letras incorretas')
    }

  };
}

