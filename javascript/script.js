const list = [];
let total = 0;

function adicionarItem() {
  const nome = document.getElementById("nome").value;
  const quantidade = parseFloat(document.getElementById("quantidade").value);
  const valorunit = parseFloat(document.getElementById("valorunit").value);

  const item = { nome, quantidade, valorunit };
  list.push(item);

  const valorTotalItem = quantidade * valorunit;
  total += valorTotalItem;

  // Atualiza a lista na tela
  const li = document.createElement("li");
  li.textContent = `${nome} - ${quantidade}x R$${valorunit.toFixed(2)} = R$${valorTotalItem.toFixed(2)}`;
  document.getElementById("lista-itens").appendChild(li);

  // Atualiza o total
  document.getElementById("total").textContent = `Valor total da feira: R$ ${total.toFixed(2)}`;

  // Limpa os campos
  document.getElementById("nome").value = "";
  document.getElementById("quantidade").value = "";
  document.getElementById("valorunit").value = "";
}
