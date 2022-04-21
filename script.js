// cria a homepage com meus quizzer e outros quizzes
function homePage(){
    document.querySelector(".page").innerHTML=` <div class="myQuizzes">
    <p class="myQuizText1">Você não criou nenhum <br> quizz ainda :(</p>
    <p class="criarQuizzText" onclick="creationPage()">Criar Quizz</p>
    </div>
    <div class="textQuizzTitle"
    <p class="all-quizzesText"> Todos os quizzes</p>
    </div>
    <div class="other-quizzes"></div>
    </div>`;
}
homePage();
function getQuizzes(){
    let promise = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
    promise.then(printQuizzes);
}
function printQuizzes(quizzes){
    let oQuizzes = document.querySelector(".other-quizzes") // oQuizzes => otherQuizzes
    const listaQuizz = quizzes.data
    console.log(quizzes.data);
    for(i = 0; i < listaQuizz.length; i++){     // ADICIONAR OS QUIZZES DO SERVER
        oQuizzes.innerHTML += ` <button id="${listaQuizz[i].id}" class="quizzBox"> <img src="${listaQuizz[i].image}" alt="thumb">
        <h1 class="QuizzTitle"> ${listaQuizz[i].title} </h1></button>`
    }
}
function creationPage(){
    document.querySelector(".page").innerHTML=`
        
        <h2>Comece pelo começo</h2>
        <input placeholder="Título do seu quizz" type="text">
        <input placeholder="URL da imagem do seu quizz" type="text">
        <input placeholder="Quantidade de perguntas do quizz" type="text">
        <input placeholder="Quantidade de níveis do quizz" type="text">
    `;
}
getQuizzes();

addEventListener('click', openQuizz());
