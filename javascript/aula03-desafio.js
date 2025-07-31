// Crie uma função que receba a altura e largura de uma parede,
// calcule a area da parede
// e retorne o preço do serviço
// com base na lista de pintores, retorne o pintor mais barato e o melhor pintor
const pintores = [
    {
        nome: "João",
        preco: 100,
        desperdicio: 30, //%
        avaliacao: 4.3
    },
    {
        nome: "Breno",
        preco: 150,
        desperdicio: 10, //%
        avaliacao: 4.8
    },
    {
        nome: "Pedro",
        preco: 200,
        desperdicio: 40, //%
        avaliacao: 5
    },
    {
        nome: "Josué",
        preco: 10,
        desperdicio: 5,
        avaliacao: 4.9
    }



]

const parede = {
    altura: 6, //m²
    largura: 20 //m²
}

//criar função altura e largura
function area(parede) {
    const totalarea = parede.largura * parede.altura
    return totalarea;
    
}
const totalarea = area(parede); //criar uma constante com area total


// CALCULAR PREÇO POR METRO DE CADA PINTOR
function calc(pintores, totalarea) {
    const list = [];                            //fiz a lista para tentar chamar o mais caro e o mais barato criando uma lista diferente

    pintores.forEach(function(pintor) {        // fiz o forearch para pegar toda a lista de pintores de uma lapada só
        const servico = totalarea * pintor.preco * (1 + pintor.desperdicio / 100);  // calcula o servico aproveitando o que o forearch listou
        const nota = pintor.avaliacao;

        // console.log(`${pintor.nome}, cobra: R$ ${servico} pelo serviço e tem uma avaliação: ${nota}`); // feito para testar a saida enquanto construo a lógica

        
        list.push({                     // Insere uma lista com formato diferente para carregar a constante list.
            nome: pintor.nome,
            precofinal: servico,
            avaliacao: pintor.avaliacao

            
        });

        
    });
    

    // console.log(list); //testando a lista
    return list;   // mandando a lista la p cima na constante list
        
            
}  



area(parede)                  // chamando as funções
calc(pintores, totalarea)    // chamando as funções


// A lista esta assim, vou usar o "reduce" que tem uma função como o "forearch" de pecorrer todos os dados,
// a diferença é: o reduce guarda valores.
// 
//   { nome: 'João', 'precofinal': 15600, avaliacao: 4.3 },
//   { nome: 'Breno', 'precofinal': 19800, avaliacao: 4.8 },
//   { nome: 'Pedro', 'precofinal': 33600, avaliacao: 5 },
//   { nome: 'Josué', 'precofinal': 26460, avaliacao: 4.9 }

//Vou testar uma funçaõ if e else



const list = calc(pintores, totalarea);
const maisbarato = list.reduce(function(menor, comparador){   //estrutura de uma função function() {}
    if (comparador.precofinal < menor.precofinal) {
        return comparador;}
        else{
            return menor;
        }

});

const pintortop = list.reduce(function(menor, comparador){
    // console.log(menor) //estrutura de uma função function() {}
    if (comparador.precofinal > menor.precofinal) {
        return comparador;}
        else{
            return menor;
        }

});

console.log(maisbarato)
// console.log(pintortop)
// console.table(maisbarato)
// console.table(pintortop)
// console.log(`O mais barato é: ${maisbarato}`);
