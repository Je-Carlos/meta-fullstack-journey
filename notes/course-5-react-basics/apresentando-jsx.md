---
type: lesson-note
course: Meta Full Stack Developer
session: course-5-react-basics
lesson: Apresentando JSX
source: coursera-transcript
status: draft
tags:
  - meta-full-stack
  - react
  - study-notes
created: 2026-04-03
updated: 2026-04-03
---

# Apresentando JSX

## TL;DR
JSX é a sintaxe usada no React para descrever interface de forma parecida com HTML, mas dentro de JavaScript.
O principal ganho é expressividade: você mistura estrutura visual com valores dinâmicos, variáveis, `props` e expressões JavaScript no mesmo lugar.
Dentro do JSX, expressões JavaScript entram entre chaves.
Ao retornar JSX em múltiplas linhas, o conteúdo deve ficar entre parênteses e dentro de um único elemento raiz.
Como JSX não é HTML puro, alguns nomes mudam, como `className` no lugar de `class`.

## Por que isso importa
JSX é um dos pontos em que o React mais muda o jeito de pensar a interface.

Em vez de separar totalmente:
- HTML para estrutura
- CSS para estilo
- JavaScript para comportamento

No React, o componente reúne essas preocupações em uma unidade mais coesa.
Isso importa porque:
- aproxima a UI da lógica que a controla
- facilita renderização dinâmica
- melhora reutilização de componentes
- reduz a necessidade de manipular o DOM manualmente

Em projetos reais, JSX vira a linguagem cotidiana da interface. Se o modelo mental aqui estiver confuso, tudo que vem depois fica mais difícil: `props`, listas, eventos, renderização condicional e composição.

## Conceitos centrais

### 1. O que é JSX
JSX significa JavaScript XML.

Ele parece HTML, mas não é HTML puro. É uma sintaxe que permite escrever uma estrutura visual parecida com marcação diretamente dentro do código JavaScript.

No React, isso ajuda a descrever:
- elementos da interface
- componentes
- conteúdo dinâmico

### 2. O valor principal do JSX: expressividade
A aula destaca a ideia de expressividade.

Na prática, isso significa que o desenvolvedor consegue escrever a interface de um jeito próximo ao que deseja ver renderizado, sem perder acesso ao poder do JavaScript.

Você pode:
- montar marcação parecida com HTML
- inserir variáveis
- usar `props`
- avaliar expressões
- misturar estrutura com comportamento de renderização

### 3. Chaves significam “entre no JavaScript”
Dentro do JSX, qualquer conteúdo entre chaves é tratado como expressão JavaScript.

Exemplos comuns:

```jsx
const title = "Menu principal";
const year = 2026;

<h1>{title}</h1>
<p>{year}</p>
<p>{2 + 2}</p>
```

As chaves funcionam como uma zona especial em que o React sai da marcação e avalia JavaScript normal.

### 4. JSX permite conteúdo dinâmico em componentes
Como React é baseado em componentes, JSX não serve só para texto fixo.

Você pode usar valores vindos de:
- variáveis locais
- `props`
- expressões derivadas

Isso torna o componente reutilizável e dinâmico.

### 5. Retorno em múltiplas linhas pede parênteses
Quando o JSX dentro do `return` ocupa várias linhas, a convenção correta é envolver o conteúdo em parênteses:

```jsx
function Header() {
  return (
    <header>
      <h1>Minha aplicação</h1>
    </header>
  );
}
```

Isso melhora legibilidade e evita problemas de parsing.

### 6. O retorno precisa de um único elemento raiz
Um componente precisa retornar um único elemento pai envolvendo todo o bloco de JSX.

Exemplo válido:

```jsx
function Page() {
  return (
    <div>
      <h1>Título</h1>
      <p>Descrição</p>
    </div>
  );
}
```

Sem esse contêiner, o JSX fica estruturalmente inválido.

### 7. Fragmentos evitam `div` desnecessária
Se você não quiser adicionar um elemento extra ao DOM, pode usar um fragmento:

```jsx
function Page() {
  return (
    <>
      <h1>Título</h1>
      <p>Descrição</p>
    </>
  );
}
```

O fragmento agrupa o JSX sem poluir a árvore real do DOM com uma `div` apenas estrutural.

### 8. JSX se parece com HTML, mas tem diferenças
Como o código está dentro de um arquivo JavaScript, alguns atributos mudam.

O caso mais importante desta aula:
- em HTML: `class`
- em JSX: `className`

Exemplo:

```jsx
function Card() {
  return <section className="card featured">Conteúdo</section>;
}
```

Isso acontece porque `class` é palavra reservada em JavaScript.

## Mental model
Pense em JSX como uma ponte entre duas coisas:
- a forma visual da interface
- os dados e a lógica que definem essa interface

