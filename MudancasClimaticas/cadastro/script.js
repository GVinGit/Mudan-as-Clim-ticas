
const form = document.getElementById("form");
const lista = document.getElementById("clima");

let cadastro = JSON.parse(localStorage.getItem("cadastro")) || [];

function renderInformacoes() {
  lista.innerHTML = "";

  cadastro.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${item.nome}</strong><br>
      sobrenome: ${item.sobrenome}<br>
      Email: ${item.email}<br>
      Senha: ${item.senha}<br>
      <button onclick="editar(${index})">Editar</button>
      <button onclick="remover(${index})">Remover</button>
    `;
    lista.appendChild(li);
  });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const novaInformacao = {
    nome: form["nome"].value,
    sobrenome: form["sobrenome"].value,
    email: form["email"].value,
    senha: form["senha"].value,
    confirmarSenha: form["confirmar-senha"].value,
  };

  if (novaInformacao.senha !== novaInformacao.confirmarSenha) {
    alert("As senhas não coincidem!");
    return;
  }

  cadastro.push(novaInformacao);
  localStorage.setItem("cadastro", JSON.stringify(cadastro));
  form.reset();
  renderInformacoes();
});

function remover(index) {
  cadastro.splice(index, 1);
  localStorage.setItem("cadastro", JSON.stringify(cadastro));
  renderInformacoes();
}

function editar(index) {
  const informacao = cadastro[index];
  form["nome"].value = informacao.nome;
  form["sobrenome"].value = informacao.sobrenome;
  form["email"].value = informacao.email;
  form["senha"].value = informacao.senha;
  form["confirmar-senha"].value = informacao.senha;

  cadastro.splice(index, 1);
  renderInformacoes();
}

renderInformacoes();
