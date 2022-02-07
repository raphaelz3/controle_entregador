import {local} from './index.js'
let url = `https://viacep.com.br/ws/${local}/json/`;//API buscadora de CEP
    //fetch retorna a promisse o then trata as informaçoes
    fetch(url).then(buscaCEP => buscaCEP.json()).then(console.log);