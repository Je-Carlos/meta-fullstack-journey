---
type: lesson-note
course: Meta Full Stack Developer
session: course-5-react-basics
lesson: User events
source: coursera-transcript
status: draft
tags:
  - meta-full-stack
  - react
  - study-notes
created: 2026-04-06
updated: 2026-04-06
---

# User events

## TL;DR
Eventos acionados pelo usuário permitem alterar comportamento e aparência da interface a partir de interações como cliques.
Uma variável booleana pode ser invertida com o operador `!`, o que é útil para toggles como dark mode e light mode.
Mas há um ponto essencial no React: mudar uma variável comum não atualiza a UI automaticamente.
Para refletir mudanças na tela, o valor precisa participar do fluxo reativo do React, normalmente via `state`.

## Por que isso importa
Essa aula conecta várias peças importantes do React em um único exemplo:
- eventos
- expressões JSX condicionais
- variáveis booleanas
- atualização de interface
- relação entre mudança de dado e re-render

Na prática, isso aparece em:
- alternância de tema
- abrir e fechar menus
- expandir e recolher seções
- mostrar e esconder modais
- ligar e desligar funcionalidades

Também é um passo importante para entender por que `state` existe.

## Conceitos centrais

### 1. User events disparam lógica da aplicação
Um user event é um evento causado por uma interação do usuário, como clicar em um botão.

No React, isso normalmente acontece com atributos JSX como:
- `onClick`
- `onChange`
- `onSubmit`

Quando o evento acontece, uma função é executada.

### 2. Toggle booleano com `!`
Uma forma comum de responder a um evento é inverter um valor booleano.

Exemplo mental:

```js
true -> false
false -> true
```

Isso é feito com o operador lógico `!`.

```js
const nextValue = !currentValue;
```

Esse padrão aparece o tempo todo em interfaces:
- dark mode
- menu aberto/fechado
- item selecionado/não selecionado
- modal visível/oculto

### 3. Renderização condicional com booleanos
Se você tem um booleano como `darkModeOn`, pode decidir o que renderizar com base nesse valor.

Exemplo:

```jsx
function ModeLabel() {
  const darkModeOn = true;

  return <h1>{darkModeOn ? "Dark mode is on" : "Light mode is on"}</h1>;
}
```

Aqui:
- se `darkModeOn` for `true`, o texto do modo escuro aparece
- se for `false`, o texto do modo claro aparece

Isso liga eventos à renderização condicional.

### 4. O handler pode executar várias ações
Um único handler pode:
- calcular o próximo valor
- registrar algo no console
- disparar atualização de UI
- chamar outras funções auxiliares

Ou seja, o evento não precisa servir para uma única tarefa.

A ideia da aula de “lidar com vários eventos em um único elemento JSX” se conecta a isso de duas formas:
- um mesmo elemento pode ter mais de um atributo de evento
- um único handler pode concentrar mais de uma ação relacionada

### 5. Mudar variável comum não faz React re-renderizar
Esse é o ponto mais importante da aula.

Se você faz algo como:

```jsx
let darkModeOn = false;

function handleClick() {
  darkModeOn = !darkModeOn;
  console.log(darkModeOn);
}
```

o valor pode até mudar dentro da função, e o console pode mostrar isso.
Mas a UI não necessariamente muda.

Por quê:
- React não observa qualquer variável solta
- ele atualiza a interface quando os dados reativos do componente mudam
- uma variável comum não participa desse mecanismo

### 6. `state` existe para conectar dado e interface
O exemplo da aula prepara exatamente essa conclusão:
- eventos podem mudar valores
- mas só mudar um valor em memória não basta
- para a interface reagir, o React precisa saber que houve mudança relevante

É por isso que `state` é central em componentes interativos.

## Mental model
Pense em uma variável comum como um post-it na sua mesa.
Você pode trocar o valor escrito nela, mas o React não está olhando para esse post-it.

Já o `state` funciona como um painel monitorado:
- quando o valor muda
- o React percebe
- e decide atualizar a interface

Outra forma de lembrar:
- evento = gatilho
- handler = lógica
- variável comum = mudança local sem re-render garantido
- `state` = mudança observada pelo React

## Exemplos

### Exemplo mínimo com variável comum

