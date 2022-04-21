let listaQuizz = [];
// cria a homepage com meus quizzes e outros quizzes
function homePage(){
    document.querySelector(".page").innerHTML=` 
    <div class="myQuizzes">
        <h4 >Você não criou nenhum <br> quizz ainda :(</h4>
        <p class="criarQuizzText red" onclick="creationPage()">Criar Quizz</p>
    </div>
    <div class="textQuizzTitle">
        <p class="all-quizzesText"> Todos os quizzes</p>
        </div>
    <div class="other-quizzes"></div>
    </div>`;
    getQuizzes();
}

function getQuizzes(){
    let promise = axios.get('https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes');
    promise.then(printQuizzes);
}

function printQuizzes(quizzes){
    let oQuizzes = document.querySelector(".other-quizzes"); // oQuizzes => otherQuizzes
    listaQuizz = quizzes.data;
    console.log(quizzes.data);
    for(i = 0; i < listaQuizz.length; i++){     // ADICIONAR OS QUIZZES DO SERVER
        oQuizzes.innerHTML += 
        ` <button onclick="showQuizz(${i})" class="quizzBox"> 
            <img src="${listaQuizz[i].image}" alt="thumb">
            <h1 class="QuizzTitle white"> ${listaQuizz[i].title} </h1>
        </button>`
    }
}

function showQuizz(index){
    console.log("console"+index);
    console.log(listaQuizz[index]);
    document.querySelector(".page").innerHTML = `teste1`;
}

function creationPage(){
    document.querySelector(".page").innerHTML=`
    <h2>Comece pelo começo</h2>
    <div class="whiteBox">
        <input id="a1" placeholder="Título do seu quizz" type="text" minlength="20" maxlength="65" required>
        <input id="a2" placeholder="URL da imagem do seu quizz" type="URL" required>
        <input id="a3"placeholder="Quantidade de perguntas do quizz" type="text">
        <input id="a4" placeholder="Quantidade de níveis do quizz" type="text">
    </div>  
    <button class="redBox" onclick="questionCreationPage()">Prosseguir pra criar perguntas</button>
    `;
}

function questionCreationPage(){
    let title=document.getElementById("a1").value;
    alert(title);
}

//Codigo executado ao iniciar
homePage();

