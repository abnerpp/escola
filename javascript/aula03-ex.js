// Mostre no console a seguinte frase para cada disciplina:
//"Você está estudando [DISCIPLINA] no nível [NIVEL]"

const dados= {
    nome: "Abner",
    idade: 40,
    estudo: [
        {disciplina: "HTML", nivel: "iniciante"},
        {disciplina: "CSS", nivel: "iniciante"},
        {disciplina: "JS", nivel: "iniciante.jr"}
    ]
}

//console.log(`"Você esta estudando:" ${dados.estudo[2].disciplina}, "No nível:" ${dados.estudo[2].nivel}`)

function extdados(dados) {
    dados.estudo.forEach(function(busca) {
        console.log(`Você está estudando: ${busca.disciplina}, no nível: ${busca.nivel}`);
    });
}

extdados(dados);

  