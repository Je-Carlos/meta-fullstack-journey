---
type: lesson-note
course: Meta Full Stack Developer
session: course-5-react-basics
lesson: Fluxo de dados entre pai e filho
source: coursera-transcript
status: draft
tags:
  - meta-full-stack
  - react
  - study-notes
created: 2026-04-11
updated: 2026-04-14
---

# Fluxo de dados entre pai e filho

## TL;DR
No React, dados normalmente fluem do componente pai para o componente filho por meio de `props`.
Esse modelo evita repetição de conteúdo e ajuda a manter uma única fonte de verdade.
Quando vários pontos da interface dependem da mesma informação, o melhor lugar para armazená-la costuma ser o componente pai.
Ao atualizar os dados no pai, todos os filhos que recebem essas `props` refletem a mudança automaticamente.
Nesse contexto, `props` representam dados externos e somente leitura, enquanto `state` representa dados internos que o componente controla e pode atualizar.

## Por que isso importa
Em interfaces reais, o mesmo dado pode aparecer em várias áreas da página:
- banner principal
- sidebar
- rodapé
- cards
- chamadas promocionais

Se cada componente filho tiver seu próprio texto fixo, você passa a ter:
- duplicação de código
- risco maior de inconsistência
- mais trabalho manual a cada alteração
- chance de violar o princípio DRY

Ao centralizar os dados no componente pai, a UI fica mais previsível e mais fácil de manter.

Isso se conecta diretamente com:
- [[03-components-props-principle]]
- [[02-introducao-aos-componentes-funcionais]]
- [[09-user-events]]
- `single source of truth`
- `component tree`
- `state`

## Conceitos centrais

### 1. Relação entre componente pai e filho
No React, um componente pode renderizar outro componente.

Quando isso acontece:
- o componente que renderiza é o pai
- o componente renderizado é o filho

Exemplo:

```jsx
function Promo() {
  return (
    <div>
      <PromoHeading />
    </div>
  );
}
```

Aqui:
- `Promo` é o componente pai
- `PromoHeading` é o componente filho

### 2. Texto fixo funciona só em casos simples
No começo, é comum criar um componente filho com conteúdo fixo:

```jsx
function PromoHeading() {
  return <h1>80% off sale</h1>;
}
```

Isso resolve um caso simples, mas o componente fica rígido.
Se a promoção mudar, o conteúdo precisa ser alterado diretamente dentro dele.

### 3. O problema aparece quando a UI cresce
Imagine que o mesmo conteúdo promocional precise aparecer:
- na área principal
- na sidebar
- no rodapé

E agora a mensagem mudou para:
- `99% off all items`
- `Everything must go`

Se você repetir essas strings em vários componentes, surgem dois problemas:
- manutenção trabalhosa
- risco de divergência entre partes da interface

Esse cenário mostra por que copiar e colar conteúdo não escala bem.

### 4. DRY e fonte única de verdade
O princípio DRY significa evitar repetição desnecessária.

No contexto da aula, a melhor abordagem é armazenar os dados em um único lugar:

```jsx
const data = {
  heading: "99% off all items",
  callToAction: "Everything must go",
};
```

Esse objeto vira a fonte única de verdade para as mensagens promocionais.

### 5. O pai envia os dados para o filho
Depois de centralizar os dados, o componente pai passa essas informações ao filho via `props`:

```jsx
function Promo() {
  const data = {
    heading: "99% off all items",
    callToAction: "Everything must go",
  };

  return (
    <div>
      <PromoHeading
        heading={data.heading}
        callToAction={data.callToAction}
      />
    </div>
  );
}
```

Aqui o pai define:
- quais valores existem
- quais valores serão enviados
- em que momento o filho será renderizado

### 6. O filho recebe e exibe
O componente filho passa a ser responsável apenas por receber os dados e renderizar a interface:

```jsx
function PromoHeading(props) {
  return (
    <>
      <h1>{props.heading}</h1>
      <h2>{props.callToAction}</h2>
    </>
  );
}
```

Agora o filho:
- não decide os valores por conta própria
- apenas consome o que o pai enviou
- fica mais reutilizável

### 7. O fluxo é unidirecional
Esse modelo é descrito como fluxo unidirecional de dados:

```text
Pai -> Filho
```

Isso significa:
- o pai envia dados para o filho
- o mesmo pai pode enviar dados para vários filhos
- o filho não altera o pai usando `props`

Esse é um dos pilares do modelo mental do React.

### 8. Vários filhos podem compartilhar a mesma origem
Se `SidebarPromo` e `FooterPromo` também precisarem da mesma mensagem, o pai pode enviar os mesmos valores para todos:

```jsx
function App() {
  const data = {
    heading: "99% off all items",
    callToAction: "Everything must go",
  };

  return (
    <>
      <PromoHeading
        heading={data.heading}
        callToAction={data.callToAction}
      />
      <SidebarPromo
        heading={data.heading}
        callToAction={data.callToAction}
      />
      <FooterPromo
        heading={data.heading}
        callToAction={data.callToAction}
      />
    </>
  );
}
```

Com isso, basta mudar `data` uma única vez para toda a interface ser atualizada.

### 9. Hierarquia importa
React organiza a UI como uma árvore de componentes.

Nesse modelo:
- componentes mais acima costumam controlar dados compartilhados
- componentes mais abaixo costumam receber e exibir esses dados

Por isso, entender pai e filho não é só questão de vocabulário.
É uma forma de entender a hierarquia do app e onde cada informação deve viver.

### 10. Benefício prático
Ao guardar os dados no pai e distribuí-los aos filhos:
- você evita editar vários arquivos ou componentes
- reduz risco de erro de digitação
- facilita futuras mudanças de negócio
- mantém a interface consistente

Esse padrão prepara terreno para entender depois:
- atualização de `state`
- eventos
- levantamento de estado
- compartilhamento de dados entre componentes

### 11. `props` e `state` têm papéis diferentes
O transcript também separa os dados do React em dois grupos:

- `props`: dados externos ao componente, recebidos do pai e tratados como somente leitura
- `state`: dados internos ao componente, controlados pelo próprio componente e passíveis de mudança

Uma forma boa de lembrar:
- `props` pertencem a quem renderiza
- `state` pertence a quem o mantém

Isso importa porque um componente filho pode consumir `props`, mas não deve tentar mutá-las.
Se o valor precisa mudar ao longo do tempo, essa mudança geralmente nasce em `state`.

### 12. Stateless vs stateful
Pensando de forma didática:

- um componente `stateless` apenas recebe dados e renderiza
- um componente `stateful` guarda dados próprios e controla atualizações

Na prática moderna, até componentes funcionais podem ser `stateful` com hooks.
Mas, no contexto da aula, a distinção serve para reforçar o fluxo:
- o componente com `state` controla o dado
- o filho recebe o resultado via `props`

### 13. Exemplo da aula com data e hora
O exemplo mostrado usa um componente pai com `state` contendo a data atual.
Depois, esse valor é convertido em string e enviado ao componente filho como `message`.

```jsx
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
  }

  render() {
    return (
      <Child
        message={this.state.date.toLocaleTimeString()}
      />
    );
  }
}

function Child(props) {
  return <h1>{props.message}</h1>;
}
```

O que esse exemplo mostra:
- o `state` mora no pai
- o valor flui para baixo como `props`
- o filho só lê `props.message` e renderiza
- a responsabilidade de controlar o dado continua no componente pai

## Mental model
Pense no componente pai como o centro de distribuição de dados.

Ele:
- armazena a informação relevante
- define quem precisa recebê-la
- entrega essa informação aos filhos

Os filhos funcionam como pontos de exibição:
- recebem o conteúdo
- exibem a UI
- permanecem sincronizados com a origem

Outra forma de lembrar:
- pai = origem
- `props` = canal de entrega
- filho = renderização

Se quiser memorizar a diferença entre os dois tipos de dado:
- `props` = pacote entregue ao componente
- `state` = estoque interno do componente

## Exemplo completo

```jsx
function Promo() {
  const data = {
    heading: "99% off all items",
    callToAction: "Everything must go",
  };

  return (
    <div>
      <PromoHeading
        heading={data.heading}
        callToAction={data.callToAction}
      />
    </div>
  );
}

function PromoHeading(props) {
  return (
    <>
      <h1>{props.heading}</h1>
      <h2>{props.callToAction}</h2>
    </>
  );
}

export default Promo;
```

