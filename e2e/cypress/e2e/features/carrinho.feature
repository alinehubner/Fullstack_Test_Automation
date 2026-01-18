# language: pt
@carrinho
Funcionalidade: Carrinho

  Cenário: Adicionar produto ao carrinho
    Dado que estou logado na aplicação
    Quando adiciono um produto ao carrinho
    Então devo visualizar o produto no carrinho
