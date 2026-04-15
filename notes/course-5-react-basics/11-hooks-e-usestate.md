---
type: lesson-note
course: Meta Full Stack Developer
session: course-5-react-basics
lesson: Hooks e useState
source: coursera-transcript
status: draft
tags:
  - meta-full-stack
  - react
  - study-notes
created: 2026-04-14
updated: 2026-04-14
---

# Hooks e useState

## TL;DR
Hooks são funções do React que permitem usar recursos como `state` e ciclo de vida em componentes funcionais.
O hook mais básico e frequente é `useState`, usado para armazenar e atualizar estado local.
Ao chamar `useState`, você recebe um par: o valor atual e uma função para atualizá-lo.
Hooks deixam o código mais legível, reduzem repetição de lógica e permitem extrair comportamento reutilizável em custom hooks.

## Por que isso importa
Sem hooks, componentes funcionais ficariam limitados ou exigiriam padrões mais verbosos para lidar com estado e lógica reutilizável.

Na prática, `useState` aparece em:
- campos de formulário
- menus abertos ou fechados
- contadores
- mensagens temporárias
- filtros e buscas

Essa aula também prepara terreno para:
- [[09-user-events]]
- formulários controlados
- custom hooks
- `useRef`
- outros hooks como `useContext` e `useMemo`

## Conceitos centrais

### 1. O que são hooks
Hooks são funções introduzidas no React 16.8.

Eles permitem conectar componentes funcionais a recursos do React, especialmente:
- `state`
- efeitos
- referências
- contexto

Em vez de espalhar lógica entre padrões mais pesados, hooks concentram comportamento em funções pequenas e previsíveis.

### 2. O que `useState` retorna
Ao chamar `useState`, o React devolve um array com dois itens:
- o valor atual do estado
- a função que atualiza esse estado

Por isso a forma idiomática é usar destructuring:

```jsx
const [showMenu, setShowMenu] = useState(false);
```

Nesse exemplo:
- `showMenu` é o valor atual
- `setShowMenu` é a função de atualização
- `false` é o valor inicial

### 3. Convenção de nomes
Os nomes são livres, mas a convenção é:
- estado: nome descritivo
- setter: `set` + nome do estado

Exemplo:

```jsx
const [count, setCount] = useState(0);
const [name, setName] = useState("");
const [form, setForm] = useState({ firstName: "", lastName: "", email: "" });
```

Isso melhora leitura e reduz ambiguidade.

### 4. `useState` pode guardar vários tipos de dados
O estado não se limita a booleanos.

Você pode armazenar:
- strings
- numbers
- booleans
- arrays
- objects

Isso faz de `useState` um mecanismo geral para estado local do componente.

### 5. Estado local pertence ao componente
Quando um componente declara:

```jsx
const [inputText, setInputText] = useState("hello");
```

esse valor existe dentro daquele componente.
Fora dele, esse estado não está disponível automaticamente.

Esse é um ponto central do React:
- `state` é local ao componente
- `props` vêm de fora

### 6. Atualizar estado dispara nova renderização
Você não altera o valor diretamente.
Em vez disso, chama a função setter:

```jsx
setInputText("novo valor");
```

Esse padrão importa porque o React usa a atualização de estado para decidir quando renderizar novamente.

### 7. Exemplo clássico com input controlado
Um caso simples é acompanhar o que o usuário digita em um campo.

```jsx
import { useState } from "react";

function InputComponent() {
  const [inputText, setInputText] = useState("hello");

  function handleChange(e) {
    setInputText(e.target.value);
  }

  function handleReset() {
    setInputText("hello");
  }

  return (
    <div>
      <input value={inputText} onChange={handleChange} />
      <p>{inputText}</p>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}
```

Fluxo:
- o usuário digita
- o `onChange` dispara
- `handleChange` lê `e.target.value`
- `setInputText` atualiza o estado
- o componente renderiza de novo com o novo texto

### 8. Vários campos podem viver em um único objeto
Quando vários inputs fazem parte do mesmo contexto, pode ser melhor consolidá-los em um objeto:

```jsx
import { useState } from "react";

function SignUpForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <>
      <input
        name="firstName"
        value={form.firstName}
        onChange={handleChange}
      />
      <input
        name="lastName"
        value={form.lastName}
        onChange={handleChange}
      />
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
      />
    </>
  );
}
```

Isso não é obrigatório, mas costuma deixar formulários pequenos e médios mais legíveis.

### 9. Regras dos hooks
Hooks vêm com regras fixas:

- chame hooks apenas no nível superior do componente ou de custom hooks
- não chame hooks dentro de loops
- não chame hooks dentro de condições
- chame hooks apenas em funções React ou em custom hooks, não em funções JavaScript comuns

Essas regras existem para o React conseguir associar corretamente cada hook ao componente e à ordem de execução.

