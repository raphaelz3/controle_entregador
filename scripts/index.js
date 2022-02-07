//array para recebimento de objetos
var Disponiveis = [];
var Servico = [];

//recupera lista de espera no carregamento
onload = function carregamento(){
    document.getElementById("filaEspera").innerHTML = '<tr>'+'<td colspan="4"> Ninguem disponivel' +'</tr>';
    document.getElementById("filaServico").innerHTML = '<tr>'+'<td colspan="4"> Ninguem em serviço' +'</tr>';
    var carregardisponiveis = JSON.parse(localStorage.getItem("disponiveis"));

    for(let c = 0; c < carregardisponiveis.length; c++){
        Disponiveis.push(carregardisponiveis[c]);
    }
    if(carregardisponiveis != null || carregardisponiveis.length > 0){
        listar();

    }
    var carregarservico = JSON.parse(localStorage.getItem("emServico"));

    for(let i = 0; i < carregarservico.length; i++){
        Servico.push(carregarservico[i]);
    }
    if(carregarservico != null || carregarservico.length > 0){
        listarServico();

    }
    //console.log(local);
}

//função para adicionar e formatar funcionario inserido na fila
function adicionarDisponiveis(){
    var funci = document.getElementById("funcionario").value;
    let data = new Date();
    let hours = data.getHours();
    let minutes = data.getMinutes();
    let seconds = data.getSeconds();
    var horaExata = 0;
    var id = data.getDate() + "" + (data.getMonth() + 1) + "" + data.getFullYear() + "" + data.getHours() + "" + data.getMinutes() + "" + data.getSeconds() + "" + data.getMilliseconds() + "";

    //formatação das horas
    if(hours <= 9){
        hours = "0" + hours;
    }
    if(minutes <= 9){
        minutes = "0" + minutes;
    }
    if(seconds <= 9){
        seconds = "0" + seconds;
    }
    horaExata = hours + ":" + minutes + ":" + seconds + "";

    if(funci != "" && funci != " "){
    //Criar objeto e adicionar ao Disponiveis(array localstorage) e salva no local storage
        Disponiveis.push({id:id, nome:funci, hora:horaExata});
        DisponiveisString = JSON.stringify(Disponiveis);
        localStorage.setItem("disponiveis", DisponiveisString);
        listar();
    }else{
        alert("insira um nome");
    }
    document.getElementById("funcionario").value = '';
}

//listar(id, funci, horaExata);
function listar(){
    document.getElementById("filaEspera").innerHTML = '';

    for(let i = 0; i < Disponiveis.length; i++){
        document.getElementById("filaEspera").innerHTML += `<tr id ="${Disponiveis[i].id}">` + '<td id="nomeFunci">' + Disponiveis[i].nome + '</td>' + '<td id="horaChegada">' + Disponiveis[i].hora + '</td>' + '<td>' + `<button class="chamar" onclick="chamar(${Disponiveis[i].id})">Chamar</button>` +'</td>' + '<td>' +`<button nome="excluir" class="excluir" onclick="deletar(${Disponiveis[i].id})">Excluir</button>` + "</td>" +'</tr>';
    }
}

function listarServico(){
    //document.getElementById("filaServico").innerHTML = '';

    for(let count = 0; count < Servico.length; count++){
        document.getElementById("filaServico").innerHTML += `<tr id="${Servico[count].id}">` + '<td>' + Servico[count].nome + '</td>' + '<td>' + Servico[count].local+ '</td>' + '<td>' + `<button style="width:58px;" class="chamar" onclick="">Fila</button>` +'</td>' + '<td>' +`<button nome="Excluir" class="excluir" onclick="deletarAtivo(${Servico[count].id})">Excluir</button>` + "</td>" +'</tr>';
    }
}

//abre coluna para inserir local com opções de salvar ou cancelar. Cancelar faz o reload da tela
function chamar(idchamada){
    document.body.style="overflow: hidden;";
    let exibirJanela = document.getElementById("containerChamar")
    exibirJanela.style="display: flex;"
    let posicaochamada = contadordeposicao(idchamada);
    let nomeChamado = Disponiveis[posicaochamada].nome;
    let idchamadamod = idchamada + 1;
    document.getElementById("dadosChamar").innerHTML = `<p>Funcionario: ${nomeChamado}</p>` + '<p>Insira o Endereço: </p>'+`<input id="${idchamadamod}" class="inputInserirDados" type="text">` + '<br>' + `<button id="salvarChamarLocal" class="chamar" onclick="salvarChamar(${idchamadamod})">` + 'Salvar</button>' + `<button id="cancelarChamarLocal" class="excluir" onclick="cancelarChamar(${idchamadamod})"">`+ 'Cancelar</button>';
    console.log(nomeChamado, idchamadamod);
}

//Salva as informações inseridas e recupera o nome para armazenar na coluna de funcionarios em serviço
//iddochamado é igual o id do objeto + 1 para evitar duplicar id no HTML.
function salvarChamar(iddochamado){
    let local = document.getElementById(iddochamado).value;
    let posicaochamada = contadordeposicao(iddochamado - 1);
    let nomeChamado = Disponiveis[posicaochamada].nome;

    //deletar(iddochamado - 1)
    //document.getElementById('filaServico').innerHTML += `<tr id="${iddochamado}">` + `<td>${nomeChamado}</td>`+ `<td>${local}</td>` + '<td>' + `<button style="width:58px;" class="chamar" onclick="">Fila</button>` +'</td>' + '<td>' +`<button nome="Excluir" class="excluir" onclick="deletarAtivo(${iddochamado})">Excluir</button>` + "</td>" +'</tr>';
    deletar(iddochamado - 1);
    document.body.style="overflow: auto;";
    let exibirJanela = document.getElementById("containerChamar")
    exibirJanela.style="display: none;"

    Servico.push({id:iddochamado, nome:nomeChamado, local:local})
    ServicoString = JSON.stringify(Servico)
    localStorage.setItem("emServico", ServicoString);
    listarServico();
}

function cancelarChamar(){
    document.body.style="overflow: auto;";
    let exibirJanela = document.getElementById("containerChamar")
    exibirJanela.style="display: none;"
}

//remove a linha selecionada da tabela e do local storage
function deletar(del){

    let deletarPosicao = contadordeposicao(del);
    Disponiveis.splice(deletarPosicao, 1);

    document.getElementById(del).remove();
    let DisponiveisString = JSON.stringify(Disponiveis)
    localStorage.setItem("disponiveis", DisponiveisString);
    if(Disponiveis.length == 0){
        document.getElementById("filaEspera").innerHTML = '<tr>'+'<td colspan="4"> Lista Vazia' +'</tr>';
    }
}

//remove toda a tabela e limpa o localstorage, exibe um alerta antes de continuar.
function limparFila(){

    var confirmarExclusao = confirm(" ATENÇÃO!\nNão será possível recuperar a fila, tem certeza que deseja apagar?");
    if(confirmarExclusao == true){
        //while evita de quando adicionar novo dado recupere os dados já excluidos.
        while(Disponiveis.length > 0) {
            Disponiveis.pop();
         }
        localStorage.removeItem("disponiveis");
        document.getElementById("filaEspera").innerHTML = '<tr>'+'<td colspan="4"> Lista Vazia' +'</tr>';
    }else{
        alert("Ação Cancelada")
    }
}

//contar posição requisitada e retornar a posição que elemento se encontra
function contadordeposicao(idposicao){
    let contador;
    let pos = Disponiveis.map(function(e) { return e.id; });
    for(let z = 0; z < pos.length; z++){
        if(pos[z] == idposicao){
            contador = z;
        }
    }
    return contador
}
