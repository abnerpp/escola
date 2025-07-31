

const lista = [
    {nome: "arroz", quantidade: 2, precounit: 5.50 },
    {nome: "feijao", quantidade: 3, precounit: 7.70 },
    {nome: "macarrao", quantidade: 5, precounit: 2.20 },
    {nome: "farinha", quantidade: 1, precounit: 4.90 },
    {nome: "acucar", quantidade: 4, precounit: 8.00 },
    {nome: "leitepo", quantidade: 2, precounit: 7.99 },
    {nome: "achocalatado", quantidade: 2, precounit: 14.50 },
    {nome: "cafe", quantidade: 2, precounit: 17.70 }

]

let total = 0;
lista.forEach(function(item){
   // console.log(item)
    const somacompras = item.quantidade * item.precounit
    //console.log(somacompras)
    
    total += somacompras;
    
})

console.log(total);