### 10. Custom hooks
Além dos hooks nativos, você pode criar custom hooks.

A ideia é extrair lógica repetida para uma função reutilizável.
Isso é útil em casos como:
- formulários
- timers
- animações
- acesso a APIs
- sincronização com `localStorage`

Custom hooks melhoram reutilização sem exigir copiar lógica entre componentes.

### 11. Introdução a `useRef`
O transcript também introduz `useRef`.

`useRef` retorna um objeto com a propriedade `current`, usado com frequência para acessar diretamente um elemento do DOM.

Exemplo:

```jsx
import { useRef } from "react";

function SearchBox() {
  const inputRef = useRef(null);

  function handleFocus() {
    inputRef.current.focus();
  }

  return (
    <>
      <input ref={inputRef} />
      <button onClick={handleFocus}>Focus input</button>
    </>
  );
}
```

Isso é útil quando você realmente precisa tocar o DOM diretamente, como focar um campo.

## Mental model
Pense em hooks como pontos de conexão entre um componente funcional e capacidades internas do React.

No caso de `useState`:
- o componente ganha memória
- essa memória guarda um valor atual
- a setter troca esse valor de forma que o React consiga reagir

Outra forma de lembrar:
- `useState` = memória local + mecanismo oficial de atualização

## Examples

### Exemplo mínimo

```jsx
import { useState } from "react";

function Menu() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <button onClick={() => setShowMenu(!showMenu)}>
      {showMenu ? "Hide menu" : "Show menu"}
    </button>
  );
}
```

### Exemplo mais prático

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  function handleIncrement() {
    setCount(count + 1);
  }

  function handleReset() {
    setCount(0);
  }

  return (
    <div>
      <p>Clicked {count} times</p>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}
```

## Common mistakes
- Tentar alterar a variável de estado diretamente em vez de usar a setter.
- Chamar `useState` dentro de `if`, `for` ou qualquer fluxo condicional.
- Achar que o estado local fica disponível fora do componente.
- Criar várias variáveis soltas quando um objeto simples tornaria o formulário mais claro.
- Confundir `useRef` com `useState`: `useRef` não existe para renderizar valores na UI.
- Usar hooks em funções JavaScript comuns que não são componentes nem custom hooks.

## Connections
- [[09-user-events]]
- [[10-fluxo-dados-pai-filho]]
- [[03-components-props-principle]]
- estado local
- formulários controlados
- custom hooks

## Interview angle
- O que um hook resolve no React?
- O que `useState` retorna?
- Qual é a diferença entre estado local e `props`?
- Por que hooks não podem ser chamados dentro de condições?
- Quando faz sentido agrupar vários campos em um único objeto de estado?
- Para que `useRef` é usado?

## Flashcards
- **Q:** O que `useState` retorna?
  **A:** Um par com o valor atual do estado e a função que atualiza esse valor.

- **Q:** Onde hooks devem ser chamados?
  **A:** No nível superior de componentes React ou custom hooks.

- **Q:** `useState` pode armazenar apenas booleanos?
  **A:** Não. Pode armazenar strings, numbers, arrays, objects, booleans e outros valores.

- **Q:** O que significa dizer que `state` é local?
  **A:** Que ele pertence ao componente que o declarou e não fica disponível automaticamente fora dele.

- **Q:** Quando `useRef` costuma ser útil?
  **A:** Quando você precisa acessar diretamente um elemento do DOM, como focar um input.

- **Q:** Por que custom hooks são úteis?
  **A:** Porque permitem extrair e reutilizar lógica entre componentes sem duplicação.

## Practice prompts
- Crie um componente com `useState(false)` para abrir e fechar um menu.
- Faça um input controlado com valor inicial `"hello"` e um botão de reset.
- Modele um formulário com `firstName`, `lastName` e `email` dentro de um único objeto `form`.
- Implemente um botão que chama `focus()` em um input usando `useRef`.

## Excalidraw brief
- Conceito central: `Hooks no React`
- Nós principais: `hooks`, `useState`, `state local`, `setter`, `re-render`, `custom hooks`, `useRef`
- Relações:
  - `hooks -> conectam -> componente funcional`
  - `useState -> cria -> state local`
  - `useState -> retorna -> [valor, setter]`
  - `setter -> dispara -> re-render`
  - `custom hooks -> extraem -> lógica reutilizável`
  - `useRef -> acessa -> DOM`
- Layout sugerido:
  - `hooks` no centro
  - `useState` à esquerda com seta para `valor atual` e `setter`
  - `setter` apontando para `re-render`
  - `useRef` à direita apontando para `input DOM`
  - `custom hooks` abaixo como camada de reutilização

## References
- Origem: transcrição da aula sobre hooks, `useState` e introdução a `useRef`
- React Docs: Hooks
- React Docs: `useState`
- React Docs: `useRef`
