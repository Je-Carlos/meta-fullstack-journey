---
type: lesson-note
course: Meta Full Stack Developer
session: course-5-react-basics
lesson: CSS style no React
source: coursera-transcript
status: draft
tags:
  - meta-full-stack
  - react
  - study-notes
created: 2026-04-03
updated: 2026-04-03
---

# CSS style no React

## TL;DR
React permite aplicar estilos inline usando o atributo `style` em JSX.
Diferente do HTML, esse atributo recebe um objeto JavaScript, não uma string CSS.
Ao mover regras de um arquivo CSS para dentro de um componente, é preciso adaptar a sintaxe: trocar `;` por `,`, converter nomes com hífen para camelCase e colocar valores em string quando necessário.
Esse padrão é útil para estilos locais e dinâmicos, mas não substitui totalmente CSS externo.
O ponto central da aula é entender a tradução de CSS tradicional para objeto de estilo em React.

## Por que isso importa
Em React, estilo não precisa viver apenas em arquivos `.css`.

Saber usar `style` inline importa porque:
- ajuda a entender como JSX lida com atributos especiais
- permite estilos locais ao componente
- facilita aplicar valores dinâmicos vindos de variáveis e `props`
- reforça a ideia de que componentes misturam estrutura, lógica e apresentação

Na prática, isso também evita um erro comum de iniciante: tentar colar CSS puro dentro de um arquivo `.js` e esperar que funcione sem adaptação.

## Conceitos centrais

### 1. Três formas clássicas de incluir CSS
A aula começa lembrando três técnicas tradicionais:
- inline, usando o atributo `style`
- interno, usando a tag `<style>`
- externo, usando um arquivo CSS com `<link>`

No React, o foco aqui é a versão inline aplicada por JSX.

### 2. Em React, `style` recebe um objeto JavaScript
Em HTML, seria comum escrever algo como:

```html
<div style="background: orange; color: white;"></div>
```

Em React, isso muda para:

```jsx
<div style={{ background: "orange", color: "white" }}></div>
```

O valor de `style` é uma expressão JSX que aponta para um objeto JavaScript.

### 3. CSS puro não pode ser colado diretamente no componente
Se você recortar uma regra de `index.css` e colar em `sidebar.js`, ela ainda está em sintaxe CSS, não em sintaxe JavaScript.

Para funcionar dentro do componente, a regra precisa ser convertida em objeto.

Exemplo conceitual:

```css
aside {
  background-color: lightblue;
  padding: 12px;
}
```

vira algo como:

```jsx
const asideStyle = {
  backgroundColor: "lightblue",
  padding: "12px",
};
```

### 4. Regras de conversão de CSS para objeto
Ao fazer essa tradução, a aula destaca estas mudanças:

- declarar uma variável, normalmente com `const`
- trocar `;` por `,`
- trocar propriedades com hífen por camelCase
- colocar valores textuais entre aspas

Exemplos:
- `background-color` -> `backgroundColor`
- `font-size` -> `fontSize`
- `margin-top` -> `marginTop`

### 5. O objeto de estilo é usado via expressão JSX
Depois de criar o objeto, você o referencia no `return`:

```jsx
<aside style={asideStyle}>News sidebar</aside>
```

As chaves externas dizem ao JSX para avaliar JavaScript.
O valor passado é a variável que contém o objeto de estilo.

### 6. Estilo inline é local ao componente
Nesta aula, a proposta é pegar apenas o estilo da `Sidebar` e movê-lo do `index.css` para dentro do componente.

Isso mostra um ponto importante:
- você não precisa migrar todo o CSS da aplicação
- pode aplicar inline apenas onde fizer sentido

### 7. Inline style é útil, mas tem limites
Mesmo sem aprofundar muito, vale registrar o trade-off:

Inline style funciona bem para:
- estilos locais
- estilos dinâmicos
- prototipação rápida

Mas costuma ser menos confortável para:
- pseudo-classes como `:hover`
- media queries
- folhas de estilo grandes
- reutilização visual ampla

## Mental model
Pense no `style` inline do React como uma tradução de CSS para um dicionário JavaScript.

Em vez de escrever:
- regra CSS solta

Você passa a escrever:
- objeto com pares `propriedade: valor`

Outra forma de lembrar:
- CSS externo = folha de estilo separada
- `style` no React = estilo definido como dado dentro do componente

## Exemplos

### Exemplo mínimo

```jsx
function Badge() {
  const badgeStyle = {
    backgroundColor: "tomato",
    color: "white",
    padding: "8px",
  };

  return <span style={badgeStyle}>Novo</span>;
}
```

Esse exemplo mostra:
- objeto JavaScript
- propriedades em camelCase
- strings para valores
- uso do atributo `style` com JSX

### Exemplo mais próximo do mundo real

