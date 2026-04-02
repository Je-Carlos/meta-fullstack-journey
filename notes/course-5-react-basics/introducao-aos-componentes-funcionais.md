---
type: lesson-note
course: Meta Full Stack Developer
session: course-5-react-basics
lesson: Introdução aos componentes funcionais
source: coursera-transcript
status: draft
tags:
  - meta-full-stack
  - react
  - study-notes
created: 2026-04-02
updated: 2026-04-02
---

# Introdução aos componentes funcionais

## TL;DR
Um componente funcional é, na prática, uma função JavaScript que retorna JSX para descrever parte da interface.
React trabalha com componentes como blocos reutilizáveis, e todo app precisa ter pelo menos um componente raiz.
JSX parece HTML, mas é JavaScript com uma sintaxe especial usada para montar UI dinâmica.
Para React reconhecer um componente, seu nome deve começar com letra maiúscula.
O JSX escrito pelo desenvolvedor passa por transpilação antes de chegar ao navegador.

## Por que isso importa
Componentes funcionais são a base do React moderno. Entender essa estrutura cedo evita confusão em quase tudo que vem depois: props, state, hooks, renderização e composição.

Na prática, esse modelo importa porque:
- transforma interface em funções pequenas e reutilizáveis
- facilita separar responsabilidades da UI
- deixa o código mais previsível
- permite gerar conteúdo dinâmico sem manipular o DOM manualmente

## Conceitos centrais

### 1. O que é um componente funcional
Um componente funcional se comporta de forma parecida com uma função JavaScript tradicional:
- pode receber entrada
- executa alguma lógica
- retorna uma saída

No React, essa saída normalmente é JSX.

Exemplo conceitual:
- função JavaScript comum retorna um valor
- componente funcional retorna interface

### 2. Tipos de componentes no React
O React historicamente oferece dois tipos principais de componentes:
- componentes funcionais
- componentes de classe

Nesta etapa, o foco é nos componentes funcionais, porque eles são mais diretos e se parecem com funções JavaScript normais.

### 3. Componente raiz
Todo aplicativo React precisa ter pelo menos um componente raiz.

Esse componente:
- é o ponto inicial da interface
- pode conter outros componentes
- acaba sendo renderizado dentro do elemento raiz do HTML, normalmente uma `div` com id `root`

Pense nele como o topo da árvore de componentes.

### 4. Componentes precisam ser usados para renderizar
Definir um componente não basta. Ele só aparece na interface quando é usado como elemento JSX.

Isso é parecido com funções em JavaScript:
- declarar uma função não executa a função
- declarar um componente não renderiza o componente

Ele precisa ser invocado na prática via JSX, por exemplo: `<Heading />`.

### 5. JSX
JSX significa JavaScript XML.

Ele parece HTML, mas não é HTML puro. É uma sintaxe especial usada dentro do JavaScript para descrever a interface.

O ponto principal do JSX é permitir que você misture:
- estrutura visual parecida com HTML
- lógica JavaScript
- conteúdo dinâmico

### 6. Capitalização de nomes
Nomes de componentes devem começar com letra maiúscula.

Isso acontece porque React usa essa convenção para distinguir:
- componentes React: `Heading`
- elementos HTML nativos: `h1`, `div`, `section`

Se você escrever um componente com inicial minúscula, React tende a tratá-lo como tag HTML comum.

### 7. Expressões JavaScript dentro do JSX
Para renderizar valores dinâmicos dentro do JSX, você usa chaves.

Exemplo:

```jsx
const title = "This is some heading text";

return <h1>{title}</h1>;
```

Sem as chaves, o React interpretaria o conteúdo como texto literal, não como variável.

### 8. Transpilação
O navegador não entende JSX diretamente.

Antes da execução, o JSX passa por um processo de transpilação, isto é, conversão para JavaScript que o ambiente consegue executar.

Mentalmente, vale lembrar assim:
- você escreve JSX
- a ferramenta converte
- o navegador executa o resultado

## Mental model
Pense em um componente funcional como uma função que fabrica pedaços de interface.

Entrada:
- dados
- variáveis
- lógica

Saída:
- um bloco de UI descrito em JSX

Outra forma de lembrar:
- função comum: `dados -> valor`
- componente React: `dados -> interface`

## Exemplos

### Exemplo mínimo

```jsx
function Heading() {
  return <h1>Olá, mundo</h1>;
}
```

Esse componente retorna um único título.

### Exemplo com variável no JSX

```jsx
function Heading() {
  const title = "This is some heading text";

  return <h1>{title}</h1>;
}
```

Aqui o texto é dinâmico porque vem de uma variável JavaScript.

### Exemplo de uso do componente

```jsx
function App() {
  return (
    <div>
      <Heading />
    </div>
  );
}
```

Nesse caso:
- `Heading` é definido separadamente
- `App` usa `Heading`
- React renderiza a composição final dentro do elemento raiz da página

## Erros comuns
- Escrever o nome do componente com inicial minúscula, como `heading`, e esperar que React o trate como componente.
- Achar que JSX é HTML puro. A aparência é similar, mas o contexto é JavaScript.
- Esquecer as chaves ao inserir variáveis no JSX.
- Pensar que criar o componente já faz ele aparecer na tela. Ele precisa ser usado em outro componente ou no componente raiz.
- Confundir transpilação com renderização. Transpilar é converter JSX; renderizar é exibir a interface.

## Conexões
- [[visao-geral-do-react]]
- [[JSX]]
- [[renderização]]
- [[component tree]]
- [[props]]

## Ângulo de entrevista
- O que é um componente funcional no React?
- Qual a diferença entre um componente React e uma função JavaScript comum?
- Por que nomes de componentes React começam com letra maiúscula?
- O que é JSX e por que ele não é exatamente HTML?
- Qual a diferença entre transpilação e renderização?

## Flashcards
- **Q:** O que um componente funcional retorna?
  **A:** Normalmente retorna JSX que descreve parte da interface.

- **Q:** O que é o componente raiz?
  **A:** O componente inicial do app React, a partir do qual os demais componentes são compostos.

- **Q:** Como React distingue componente de tag HTML?
  **A:** Pela capitalização: componentes começam com maiúscula.

- **Q:** Para que servem as chaves no JSX?
  **A:** Para inserir e avaliar expressões JavaScript dentro da interface.

- **Q:** O que é transpilação no contexto de React?
  **A:** É a conversão de JSX em JavaScript executável.

## Prática guiada
- Crie um componente `Heading` que renderize um `h1` com texto fixo.
- Altere o componente para usar uma variável `title` dentro do JSX.
- Crie um componente `App` que renderize `Heading`.
- Teste o que acontece se você mudar `Heading` para `heading`.

## Excalidraw brief
- Conceito central: `Componente funcional`
- Nós principais: `Função JS`, `JSX`, `Componente raiz`, `Capitalização`, `Renderização`, `Transpilação`
- Relações:
  - `Componente funcional -> retorna -> JSX`
  - `JSX -> descreve -> UI`
  - `Componente raiz -> contém -> outros componentes`
  - `Maiúscula -> ajuda React a identificar -> componente`
  - `JSX -> passa por -> transpilação`
  - `Componente usado como <Tag /> -> gera -> renderização`
- Layout sugerido:
  - centro com `Componente funcional`
  - à esquerda `Função JS` como analogia
  - à direita `JSX`
  - abaixo `Renderização` e `Transpilação`
  - acima `Componente raiz`

## Referências
- Curso: Meta Full Stack Developer
- Sessão: `course-5-react-basics`
- Origem: transcrição da aula sobre componentes funcionais, JSX e transpilação
