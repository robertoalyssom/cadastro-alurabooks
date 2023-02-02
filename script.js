async function buscaEndereco(cep) {
    var mensagemErro = document.getElementById('erro');
    mensagemErro.innerHTML = "";
    try {
        var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        var consultaCEPConvertida = await consultaCEP.json();
        if (consultaCEPConvertida.erro) {  // caso CEP ok (9 dígitos), porém inexistente, erro == true
            throw Error('CEP não existente!');
        };
        PreencheCampo(consultaCEPConvertida);
    } catch (erro) { // erro na requisição ou erro do throw
        mensagemErro.innerHTML = '<p>CEP invalido. Tente novamente!</p>';
        console.log(erro); // .name
    };
};

const cep = document.getElementById('cep');
cep.addEventListener('focusout', () => buscaEndereco(cep.value));

function PreencheCampo(apiDados) {
    var endereco = document.getElementById('endereco');
    var bairro = document.getElementById('bairro');
    var cidade = document.getElementById('cidade');
    var estado = document.getElementById('estado');

    endereco.value = apiDados.logradouro;
    bairro.value = apiDados.bairro;
    cidade.value = apiDados.localidade;
    estado.value = apiDados.uf;
};

/*let ceps = ['01001000', '01001001'];
let conjuntoCeps = ceps.map(valores => buscaEndereco(valores)); // array com 2 promises / chamou a função, mas não estava reolvida ainda, a f. retornou promise
Promise.all(conjuntoCeps).then(resposta => console.log(resposta)); // mostrando resposta das 2 promises da array*/

/*async function buscaEndereco(cep) {
    try {
        var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        var consultaCEPConvertida = await consultaCEP.json();
        if (consultaCEPConvertida.erro) {  // caso CEP ok (9 dígitos), porém inexistente, erro == true
            throw Error('CEP não existente!');
            return consultaCEPConvertida;
        };
        console.log(consultaCEPConvertida);
    } catch (erro) { // erro na requisição ou erro do throw
        console.log(erro); // .name
    };
};*/