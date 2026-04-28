---
type: lesson-note
course: Meta Full Stack Developer
session: course-5-react-basics
lesson: Áudio e vídeo
source: coursera-transcript
status: draft
tags:
  - meta-full-stack
  - react
  - assets
  - media
created: 2026-04-27
updated: 2026-04-27
---

# Áudio e vídeo

## TL;DR
Aplicações React podem usar assets de áudio e vídeo de formas diferentes.
Para arquivos locais, é possível usar elementos HTML5 como `<video>` e `<audio>`, passando o asset ao atributo `src`.
Para vídeos de plataformas externas, muitas vezes é preciso usar um código de incorporação ou uma API recomendada pela própria plataforma.
Transformar esse embed em um componente React facilita reutilização, troca de vídeos e controle por `props`.
Outra alternativa é usar pacotes NPM especializados, como players React de terceiros.
Ao escolher um pacote, vale verificar manutenção, frequência de atualizações, popularidade, contribuidores, documentação e repositório no GitHub.

## Por que isso importa
Áudio e vídeo fazem parte da experiência normal de uso da web moderna.
Desde smartphones e Wi-Fi rápido, usuários consomem, criam e compartilham mídia diariamente.

Em React, isso importa porque o app pode precisar lidar com:
- vídeos locais
- áudio local
- vídeos incorporados de terceiros
- players customizados
- pacotes NPM para simplificar integração

A decisão técnica muda conforme a origem do arquivo.
Um vídeo local pode ser simples de carregar.
Um vídeo hospedado em uma plataforma externa pode exigir regras próprias de incorporação, URLs específicas, IDs de vídeo ou bibliotecas dedicadas.

## Conceitos centrais

### 1. Vídeo local pode usar a tag HTML5 `<video>`
React não substitui HTML.
Se o objetivo é renderizar um vídeo local, o componente pode usar a tag `<video>`.

A ideia é parecida com o uso de imagens:
- importar ou declarar o caminho do asset
- passar esse valor ao atributo `src`
- renderizar o elemento no JSX

Exemplo:

```jsx
import introVideo from "../assets/intro.mp4";

function IntroVideo() {
  return (
    <video src={introVideo} controls>
      Seu navegador não suporta vídeo HTML5.
    </video>
  );
}
```

O atributo `controls` exibe controles nativos do navegador, como play, pause e volume.

### 2. Áudio local pode usar a tag HTML5 `<audio>`
Para áudio, o raciocínio é o mesmo.
Um arquivo local pode ser importado e usado em um elemento `<audio>`.

```jsx
import themeSong from "../assets/theme.mp3";

function AudioPlayer() {
  return (
    <audio src={themeSong} controls>
      Seu navegador não suporta áudio HTML5.
    </audio>
  );
}
```

Esse padrão é suficiente quando a aplicação só precisa tocar um arquivo local com controles básicos.

### 3. Plataformas externas podem exigir incorporação própria
Nem todo vídeo pode ser tratado como um arquivo local.
Serviços de mídia social e plataformas de compartilhamento de vídeo normalmente têm regras próprias para embed.

Nesses casos, a plataforma pode fornecer:
- um trecho de HTML para copiar e colar
- uma URL específica de incorporação
- um ID único do vídeo
- uma biblioteca ou SDK próprio

Em React, copiar e colar um embed bruto pode funcionar em alguns cenários, mas costuma ser melhor transformar a integração em componente.

### 4. Um embed pode virar componente React
Ao transformar um vídeo incorporado em componente, você ganha reutilização e controle.

Em vez de repetir o mesmo bloco de embed em várias telas, o componente pode receber o ID do vídeo via `props`.

