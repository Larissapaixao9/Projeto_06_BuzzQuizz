let listaQuizz = []; //variavel com array dos quizzes
let title;
let image;
let questions;
let levels;
let createdQuizz ={
	title: "Título do quizz",
	image: "https://http.cat/411.jpg",
	questions: [],
    levels: []
};
let question={
    title: "Título da pergunta 1",
    color: "#123456",
    answers: []
};
let answer={
    text: "Texto da resposta 1",
    image: "https://http.cat/411.jpg",
    isCorrectAnswer: true
};
let level ={
    title: "Título do nível 1",
    image: "https://http.cat/411.jpg",
    text: "Descrição do nível 1",
    minValue: 0
};

////////////////  Codigo executado ao iniciar ////////////////
homePage();


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
function renderizar(titleQuestion,imageQuestion){
    return `<div class=""gradient">
            <img src="${imageQuestion}"/>
            <span>${titleQuestion}</span>
    `
}
  
function showQuizz(index){
    console.log("console"+index);
    console.log(listaQuizz[index]);
    const newHeader=document.querySelector(".header").classList.add("marginzero")
    document.querySelector(".page").innerHTML = `
    <div class="gradient2"></div> 
    <img class="header2" src="${listaQuizz[index].image}" alt="thumb"/> 
    <h1 class="QuizzTitle white "> ${listaQuizz[index].title} </h1>
   
    `;
    quizzId=axios.get(`https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${index}`);
    quizzId.then(teladeperguntas);
}
  
function teladeperguntas(resultado){
        const dadosdoQuizz=resultado.data;
        level=dadosdoQuizz.levels;
        id=dadosdoQuizz.id;
        window.scrollTo(0,0)
  
        for(let i=0;i<dadosdoQuizz.questions.length;i++){
            const questionsBox=document.querySelector(".questionsBox");
            questionsBox.innerHTML+=
            `<div class="perguntas">
            <div style="background-color: ${dadosdoQuizz.questions[i].color}" class="tituloP">
            ${dadosdoQuizz.questions[i].title}</div>
            <div class="all"></div>
            `
        }
}

///Aqui começa o createQuizz //// 

function createQuizzPg1(){ //Primeira tela para criar quizz
    
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
    console.log("title: "+title);
    createdQuizz.title=title;

    console.log("createdquizz.title: "+createdQuizz.title);
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
    for(let i =0;i<questions;i++){
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
        </div>
    `;
    }
    document.querySelector(".page").innerHTML+=`
    <button class="redBox" onclick="readQuizzPg2();">Prosseguir pra criar níveis</button>
    `;
    
}
function readQuizzPg2() {
    for(let i =0;i<questions;i++){
        question.title=document.getElementById(`a${i+1}1`).value;
        question.color=document.getElementById(`a${i+1}2`).value;
        
        answer.text=document.getElementById(`a${i+1}3`).value;
        answer.image=document.getElementById(`a${i+1}4`).value;
        answer.isCorrectAnswer=true;
        question.answers[0]=answer;
        answer.text=document.getElementById(`a${i+1}5`).value;
        answer.image=document.getElementById(`a${i+1}6`).value;
        answer.isCorrectAnswer=false;
        question.answers[1]=answer;
        answer.text=document.getElementById(`a${i+1}7`).value;
        answer.image=document.getElementById(`a${i+1}8`).value;
        answer.isCorrectAnswer=false;
        question.answers[2]=answer;
        answer.text=document.getElementById(`a${i+1}9`).value;
        answer.image=document.getElementById(`a${i+1}10`).value;
        answer.isCorrectAnswer=false;
        question.answers[3]=answer;

        createdQuizz.questions[i]=question;
    }
    createQuizzPg3();
}
function createQuizzPg3(){
    document.querySelector(".page").innerHTML=`
    <h2>Agora, decida os níveis</h2>
    `;
    for(let i =0;i<levels;i++){
        document.querySelector(".page").innerHTML+=`
        <div class="whiteBox">
            <h2>Nível ${i+1}</h2>
            <input id="a${i+1}1" type="text" placeholder="Título do nível">
            <input id="a${i+1}2" type="number" placeholder="% de acerto mínima">
            <input id="a${i+1}3" type="url" placeholder="URL da imagem do nível">
            <input id="a${i+1}4" type="text" placeholder="Descrição do nível">
        </div>
    `;
    }
    document.querySelector(".page").innerHTML+=`
    <button class="redBox" onclick="readQuizzPg3()">Finalizar Quizz</button>
    `;
    
    
}
function readQuizzPg3() {
    for(let i =0;i<levels;i++){
        level.title=document.getElementById(`a${i+1}1`).value;
        level.minValue=document.getElementById(`a${i+1}2`).value;
        level.image=document.getElementById(`a${i+1}3`).value;
        level.text=document.getElementById(`a${i+1}4`).value;
        createdQuizz.levels[i]=level;
    }
    console.log(createdQuizz);
    let promise=axios.post('https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes',createdQuizz);
    promise.then(postedQuizz());
}
function postedQuizz(){
    alert("great sucess");
    homePage();
}



