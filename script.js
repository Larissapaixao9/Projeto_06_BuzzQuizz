let listaQuizz = []; //variavel com array dos quizzes
let title;
let image;
let questions;
let levels;
let createdQuizz ={
	title: "Título do quizz",
	image: "https://http.cat/411.jpg",
	questions: [{
			title: "Título da pergunta 1",
			color: "#123456",
			answers: [
				{
					text: "Texto da resposta 1",
					image: "https://http.cat/411.jpg",
					isCorrectAnswer: true
				}
            ]
    }
    ],
    levels: [
        {
        title: "Título do nível 1",
        image: "https://http.cat/411.jpg",
        text: "Descrição do nível 1",
        minValue: 0
        }
    ]
}

function homePage(){// cria a homepage com meus quizzes e outros quizzes
    document.querySelector(".page").innerHTML=` 
    <div class="myQuizzes">
        <h4 >Você não criou nenhum <br> quizz ainda :(</h4>
        <p class="criarQuizzText red" onclick="createQuizzPg1()">Criar Quizz</p>
    </div>
    <div class="textQuizzTitle">
        <p class="all-quizzesText"> Todos os quizzes</p>
        </div>
    <div class="other-quizzes"></div>
    </div>`;
    getQuizzes();
}

function getQuizzes(){ //faz get na lista de quizzes
    let promise = axios.get('https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes');
    promise.then(printQuizzes);
}

function printQuizzes(quizzes){ //mostra a lista de quizzes no html
    let oQuizzes = document.querySelector(".other-quizzes"); // oQuizzes => otherQuizzes
    listaQuizz = quizzes.data;
    console.log(quizzes.data);
    for(i = 0; i < listaQuizz.length; i++){     // ADICIONAR OS QUIZZES DO SERVER
        oQuizzes.innerHTML += ` 
        <button onclick="showQuizz(${i})" class="quizzBox"> 
        <img src="${listaQuizz[i].image}" alt="thumb"> 
        <div class="gradient"></div> 
        <h1 class="QuizzTitle white"> ${listaQuizz[i].title} </h1>
        </button>`
    }
}

function showQuizz(index){ //mostra o quizz clicado
    console.log("console"+index);
    console.log(listaQuizz[index]);
    document.querySelector(".page").innerHTML = `teste1`;
}