```jsx
function VideoEmbed({ videoId }) {
  return (
    <iframe
      src={`https://www.example.com/embed/${videoId}`}
      title="Vídeo incorporado"
      allowFullScreen
    />
  );
}
```

Uso:

```jsx
<VideoEmbed videoId="abc123" />
```

Com essa abordagem, trocar o vídeo pode ser tão simples quanto passar outro `videoId`.

### 5. Componentes ajudam a controlar a saída
Quando o vídeo vira um componente, a aplicação pode controlar melhor o que aparece.

Exemplos:
- alternar um vídeo por outro usando `props`
- reutilizar o mesmo layout de player
- padronizar atributos como `title`, `allowFullScreen` e dimensões
- esconder detalhes de integração da plataforma externa

Esse é um padrão comum em React: encapsular uma integração externa em um componente próprio.

### 6. Pacotes NPM podem acelerar integrações
Outra alternativa é usar um pacote de terceiros.
O ecossistema NPM tem muitos pacotes voltados para áudio e vídeo em React.

Essa abordagem pode ser útil quando você precisa de:
- suporte a várias plataformas de vídeo
- API React mais simples
- player customizável
- tratamento de diferenças entre provedores
- menos código manual de integração

Um exemplo citado na aula é o `react-player`.
Ele é um pacote open source criado para facilitar o uso de players de mídia em React.

### 7. Escolher pacote exige avaliação
Nem todo pacote NPM é uma boa dependência.
Antes de adotar um pacote, é importante verificar sinais de qualidade.

Bons critérios:
- frequência de manutenção
- atualizações recentes
- quantidade de contribuidores
- documentação clara
- issues e pull requests no GitHub
- popularidade no NPM
- reputação em pesquisas externas

Estrelas no GitHub podem indicar popularidade, mas não devem ser o único critério.
Um pacote popular, sem manutenção recente, ainda pode virar risco.

### 8. GitHub ajuda a avaliar o projeto
Ao abrir a página do pacote no GitHub, você pode observar:
- número de estrelas
- número de contribuidores
- atividade recente
- issues abertas
- pull requests
- qualidade do README
- exemplos de uso

Na aula, o `react-player` aparece como exemplo de pacote com sinais positivos, como muitas estrelas, vários contribuidores e manutenção regular.

## Mental model
Pense em três níveis de complexidade.

Primeiro nível:
- arquivo local
- `<video>` ou `<audio>`
- `src` apontando para o asset

Segundo nível:
- vídeo hospedado fora da aplicação
- embed fornecido pela plataforma
- componente React encapsulando o embed

Terceiro nível:
- várias plataformas
- comportamento customizado
- pacote NPM especializado

Quanto mais complexa a origem da mídia e o comportamento esperado, mais sentido faz encapsular ou usar uma biblioteca.

## Exemplos

### Exemplo mínimo com vídeo local

```jsx
import demoVideo from "./assets/demo.mp4";

function App() {
  return (
    <main>
      <h1>Demonstração</h1>
      <video src={demoVideo} controls width="640">
        Seu navegador não suporta vídeo HTML5.
      </video>
    </main>
  );
}

export default App;
```

Esse exemplo usa um asset local e controles nativos do navegador.

### Exemplo mínimo com áudio local

```jsx
import podcastIntro from "./assets/podcast-intro.mp3";

function PodcastIntro() {
  return (
    <audio src={podcastIntro} controls>
      Seu navegador não suporta áudio HTML5.
    </audio>
  );
}
```

Esse padrão é adequado para áudio simples sem player customizado.

### Exemplo de componente para embed

```jsx
function ExternalVideo({ videoId, title }) {
  return (
    <iframe
      src={`https://www.example.com/embed/${videoId}`}
      title={title}
      width="640"
      height="360"
      allowFullScreen
    />
  );
}

function Lesson() {
  return <ExternalVideo videoId="abc123" title="Aula introdutória" />;
}
```

O ponto importante é o padrão, não a URL fictícia.
O componente recebe dados por `props` e monta a incorporação.

### Exemplo conceitual com pacote de player

```jsx
import ReactPlayer from "react-player";

