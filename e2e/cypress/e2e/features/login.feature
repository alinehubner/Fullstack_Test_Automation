# language: pt
@login
Funcionalidade: Login

  Cenario: Login com sucesso
    Dado que acesso a pagina de login
    Quando realizo login com usuario valido
    Entao devo visualizar a lista de produtos
