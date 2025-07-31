// crie um algoritimo para ver se o aluno ta aprovado com a media de 3 notas

//const nota1 = 10
//const nota2 = 7
//const nota3 = 5
//const media = (nota1 + nota2 + nota3) / 3

//if (media >= 7){ 
//    console.log(`aprovado sua media é: ${media.toFixed(3)}`)

//} else {
//    console.log("reprovado")
//}

//calcule a area de uma parede
//valor da pintura 100
//cada balde é 100 reais e pinta 3 Metros 
//se for mais de 10 metro o pintor cobra 20% por metro extra

//info da area
const alt = 2
const larg = 3
const area = alt * larg

//tinta
const valordatinta = 100
const baldepinta = 3
const quantidatinta = area / baldepinta

//serviço
const pintor = 50
const gastocomtinta = quantidatinta * valordatinta
const servicopintura = pintor * area
const taxa = servicopintura * 0.2


if (area > 10) { 
    const totalservico = servicopintura + taxa
        console.log(`
                    Valor cobrado com taxa: ${totalservico}
                    Total em área: ${area}
                    Total de tinta usada: ${quantidatinta.toFixed(2)}
                    Total de gasto com tinta: ${gastocomtinta.toFixed(2)}
                    Valor do serviço por metro: ${servicopintura}
                    Custo total da obra: ${totalservico.toFixed(2) + gastocomtinta.toFixed(2)}
                    CONCLUSÃO DA DIRETORIA: MELHOR CONTRATAR 8 PINTORES`)
} else { 
    const totalservico2 = servicopintura
        console.log(`Valor cobrado sem taxa: ${totalservico2}
                    Total em área: ${area}
                    Total de tinta usada: ${quantidatinta.toFixed(2)}
                    Total de gasto com tinta: ${gastocomtinta.toFixed(2)}
                    Valor do serviço por metro: ${servicopintura}
                    Custo total da obra: ${totalservico2 + gastocomtinta}`)
}





