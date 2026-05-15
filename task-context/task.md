## Visão Geral
Este desafio consiste em desenvolver uma aplicação em React que interage com uma API Django para calcular o menor número inteiro divisível por todos os números dentro de um intervalo específico. Você deverá demonstrar competência tanto em desenvolvimento frontend com React quanto em backend com Django.

## Requisitos do Projeto

### Funcionalidades
- **Frontend:**
  - [ ] A aplicação deve ter um formulário com dois campos de entrada para que o usuário possa inserir os números que definem o intervalo (x a y).
  - [ ] Os números inseridos devem ser validados para garantir que:
    - [ ] Ambos os números são inteiros positivos.
    - [ ] O valor de x deve ser menor que y.
    - [ ] O intervalo não deve ser menor ou igual a zero.
  - [ ] Após a inserção e validação dos números, o frontend deve fazer uma requisição à API Django para obter o resultado do cálculo.
  - [ ] A resposta deve ser exibida na mesma página.

- **Backend (API Django):**
  - [ ] Desenvolver uma rota que receba dois números (x e y) via solicitação HTTP.
  - [ ] A API deve calcular o menor número inteiro que é divisível por todos os números do intervalo x a y.
  - [ ] Retornar o resultado para o frontend.

### Tecnologias
- **Frontend:** React
- **Backend:** Django
- **Estilização:** Escolha livre entre CSS puro, pré-processadores (como SASS ou LESS) ou bibliotecas de componentes estilizados (como styled-components).

### Critérios de Avaliação
- Corretude do cálculo realizado pela API.
- Qualidade do código em ambas as partes, frontend e backend.
- Implementação e eficácia das validações de entrada no frontend.
- Design e usabilidade da interface do usuário.
- Integração eficiente entre React e Django.

## Exemplo de Teste
Para garantir a corretude do seu código, utilize o seguinte exemplo:
- **Entrada:** 1 e 10
- **Saída esperada:** 2520

### Verificação:
2520 é o menor número divisível por todos os números de 1 a 10, como demonstrado abaixo:
- 2520 / 1 = 2520 (Divisível)
- 2520 / 2 = 1260 (Divisível)
- 2520 / 3 = 840 (Divisível)
- 2520 / 4 = 630 (Divisível)
- 2520 / 5 = 504 (Divisível)
- 2520 / 6 = 420 (Divisível)
- 2520 / 7 = 360 (Divisível)
- 2520 / 8 = 315 (Divisível)
- 2520 / 9 = 280 (Divisível)
- 2520 / 10 = 252 (Divisível)

Assegure-se de que sua aplicação calcula corretamente este exemplo como parte do processo de desenvolvimento.