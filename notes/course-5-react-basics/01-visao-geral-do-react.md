---
type: lesson-note
course: Meta Full Stack Developer
session: course-5-react-basics
lesson: Visão geral do React
source: coursera-transcript
status: draft
tags:
  - meta-full-stack
  - react
  - study-notes
created: 2026-04-02
updated: 2026-04-02
---

# Visão geral do React

## TL;DR
React é uma biblioteca JavaScript usada para construir interfaces de usuário, especialmente em aplicações do tipo SPA.
Seu principal diferencial é a arquitetura baseada em componentes: a interface é dividida em partes independentes, reutilizáveis e combináveis.
Em vez de manipular o DOM diretamente o tempo todo, React usa o Virtual DOM para calcular mudanças e aplicar apenas o mínimo necessário no navegador.
Isso torna o desenvolvimento mais organizado e a atualização da interface mais eficiente.

## Por que isso importa
React importa porque resolve um problema real do front-end moderno: interfaces grandes mudam o tempo inteiro, e manipular o DOM manualmente escala mal.

Em projetos reais, isso se traduz em:
- código mais modular
- melhor reaproveitamento de UI
- manutenção mais simples
- menor chance de virar "código espaguete"
- mais flexibilidade para interfaces ricas
- melhor escalabilidade de desenvolvimento em equipe

Também é a base para quase todo o ecossistema React: [[Componentes React]], props, state, hooks, roteamento e renderização.

## Conceitos centrais

### 1. SPA (Single Page Application)
Uma SPA é uma aplicação em que a página principal continua a mesma, mas partes do conteúdo mudam conforme a interação do usuário.

Na prática:
- o usuário pesquisa algo
- o conteúdo da tela muda
- a experiência parece fluida
- nem sempre ocorre recarga completa da página
- muitas vezes a URL nem muda durante a interação

Isso difere de sites tradicionais, nos quais cada navegação costuma recarregar outra página inteira, inclusive partes repetidas como logo, navegação e rodapé.

### 2. React como biblioteca de UI
React é uma biblioteca criada pela Meta para construir interfaces com foco em composição de componentes.

Ele não é "o site inteiro por conta própria". O papel principal do React é descrever e atualizar a UI de forma eficiente.

### 3. Arquitetura baseada em componentes
Componentes são blocos independentes de interface e comportamento.

Cada componente encapsula:
- estrutura
- estilo
- lógica

Exemplos comuns:
- `Header`
- `PaymentForm`
- `Sidebar`
- `SearchBar`
- `CartButton`

Esses blocos podem ser reutilizados e combinados para formar componentes maiores e, no limite, uma aplicação inteira.
Como cada componente isola bem sua responsabilidade, vários desenvolvedores podem trabalhar no mesmo produto com menos interferência entre si.

### 4. Reutilização e composição
Em React, uma interface complexa nasce da composição de componentes simples.

Exemplo mental:
- um botão é um componente
- um formulário usa vários componentes
- uma página usa vários formulários, botões, cabeçalhos e painéis

Essa composição facilita dividir trabalho entre desenvolvedores sem que todos precisem mexer no mesmo trecho de código.

### 5. DOM e Virtual DOM
O DOM é a representação em árvore da página no navegador.

Antes de bibliotecas modernas, atualizar interfaces complexas exigia bastante manipulação manual do DOM, o que aumentava a complexidade do código.

React introduz o Virtual DOM, que é uma representação em memória da interface. A ideia central é:
- React detecta o que mudou
- compara a nova representação com a anterior
- aplica no DOM real apenas as mudanças necessárias

Isso reduz trabalho desnecessário no navegador e ajuda no desempenho percebido.

### 6. Renderização de componentes
Renderizar um componente significa transformar sua definição em interface visível na tela.

No React, isso acontece de forma orientada a componentes:
- cada parte da UI é descrita como componente
- React decide como refletir essa descrição no DOM real
- atualizações acontecem sem exigir manipulação manual de cada nó pelo desenvolvedor

## Mental model
Pense no React como um sistema de montagem com peças reutilizáveis.

