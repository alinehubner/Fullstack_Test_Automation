# language: pt
@checkout
Funcionalidade: Checkout

  Cenário: Finalizar compra com sucesso
    Dado que tenho um produto no carrinho
    Quando finalizo o checkout preenchendo os dados
    Então devo visualizar a confirmação do pedido
