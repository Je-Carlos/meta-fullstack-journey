---
type: lesson-note
course: Meta Full Stack Developer
session: course-5-react-basics
lesson: Context API, useContext e useReducer
source: coursera-transcript
status: draft
tags:
  - meta-full-stack
  - react
  - study-notes
created: 2026-04-15
updated: 2026-04-15
---

# Context API, useContext e useReducer

## TL;DR
Quando o estado precisa atravessar muitos níveis da árvore de componentes, passar `props` repetidamente começa a custar caro.
A `Context API` permite centralizar esse estado em um provider e expô-lo diretamente aos componentes consumidores.
O hook `useContext` facilita ler esse valor sem depender de `prop drilling`.
Já `useReducer` é útil quando a atualização de estado depende de ações explícitas e regras de transição mais estruturadas.
Juntos, `useContext` e `useReducer` formam uma base forte para gerenciamento de estado compartilhado em apps React.

## Por que isso importa
Depois de aprender `props`, `state` local e `lifting state up`, o próximo problema natural é escala.

Em apps maiores, é comum que o mesmo dado precise ser consumido por:
- componentes distantes entre si
- vários níveis da árvore
- áreas diferentes da interface

Sem uma estratégia melhor, o código tende a acumular:
- `prop drilling`
- componentes intermediários que só repassam dados
- acoplamento desnecessário
- lógica de atualização espalhada

Essa aula aprofunda três peças importantes do ecossistema React:
- `Context API`
- `useContext`
- `useReducer`

## Conceitos centrais

### 1. Contexto resolve o problema de atravessar várias camadas
O transcript compara duas ideias:
- passar `props` por vários componentes é como pegar um ônibus e parar em cada ponto
- usar contexto é como “teletransportar” o dado até onde ele é necessário

Essa analogia resume bem a proposta da `Context API`.

Em vez de fazer isso:

```text
App -> Main -> Header -> Wrapper -> Button
```

você pode disponibilizar o valor em um provider e consumi-lo diretamente onde precisar.

### 2. O provider é o lugar onde o estado compartilhado vive
Para usar contexto, o primeiro passo é criar um contexto e um componente provider.

No exemplo da aula:
- é criado um contexto de refeições com `React.createContext()`
- o provider mantém o estado compartilhado
- os componentes filhos renderizados dentro dele ganham acesso ao valor

Fluxo conceitual:

```jsx
const MealsContext = React.createContext();

function MealsProvider({ children }) {
  const [meals] = useState(["Breakfast", "Lunch", "Dinner"]);

  return (
    <MealsContext.Provider value={{ meals }}>
      {children}
    </MealsContext.Provider>
  );
}
```

O ponto importante é que o provider não só envolve componentes.
Ele também define qual valor compartilhado estará disponível para quem estiver abaixo dele na árvore.

### 3. `children` representa tudo que o provider envolve
O transcript destaca que o provider recebe `children`.

Isso importa porque:
- `children` representa os componentes aninhados dentro do provider
- esses componentes passam a fazer parte da subárvore que pode consumir o contexto

Exemplo:

```jsx
function App() {
  return (
    <MealsProvider>
      <MealsList />
      <Counter />
    </MealsProvider>
  );
}
```

Aqui, `MealsList` e `Counter` estão dentro do provider e por isso podem acessar o contexto.

### 4. `useContext` simplifica o consumo do valor compartilhado
Depois de definir o provider, os componentes consumidores precisam ler o valor exposto.

É aí que entra `useContext`.

No padrão da aula, isso aparece como um helper customizado:

```jsx
const MealsContext = React.createContext();

export function useMealsListContext() {
  return React.useContext(MealsContext);
}
```

Esse wrapper não é obrigatório, mas costuma ajudar porque:
- encapsula o contexto usado
- deixa o consumo mais legível
- evita repetir `useContext(MealsContext)` em vários arquivos

### 5. Consumidores podem ler o mesmo estado centralizado
No exemplo da aula, tanto `MealsList` quanto `Counter` consomem o mesmo estado.

No componente de lista:

```jsx
function MealsList() {
  const { meals } = useMealsListContext();

  return (
    <>
      {meals.map((meal) => (
        <h2 key={meal}>{meal}</h2>
      ))}
    </>
  );
}
```

