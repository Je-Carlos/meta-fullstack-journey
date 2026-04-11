---
type: lesson-note
course: Meta Full Stack Developer
session: course-5-react-basics
lesson: Tipos de eventos
source: coursera-transcript
status: draft
tags:
  - meta-full-stack
  - react
  - study-notes
created: 2026-04-06
updated: 2026-04-06
---

# Tipos de eventos

## TL;DR
Eventos são o mecanismo que conecta interação do usuário e comportamento da interface.
No React, eles são tratados com atributos JSX como `onClick`, `onChange` e `onKeyDown`, escritos em camelCase.
React expõe muitos grupos de eventos, como mouse, teclado, clipboard e composição, mas você não precisa decorar todos.
O mais importante no início é entender o fluxo geral: um evento acontece, um handler é disparado e algum código atualiza a UI.

## Por que isso importa
Quase toda interface real depende de eventos:
- clicar em botão
- digitar em formulário
- copiar e colar conteúdo
- abrir menus
- enviar dados

Sem entender eventos, componentes React ficam estáticos.
Com eles, a UI passa a responder ao usuário e você começa a conectar JSX, funções JavaScript e atualização de estado.

Isso também prepara terreno para estudar melhor:
- `state`
- formulários controlados
- atualização de UI
- interação entre componentes

## Conceitos centrais

### 1. O que é um evento
Um evento é algo que acontece na página e pode ser observado pelo JavaScript.

Exemplos comuns:
- clique do mouse
- tecla pressionada
- texto colado
- foco em um campo
- envio de formulário

Em termos práticos, o navegador detecta a ação e o código responde a ela.

### 2. Eventos conectam HTML, JavaScript e UI
Eventos são a ponte entre uma ação e uma reação na interface.

Fluxo mental:
- o usuário interage
- o navegador detecta o evento
- o React chama a função associada
- seu código executa alguma lógica
- a interface pode mudar

Esse disparo do evento costuma ser chamado de trigger.

### 3. Event listeners no HTML e no React
No HTML tradicional, você pode encontrar atributos como `onclick`.

No React, a ideia é parecida, mas a sintaxe muda:
- HTML: `onclick`
- React JSX: `onClick`

Essa diferença importa porque o React usa convenções de JavaScript no JSX, especialmente camelCase.

### 4. React usa atributos de evento em JSX
No React, você passa uma função para o atributo do evento.

Exemplo:

```jsx
function App() {
  function handleClick() {
    console.log("Botao clicado");
  }

  return <button onClick={handleClick}>Comprar</button>;
}
```

Aqui:
- `onClick` é o atributo de evento
- `handleClick` é o event handler
- o código dentro da função roda quando o clique acontece

### 5. Há muitos grupos de eventos
React suporta vários tipos de eventos organizados em grupos.

Alguns grupos citados na aula:
- eventos de mouse
- eventos de teclado
- eventos de clipboard
- eventos de composição

Exemplos úteis:
- mouse: `onClick`, `onDoubleClick`, `onContextMenu`
- clipboard: `onCopy`, `onCut`, `onPaste`
- teclado: `onKeyDown`, `onKeyUp`

Você não precisa memorizar todos.
O importante é saber que o React reaproveita capacidades do navegador e organiza isso em uma API consistente.

### 6. Esses eventos não surgiram do React
Boa parte desses eventos vem do próprio navegador e da evolução das interfaces web.

Ou seja:
- React não inventou a maioria dos eventos
- React oferece uma forma padronizada de usá-los em componentes
- muitos eventos existem porque usuários interagem com sites de várias maneiras e dispositivos

### 7. Nem todo evento é igualmente importante no início
Alguns eventos aparecem o tempo inteiro em aplicações reais, enquanto outros são mais específicos.

No começo, foque mais em:
- `onClick`
- `onChange`
- `onSubmit`
- `onKeyDown`
- `onFocus`
- `onBlur`

Eventos mais ligados a APIs específicas, como partes de drag and drop, podem ficar para depois.

## Mental model
Pense em eventos como campainhas da interface.

Quando algo acontece:
- o usuário clica
- digita
- cola um texto

a campainha toca, e o React chama a função responsável por responder.

Outra forma de lembrar:
- evento = sinal de que algo aconteceu
- handler = função que responde ao sinal
- UI dinâmica = consequência dessa resposta

## Exemplos

### Exemplo mínimo