```jsx
function Sidebar() {
  const asideStyle = {
    backgroundColor: "lightsteelblue",
    padding: "16px",
    borderRadius: "8px",
  };

  const headingStyle = {
    fontSize: "1.25rem",
    marginBottom: "12px",
  };

  return (
    <aside style={asideStyle}>
      <h2 style={headingStyle}>Notícias</h2>
      <p>Atualizações da semana no projeto.</p>
    </aside>
  );
}
```

Esse é o fluxo explicado na aula:
- havia estilo em `index.css`
- parte dele foi movida para dentro do componente
- as regras viraram objetos JavaScript
- o componente voltou a renderizar com aparência semelhante

## Erros comuns
- Colar CSS puro dentro de um arquivo `.js` sem converter a sintaxe.
- Usar `background-color` em vez de `backgroundColor`.
- Esquecer que o atributo `style` espera um objeto, não uma string CSS.
- Tentar usar `;` dentro do objeto de estilo.
- Não colocar aspas em valores textuais como cores e unidades.
- Mover tudo para inline style sem avaliar se CSS externo continua sendo a melhor opção.

## Conexões
- [[05-apresentando-jsx]]
- [[02-introducao-aos-componentes-funcionais]]
- [[04-estrutura-padrao-react]]
- [[01-visao-geral-do-react]]

## Ângulo de entrevista
- Como o atributo `style` funciona no React?
- Qual a diferença entre `style` em HTML e `style` em JSX?
- Por que propriedades CSS com hífen viram camelCase em React?
- Quando faz sentido usar inline style em vez de CSS externo?
- Quais limitações inline style tem em comparação com CSS tradicional?

## Flashcards
- **Q:** O que o atributo `style` recebe em React?
  **A:** Um objeto JavaScript com propriedades de estilo.

- **Q:** Como `background-color` fica em React inline style?
  **A:** `backgroundColor`.

- **Q:** Por que valores como cores costumam ficar entre aspas?
  **A:** Porque são strings dentro de um objeto JavaScript.

- **Q:** Posso colar CSS puro dentro de um componente React?
  **A:** Não diretamente. É preciso converter para objeto JavaScript.

- **Q:** Qual o principal uso prático de inline style no React?
  **A:** Aplicar estilos locais ou dinâmicos diretamente no componente.

## Prática guiada
- Pegue uma regra simples de CSS externo e converta para um objeto `const`.
- Crie um componente `Sidebar` com um `aside` estilizado por `style={asideStyle}`.
- Converta três propriedades com hífen para camelCase.
- Explique por que `style="color: red"` não é o padrão correto em JSX.
- Compare quando você escolheria `index.css` e quando escolheria inline style.

## Excalidraw brief
- Tipo de diagrama: comparison map
- Conceito central: `CSS no React`
- Nós principais: `CSS externo`, `inline style`, `objeto JavaScript`, `camelCase`, `style={...}`, `Sidebar`
- Relações:
  - `CSS externo -> pode ser movido para -> componente`
  - `regra CSS -> é convertida em -> objeto JavaScript`
  - `propriedades com hífen -> viram -> camelCase`
  - `objeto JavaScript -> é passado por -> style={...}`
  - `inline style -> estiliza localmente -> componente`
- Layout sugerido:
  - centro com `CSS no React`
  - lado esquerdo `CSS externo`
  - lado direito `inline style`
  - entre eles, uma seta com rótulo `conversão`
  - abaixo, um bloco com exemplos `background-color -> backgroundColor`

## Bônus: onde Tailwind entra nisso
Tailwind é outra forma popular de estilizar aplicações React, mas a abordagem é diferente de inline style.

Em vez de passar um objeto no atributo `style`, você aplica classes utilitárias no `className`:

```jsx
function Sidebar() {
  return (
    <aside className="rounded-lg bg-slate-200 p-4">
      <h2 className="mb-3 text-xl">Notícias</h2>
      <p>Atualizações da semana no projeto.</p>
    </aside>
  );
}
```

Comparação rápida:
- inline style: bom para valores locais e dinâmicos definidos em JavaScript
- CSS externo: bom para estilos globais e folhas mais tradicionais
- Tailwind: bom para montar UI rápido usando classes utilitárias sem escrever muito CSS manual

Trade-off principal:
- Tailwind reduz a necessidade de criar arquivos CSS para muitos casos
- mas aumenta a quantidade de classes diretamente no JSX

Regra prática:
- use inline style quando o valor depende muito de lógica JavaScript
- use Tailwind quando quiser compor layout e aparência com rapidez dentro do próprio markup
- use CSS externo quando precisar de organização global ou regras mais tradicionais

> [!tip]
> Inline style e Tailwind não são concorrentes diretos em todos os casos. Em projetos reais, é comum usar Tailwind para a maior parte da UI e inline style apenas para valores realmente dinâmicos, como cores, largura ou posição calculada em runtime.

## Referências
- Curso: Meta Full Stack Developer
- Sessão: `course-5-react-basics`
- Origem: transcrição da aula sobre conversão de CSS externo para inline style dentro de componentes React
