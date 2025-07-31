// Crie uma função que receba a altura e largura de uma parede,
// calcule a area da parede
// e retorne o preço do serviço
// com base na lista de pintores, retorne o pintor mais barato e o melhor pintor

const pintores = [
  {
    nome: "João",
    preco: 100,
    desperdicio: 30, //%
    avaliacao: 4.3,
  },
  {
    nome: "Breno",
    preco: 150,
    desperdicio: 10, //%
    avaliacao: 4.8,
  },
  {
    nome: "Pedro",
    preco: 200,
    desperdicio: 40, //%
    avaliacao: 5,
  },
  {
    nome: "Josué",
    preco: 210,
    desperdicio: 5,
    avaliacao: 4.9,
  },
];

const parede = {
  altura: 6, //m²
  largura: 20, //m²
};

//Função calcular área
function area(parede) {
  const areatotal = parede.altura * parede.largura;
  return areatotal;
}
const areatotal = area(parede); // guardar constante
//console.log(areatotal) // ok

// Calcular o valor de cada pintor correndo a lista com forEach
function calculo(pintores, areatotal) {
  const list = [];

  pintores.forEach(function (pintor) {
    const servico = areatotal * pintor.preco * (1 + pintor.desperdicio / 100); // calculo de inclusão de porcentagem (Valor *1.%)

    // console.table(`O pintor ${pintor.nome}, cobra R$ ${servico} para pintar ${areatotal}m² de parede e tem nota ${pintor.avaliacao}`);

    // Fazer uma lista atualizada com o preço do orçamento calculadoe carregar numa constante
    list.push({
      nome: pintor.nome,
      orcamento: servico,
      nota: pintor.avaliacao,
    });
  });
//   console.log(list);
  return list; // Fazer o retorna da função
}

// fazer o if e else usando reduce para pintor mais barato e pintor mais top

const lista = calculo(pintores, areatotal);
const pechincha = lista.reduce(function (menor, valorfixo) {
  if (valorfixo.orcamento < menor.orcamento) {
    return valorfixo;
  } else {
    return menor;
  }
});

const pintortop = lista.reduce(function (top, valorfixo) {
  if (valorfixo.nota > top.nota) {
    return valorfixo;
  } else {
    return top;
  }
});

// verificando a resposta
console.table(pechincha);
console.table(pintortop);
