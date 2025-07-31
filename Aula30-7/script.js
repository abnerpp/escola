// DOM

const altura = document.getElementById("altura")
const peso = document.getElementById("peso")
const botao = document.getElementById("botao")
const resultado = document.getElementById("resultado")
const resImc = document.getElementById("res-imc")
const resDescricao = document.getElementById("res-descricao")

function calcularImc () {
    const imc = peso.value / (altura.value * altura.value)
    resultado.classList.remove("hidden")

    resImc.textContent = imc.toFixed(2)
    if (imc < 18.5) {
        resDescricao.textContent = "Cuidado como ventos fortes, ta mago de + llkkkkk"
        return
    }
        if(imc >= 18.5 && imc <= 24.9){
        resDescricao.textContent = "Você está no peso ideal"
        return
    } 

    if(imc >= 25 && imc <= 29.9){
        resDescricao.textContent = "Você estpa sobrepeso"
        return
    }

    if(imc >= 30 && imc <= 39.9){
        resDescricao.textContent = "Você está com obesidade grau 1"
        return
    }

    if(imc >= 40){
        resDescricao.textContent = "Você está com obesidade grau 2"
        return
    }
}

botao.addEventListener("click", calcularImc)