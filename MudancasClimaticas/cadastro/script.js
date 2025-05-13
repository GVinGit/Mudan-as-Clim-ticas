const form = document.getElementById("form");
const lista = document.getElementById("clima");

let cadastro = JSON.parse(localStorage.getItem("cadastro")) || [];

function renderInformacoes() {
  lista.innerHTML = "";
  cadastro.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${item.nome}</strong><br>
      Sobrenome: ${item.sobrenome}<br>
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
    nome: form["user"].value,
    sobrenome: form["sobrenome"].value,
    email: form["email"].value,
    senha: form["senha"].value,
    confirmarSenha: form["confirmar-senha"].value,
  };

  if (novaInformacao.senha !== novaInformacao.confirmarSenha) {
    alert("As senhas não coincidem!");
    return;
  }

  const confirmacao = confirm("Deseja prosseguir com o cadastro ou editar as informações?");
  
  if (!confirmacao) {
    form["user"].value = novaInformacao.nome;
    form["sobrenome"].value = novaInformacao.sobrenome;
    form["email"].value = novaInformacao.email;
    form["senha"].value = novaInformacao.senha;
    form["confirmar-senha"].value = novaInformacao.confirmarSenha;
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
  form["user\n"].value = informacao.nome;
  form["sobrenome\n"].value = informacao.sobrenome;
  form["email\n"].value = informacao.email;
  form["senha\n"].value = informacao.senha;
  form["confirmar-senha\n"].value = informacao.senha;
  cadastro.splice(index, 1);
  localStorage.setItem("cadastro", JSON.stringify(cadastro));
  renderInformacoes();
}

renderInformacoes();
