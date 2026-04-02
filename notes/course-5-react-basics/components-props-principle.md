---
type: lesson-note
course: Meta Full Stack Developer
session: course-5-react-basics
lesson: Props e o princípio de fluxo de dados em componentes
source: coursera-transcript
status: draft
tags:
  - meta-full-stack
  - react
  - study-notes
created: 2026-04-02
updated: 2026-04-02
---

# Props e o princípio de fluxo de dados em componentes

## TL;DR
`props` são a forma padrão de passar dados de um componente pai para um componente filho no React.
Eles funcionam como argumentos recebidos por um componente, mas chegam em um objeto chamado `props`.
Esse fluxo é unidirecional: pai -> filho.
Um componente que recebe `props` deve tratá-los como dados somente leitura e nunca modificá-los diretamente.
Entender isso cedo evita confusão futura com `state`, eventos e atualização de UI.

## Por que isso importa
Sem `props`, componentes seriam muito rígidos: o mesmo bloco de UI exibiria sempre o mesmo conteúdo fixo.

Com `props`, você consegue:
- reutilizar o mesmo componente com dados diferentes
- montar interfaces dinâmicas
- separar responsabilidade entre quem fornece os dados e quem os exibe
- construir árvores de componentes mais previsíveis

Isso é uma base importante para entender depois:
- [[introducao-aos-componentes-funcionais]]
- [[visao-geral-do-react]]
- `state`
- eventos
- levantamento de estado

## Conceitos centrais

### 1. O que são `props`
`Props` é a abreviação de `properties`.

No React, elas representam dados passados de um componente para outro.
É útil pensar nelas como:
- argumentos de função
- enviados via JSX
- recebidos dentro do componente como um objeto

Exemplo mental:
- em JavaScript, uma função recebe parâmetros
- em React, um componente recebe `props`

### 2. `props` se parecem com atributos HTML
Ao usar um componente no JSX, você passa `props` de um jeito parecido com atributos HTML:

```jsx
<App title="Olá, React" />
```

Nesse caso, `title` é uma prop enviada ao componente `App`.

### 3. `props` chegam como um objeto
Dentro do componente, React reúne essas propriedades em um objeto chamado `props`.

Exemplo:

```jsx
function App(props) {
  return <h1>{props.title}</h1>;
}
```

Aqui:
- `props` é o objeto
- `title` é uma propriedade desse objeto
- `props.title` acessa o valor recebido

### 4. Notação de ponto
Como `props` é um objeto JavaScript, você acessa seus dados com notação de ponto:

```jsx
props.title
props.name
props.color
```

Isso conecta diretamente com a ideia de objetos em JavaScript:
- objeto = coleção de pares nome-valor
- `props` = objeto com dados enviados pelo componente pai

### 5. JSX dinâmico exige chaves
Para usar um valor de `props` dentro da interface, você precisa escrever a expressão JavaScript entre chaves:

```jsx
function App(props) {
  return <h1>{props.title}</h1>;
}
```

Sem as chaves, o React trataria o conteúdo como texto literal.

### 6. `props` podem carregar vários tipos de dados
`Props` não servem apenas para strings.

Elas podem carregar:
- strings
- números
- arrays
- objetos
- funções
- até elementos ou componentes

Isso dá bastante flexibilidade para compor interfaces reais.

### 7. Relação pai-filho
Quando um componente passa `props` para outro, existe uma relação de hierarquia:
- componente pai: envia os dados
- componente filho: recebe os dados

Exemplo:

```jsx
function App() {
  return <Title heading="Bem-vindo" />;
}

function Title(props) {
  return <h1>{props.heading}</h1>;
}
```

Nesse caso:
- `App` é o pai
- `Title` é o filho

### 8. Fluxo de dados unidirecional
No React, `props` seguem um fluxo de dados de mão única:

```text
Pai -> Filho
```

Isso significa:
- o pai pode enviar dados ao filho
- o mesmo pai pode enviar dados a vários filhos
- o filho não envia dados de volta ao pai usando `props`

Esse modelo torna a árvore de componentes mais previsível.

### 9. `props` são somente leitura
Um princípio importante do React é que componentes não devem modificar seus próprios `props`.

Isso se conecta com a ideia de função pura:
- mesma entrada
- mesma saída esperada

Em termos práticos:
- o componente recebe dados
- usa esses dados para renderizar UI
- não altera os `props` recebidos