```jsx
function ModeToggler() {
  let darkModeOn = false;

  function handleClick() {
    darkModeOn = !darkModeOn;
    console.log("darkModeOn:", darkModeOn);
  }

  return (
    <div>
      <h1>{darkModeOn ? "Dark mode is on" : "Light mode is on"}</h1>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}
```

O que esse exemplo ensina:
- o clique dispara o handler
- o booleano é invertido
- o console pode mudar
- mas o título na tela não acompanha corretamente

### Exemplo correto com `state`

```jsx
import { useState } from "react";

function ModeToggler() {
  const [darkModeOn, setDarkModeOn] = useState(false);

  function handleClick() {
    setDarkModeOn(!darkModeOn);
  }

  return (
    <div>
      <h1>{darkModeOn ? "Dark mode is on" : "Light mode is on"}</h1>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}
```

Agora o fluxo faz sentido:
- o clique executa o handler
- o handler atualiza o `state`
- React re-renderiza o componente
- o texto exibido muda de verdade

### Exemplo com múltiplos eventos no mesmo elemento

```jsx
function InteractiveButton() {
  function handleClick() {
    console.log("Clicou");
  }

  function handleMouseEnter() {
    console.log("Passou o mouse");
  }

  return (
    <button onClick={handleClick} onMouseEnter={handleMouseEnter}>
      Interagir
    </button>
  );
}
```

Esse caso mostra que um único elemento JSX pode responder a mais de um evento.

## Erros comuns
- Achar que inverter uma variável comum já basta para atualizar a UI.
- Confundir mudança no console com re-render na tela.
- Usar `let` para dados que deveriam estar em `state`.
- Perder o foco da aula e achar que o problema está no `onClick`, quando na verdade está no modelo de atualização do React.
- Tratar o operador `!` como algo “mágico”, em vez de entender que ele apenas inverte um booleano.
- Criar handlers pouco claros quando uma versão mais explícita facilitaria manutenção e revisão.

## Conexões
- [[tipos-de-eventos]]
- [[apresentando-jsx]]
- [[introducao-aos-componentes-funcionais]]
- `state`
- renderização condicional
- fluxo de dados em React

## Ângulo de entrevista
- Como alternar um booleano em React a partir de um clique?
- Por que mudar uma variável comum não atualiza a interface?
- Qual é a diferença entre alterar um valor local e atualizar `state`?
- Como um componente decide qual conteúdo renderizar com base em um booleano?
- Um elemento JSX pode responder a mais de um evento?

## Flashcards
- **Q:** O que o operador `!` faz em um booleano?
  **A:** Inverte o valor, transformando `true` em `false` e `false` em `true`.

- **Q:** Qual é um caso comum de toggle booleano em UI?
  **A:** Alternar entre dark mode e light mode.

- **Q:** Um `console.log` mudando prova que a UI vai mudar?
  **A:** Não. Ele só prova que a função executou e o valor foi calculado.

- **Q:** Por que uma variável comum não atualiza a tela em React?
  **A:** Porque React não re-renderiza o componente só por uma variável local ter mudado.

- **Q:** O que deve ser usado quando um dado precisa refletir na interface?
  **A:** `state`.

- **Q:** Um elemento JSX pode ter mais de um event handler?
  **A:** Sim, como `onClick` e `onMouseEnter` no mesmo elemento.

## Prática guiada
- Escreva um componente com um botão que alterne entre `true` e `false`.
- Reproduza o erro de usar uma variável comum e observe que a UI não acompanha.
- Refatore o mesmo componente para usar `useState`.
- Adicione dois handlers ao mesmo botão, por exemplo `onClick` e `onMouseEnter`.

## Excalidraw brief
- Conceito central: `User events + toggle booleano`
- Nós principais: `Usuário`, `onClick`, `handleClick`, `darkModeOn`, `Variável comum`, `state`, `UI`
- Relações:
  - `Usuário -> dispara -> onClick`
  - `onClick -> chama -> handleClick`
  - `handleClick -> inverte -> darkModeOn`
  - `Variável comum -> não garante -> re-render`
  - `state -> dispara -> re-render`
  - `re-render -> atualiza -> UI`
- Layout sugerido:
  - dois fluxos lado a lado
  - à esquerda: `variável comum` levando a `console.log`, mas não à atualização visual
  - à direita: `state` levando a `re-render` e atualização do título

## Referências
- Curso: Meta Full Stack Developer
- Sessão: `course-5-react-basics`
- Origem: transcrição da aula sobre user events, toggle booleano e atualização de interface
