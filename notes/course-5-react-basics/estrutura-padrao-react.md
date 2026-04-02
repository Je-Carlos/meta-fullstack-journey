---
type: lesson-note
course: Meta Full Stack Developer
session: course-5-react-basics
lesson: Estrutura padrão de projetos React
source: coursera-transcript
status: draft
tags:
  - meta-full-stack
  - react
  - study-notes
created: 2026-04-02
updated: 2026-04-02
---

# Estrutura padrão de projetos React

## TL;DR
A estrutura padrão de um projeto React existe para separar responsabilidades: dependências, arquivos públicos e código-fonte.
As pastas mais importantes são `node_modules`, `public` e `src`, e a maior parte do trabalho do desenvolvedor acontece em `src`.
Os arquivos na raiz, como `package.json` e `package-lock.json`, ajudam a instalar, executar e reproduzir o projeto em outras máquinas.
React não impõe uma organização única dentro de `src`, então a estrutura pode evoluir conforme o app cresce.
Planejar a estrutura cedo reduz confusão, facilita manutenção e melhora a escalabilidade do projeto.

## Por que isso importa
Entender a estrutura de pastas evita dois problemas comuns no início com React:
- não saber onde colocar cada tipo de arquivo
- transformar `src` em uma pasta caótica conforme o projeto cresce

Em projetos reais, organização importa porque:
- acelera navegação no código
- facilita onboarding de outras pessoas
- reduz acoplamento entre UI, assets e lógica
- ajuda a escalar de um app pequeno para uma base maior

Também é um assunto que se conecta diretamente com [[introducao-aos-componentes-funcionais]], composição de componentes e organização de features.

## Conceitos centrais

### 1. Estrutura inicial de um app React
Ao criar um projeto React com um template inicial, você normalmente encontra:
- `node_modules/`
- `public/`
- `src/`
- arquivos de configuração e metadados na raiz

O ponto principal da aula não é decorar todos os arquivos, mas entender o papel de cada grupo.

> [!tip]
> O material usa a estrutura clássica associada ao `create-react-app`. Em setups mais modernos, como `Vite`, alguns nomes mudam, mas a ideia geral continua: arquivos públicos, dependências, código-fonte e metadados do projeto.

### 2. Pasta `node_modules`
Essa pasta armazena os pacotes instalados via `npm`.

Na prática:
- cada dependência do projeto vai parar ali
- a pasta pode ficar muito grande
- você normalmente não edita nada nela manualmente

Ela funciona como o repositório local das bibliotecas que o projeto precisa para rodar.

### 3. Pasta `public`
Essa pasta contém arquivos estáticos expostos diretamente para a aplicação.

Exemplos citados na aula:
- imagens
- `favicon`
- `robots.txt`
- `manifest.json`
- `index.html`

O arquivo mais importante aqui é o `index.html`, porque ele contém o ponto onde a aplicação React será montada no navegador.

### 4. O papel do `index.html`
Em um app React tradicional, existe um elemento raiz no `body`, algo como:

```html
<div id="root"></div>
```

React usa esse ponto de montagem para renderizar a aplicação.

Mentalmente, vale lembrar assim:
- `index.html` entrega a casca da página
- React injeta a aplicação dentro do elemento raiz
- as atualizações seguintes continuam acontecendo nesse mesmo ponto

### 5. Pasta `src`
Essa é a pasta mais importante para o dia a dia do desenvolvimento.

Ela normalmente contém:
- componentes
- estilos
- imagens usadas pelo código
- arquivos de entrada da aplicação
- testes

Na maior parte do tempo, é em `src` que o desenvolvedor cria, lê e modifica código.

### 6. Arquivos comuns dentro de `src`
Alguns arquivos clássicos em projetos iniciais React:
- `index.js`: ponto de entrada da aplicação
- `App.js`: componente raiz principal
- `App.css`: estilos ligados ao `App`
- `index.css`: estilos globais
- `App.test.js`: testes
- `setupTests.js`: configuração de testes
- `reportWebVitals.js`: métricas de performance
- `logo.svg`: asset padrão do template inicial

Nem todos esses arquivos são obrigatórios para um app React básico. Muitos vêm do template inicial e podem ser removidos se o código que depende deles também for removido.

### 7. O arquivo mais importante em `src`
Na estrutura ensinada na aula, `index.js` é o arquivo central, porque ele importa o que é necessário para inicializar e renderizar a aplicação React.

Em setups modernos, você também pode encontrar esse papel em arquivos como `main.jsx` ou `main.tsx`.

O conceito continua o mesmo:
- existe um ponto de entrada
- esse ponto importa o componente raiz
- esse componente é renderizado no elemento raiz do HTML

### 8. Arquivos na raiz do projeto
Além das pastas principais, a raiz costuma incluir:
- `.gitignore`
- `README.md`
- `package.json`
- `package-lock.json`

Função de cada um:
- `.gitignore`: define o que não deve ser versionado
- `README.md`: documenta o projeto
- `package.json`: lista scripts, dependências e metadados
- `package-lock.json`: trava versões exatas das dependências instaladas

### 9. Por que `package-lock.json` importa
Ele ajuda o `npm` a reproduzir o mesmo conjunto de dependências em outra máquina.