function createQuizzPg1(){
    document.querySelector(".page").innerHTML=`
    <h2>Comece pelo começo</h2>
    <div class="whiteBox">
        <input id="a1" placeholder="Título do seu quizz" type="text" minlength="20" maxlength="65" required>
        <input id="a2" placeholder="URL da imagem do seu quizz" type="url" required>
        <input id="a3" placeholder="Quantidade de perguntas do quizz" type="number" min="3" required>
        <input id="a4" placeholder="Quantidade de níveis do quizz" type="number" min="2" required>
        <button class="redBox" onclick="readQuizzPg1()">Prosseguir pra criar perguntas</button> 
    </div>`
    ;
}
function readQuizzPg1() {
    title=document.getElementById("a1").value;
    image=document.getElementById("a2").value;
    questions=document.getElementById("a3").value;
    levels=document.getElementById("a4").value;
    if(title.length<20 || title.length>65){
        alert(`Escolha um título com entre 20 e 65 caractéres, o seu está com ${title.length}`);
        return;
    }
    if(!isValidHttpUrl(image)){
        alert('Insira uma url de imagem válida');
        return;
    }
    if(questions<3){
        alert('Mínimo de 3 perguntas');
        return;
    }
    if(levels<2){
        alert('Mínimo de 2 níveis');
        return;
    }
    createdQuizz.title=title;
    createdQuizz.image=image;
    createQuizzPg2();
}
function isValidHttpUrl(string) { //verifica se a string é url
    let url;
    try {
      url = new URL(string);
    } catch (_) {
      return false;  
    }
    return true;
}
function createQuizzPg2(){
    document.querySelector(".page").innerHTML=`
    <h2>Crie suas perguntas</h2>
    `;
    for(let i =0;i<=questions;i++){
        document.querySelector(".page").innerHTML+=`
        <div class="whiteBox">
            <h2>Pergunta ${i+1}</h2>
            <input id="a${i+1}1" type="text" placeholder="Texto da pergunta">
            <input id="a${i+1}2" type="text" placeholder="Cor de fundo da pergunta">
            <h2>Resposta correta</h2>
            <input id="a${i+1}3" type="text" placeholder="Resposta correta">
            <input id="a${i+1}4" type="url" placeholder="URL de imagem">
            <h2>Respostas incorretas</h2>
            <input id="a${i+1}5" type="text" placeholder="Resposta incorreta 1">
            <input id="a${i+1}6" type="url" placeholder="URL de imagem 1">
            <input id="a${i+1}7" type="text" placeholder="Resposta incorreta 2">
            <input id="a${i+1}8" type="url" placeholder="URL de imagem 2">
            <input id="a${i+1}9" type="text" placeholder="Resposta incorreta 3">
            <input id="a${i+1}10" type="url" placeholder="URL de imagem 3">
            <button class="redBox" onclick="readQuizzPg2();">Prosseguir pra criar níveis</button>
        </div>
    `;
    }
    
}
function readQuizzPg2() {
    for(let i =0;i<=questions;i++){
        createdQuizz.questions[i].title=document.getElementById(`a${i+1}1`).value;
        createdQuizz.questions[i].color=document.getElementById(`a${i+1}2`).value;
        createdQuizz.questions[i].answers[0].text=document.getElementById(`a${i+1}3`).value;
        createdQuizz.questions[i].answers[0].image=document.getElementById(`a${i+1}4`).value;
        createdQuizz.questions[i].answers[0].isCorrectAnswer=true;
        createdQuizz.questions[i].answers[1].text=document.getElementById(`a${i+1}5`).value;
        createdQuizz.questions[i].answers[1].image=document.getElementById(`a${i+1}6`).value;
        createdQuizz.questions[i].answers[1].isCorrectAnswer=false;
        createdQuizz.questions[i].answers[2].text=document.getElementById(`a${i+1}7`).value;
        createdQuizz.questions[i].answers[2].image=document.getElementById(`a${i+1}8`).value;
        createdQuizz.questions[i].answers[2].isCorrectAnswer=false;
        createdQuizz.questions[i].answers[3].text=document.getElementById(`a${i+1}9`).value;
        createdQuizz.questions[i].answers[3].image=document.getElementById(`a${i+1}10`).value;
        createdQuizz.questions[i].answers[3].isCorrectAnswer=false;
    }
    createQuizzPg3();
}
function createQuizzPg3(){
    document.querySelector(".page").innerHTML=`
    <h2>Agora, decida os níveis</h2>
    `;
    for(let i =0;i<=levels;i++){
        document.querySelector(".page").innerHTML+=`
        <div class="whiteBox">
            <h2>Nível ${i+1}</h2>
            <input id="a${i+1}1" type="text" placeholder="Título do nível">
            <input id="a${i+1}2" type="number" placeholder="% de acerto mínima">
            <input id="a${i+1}3" type="url" placeholder="URL da imagem do nível">
            <input id="a${i+1}4" type="text" placeholder="Descrição do nível">
            <button class="redBox" onclick="readQuizzPg3">Finalizar Quizz</button>
        </div>
    `;
    }
    
}
function readQuizzPg3() {
    for(let i =0;i<=levels;i++){
        createdQuizz.levels[i].title=document.getElementById(`a${i+1}1`).value;
        createdQuizz.levels[i].minValue=document.getElementById(`a${i+1}2`).value;
        createdQuizz.levels[i].image=document.getElementById(`a${i+1}3`).value;
        createdQuizz.levels[i].text=document.getElementById(`a${i+1}4`).value;
    }
    console.log(createdQuizz);
    let promise=axios.post('https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes',createdQuizz);
    promise.then(postedQuizz());
}
function postedQuizz(){
    alert("great sucess");
    homePage();
}
//Codigo executado ao iniciar
homePage();

