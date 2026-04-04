---
type: lesson-note
course: Meta Full Stack Developer
session: course-5-react-basics
lesson: Sintaxe JSX e a função de seta
source: coursera-reading
status: draft
tags:
  - meta-full-stack
  - react
  - study-notes
created: 2026-04-03
updated: 2026-04-03
---

# Sintaxe JSX e a função de seta

## TL;DR
No React, um componente pode ser definido como declaração de função, expressão de função ou arrow function.
Essas formas podem renderizar exatamente o mesmo JSX; o que muda é a sintaxe.
Arrow functions costumam aparecer bastante porque são mais curtas e combinam bem com JSX e callbacks.
Quando há um único parâmetro, os parênteses podem ser omitidos.
Quando a função cabe em uma única linha, é possível usar retorno implícito.

## Por que isso importa
Em React, você vai ler e escrever componentes em estilos diferentes o tempo todo.

Entender essas variações importa porque:
- evita estranhar código escrito por outras pessoas
- ajuda a reconhecer rapidamente componentes e callbacks
- melhora leitura de listas, eventos e transformações com arrays
- reduz confusão entre mudança de sintaxe e mudança de comportamento

Na prática, boa parte do código React moderno mistura:
- componentes com arrow functions
- callbacks inline
- métodos de array como `map`, `filter` e `forEach`

Se você não estiver confortável com essa sintaxe, a leitura do código fica mais lenta do que precisa.

## Conceitos centrais

### 1. Um componente pode ser escrito de mais de uma forma
A leitura parte de um ponto importante: componente React não precisa ser escrito só com `function` tradicional.

As formas mais comuns são:
- declaração de função
- expressão de função
- arrow function

As três podem representar o mesmo componente.

### 2. Declaração de função
Forma clássica:

```jsx
function Nav(props) {
  return <li>{props.first}</li>;
}
```

Aqui:
- `Nav` é o nome da função
- `props` entra como parâmetro
- o componente retorna JSX

### 3. Expressão de função
A mesma ideia pode ser escrita como expressão de função:

```jsx
const Nav = function (props) {
  return <li>{props.first}</li>;
};
```

O comportamento continua o mesmo.

A diferença principal é sintática:
- existe uma função anônima
- essa função é atribuída a uma constante chamada `Nav`

### 4. Arrow function
A mesma expressão pode ser reescrita com arrow function:

```jsx
const Nav = (props) => {
  return <li>{props.first}</li>;
};
```

Leitura mental útil:
- o que vem antes da seta são os parâmetros
- a seta substitui a palavra-chave `function`
- o que vem depois é o corpo da função

### 5. Parênteses são opcionais com um único parâmetro
Se a arrow function recebe exatamente um parâmetro, os parênteses podem ser omitidos:

```jsx
const Nav = props => {
  return <li>{props.first}</li>;
};
```

Isso é válido, mas é uma escolha de estilo.

Se houver:
- zero parâmetros
- dois ou mais parâmetros

os parênteses são obrigatórios.

Exemplos:

```jsx
const Header = () => <h1>Olá</h1>;

const Sum = (a, b) => a + b;
```

### 6. Retorno implícito
Arrow functions permitem retorno implícito quando a função retorna uma única expressão na mesma linha:

```jsx
const Nav = props => <li>{props.first}</li>;
```

Nesse caso:
- não há chaves no corpo
- não há `return` explícito
- o valor da expressão é retornado automaticamente

Isso é comum em componentes muito pequenos e em callbacks de arrays.

### 7. Quando o corpo tem bloco, o `return` volta a ser necessário
Se você usar chaves no corpo da arrow function, deixa de existir retorno implícito:

```jsx
const Nav = props => {
  return <li>{props.first}</li>;
};
```

Sem `return`, a função não devolveria o JSX esperado.

### 8. Arrow functions aparecem muito em callbacks
A leitura também conecta arrow functions com vanilla JavaScript, não só com React.

Exemplo com array:

```jsx
const items = [100, 200, 300];

items.forEach(item => console.log(item));
```

Essa sintaxe aparece bastante porque é curta e clara para operações pequenas.

Observação importante:
- `forEach` é útil para executar efeitos, como `console.log`
- para gerar JSX a partir de arrays, em React normalmente `map` é mais comum

## Mental model
Pense assim:

- declaração de função = forma mais explícita e clássica
- expressão de função = função tratada como valor atribuído a variável
- arrow function = forma mais curta de escrever muitas dessas funções

Outra forma de memorizar:
- mesma ideia
- mesma capacidade
- ergonomia diferente

O ponto principal não é decorar estilo, mas conseguir ler rapidamente qualquer uma das formas.

## Exemplos

### Exemplo mínimo

```jsx
function Welcome(props) {
  return <h1>Olá, {props.name}</h1>;
}

const WelcomeExpression = function (props) {
  return <h1>Olá, {props.name}</h1>;
};

const WelcomeArrow = props => <h1>Olá, {props.name}</h1>;
```

Esses três componentes fazem a mesma coisa.
O que muda é apenas a sintaxe usada para defini-los.

### Exemplo mais próximo do mundo real

```jsx
const Nav = ({ items }) => (
  <ul>
    {items.map(item => (
      <li key={item}>{item}</li>
    ))}
  </ul>
);
```

Esse exemplo junta várias leituras importantes:
- componente definido com arrow function
- parâmetro recebido pelo componente
- JSX multilinha
- callback com arrow function dentro de `map`
- retorno implícito no callback que gera cada `li`

## Erros comuns
- Achar que mudar de declaração de função para arrow function muda automaticamente o comportamento do componente.
- Esquecer que, ao usar chaves no corpo da arrow function, o `return` precisa aparecer.
- Remover parênteses dos parâmetros quando existem zero ou vários parâmetros.
- Confundir retorno implícito com “sempre não precisa de `return`”.
- Ler arrow functions devagar por não separar mentalmente parâmetros, seta e corpo.
- Usar `forEach` para tentar renderizar lista em JSX, quando normalmente `map` é a escolha mais natural.

## Conexões
- [[apresentando-jsx]]
- [[introducao-aos-componentes-funcionais]]
- [[components-props-principle]]
- [[visao-geral-do-react]]

## Ângulo de entrevista
- Quais são as formas mais comuns de definir um componente funcional no React?
- Qual a diferença entre declaração de função e arrow function em termos de sintaxe?
- Quando os parênteses são opcionais em arrow functions?
- O que é retorno implícito?
- Por que arrow functions aparecem tanto em código React moderno?

## Flashcards
- **Q:** Um componente React pode ser escrito só com `function` tradicional?
  **A:** Não. Ele também pode ser escrito como expressão de função ou arrow function.

- **Q:** Quando posso omitir os parênteses em uma arrow function?
  **A:** Quando existe exatamente um parâmetro.

- **Q:** Quando o retorno implícito funciona?
  **A:** Quando a arrow function retorna uma única expressão sem usar bloco com chaves.

- **Q:** Se eu usar chaves no corpo da arrow function, preciso de `return`?
  **A:** Sim, se quiser devolver um valor.

- **Q:** Em React, qual método de array costuma ser mais usado para renderizar listas?
  **A:** `map`.

## Prática guiada
- Reescreva um componente com `function` tradicional como expressão de função.
- Reescreva o mesmo componente como arrow function.
- Teste a diferença entre `props => <h1>{props.title}</h1>` e `props => { return <h1>{props.title}</h1>; }`.
- Escreva uma arrow function com zero parâmetros e outra com dois parâmetros.
- Pegue um array de strings e renderize uma lista usando `map` com arrow function.

## Excalidraw brief
- Tipo de diagrama: comparison map
- Conceito central: `Funções em componentes React`
- Nós principais: `declaração de função`, `expressão de função`, `arrow function`, `parâmetros`, `retorno implícito`, `callbacks`
- Relações:
  - `declaração de função -> pode virar -> expressão de função`
  - `expressão de função -> pode virar -> arrow function`
  - `arrow function -> pode usar -> retorno implícito`
  - `um parâmetro -> permite -> omitir parênteses`
  - `callbacks de array -> usam muito -> arrow function`
- Layout sugerido:
  - centro com `Funções em componentes React`
  - três nós laterais para os três formatos
  - abaixo `retorno implícito`
  - à direita `callbacks` com exemplo `map` ou `forEach`

## Referências
- Curso: Meta Full Stack Developer
- Sessão: `course-5-react-basics`
- Origem: leitura sobre expressões de função, arrow functions e uso de funções de seta em React e vanilla JavaScript
