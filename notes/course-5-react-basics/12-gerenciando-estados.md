---
type: lesson-note
course: Meta Full Stack Developer
session: course-5-react-basics
lesson: Gerenciando estados
source: coursera-transcript
status: draft
tags:
  - meta-full-stack
  - react
  - study-notes
created: 2026-04-15
updated: 2026-04-15
---

# Gerenciando estados

## TL;DR
À medida que apps React crescem, também cresce a dificuldade de compartilhar estado entre componentes.
Quando dois componentes irmãos precisam da mesma informação, uma saída inicial é subir o estado para um ancestral comum.
Isso resolve o acesso ao dado, mas pode introduzir `prop drilling`, isto é, a passagem de `props` por várias camadas intermediárias.
Quando o mesmo estado precisa ser consumido em vários pontos da árvore, isso se aproxima de um problema de estado global.
Nesse cenário, a `Context API` do React oferece uma forma mais direta de disponibilizar dados sem depender tanto de intermediários.

## Por que isso importa
Em aplicações reais, o estado raramente fica isolado em um único componente.
É comum que diferentes partes da interface precisem saber:
- o usuário atual
- o tema ativo
- os itens de um carrinho
- o progresso de uma tarefa
- dados compartilhados de navegação ou sessão

Sem uma estratégia clara de gerenciamento de estado, o código tende a ficar:
- mais acoplado
- mais difícil de manter
- mais verboso
- mais sensível a mudanças estruturais na árvore de componentes

Essa aula conecta conceitos fundamentais do React:
- estado local
- compartilhamento de estado
- `lifting state up`
- `prop drilling`
- estado global
- `Context API`

## Conceitos centrais

### 1. O problema começa quando o estado precisa circular
A aula usa um app pequeno de refeições para ilustrar o cenário.

O app ajuda o usuário a acompanhar a alimentação diária:
- existe uma lista de refeições do dia
- o usuário marca cada refeição conforme consome
- a interface mostra quantas refeições ainda faltam

A estrutura tem três componentes:
- `App`
- `MealsList`
- `Counter`

O ponto importante é que `MealsList` e `Counter` são irmãos dentro de `App`.
Isso significa que um não pode enviar `props` diretamente ao outro.

### 2. Estado local funciona bem até o dado precisar ser compartilhado
No exemplo, `MealsList` usa `useState` para armazenar as refeições do dia:

```jsx
const todaysMeals = ["Breakfast", "Lunch", "Dinner"];
const [meals, setMeals] = useState(todaysMeals);
```

Enquanto esse dado só interessa a `MealsList`, tudo bem.
O problema aparece quando `Counter` também precisa dessa informação para calcular quantas refeições faltam.

Isso expõe uma regra prática do React:
- estado local é ótimo para responsabilidades locais
- quando vários componentes dependem do mesmo dado, a localização desse estado precisa ser repensada

### 3. Componentes irmãos não compartilham estado diretamente
Se `Counter` precisa ler algo que está dentro de `MealsList`, não basta tentar “acessar” o estado do outro componente.

No React:
- cada componente controla seu próprio estado local
- irmãos não compartilham estado entre si automaticamente
- o compartilhamento acontece pela árvore de componentes

Ou seja, para dois irmãos consumirem o mesmo dado, ele normalmente precisa subir para um ancestral comum.

### 4. Lifting state up move o estado para um ponto comum
A primeira solução apresentada é `lifting state up`.

Isso significa:
- tirar o estado de `MealsList`
- mover esse estado para `App`
- distribuir os dados necessários via `props`

Fluxo conceitual:

```text
Antes:
MealsList guarda o estado
Counter precisa dele, mas não consegue acessar

Depois:
App guarda o estado
App passa dados para MealsList
App passa dados para Counter
```

Esse padrão é muito comum em React porque mantém uma fonte única de verdade em um componente mais alto da árvore.

### 5. Às vezes um componente vira apenas ponte
A aula também descreve a extração de um componente `MealItem`.

Depois de subir o estado para `App`, o fluxo pode ficar assim:

```text
App -> MealsList -> MealItem
```

Nesse caso, `MealsList` pode acabar recebendo dados não porque precisa deles para si, mas porque precisa repassá-los para `MealItem`.

Quando isso acontece, um componente intermediário passa a funcionar mais como canal do que como dono real da informação.

### 6. Isso leva ao problema de `prop drilling`
`Prop drilling` é a necessidade de passar `props` por várias camadas de componentes até chegar ao destino real.

No transcript, isso é mostrado com uma cadeia propositalmente simples:

```text
App -> Main -> Header -> Wrapper -> Button
```