Em vez de reconstruir a casa inteira sempre que você troca uma janela, React identifica qual peça mudou e atualiza só aquela parte.

Outra forma de lembrar:
- componentes = blocos LEGO da interface
- Virtual DOM = rascunho inteligente antes da mudança real
- renderização = momento em que React reflete a mudança na tela

## Exemplos

### Exemplo mínimo
Um componente simples em React:

```jsx
function Welcome() {
  return <h1>Olá, React!</h1>;
}
```

Esse componente representa uma pequena parte da interface e pode ser reutilizado em outros lugares.

### Exemplo mais próximo do mundo real
Uma página de checkout pode ser pensada como composição de componentes:

```jsx
function CheckoutPage() {
  return (
    <>
      <Header />
      <PaymentSection />
      <OrderSummary />
    </>
  );
}
```

Cada parte pode ter sua própria lógica:
- `Header` mostra navegação e carrinho
- `PaymentSection` coleta e envia pagamento
- `OrderSummary` exibe o resumo do pedido

Isso deixa a UI mais clara do que uma única página gigante com HTML, CSS e JavaScript misturados.

## Erros comuns
- Achar que React é um framework completo por si só. Ele é principalmente uma biblioteca para UI.
- Confundir SPA com "nunca muda de URL". Algumas SPAs mudam a URL com roteamento client-side.
- Pensar que cada componente precisa ser grande. Em geral, componentes menores e bem definidos são mais fáceis de manter.
- Supor que React "não usa DOM". Ele usa o DOM real, mas evita manipulação manual direta como estratégia principal.
- Assumir que Virtual DOM significa desempenho automático em qualquer caso. Ele ajuda bastante, mas arquitetura ruim ainda gera interfaces lentas.

## Conexões
- [[Componentes React]]
- [[JSX]]
- [[props]]
- [[state]]
- [[renderização]]

## Ângulo de entrevista
- O que é uma SPA e como ela difere de um site tradicional?
- Por que a arquitetura baseada em componentes é útil em aplicações front-end?
- Qual é a função do Virtual DOM no React?
- Como React ajuda a evitar código difícil de manter no front-end?
- Qual a diferença entre atualizar a UI com React e manipular o DOM manualmente?

## Flashcards
- **Q:** O que é uma SPA?
  **A:** Uma aplicação de página única em que partes da interface mudam sem exigir recarga completa da página a cada interação.

- **Q:** Qual é a principal unidade de construção no React?
  **A:** O componente.

- **Q:** O que torna componentes valiosos?
  **A:** Reutilização, isolamento de responsabilidades e facilidade de composição.

- **Q:** O que é o Virtual DOM?
  **A:** Uma representação em memória da UI usada pelo React para calcular atualizações mínimas no DOM real.

- **Q:** Qual problema React ajuda a reduzir?
  **A:** Complexidade excessiva de manipulação manual do DOM em interfaces dinâmicas.

## Prática guiada
- Explique, com suas palavras, por que um checkout pode ser dividido em componentes.
- Desenhe a árvore de componentes de uma página com `Header`, `MainContent` e `Footer`.
- Compare um site tradicional e uma SPA em termos de navegação e atualização de conteúdo.
- Escreva um componente React simples e descreva qual responsabilidade ele deveria ter.

## Excalidraw brief
- Conceito central: `React`
- Nós principais: `SPA`, `Componentes`, `Composição`, `DOM`, `Virtual DOM`, `Renderização`
- Relações:
  - `React -> usa -> Componentes`
  - `Componentes -> formam -> UI`
  - `React -> otimiza atualização com -> Virtual DOM`
  - `Virtual DOM -> atualiza minimamente -> DOM real`
  - `SPA -> se beneficia de -> atualizações parciais`
- Layout sugerido:
  - `React` no centro
  - `Componentes` e `Virtual DOM` em destaque lateral
  - `SPA` acima como contexto de uso
  - `DOM real` abaixo conectado ao `Virtual DOM`

## Referências
- Curso: Meta Full Stack Developer
- Sessão: `course-5-react-basics`
- Origem: transcrição da aula introdutória sobre fundamentos do React