No componente contador, a leitura acontece do mesmo jeito:

```jsx
function Counter() {
  const { meals } = useMealsListContext();

  return <p>Number of meals today: {meals.length}</p>;
}
```

Esse é o benefício prático do contexto:
- vários componentes leem a mesma fonte de verdade
- sem precisar receber `props` manualmente em cada etapa da árvore

### 6. Contexto centraliza acesso, não elimina a necessidade de modelagem
A aula chama isso de uma “centralized state store”.

Essa centralização ajuda bastante, mas não significa que todo estado do app deve viver em contexto.

Ainda vale a regra:
- estado local quando o dado pertence a um componente específico
- contexto quando muitos componentes distantes precisam do mesmo dado

Ou seja, contexto reduz o custo de distribuição do estado, mas a decisão sobre onde o estado deve morar continua sendo arquitetural.

### 7. `useReducer` adiciona uma função redutora ao fluxo de estado
O transcript apresenta `useReducer` como uma espécie de “superpoder” do `useState`.

A comparação principal é:
- `useState` recebe um valor inicial
- `useReducer` recebe estado inicial e uma função redutora

Assinatura mental:

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

Aqui:
- `state` é o valor atual
- `dispatch` envia ações
- `reducer` decide como o estado muda com base em cada ação

### 8. O reducer descreve as transições de estado
No exemplo do transcript, há um app de compartilhamento de viagens que representa o dinheiro disponível na carteira.

Regras:
- estado inicial: `100`
- ação “new customer”: aumenta o valor
- ação “refuel”: diminui o valor

O reducer concentra essas decisões:

```jsx
function reducer(state, action) {
  if (action.type === "new_customer") {
    return state + 10;
  }

  if (action.type === "refuel") {
    return state - 50;
  }

  return state;
}
```

Essa abordagem é útil porque a lógica de transição fica explícita, previsível e centralizada.

### 9. `dispatch` substitui setters diretos por ações nomeadas
Em vez de chamar algo como `setMoney(...)`, com `useReducer` você dispara ações:

```jsx
dispatch({ type: "new_customer" });
dispatch({ type: "refuel" });
```

Isso muda o estilo da atualização:
- com `useState`, você normalmente define o próximo valor diretamente
- com `useReducer`, você descreve o evento que aconteceu

Esse padrão tende a ficar melhor quando:
- há várias formas de atualizar o mesmo estado
- as regras de transição são mais complexas
- você quer deixar as mudanças mais explícitas

### 10. `useContext` e `useReducer` combinam bem
Mesmo que o transcript os apresente em blocos diferentes, eles se complementam naturalmente.

Um padrão comum é:
- `useReducer` para controlar a lógica de atualização
- `Context API` para disponibilizar `state` e `dispatch` aos consumidores

Exemplo conceitual:

```jsx
const WalletContext = React.createContext();

function walletReducer(state, action) {
  switch (action.type) {
    case "new_customer":
      return state + 10;
    case "refuel":
      return state - 50;
    default:
      return state;
  }
}

function WalletProvider({ children }) {
  const [money, dispatch] = React.useReducer(walletReducer, 100);

  return (
    <WalletContext.Provider value={{ money, dispatch }}>
      {children}
    </WalletContext.Provider>
  );
}
```

Esse arranjo é uma base comum para estado compartilhado sem recorrer imediatamente a bibliotecas externas.

## Mental model
Pense na `Context API` como infraestrutura de distribuição de estado.
Ela resolve “como o dado chega” aos consumidores.

Pense no `useReducer` como infraestrutura de transição de estado.
Ele resolve “como o dado muda” ao longo do tempo.

Juntos:
- `Context` distribui
- `useContext` consome
- `useReducer` governa mudanças

## Examples

### Exemplo básico com provider e consumidor

