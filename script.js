// cria a homepage com meus quizzer e outros quizzes
function homePage(){
    document.querySelector(".page").innerHTML=` <div class="myQuizzes">
    <p class="myQuizText1">Você não criou nenhum <br> quizz ainda :(</p>
    <p class="criarQuizzText" onclick="creationPage()">Criar Quizz</p>
    </div>
    <div class="textQuizzTitle"
    <p class="all-quizzesText"> Todos os quizzes</p>
    </div>
    <div class="other-quizzes">
       <div class="pcaixa">
            <img id="a" src="quiz1.png" />
            <img src="quiz2.png" />
            <img src="quiz1.png" />
       </div>
    <div class="pcaixa">
        <img src="quiz1.png" />
        <img src="quiz2.png" />
        <img src="quiz1.png" />
    </div>
    </div>`;
}

function getQuizzes(){
    let promise = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
    promise.then(printQuizzes);
    //promise.catch(alert("get error"));
}
function printQuizzes(quizzes){
    let oQuizzes = document.querySelector(".other-quizzes") // oQuizzes => otherQuizzes
    const listaQuizz = quizzes.data
    console.log(quizzes.data);
    for(i = 0; i < listaQuizz.length; i++){     // ADICIONAR OS QUIZZES DO SERVER
        oQuizzes.innerHTML += ` <div class="quizzBox"> <img src="${listaQuizz[i].image}" alt="thumb">
        <h1 class="QuizzTitle"> ${listaQuizz[i].title} </h1>`
    }
}
function creationPage(){
    document.querySelector(".page").innerHTML=`
    <h2>Comece pelo começo</h2>
    <div class="whiteBox">
        <input id="a1" placeholder="Título do seu quizz" type="text">
        <input placeholder="URL da imagem do seu quizz" type="text">
        <input placeholder="Quantidade de perguntas do quizz" type="text">
        <input placeholder="Quantidade de níveis do quizz" type="text">
    </div>  
    <button class="redBox" onclick="questionCreationPage()">Prosseguir pra criar perguntas</button>
    `;
}
function questionCreationPage(){
    let Titulo=document.getElementById("a1").value;
    alert(Titulo);
}

//Codigo executado ao iniciar
homePage();
getQuizzes();