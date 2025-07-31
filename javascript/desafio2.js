// Crie um script que manipule uma lista de compras. A lista deve conter objetos pelo menos 5 objetos:
//Mostre no console o nome de todos os produtos.
//Calcule o valor total da compra.


const list = [
    {nome: "Arroz", quantidade: 4, valorunit: 4.80},
    {nome: "Feijao", quantidade: 2, valorunit: 7.60},
    {nome: "Macarrao", quantidade: 5, valorunit: 2.20},
    {nome: "Farinha", quantidade: 2, valorunit: 3.40},
    {nome: "Leite", quantidade: 2, valorunit: 31.00},
    {nome: "Achocolatado", quantidade: 1, valorunit: 15.80},
    {nome: "Manteiga", quantidade: 1, valorunit: 12.80},
    {nome: "Acucar", quantidade: 4, valorunit: 5.80},
]

let total = 0;

list.forEach(function(item){
    //console.log(item.nome);
    const valorcompras = item.quantidade * item.valorunit;
    //console.log(`${item.nome} --> R$ ${valorcompras}`);
    total += valorcompras;
});

console.log(`O valor total da feira foi: R$ ${total}`);