> [!warning]
> `Props` são imutáveis do ponto de vista do componente que os recebe. Se você tentar tratá-los como estado mutável, o modelo mental do React começa a quebrar.

### 10. Limites de `props`
`Props` são muito úteis, mas não resolvem tudo.

Limitações destacadas na aula:
- não servem para fluxo filho -> pai por conta própria
- não devem ser modificados pelo componente

Mais tarde, outros mecanismos entram em cena para lidar com atualização de dados e interação.

## Mental model
Pense em `props` como o formulário de entrega de dados entre componentes.

O pai empacota os dados:
- título
- nome
- lista
- função

O filho apenas recebe esse pacote e usa o conteúdo para renderizar algo.

Outra forma de lembrar:
- componente pai = quem fornece contexto
- componente filho = quem consome e exibe
- `props` = canal de entrada do componente

## Exemplos

### Exemplo mínimo

```jsx
function App() {
  return <Title text="Olá, React" />;
}

function Title(props) {
  return <h1>{props.text}</h1>;
}
```

Esse é o uso mais básico:
- o pai envia uma string
- o filho recebe em `props`
- a UI muda com base no valor recebido

### Exemplo mais próximo do mundo real

```jsx
function App() {
  const product = {
    name: "Notebook",
    price: 4500,
    inStock: true,
  };

  return <ProductCard product={product} currency="R$" />;
}

function ProductCard(props) {
  return (
    <section>
      <h2>{props.product.name}</h2>
      <p>
        {props.currency} {props.product.price}
      </p>
      <p>{props.product.inStock ? "Em estoque" : "Indisponível"}</p>
    </section>
  );
}
```

Aqui o componente filho recebe:
- uma string
- um objeto

Isso mostra por que `props` são úteis para componentes reutilizáveis.

## Erros comuns
- Achar que `props` funcionam em qualquer direção. O fluxo padrão é pai -> filho.
- Tentar modificar `props` dentro do componente.
- Esquecer as chaves ao usar `props` no JSX.
- Pensar que `props` só podem carregar texto.
- Confundir `props` com variáveis locais ou com `state`.
- Usar `props` sem entender qual componente realmente é o pai da relação.

## Conexões
- [[introducao-aos-componentes-funcionais]]
- [[visao-geral-do-react]]
- [[JSX]]
- [[component tree]]
- [[state]]

## Ângulo de entrevista
- O que são `props` no React?
- Qual a diferença entre passar dados com `props` e definir valores fixos no componente?
- Por que dizemos que o fluxo de dados com `props` é unidirecional?
- O que significa dizer que componentes React devem tratar `props` como somente leitura?
- Quais tipos de dados podem ser passados em `props`?

## Flashcards
- **Q:** O que significa `props`?
  **A:** `Properties`, isto é, dados passados para um componente React.

- **Q:** Como `props` chegam ao componente?
  **A:** Como um objeto, geralmente acessado pela variável `props`.

- **Q:** Qual é o sentido do fluxo de dados com `props`?
  **A:** Do componente pai para o componente filho.

- **Q:** Um componente pode alterar seus próprios `props`?
  **A:** Não. `Props` devem ser tratados como somente leitura.

- **Q:** `Props` podem conter apenas strings?
  **A:** Não. Eles podem conter vários tipos de dados, incluindo objetos, arrays e funções.

## Prática guiada
- Crie um componente `Welcome` que receba uma prop `name` e renderize uma saudação.
- Passe duas props para um componente, como `title` e `color`, e use ambas no JSX.
- Monte uma relação pai-filho com `App` e `ProfileCard`.
- Explique por que alterar `props` dentro do componente é uma má ideia.

## Excalidraw brief
- Tipo de diagrama: component tree
- Conceito central: `Props no React`
- Nós principais: `Componente pai`, `Componente filho`, `props`, `fluxo unidirecional`, `somente leitura`
- Relações:
  - `Componente pai -> envia -> props`
  - `props -> chegam em -> componente filho`
  - `componente filho -> usa para -> renderizar UI`
  - `props -> seguem -> pai para filho`
  - `props -> não devem ser -> modificados`
- Layout sugerido:
  - `props` no centro
  - `pai` à esquerda
  - `filho` à direita
  - seta forte da esquerda para a direita com rótulo `data flow`
  - abaixo, um bloco de regra: `read-only`

## Referências
- Curso: Meta Full Stack Developer
- Sessão: `course-5-react-basics`
- Origem: transcrição da aula sobre `props`, hierarquia de componentes e fluxo de dados