Outra forma de memorizar:
- HTML-like syntax para descrever a UI
- chaves para injetar JavaScript
- componente para empacotar estrutura, lógica e estilo de forma reutilizável

Se HTML puro descreve uma página estática, JSX descreve uma UI que pode reagir a dados.

## Exemplos

### Exemplo mínimo

```jsx
function Heading() {
  const title = "Aprendendo JSX";

  return <h1>{title}</h1>;
}
```

Esse exemplo mostra o essencial:
- JSX com aparência de HTML
- valor dinâmico inserido por chaves
- componente funcional retornando interface

### Exemplo mais próximo do mundo real

```jsx
function Nav(props) {
  return (
    <nav className="main-nav">
      <ul>
        <li>{props.items[0]}</li>
        <li>{props.items[1]}</li>
        <li>{props.items[2]}</li>
      </ul>
    </nav>
  );
}

function App() {
  const links = ["Home", "Produtos", "Contato"];

  return (
    <>
      <h1>Site da empresa</h1>
      <Nav items={links} />
    </>
  );
}
```

Aqui o JSX mostra bem a mistura de responsabilidades:
- estrutura visual com `nav`, `ul` e `li`
- valor dinâmico vindo de `props`
- uso de `className` para CSS
- fragmento para evitar elemento extra

## Erros comuns
- Achar que JSX é HTML puro. A aparência é semelhante, mas o contexto real é JavaScript.
- Esquecer as chaves ao inserir variáveis ou `props` no conteúdo renderizado.
- Usar `class` em vez de `className`.
- Tentar retornar vários elementos irmãos sem um elemento raiz ou fragmento.
- Esquecer os parênteses ao escrever um `return` com JSX em múltiplas linhas.
- Concluir que qualquer código JavaScript pode ser escrito livremente em qualquer ponto do JSX, sem respeitar o fato de que ali entram expressões, não blocos arbitrários de marcação e lógica misturados sem estrutura.

## Conexões
- [[visao-geral-do-react]]
- [[introducao-aos-componentes-funcionais]]
- [[components-props-principle]]
- [[estrutura-padrao-react]]

## Ângulo de entrevista
- O que é JSX e por que ele não é exatamente HTML?
- Por que JSX é considerado mais expressivo para construir interfaces no React?
- Qual é o papel das chaves dentro do JSX?
- Por que um componente React precisa retornar um único elemento raiz?
- Qual a diferença entre `class` em HTML e `className` em JSX?

## Flashcards
- **Q:** O que é JSX?
  **A:** Uma sintaxe usada no React para descrever UI de forma parecida com HTML dentro de JavaScript.

- **Q:** O que as chaves fazem no JSX?
  **A:** Permitem inserir e avaliar expressões JavaScript dentro da interface.

- **Q:** Por que `className` é usado no lugar de `class`?
  **A:** Porque `class` é palavra reservada em JavaScript.

- **Q:** O que fazer quando um componente precisa retornar vários elementos?
  **A:** Envolver tudo em um elemento pai ou usar um fragmento.

- **Q:** Qual a principal vantagem do JSX?
  **A:** Tornar a descrição da interface mais expressiva e mais próxima da lógica que gera a UI.

## Prática guiada
- Crie um componente `Title` que renderize uma variável dentro de um `h1`.
- Escreva um componente que retorne JSX em múltiplas linhas usando parênteses corretamente.
- Substitua uma `div` de agrupamento por um fragmento `<>...</>`.
- Crie um componente `Nav` com `className="menu"` e três itens renderizados a partir de `props`.
- Explique, com suas palavras, por que JSX é mais útil do que concatenar strings de HTML em JavaScript.

## Excalidraw brief
- Tipo de diagrama: concept map
- Conceito central: `JSX`
- Nós principais: `expressividade`, `HTML-like syntax`, `JavaScript`, `props`, `chaves {}`, `elemento raiz`, `fragment`, `className`
- Relações:
  - `JSX -> mistura -> estrutura + lógica`
  - `chaves {} -> permitem -> expressões JavaScript`
  - `props -> alimentam -> conteúdo dinâmico`
  - `componente -> retorna -> JSX`
  - `elemento raiz -> organiza -> retorno válido`
  - `fragment -> evita -> div extra`
  - `className -> substitui -> class`
- Layout sugerido:
  - `JSX` no centro
  - à esquerda `HTML-like syntax`
  - à direita `JavaScript`
  - abaixo `elemento raiz` e `fragment`
  - acima `expressividade` como ideia principal

## Referências
- Curso: Meta Full Stack Developer
- Sessão: `course-5-react-basics`
- Origem: transcrição da aula sobre JSX, expressões, estrutura de retorno e diferenças práticas entre JSX e HTML
