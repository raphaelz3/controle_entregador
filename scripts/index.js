//array para recebimento de objetos
var Disponiveis = [];
var Servico = [];

//recupera lista de espera no carregamento
onload = function carregamento(){
    document.getElementById("filaEspera").innerHTML = '<tr>'+'<td colspan="4"> Lista Vazia' +'</tr>';
    var local = JSON.parse(localStorage.getItem("disponiveis"));

    for(c = 0; c < local.length; c++){
        Disponiveis.push(local[c]);
    }
    if(local != null || local.length > 0){
        listar();
    }
    console.log(local);
}

//função para adicionar e formatar funcionario inserido na fila
function adicionar(){
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
        DisponiveisString = JSON.stringify(Disponiveis)
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

    for(i = 0; i < Disponiveis.length; i++){
        document.getElementById("filaEspera").innerHTML +=  `<tr id ="${Disponiveis[i].id}">` + '<td id="nomeFunci">' + Disponiveis[i].nome + '</td>' + '<td id="horaChegada">' + Disponiveis[i].hora + '</td>' + '<td>' + `<button class="chamar" onclick="chamar(${Disponiveis[i].id})">chamar</button>` +'</td>' + '<td>' +`<button nome="excluir" class="excluir" onclick="deletar(${Disponiveis[i].id})">excluir</button>` + "</td>" +'</tr>';
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

//abre coluna para inserir local com opções de salvar ou cancelar. Cancelar faz o reload da tela
function chamar(idchamada){

    let chamado = document.getElementById(idchamada);
    chamado.style="background-color: rgb(179, 231, 149)";

    let idchamadamod = idchamada + 1;
    document.getElementById(idchamada).innerHTML += `<td id="${idchamada}td">` + 'Insira o endereço: '+`<input id="${idchamadamod}" type="text">` + `<button id="salvarChamarLocal" class="chamar" onclick="salvarChamar(${idchamadamod})">` + 'salvar</button>' + `<button id="cancelarChamarLocal" class="excluir" onclick="window.
    location.reload()">`+ 'cancelar</button></td>';
}

//Salva as informações inseridas e recupera o nome para armazenar na coluna de funcionarios em serviço
//salCham é igual o id do objeto + 1 para evitar duplicar id no HTML.
function salvarChamar(salCham){
    let local = document.getElementById(salCham).value
    let posicaochamada = contadordeposicao(salCham - 1);
    let nomeChamado = Disponiveis[posicaochamada].nome;

    console.log(local);
    console.log(nomeChamado);
    //deletar(salCham - 1)
    document.getElementById('filaServico').innerHTML += `<tr>` + `<td>${nomeChamado}</td>`+ `<td>${local}</td>` + '<tr>'
    deletar(salCham - 1);

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