function MediaPlayer() {
  return (
    <ReactPlayer
      url="https://www.example.com/video/abc123"
      controls
    />
  );
}
```

Esse exemplo mostra a ideia de delegar detalhes de player a uma biblioteca.
Antes de usar um pacote real, consulte a documentação dele.

## Erros comuns
- Tentar tratar todo vídeo externo como se fosse um arquivo local.
- Copiar um embed de uma plataforma sem adaptá-lo ao padrão de componentes do React.
- Esquecer `controls` em vídeos ou áudios que precisam de interação do usuário.
- Não usar `title` em `iframe`, prejudicando acessibilidade.
- Escolher um pacote NPM apenas pelo número de estrelas.
- Ignorar manutenção, issues abertas e qualidade da documentação de uma biblioteca.
- Criar uma solução manual complexa quando um pacote sólido resolveria o problema com menos risco.
- Adicionar uma biblioteca pesada para um caso simples que `<video>` ou `<audio>` resolveria.

## Conexões
- [[15-assets-e-oq-sao]]
- [[05-apresentando-jsx]]
- [[03-components-props-principle]]
- [[04-estrutura-padrao-react]]

## Ângulo de entrevista
- Como renderizar um vídeo local em React?
- Como renderizar um áudio local em React?
- Quando faz sentido usar `<video>` ou `<audio>` diretamente?
- Por que vídeos externos podem exigir uma estratégia diferente?
- Qual é a vantagem de encapsular um embed em um componente React?
- Como `props` podem ajudar a trocar o vídeo exibido?
- Quando faz sentido usar um pacote NPM para players de mídia?
- Quais critérios você avaliaria antes de instalar um pacote NPM?
- O que estrelas no GitHub indicam e por que elas não bastam?

## Flashcards
- **Q:** Como carregar um vídeo local em React?
  **A:** Importando o arquivo e usando a tag `<video>` com `src` apontando para o asset.

- **Q:** Qual atributo mostra controles nativos em `<video>` e `<audio>`?
  **A:** `controls`.

- **Q:** Como carregar um áudio local em React?
  **A:** Importando o arquivo e usando a tag `<audio>` com `src` apontando para o asset.

- **Q:** Por que vídeos de plataformas externas podem ser mais complexos?
  **A:** Porque cada plataforma pode exigir uma URL, embed, SDK ou instrução própria.

- **Q:** Por que criar um componente para embed de vídeo?
  **A:** Para reutilizar a integração e trocar dados como o ID do vídeo por `props`.

- **Q:** Quando usar um pacote NPM de player?
  **A:** Quando a integração precisa lidar com várias plataformas, customização ou comportamento mais complexo.

- **Q:** Quais sinais ajudam a avaliar um pacote NPM?
  **A:** Manutenção recente, contribuidores, documentação, issues, popularidade e repositório no GitHub.

- **Q:** Estrelas no GitHub garantem qualidade?
  **A:** Não. Elas indicam popularidade, mas devem ser avaliadas junto com manutenção e documentação.

## Prática guiada
- Crie um componente `VideoPlayer` que recebe um arquivo local e renderiza `<video controls>`.
- Crie um componente `AudioPlayer` que renderiza `<audio controls>`.
- Crie um componente `VideoEmbed` que recebe `videoId` por `props`.
- Compare quando você usaria HTML5 puro e quando usaria um pacote NPM.
- Pesquise um pacote de player no NPM e avalie documentação, manutenção e GitHub antes de instalá-lo.

## Excalidraw brief
- Tipo de diagrama: decision map
- Conceito central: `Áudio e vídeo no React`
- Grupo esquerdo: `Assets locais`
  - nós: `<video>`, `<audio>`, `src`, `controls`, `arquivos em assets`
- Grupo central: `Embeds externos`
  - nós: `iframe`, `ID do vídeo`, `props`, `componente reutilizável`, `regras da plataforma`
- Grupo direito: `Pacotes NPM`
  - nós: `react-player`, `documentação`, `manutenção`, `GitHub`, `contribuidores`
- Relações:
  - `Arquivo local -> usa -> HTML5 media`
  - `Plataforma externa -> fornece -> embed`
  - `Embed -> pode virar -> componente React`
  - `Props -> controlam -> vídeo exibido`
  - `Pacote NPM -> reduz -> código manual`
  - `Avaliação técnica -> reduz -> risco de dependência`