```jsx
import React, { useContext, useState } from "react";

const MealsContext = React.createContext();

function MealsProvider({ children }) {
  const [meals] = useState(["Breakfast", "Lunch", "Dinner"]);

  return (
    <MealsContext.Provider value={{ meals }}>
      {children}
    </MealsContext.Provider>
  );
}

function useMealsListContext() {
  return useContext(MealsContext);
}

function MealsList() {
  const { meals } = useMealsListContext();

  return (
    <>
      {meals.map((meal) => (
        <h2 key={meal}>{meal}</h2>
      ))}
    </>
  );
}

function Counter() {
  const { meals } = useMealsListContext();
  return <p>Total meals: {meals.length}</p>;
}
```

### Exemplo básico com `useReducer`

```jsx
import React, { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "new_customer":
      return state + 10;
    case "refuel":
      return state - 50;
    default:
      return state;
  }
}

function Wallet() {
  const [money, dispatch] = useReducer(reducer, 100);

  return (
    <div>
      <h1>Wallet: {money}</h1>
      <button onClick={() => dispatch({ type: "new_customer" })}>
        New Customer
      </button>
      <button onClick={() => dispatch({ type: "refuel" })}>
        Refuel
      </button>
    </div>
  );
}
```

## Common mistakes
- Usar contexto para qualquer estado pequeno e local.
- Achar que `useContext` cria estado por conta própria.
- Confundir provider com consumidor.
- Esquecer de envolver os componentes com o provider antes de consumir o contexto.
- Usar `useReducer` quando um `useState` simples seria mais claro.
- Escrever reducers que mudam o estado de forma implícita ou confusa.
- Disparar ações sem nome consistente ou sem regra clara de transição.

## Connections
- [[12-gerenciando-estados]]
- [[11-hooks-e-usestate]]
- [[10-fluxo-dados-pai-filho]]
- `prop drilling`
- `single source of truth`
- estado compartilhado
- `createContext`

## Interview angle
- O que a `Context API` resolve no React?
- Qual é o papel de um provider?
- O que o hook `useContext` retorna?
- Quando `useReducer` faz mais sentido do que `useState`?
- Qual é a diferença entre `dispatch` e uma setter comum?
- Como `useContext` e `useReducer` podem trabalhar juntos?

## Flashcards
- **Q:** O que a `Context API` ajuda a evitar?
  **A:** A passagem repetitiva de `props` por muitos níveis da árvore de componentes.

- **Q:** Onde o valor compartilhado é definido no contexto?
  **A:** No componente provider, por meio da prop `value` de `Context.Provider`.

- **Q:** O que `useContext` faz?
  **A:** Lê o valor do contexto mais próximo acima do componente consumidor.

- **Q:** O que `useReducer` retorna?
  **A:** Um par com o estado atual e a função `dispatch`.

- **Q:** O que `dispatch` recebe?
  **A:** Um objeto de ação, normalmente com uma propriedade como `type`.

- **Q:** Quando `useReducer` costuma ser útil?
  **A:** Quando o estado tem várias transições possíveis ou regras de atualização mais estruturadas.

## Practice prompts
- Crie um `ThemeContext` com valores `light` e `dark`, depois consuma-o em dois componentes diferentes.
- Reescreva um fluxo com `prop drilling` usando um provider e `useContext`.
- Modele um reducer de carrinho com ações `add_item`, `remove_item` e `clear_cart`.
- Combine contexto e reducer para expor `{ state, dispatch }` a uma subárvore da aplicação.

## Excalidraw brief
- Conceito central: `Estado compartilhado com Context API`
- Nós principais: `provider`, `value`, `children`, `useContext`, `consumer`, `useReducer`, `dispatch`, `reducer`
- Relações:
  - `provider -> expõe -> value`
  - `children -> ficam dentro de -> provider`
  - `useContext -> lê -> value`
  - `useReducer -> retorna -> state`
  - `useReducer -> retorna -> dispatch`
  - `dispatch -> envia -> action`
  - `reducer -> calcula -> próximo estado`
- Layout sugerido:
  - `Context API` no centro
  - à esquerda `provider`, `value` e `children`
  - à direita `consumer` e `useContext`
  - abaixo `useReducer`, `dispatch`, `action` e `reducer`

## References
- Origem: transcrição da aula sobre `Context API`, `useContext` e `useReducer`
- React Docs: `createContext`
- React Docs: `useContext`
- React Docs: `useReducer`