Isso reduz o clássico problema de:
- funciona no meu computador
- quebra no computador de outra pessoa

Observação importante: o nome correto do arquivo é `package-lock.json`, não `package-loc.json`.

### 10. React não impõe uma única estrutura interna
Fora alguns arquivos de entrada, React é relativamente flexível sobre como você organiza `src`.

Isso significa que você pode criar pastas como:
- `components/`
- `pages/`
- `assets/`
- `hooks/`
- `services/`
- `utils/`

Essa liberdade é útil, mas exige critério. Sem um plano, a pasta `src` fica desorganizada rapidamente.

## Mental model
Pense na estrutura do projeto como uma separação entre quatro áreas:
- dependências que vêm de fora: `node_modules`
- arquivos públicos entregues ao navegador: `public`
- código que você escreve e mantém: `src`
- metadados e scripts do projeto: raiz

Outra forma de memorizar:
- `public` = vitrine
- `src` = oficina
- `node_modules` = estoque de peças compradas
- raiz = documentação e instruções de montagem

## Exemplos

### Exemplo mínimo
Estrutura enxuta de um projeto React inicial:

```text
my-app/
  node_modules/
  public/
    index.html
  src/
    App.js
    index.js
  package.json
  package-lock.json
```

### Exemplo mais próximo do mundo real
Uma organização mais escalável dentro de `src`:

```text
src/
  assets/
    logo.svg
    images/
  components/
    Button.jsx
    Header.jsx
  pages/
    Home.jsx
    About.jsx
  hooks/
    useCart.js
  services/
    api.js
  styles/
    globals.css
  App.jsx
  main.jsx
```

Essa estrutura melhora separação de responsabilidades:
- `components` guarda blocos reutilizáveis de UI
- `pages` representa telas
- `services` centraliza integração com APIs
- `hooks` guarda lógica reutilizável
- `assets` concentra arquivos estáticos usados pelo código

## Erros comuns
- Achar que `node_modules` deve ser editada manualmente.
- Colocar qualquer arquivo dentro de `src` sem critério e deixar a pasta crescer sem organização.
- Confundir `public` com `src/assets`. Nem todo arquivo estático precisa ficar no mesmo lugar.
- Assumir que todos os arquivos gerados pelo template são obrigatórios para sempre.
- Memorizar nomes de arquivos sem entender o papel do ponto de entrada do app.
- Escrever `package-loc.json` em vez de `package-lock.json`.

## Conexões
- [[visao-geral-do-react]]
- [[introducao-aos-componentes-funcionais]]
- [[component tree]]
- [[renderização]]
- [[JSX]]

## Ângulo de entrevista
- Quais são as principais pastas de um projeto React padrão e qual o papel de cada uma?
- Qual a diferença entre `public` e `src`?
- Para que servem `package.json` e `package-lock.json`?
- Por que uma boa estrutura de pastas ajuda na escalabilidade de um app React?
- O que pode ser removido de um template inicial React sem quebrar a base do app?

## Flashcards
- **Q:** Qual pasta contém as dependências instaladas pelo `npm`?
  **A:** `node_modules`.

- **Q:** Qual é o papel do `index.html` em um projeto React tradicional?
  **A:** Fornecer o elemento raiz no qual a aplicação React será montada.

- **Q:** Em qual pasta o desenvolvedor React costuma trabalhar mais?
  **A:** `src`.

- **Q:** Para que serve `package-lock.json`?
  **A:** Para registrar versões exatas das dependências e ajudar a reproduzir o ambiente do projeto.

- **Q:** React obriga uma única organização dentro de `src`?
  **A:** Não. Ele permite diferentes estratégias de organização.

## Prática guiada
- Desenhe a estrutura mínima de um app React e descreva a função de cada pasta principal.
- Explique, com suas palavras, a diferença entre `public/index.html` e `src/index.js`.
- Reorganize mentalmente uma pasta `src` bagunçada em `components`, `pages`, `assets` e `services`.
- Liste quais arquivos do template inicial você manteria ou removeria em um projeto pequeno.

## Excalidraw brief
- Tipo de diagrama: hierarchy tree
- Conceito central: `Estrutura de projeto React`
- Nós principais: `node_modules`, `public`, `src`, `raiz do projeto`
- Subnós:
  - `public -> index.html`, `favicon`, `manifest.json`
  - `src -> App.js`, `index.js`, `components`, `assets`, `styles`
  - `raiz -> package.json`, `package-lock.json`, `.gitignore`, `README.md`
- Relações:
  - `raiz do projeto -> contém -> public`
  - `raiz do projeto -> contém -> src`
  - `raiz do projeto -> contém -> node_modules`
  - `src -> renderiza app em -> index.html`
  - `package.json -> descreve -> scripts e dependências`
  - `package-lock.json -> fixa -> versões`
- Layout sugerido:
  - nó central no topo com `Projeto React`
  - quatro blocos principais abaixo
  - `src` e `public` lado a lado para destacar a relação entre código e ponto de montagem
  - `node_modules` em um canto com menor ênfase visual

## Referências
- Curso: Meta Full Stack Developer
- Sessão: `course-5-react-basics`
- Origem: transcrição da aula sobre estrutura padrão de projetos React