O que está acontecendo:
- `Promo` define os dados
- `PromoHeading` recebe os dados
- a renderização depende do valor passado pelo pai
- mudar `data` muda a saída do filho

## Erros comuns
- Colocar texto fixo no componente filho quando o mesmo valor será reutilizado em vários lugares.
- Duplicar strings iguais em diferentes componentes.
- Achar que `props` servem para o filho atualizar diretamente o pai.
- Tentar modificar `props` dentro do componente filho.
- Confundir `props` com `state` como se ambos fossem dados controlados pelo mesmo componente.
- Não perceber qual componente deveria ser a fonte única de verdade.
- Confundir hierarquia visual com hierarquia de dados sem analisar quem realmente fornece a informação.

## Conexões
- [[03-components-props-principle]]
- [[02-introducao-aos-componentes-funcionais]]
- [[01-visao-geral-do-react]]
- [[09-user-events]]
- `component hierarchy`
- `single source of truth`

## Ângulo de entrevista
- O que significa dizer que o fluxo de dados em React é unidirecional?
- Qual é a diferença entre componente pai e componente filho?
- Qual é a diferença entre `props` e `state`?
- Por que um componente filho não deve alterar suas próprias `props`?
- Por que centralizar dados no componente pai ajuda na manutenção?
- O que o princípio DRY tem a ver com `props`?
- O que significa ter uma fonte única de verdade em uma árvore de componentes?

## Flashcards
- **Q:** Em qual direção os dados fluem com `props` no React?
  **A:** Do componente pai para o componente filho.

- **Q:** O que o componente pai normalmente faz nessa relação?
  **A:** Armazena ou controla os dados e os envia aos filhos.

- **Q:** Por que repetir o mesmo texto em vários componentes é ruim?
  **A:** Porque aumenta manutenção, risco de inconsistência e viola DRY.

- **Q:** O que é uma fonte única de verdade?
  **A:** Um ponto central onde os dados são mantidos e de onde são distribuídos.

- **Q:** O componente filho deve definir sozinho os dados compartilhados?
  **A:** Não. Em geral, ele deve recebê-los via `props`.

- **Q:** Qual é a diferença essencial entre `props` e `state`?
  **A:** `props` são dados externos e somente leitura; `state` são dados internos que o componente controla e pode atualizar.

- **Q:** Um componente filho pode modificar suas `props`?
  **A:** Não. Ele deve apenas lê-las e renderizá-las.

## Prática guiada
- Crie um componente pai `Promo` e um filho `PromoHeading`.
- Faça o filho renderizar texto fixo inicialmente.
- Depois mova os textos para um objeto `data` no pai.
- Passe `heading` e `callToAction` para o filho usando `props`.
- Reutilize os mesmos dados em mais de um componente para testar a ideia de fonte única de verdade.
- Monte um exemplo com um pai guardando `new Date()` em `state` e um filho exibindo esse valor via prop `message`.

## Excalidraw brief
- Conceito central: `Fluxo de dados pai -> filho`
- Nós principais: `Componente pai`, `Componente filho`, `props`, `state`, `data`, `single source of truth`, `DRY`
- Relações:
  - `Componente pai -> envia -> props`
  - `state -> mora em -> componente pai`
  - `props -> carregam -> dados`
  - `Componente filho -> recebe -> props`
  - `Componente filho -> não altera -> props`
  - `Fonte única de verdade -> evita -> duplicação`
  - `Mudança no pai -> atualiza -> filhos`
- Layout sugerido:
  - pai no topo
  - três filhos abaixo
  - setas descendo do pai para os filhos
  - objeto `data` ou bloco `state` ao lado do pai como origem dos textos

## Resumo final
O relacionamento entre pai e filho em React ajuda a organizar como a informação circula na interface.
Quando um dado precisa ser compartilhado por vários componentes, a melhor estratégia costuma ser armazená-lo no pai e distribuí-lo com `props`.
Ao mesmo tempo, é importante separar `props` de `state`: `props` são entradas externas e somente leitura; `state` é o dado interno que o componente controla.
Isso torna o sistema mais consistente, reduz repetição e reforça a ideia central de fluxo unidirecional de dados no React.