```jsx
function Button() {
  function handleClick() {
    alert("Item adicionado");
  }

  return <button onClick={handleClick}>Adicionar ao carrinho</button>;
}
```

Esse é o caso mais básico:
- acontece um clique
- o handler é executado
- a aplicação responde

### Exemplo mais próximo do mundo real

```jsx
import { useState } from "react";

function CartButton() {
  const [count, setCount] = useState(0);

  function handleAddToCart() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleAddToCart}>
      Carrinho ({count})
    </button>
  );
}
```

Aqui o evento de clique faz mais do que mostrar uma mensagem:
- ele dispara uma função
- a função atualiza o `state`
- o componente renderiza de novo
- a UI mostra a nova contagem

Isso representa bem o exemplo citado na aula de incrementar a quantidade no carrinho.

### Exemplo com teclado e clipboard

```jsx
function Editor() {
  return (
    <textarea
      onKeyDown={() => console.log("Tecla pressionada")}
      onPaste={() => console.log("Conteudo colado")}
    />
  );
}
```

Isso mostra que eventos não se limitam a clique:
- teclado gera eventos
- clipboard também gera eventos

## Erros comuns
- Escrever `onclick` em JSX em vez de `onClick`.
- Achar que eventos do React são totalmente diferentes dos eventos do navegador.
- Tentar decorar todos os tipos de eventos cedo demais.
- Esquecer que o atributo de evento deve receber uma função, não o resultado da função.
- Confundir “evento” com “função handler”. O evento acontece; o handler responde.
- Supor que todo evento precisa alterar a interface. Às vezes ele só registra, valida ou envia dados.

## Conexões
- [[05-apresentando-jsx]]
- [[02-introducao-aos-componentes-funcionais]]
- [[03-components-props-principle]]
- `state`
- formulários
- atualização de interface

## Ângulo de entrevista
- O que é um evento em uma interface web?
- Qual é a diferença entre `onclick` no HTML e `onClick` no React?
- Como React trata eventos em alto nível?
- Quais tipos de eventos são mais comuns em aplicações React?
- Por que não faz sentido tentar memorizar todos os eventos disponíveis logo no começo?

## Flashcards
- **Q:** O que é um evento no contexto de front-end?
  **A:** Uma ação detectada pela página, como clique, digitação, foco ou colagem, que pode disparar código JavaScript.

- **Q:** Como eventos são escritos no JSX do React?
  **A:** Como atributos em camelCase, por exemplo `onClick` e `onKeyDown`.

- **Q:** Qual a diferença entre `onclick` e `onClick`?
  **A:** `onclick` é a forma comum em HTML; `onClick` é a convenção usada no JSX do React.

- **Q:** O que faz um event handler?
  **A:** É a função executada quando um evento específico acontece.

- **Q:** React inventa os tipos de eventos da web?
  **A:** Não. Em grande parte, ele reaproveita eventos já oferecidos pelo navegador.

- **Q:** Quais eventos valem mais atenção no começo?
  **A:** Os mais usados em UI comum, como `onClick`, `onChange`, `onSubmit`, `onKeyDown`, `onFocus` e `onBlur`.

## Prática guiada
- Escreva um botão com `onClick` que mostre uma mensagem no console.
- Monte um campo de texto que reaja a `onKeyDown`.
- Explique com suas palavras a diferença entre evento e handler.
- Liste três eventos comuns de mouse e três de teclado.

## Excalidraw brief
- Conceito central: `Eventos no React`
- Nós principais: `Usuário`, `Navegador`, `Evento`, `Handler`, `State`, `UI`
- Grupos secundários: `Mouse`, `Teclado`, `Clipboard`, `Formulários`
- Relações:
  - `Usuário -> gera -> Evento`
  - `Navegador -> detecta -> Evento`
  - `Evento -> dispara -> Handler`
  - `Handler -> pode atualizar -> State`
  - `State -> atualiza -> UI`
  - `React -> expõe em JSX como -> onClick / onKeyDown / onPaste`
- Layout sugerido:
  - fluxo principal no centro, da esquerda para a direita
  - grupos de eventos abaixo como categorias
  - exemplos de `onClick`, `onPaste` e `onKeyDown` ao lado direito

## Referências
- Curso: Meta Full Stack Developer
- Sessão: `course-5-react-basics`
- Origem: transcrição da aula sobre tipos de eventos no React