Nesse fluxo:
- `App` envia a prop `msg` para `Main`
- `Main` repassa `msg` para `Header`
- `Header` repassa `msg` para `Wrapper`
- `Wrapper` repassa `msg` para `Button`
- `Button` finalmente usa `msg` no `onClick`

Ou seja, vários componentes intermediários só existem como ponte para que a mensagem chegue ao destino real.

O problema não é só escrever mais código.
Os custos aparecem porque:
- componentes intermediários ficam acoplados a dados que não usam diretamente
- mudanças na origem do estado podem exigir ajustes ao longo da cadeia
- a árvore fica mais difícil de entender
- o volume de `props` tende a crescer com o app

### 7. Centralizar tudo no `App` também tem custo
Subir estado resolve compartilhamento, mas não é uma solução mágica para todos os casos.

Se toda informação compartilhada for movida para `App`, esse componente pode virar um ponto de acúmulo de responsabilidades.

Isso gera alguns sinais ruins:
- excesso de estado no topo da aplicação
- perda de coesão
- componentes mais distantes dependendo de um ancestral inchado
- mais dificuldade para localizar a responsabilidade real de cada dado

O ponto da aula é importante:
nem todo estado deveria morar em `App`.
Parte dele pertence conceitualmente a componentes mais específicos, mesmo que precise ser compartilhada.

### 8. Quando o mesmo estado é usado em muitos lugares, surge um problema de estado global
Outra forma de descrever esse cenário é pensar em estado global.

Se um mesmo conjunto de dados:
- precisa aparecer em vários pontos do app
- cruza múltiplos ramos da árvore
- não pertence claramente a apenas um componente local

então você está lidando com uma necessidade de compartilhamento global ou semiglobal.

Não significa necessariamente usar uma biblioteca externa.
Significa, primeiro, reconhecer que o problema já deixou de ser apenas local.

### 9. `Context API` elimina parte dos intermediários
A solução elegante apresentada na aula é a `Context API` do React.

Uma forma simples de pensar nela:
- em vez de perfurar a árvore com `props`
- você disponibiliza o valor em um contexto
- componentes consumidores leem esse valor diretamente do contexto

Em termos de modelo mental:

```text
Sem contexto:
App -> MealsList -> MealItem

Com contexto:
MealItem consome diretamente o contexto
```

Isso não remove a árvore de componentes, mas reduz a necessidade de usar componentes intermediários apenas como ponte de dados.

### 10. O estado pode ser extraído para um arquivo de contexto
A aula sugere separar esse estado em um arquivo próprio de contexto.

A ideia geral é:
- criar um contexto
- manter o estado compartilhado nesse provedor
- importar o contexto em qualquer componente que precise dele

Estrutura conceitual:

```jsx
// MealsContext.js
import { createContext, useContext, useState } from "react";

const MealsContext = createContext();

export function MealsProvider({ children }) {
  const [meals, setMeals] = useState(["Breakfast", "Lunch", "Dinner"]);

  return (
    <MealsContext.Provider value={{ meals, setMeals }}>
      {children}
    </MealsContext.Provider>
  );
}

export function useMeals() {
  return useContext(MealsContext);
}
```

Depois, qualquer componente dentro do provider pode consumir esse dado:

```jsx
function Counter() {
  const { meals } = useMeals();

  return <p>Meals remaining: {meals.length}</p>;
}
```

### 11. Contexto não substitui todo estado local
A principal lição não é “coloque tudo em contexto”.

A ideia correta é:
- use estado local quando o dado pertence a um componente específico
- suba o estado quando irmãos precisam compartilhá-lo
- use contexto quando o compartilhamento atravessa múltiplas camadas e o `prop drilling` começa a prejudicar a arquitetura

Isso ajuda a escolher a ferramenta certa para cada escala do problema.

## Mental model
Pense no estado como informação que precisa morar no lugar mais próximo possível de quem realmente a controla, mas alto o suficiente para quem precisa consumi-la.

Uma boa sequência mental é:
- se só um componente usa, mantenha local
- se pai e filhos usam, suba o estado
- se muitos ramos usam, considere contexto

Outra forma de lembrar:
- `state local` = responsabilidade local
- `lifting state up` = compartilhamento entre parentes próximos
- `prop drilling` = custo de passar dados por muitas camadas
- `context` = atalho controlado para dados amplamente consumidos

## Examples

### Exemplo com estado preso em um irmão

```jsx
function App() {
  return (
    <>
      <MealsList />
      <Counter />
    </>
  );
}
```

Se `MealsList` guarda o estado e `Counter` também precisa dele, há um problema de compartilhamento.

### Exemplo com `lifting state up`

```jsx
function App() {
  const [meals, setMeals] = useState([
    "Breakfast",
    "Lunch",
    "Dinner",
  ]);

  return (
    <>
      <MealsList meals={meals} setMeals={setMeals} />
      <Counter meals={meals} />
    </>
  );
}
```

