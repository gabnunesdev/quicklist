// Definindo os elementos
const form = document.querySelector("form");
const lista = document.querySelector("#lista");
const input = document.getElementById("itemInput");
const footer = document.querySelector("footer");

// Carregar os itens salvos ao iniciar a página
document.addEventListener("DOMContentLoaded", carregarItens);

form.addEventListener("submit", (event) => {
  event.preventDefault(); // Previne recarregamento da página
  const nome = input.value.trim();

  if (nome !== "") {
    adicionarItem(nome);
    input.value = ""; // Limpa o campo
    salvarItens(); // Atualiza o localStorage após adicionar item
  }
});

function adicionarItem(nome) {
  // Criar elementos
  let li = document.createElement("li");

  let div = document.createElement("div");
  div.classList.add("checkbox-group");

  let input = document.createElement("input");
  input.type = "checkbox";
  input.name = "item";

  // Gerar ID baseado no nome (substitui espaços por hífen e coloca em minúsculas)
  let id = nome.toLowerCase().replace(/\s+/g, "-");
  input.id = id;

  let label = document.createElement("label");
  label.htmlFor = id;
  label.textContent = nome;

  let button = document.createElement("button");
  button.classList.add("btn-remove");

  let img = document.createElement("img");
  img.src = "assets/icons/delete-icon.svg";
  img.alt = "";

  // Montar estrutura
  button.appendChild(img);
  div.appendChild(input);
  div.appendChild(label);
  li.appendChild(div);
  li.appendChild(button);

  lista.appendChild(li);

  // Adicionar evento para remover item
  button.addEventListener("click", () => {
    removerItem(nome, li);
  });
}

// Função para remover item e atualizar o localStorage
function removerItem(nome, elemento) {
  elemento.remove();
  mostrarAlerta();

  // Remover do localStorage
  let itens = JSON.parse(localStorage.getItem("listaCompras")) || [];
  itens = itens.filter((item) => item !== nome);
  localStorage.setItem("listaCompras", JSON.stringify(itens));
}

// Adicionar evento para remover itens que já estão no HTML ao iniciar
document.querySelectorAll(".btn-remove").forEach((button) => {
  button.addEventListener("click", (event) => {
    const li = event.target.closest("li");
    const nome = li.querySelector("label").textContent;
    removerItem(nome, li);
  });
});

function mostrarAlerta() {
  footer.classList.add("show-alert");

  // Remover o alerta após alguns segundos
  setTimeout(() => {
    footer.classList.remove("show-alert");
  }, 3000);
}

// Função para salvar os itens no LocalStorage
function salvarItens() {
  const itens = [...lista.querySelectorAll("label")].map(
    (label) => label.textContent
  );
  localStorage.setItem("listaCompras", JSON.stringify(itens));
}

// Função para carregar os itens salvos no LocalStorage
function carregarItens() {
  const itensSalvos = JSON.parse(localStorage.getItem("listaCompras")) || [];
  itensSalvos.forEach((item) => adicionarItem(item));
}
