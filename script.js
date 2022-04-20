// cria a homepage com meus quizzer e outros quizzes
function homePage(){
    document.querySelector(".page").innerHTML=` <div class="myQuizzes">
    <p class="myQuizText1">Você não criou nenhum quizz ainda :(</p>
    <p class="criarQuizzText" onclick="creationPage()">Criar Quizz</p>
    </div>

    <p class="todos-quizzesText"> <strong>Todos os quizzes</strong></p>
    <div class="demais-quizzes">
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
homePage();
function getQuizzes(){
    let promise=axios.get('https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes');
    promise.then(printQuizzes);
    //promise.catch(alert("get error"));
}
function printQuizzes(quizzes){
    console.log(quizzes);
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