Esse modelo resolve o compartilhamento entre irmãos.

### Exemplo de `prop drilling` com vários intermediários

```jsx
function App() {
  return (
    <Main msg="Passei pelo Header e pelo Wrapper e cheguei ao componente Button" />
  );
}

function Main({ msg }) {
  return <Header msg={msg} />;
}

function Header({ msg }) {
  return (
    <>
      <h1>Header here</h1>
      <Wrapper msg={msg} />
    </>
  );
}

function Wrapper({ msg }) {
  return (
    <>
      <h2>Wrapper here</h2>
      <Button msg={msg} />
    </>
  );
}

function Button({ msg }) {
  return (
    <div>
      <h3>This is the Button component</h3>
      <button onClick={() => alert(msg)}>Click me!</button>
    </div>
  );
}
```

Aqui:
- `Main`, `Header` e `Wrapper` recebem `msg`
- mas quem realmente usa essa prop é o `Button`
- esse é exatamente o padrão que caracteriza `prop drilling`

### Exemplo conceitual com contexto

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

Agora tanto `MealsList` quanto `Counter` podem consumir o mesmo estado sem depender da passagem manual por `props` em todos os níveis.

## Common mistakes
- Tentar compartilhar estado diretamente entre componentes irmãos.
- Subir estado para `App` sem avaliar se isso realmente melhora a modelagem.
- Confundir `lifting state up` com solução definitiva para qualquer problema de compartilhamento.
- Passar `props` por muitos níveis e não reconhecer o custo arquitetural disso.
- Colocar todo estado em contexto, inclusive o que deveria continuar local.
- Tratar componentes intermediários como meros dutos de `props` sem perceber o acoplamento criado.

## Connections
- [[10-fluxo-dados-pai-filho]]
- [[11-hooks-e-usestate]]
- [[03-components-props-principle]]
- `single source of truth`
- estado local
- estado global
- `useContext`

## Interview angle
- O que significa gerenciamento de estado em um app React?
- Por que componentes irmãos não compartilham estado diretamente?
- O que é `lifting state up`?
- O que é `prop drilling` e por que isso pode se tornar um problema?
- Em que cenário `Context API` faz mais sentido?
- Qual é a diferença entre estado local e estado global?

## Flashcards
- **Q:** Quando faz sentido subir o estado em React?
  **A:** Quando múltiplos componentes, especialmente irmãos, precisam consumir o mesmo dado.

- **Q:** O que é `prop drilling`?
  **A:** É a passagem de `props` por várias camadas de componentes intermediários até chegar ao consumidor real.

- **Q:** Qual problema a `Context API` ajuda a reduzir?
  **A:** O custo de compartilhar dados amplamente usados sem depender de cadeias longas de `props`.

- **Q:** Todo estado compartilhado deve ir para contexto?
  **A:** Não. Estado local continua sendo a melhor opção quando o dado pertence a um único componente ou a uma área pequena da árvore.

- **Q:** Por que centralizar tudo em `App` pode ser ruim?
  **A:** Porque o componente raiz pode ficar inchado e concentrar responsabilidades que pertencem a partes mais específicas do app.

- **Q:** O que significa pensar em “estado global”?
  **A:** Reconhecer que certos dados precisam ser acessados em vários lugares da aplicação, atravessando diferentes ramos da árvore.

## Practice prompts
- Pegue um app com dois componentes irmãos e mova o estado compartilhado para o ancestral comum.
- Reescreva um exemplo com `prop drilling` de três níveis usando `Context API`.
- Liste quais estados de um app simples deveriam ser locais e quais deveriam ser compartilhados.
- Modele um `MealsProvider` e consuma seus dados em `MealsList` e `Counter`.

## Excalidraw brief
- Conceito central: `Gerenciamento de estado no React`
- Nós principais: `state local`, `irmãos`, `lifting state up`, `prop drilling`, `estado global`, `Context API`
- Relações:
  - `state local -> funciona bem em -> componente isolado`
  - `irmãos -> precisam de -> ancestral comum`
  - `lifting state up -> move -> fonte de verdade`
  - `prop drilling -> surge com -> múltiplas camadas`
  - `Context API -> reduz -> intermediários`
  - `estado global -> indica -> compartilhamento amplo`
- Layout sugerido:
  - `Gerenciamento de estado` no centro
  - à esquerda `state local`
  - acima `lifting state up`
  - abaixo `prop drilling`
  - à direita `Context API`
  - `estado global` conectando `prop drilling` e `Context API`

## References
- Origem: transcrição da aula sobre gerenciamento de estado em aplicações React
- React Docs: sharing state between components
- React Docs: `createContext`
- React Docs: `useContext`
