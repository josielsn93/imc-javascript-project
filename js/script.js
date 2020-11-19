let listaPessoas = [];

if (localStorage.getItem('listaPessoas') == null) { //não tem dados
    listaPessoas = []; // inicia com array vazio
} else { 
    // inicializa com os dados do storage
    listaPessoas = JSON.parse( localStorage.getItem('listaPessoas'));
}

console.log(listaPessoas);
exibeResultado();

//função para calcular o IMC
// recebe altura e peso e retorna o cálculo
function calculaIMC(a, p) {
    return p / (a * a);
}

function geraSituacao(imc) {
    //gerar a situação, baseada no imc
    if (imc < 18.5) {
        return "Magreza Severa"
    } else if (imc >= 18.5 && imc <= 24.99) {
        return "Peso normal"
    }   else if (imc >= 25 && imc <= 29.99) {
        return "Acima do Peso"
    }   else if (imc >= 30 && imc <= 34.99) {
        return "Obesidade I"
    }   else if (imc >= 35 && imc <= 39.99) {
        return "Obesidade II (severa)"
    }   else {
        return 'Cuidado!';
    };
}

function calcular() {

    // pegar os dados dos formulários
    let nome = document.getElementById('nome').value;
    let altura = parseFloat( document.getElementById('altura').value);
    let peso =  parseFloat( document.getElementById('peso').value);

    if (nome == "" || isNaN(altura) || isNaN(peso)) { //deixo campos sem preencher
        alert('Preencha todos os campos!')
    }   else { //tudo preenchido
       
        //calcular o IMC
        let imc = calculaIMC(altura, peso);
        let situacao = geraSituacao(imc);

        //guardar o imc e a situação no objeto pessoa
        let pessoa = {};
        pessoa.nome = nome;
        pessoa.altura = altura;
        pessoa.peso = peso;
        pessoa.imc = imc;
        pessoa.situacao = situacao;

        //cadastra na lista pessoas
        listaPessoas.push(pessoa);

        //guardar no navegador a listaPessoas
        localStorage.setItem("listaPessoas", JSON.stringify(listaPessoas));

        //exibir a pessoa na tela
        exibeResultado();
        
        }
    }// fim da opção calcular

    
    function exibeResultado() {
        let template = "";

        for (let i = 0; i < listaPessoas.length; i++) {
            template += `
               <tr>
               <td>${listaPessoas[i].nome}</td>
               <td>${listaPessoas[i].altura}</td>
               <td>${listaPessoas[i].peso}</td>
               <td>${listaPessoas[i].imc}</td>
               <td>${listaPessoas[i].situacao}</td>
               </tr>
    
                `
        }
        document.getElementById('cadastro').innerHTML = template;
}

