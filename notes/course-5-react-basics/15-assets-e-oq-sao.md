---
type: lesson-note
course: Meta Full Stack Developer
session: course-5-react-basics
lesson: Assets e o que são
source: coursera-transcript
status: draft
tags:
  - meta-full-stack
  - react
  - assets
  - webpack
created: 2026-04-27
updated: 2026-04-27
---

# Assets e o que são

## TL;DR
Assets são arquivos que a aplicação React precisa acessar em tempo de execução, como imagens, folhas de estilo, fontes, áudio e vídeo.
Eles devem ficar organizados para que os componentes consigam renderizar a interface como esperado.
Uma prática comum é manter assets usados por componentes dentro de `src/assets`.
Arquivos que não participam diretamente da compilação dos componentes podem ficar em `public`, como `favicon`.
Para usar uma imagem em um componente, o caminho mais comum é importar o arquivo e usar a variável no atributo `src`.
Em aplicações React, assets e módulos importados normalmente passam por um bundler, como o webpack.
O webpack cria um grafo de dependências, agrupa arquivos em bundles e pode otimizar, transpilar e dividir o código para melhorar carregamento.
Aplicações com muitos assets exigem atenção: um bundle grande demais pode atrasar o primeiro carregamento, então técnicas como code splitting, lazy loading e SSR ajudam a reduzir esse custo.

## Por que isso importa
Aplicações reais raramente são feitas apenas de texto.

Usuários esperam imagens, vídeos, áudio, fontes e outros arquivos que enriquecem a experiência.
Se esses arquivos não estiverem disponíveis ou estiverem mal referenciados, a aplicação pode:
- mostrar placeholders
- carregar fonte padrão no lugar da fonte planejada
- quebrar imagens
- renderizar uma interface diferente da esperada

Organizar assets corretamente também facilita manutenção, leitura do projeto e reuso entre componentes.

Esse assunto também importa porque assets não existem isolados.
Quando uma aplicação React cresce, imagens, estilos, JavaScript, TypeScript, SVGs e outros arquivos passam a formar uma rede de dependências.
Gerenciar essa rede manualmente seria difícil e propenso a erro.

Ferramentas como o webpack ajudam a:
- entender quais arquivos dependem de quais outros arquivos
- empacotar o que o navegador precisa receber
- otimizar arquivos para desenvolvimento ou produção
- reduzir o impacto de aplicações com muitos recursos

## Conceitos centrais

### 1. Assets são arquivos usados pela aplicação
No contexto de React, assets podem ser:
- imagens
- arquivos CSS
- fontes
- vídeos
- áudio
- outros arquivos necessários em tempo de execução

A ideia central é simples: se a aplicação depende de um arquivo para funcionar ou aparecer corretamente, esse arquivo é um asset.

### 2. Assets afetam o comportamento percebido da UI
Mesmo quando o JavaScript compila, a interface pode ficar incorreta se um asset estiver ausente.

Exemplos:
- uma imagem esperada não aparece
- uma fonte customizada é substituída por uma fonte padrão
- um ícone ou mídia não carrega

Por isso, assets precisam estar em locais previsíveis e acessíveis pelo projeto.

### 3. `src/assets` é usado para arquivos importados por componentes
Uma organização comum é criar uma pasta `assets` dentro de `src`.

Exemplo:

```text
src/
  assets/
    cat.jpg
    dog.jpg
  components/
    AnimalCard.jsx
```

Essa abordagem funciona bem quando um componente precisa importar diretamente uma imagem ou outro arquivo.

### 4. `public` é usado para arquivos que não precisam ser importados pelos componentes
Alguns arquivos podem ficar na pasta `public`.
Na instalação padrão de muitos projetos React, exemplos comuns são:
- `favicon`
- logos padrão
- arquivos estáticos acessados diretamente pelo navegador

A regra prática da aula:
se o aplicativo consegue ser compilado sem aquele arquivo, ele pode ficar em `public`.

O `favicon`, por exemplo, não costuma ser importado por um componente React para que a árvore da UI compile.

### 5. Assets usados por componentes devem ficar perto do código-fonte
Se uma imagem precisa ser importada em um componente, faz mais sentido mantê-la em `src/assets`.

Motivo:
- o bundler consegue processar o arquivo
- o import deixa a dependência explícita
- o componente passa a apontar para um arquivo conhecido pelo build

Isso também ajuda outros desenvolvedores a entenderem rapidamente quais arquivos pertencem à experiência renderizada.

### 6. Importar assets deixa a dependência explícita
O jeito mais comum de usar uma imagem em React é importá-la no topo do componente:

```jsx
import cat from "../assets/cat.jpg";

function CatCard() {
  return <img src={cat} alt="Gato disponível para adoção" />;
}
```

Nesse exemplo:
- `cat` é apenas um nome local escolhido pelo desenvolvedor
- o caminho aponta para o arquivo real
- o valor importado é usado no `src` da tag `img`

O nome da variável pode ser quase qualquer um, mas deve ser descritivo.

### 7. Também é possível usar `require`
Outra forma citada na aula é usar `require` diretamente dentro do JSX:

```jsx
function CatCard() {
  return <img src={require("../assets/cat.jpg")} alt="Gato disponível para adoção" />;
}
```

Nesse caso, a instrução `import` separada deixa de ser necessária porque o arquivo é resolvido diretamente na expressão JSX.

Em projetos modernos, a sintaxe com `import` costuma ser mais clara e mais comum, especialmente em componentes simples.

### 8. Bundling junta módulos em pacotes consumíveis pelo navegador
Em um app React, os arquivos importados normalmente são agrupados antes de serem servidos ao navegador.
Esse processo é chamado de bundling.

O bundler pega arquivos como:
- JavaScript
- TypeScript
- CSS
- SCSS
- SVG
- imagens

E gera um ou mais arquivos finais que o navegador consegue carregar.

No contexto do `create-react-app`, a ferramenta integrada para isso é o webpack.

### 9. Webpack é um agrupador de módulos
Webpack é um module bundler.
Na prática, ele analisa os arquivos importados pela aplicação e monta um grafo de dependências.

Esse grafo responde perguntas como:
- qual arquivo importa qual dependência?
- em que ordem os módulos precisam ser carregados?
- quais arquivos entram no bundle final?

Isso é importante porque um arquivo pode importar outro, que importa outro, que importa outros assets.
Em aplicações pequenas, esse relacionamento é simples.
Em aplicações grandes, estruturar tudo manualmente se torna inviável.

### 10. Webpack também transforma e otimiza arquivos
Além de agrupar módulos, o webpack pode executar outras tarefas no processo de build.

Exemplos:
- transpilar JavaScript moderno para versões mais antigas, como de ES7 para ES5
- processar SCSS e gerar CSS comum
- otimizar arquivos para carregamento mais rápido
- criar source maps para facilitar depuração
- gerar diferentes tipos de arquivos finais, incluindo HTML

Transpilação é o processo de converter código de uma versão ou formato para outro formato equivalente que mais ambientes conseguem entender.

Source maps ajudam a depurar o código original mesmo quando o navegador está executando um bundle gerado.

### 11. Modo de desenvolvimento prioriza feedback rápido
No modo de desenvolvimento, o webpack otimiza a experiência de quem está programando.

Ele empacota os arquivos de um jeito que permite atualizações rápidas quando algum arquivo muda.
Também costuma gerar source maps para que o desenvolvedor consiga inspecionar o arquivo original, e não apenas o bundle final.

O foco aqui é velocidade de iteração local.

### 12. Modo de produção prioriza carregamento eficiente
No modo de produção, o webpack otimiza os arquivos para o usuário final.

Isso normalmente envolve:
- minificação
- organização do bundle
- redução do tamanho dos arquivos
- otimização para download mais rápido

O foco aqui é entregar a aplicação com o menor custo prático possível para quem acessa o site online.

### 13. Bundles grandes prejudicam a experiência
Se todos os arquivos da aplicação forem agrupados em um único bundle grande, o visitante pode precisar baixar muita coisa antes de usar a página.

Isso funciona bem em aplicações pequenas.
Em aplicações maiores, pode prejudicar:
- tempo de carregamento inicial
- desempenho percebido
- retenção do usuário

Quanto mais tempo a aplicação demora para carregar, maior a chance de o visitante abandonar o site.

### 14. Code splitting divide o bundle conforme a necessidade
Code splitting é a prática de dividir um bundle grande em pacotes menores.

Em vez de baixar tudo de uma vez, a aplicação pode carregar apenas o que é necessário naquele momento.
Esse carregamento sob demanda é frequentemente chamado de lazy loading.

Exemplo mental:
- a home carrega primeiro
- a página de perfil só carrega quando o usuário acessa `/profile`
- uma área administrativa só carrega quando realmente é aberta

Essa estratégia reduz o custo inicial e melhora a velocidade percebida em aplicações React maiores.

### 15. CSR, SSR e aplicações isomórficas são estratégias de renderização
Na renderização do lado do cliente, ou CSR, o navegador baixa um `index.html` básico e o React injeta a interface dentro de um elemento raiz.
Esse é o modelo típico usado em projetos com `create-react-app`.

Na renderização do lado do servidor, ou SSR, os componentes React são renderizados como HTML no servidor.
O visitante recebe HTML já pronto, em vez de esperar apenas o JavaScript montar a tela no navegador.

Também existe uma combinação das duas abordagens.
Quando uma aplicação mistura renderização no servidor e no cliente, ela pode ser chamada de aplicação isomórfica.

O ponto principal é que a escolha de renderização afeta como assets, bundles e HTML chegam ao usuário.

## Mental model
Pense em assets como dependências visuais e de mídia da interface.

O componente é a receita.
O asset é o ingrediente externo.

Se a receita pede uma imagem, fonte ou áudio e o arquivo não está disponível, o resultado final não será o planejado.

Outra forma de lembrar:
- `src/assets`: arquivos usados pelo código React
- `public`: arquivos estáticos acessados sem import direto por componentes
- bundler: ferramenta que entende as dependências e gera pacotes finais
- bundle: pacote final entregue ao navegador
- code splitting: dividir o pacote para carregar partes sob demanda
- CSR: React monta a UI no navegador
- SSR: o servidor entrega HTML já renderizado

## Exemplos

### Exemplo mínimo com `import`

```jsx
import cat from "./assets/cat.jpg";

function App() {
  return (
    <main>
      <h1>Adote um amigo</h1>
      <img src={cat} alt="Gato aguardando adoção" />
    </main>
  );
}

export default App;
```

Esse exemplo mostra o fluxo principal:
- guardar a imagem na pasta de assets
- importar a imagem no componente
- usar a variável importada no atributo `src`

### Exemplo com componente reutilizável

```jsx
import cat from "../assets/cat.jpg";

function AnimalCard() {
  return (
    <article>
      <img src={cat} alt="Gato disponível para adoção" />
      <h2>Mingau</h2>
      <p>Calmo, curioso e pronto para um novo lar.</p>
    </article>
  );
}

export default AnimalCard;
```

Aqui, a imagem faz parte da apresentação do componente.
Por isso, ela deve estar disponível no projeto e ser referenciada corretamente.

### Exemplo com `require`

```jsx
function AnimalCard() {
  return (
    <article>
      <img
        src={require("../assets/cat.jpg")}
        alt="Gato disponível para adoção"
      />
      <h2>Mingau</h2>
    </article>
  );
}
```

Essa alternativa evita o `import` no topo do arquivo, mas pode deixar a leitura menos direta quando o componente cresce.

### Exemplo conceitual de grafo de dependências

```jsx
import React from "react";
import "./styles.scss";
import logo from "./assets/logo.svg";
import Hero from "./components/Hero";

function App() {
  return <Hero logo={logo} />;
}
```

Nesse exemplo, `App` depende de:
- React
- um arquivo SCSS
- um SVG
- um componente `Hero`

O componente `Hero` ainda pode importar outros arquivos.
O webpack percorre essas dependências e monta o bundle final.

### Exemplo de lazy loading com `React.lazy`

```jsx
import React, { Suspense } from "react";

const ProfilePage = React.lazy(() => import("./pages/ProfilePage"));

function App() {
  return (
    <Suspense fallback={<p>Carregando...</p>}>
      <ProfilePage />
    </Suspense>
  );
}
```

Esse exemplo mostra a ideia de carregar uma parte da aplicação sob demanda.
Em vez de incluir tudo no bundle inicial, o código da página pode ser baixado apenas quando necessário.

## Erros comuns
- Colocar todos os arquivos em `public` sem pensar se algum componente precisa importá-los.
- Colocar imagens usadas por componentes fora de `src/assets` e depois ter caminhos confusos.
- Usar nomes genéricos como `image1` quando um nome como `catPhoto` comunicaria melhor a intenção.
- Esquecer o atributo `alt` em imagens.
- Confundir o caminho relativo ao componente com o caminho relativo ao projeto inteiro.
- Achar que texto basta para qualquer experiência de UI.
- Achar que webpack apenas junta arquivos, ignorando transpilação, otimização e source maps.
- Ignorar o tamanho do bundle em aplicações com muitos assets.
- Carregar todas as telas e recursos no bundle inicial mesmo quando o usuário talvez nunca acesse parte deles.
- Confundir CSR com SSR: no CSR o React monta a UI no navegador; no SSR o servidor entrega HTML renderizado.

## Conexões
- [[01-visao-geral-do-react]]
- [[02-introducao-aos-componentes-funcionais]]
- [[04-estrutura-padrao-react]]
- [[05-apresentando-jsx]]
- [[07-css-style]]
- [[14-tipos-navegacao-react]]

## Ângulo de entrevista
- O que são assets em uma aplicação React?
- Qual é a diferença prática entre guardar um arquivo em `src/assets` e em `public`?
- Quando faz sentido importar uma imagem dentro de um componente?
- Como usar uma imagem importada no atributo `src`?
- Por que nomes descritivos para imports de assets ajudam na manutenção?
- O que é bundling em uma aplicação React?
- Qual é o papel do webpack em projetos criados com `create-react-app`?
- O que é um grafo de dependências?
- Qual é a diferença entre modo de desenvolvimento e modo de produção no webpack?
- Por que bundles grandes podem prejudicar a experiência do usuário?
- Como code splitting e lazy loading ajudam aplicações React maiores?
- Qual é a diferença entre CSR e SSR?

## Flashcards
- **Q:** O que são assets no React?
  **A:** São arquivos que a aplicação precisa acessar em tempo de execução, como imagens, estilos, fontes, áudio e vídeo.

- **Q:** Onde costuma ficar uma imagem importada por um componente?
  **A:** Em uma pasta como `src/assets`.

- **Q:** Quando um arquivo pode ficar em `public`?
  **A:** Quando a aplicação consegue compilar sem que um componente precise importá-lo diretamente.

- **Q:** Como usar uma imagem importada em JSX?
  **A:** Importando o arquivo e passando a variável ao atributo `src`, como em `<img src={cat} alt="..." />`.

- **Q:** O que `require("../assets/cat.jpg")` faz nesse contexto?
  **A:** Resolve o arquivo diretamente dentro da expressão JSX, sem uma instrução `import` separada.

- **Q:** O que é bundling?
  **A:** É o processo de agrupar arquivos importados pela aplicação em um ou mais pacotes que o navegador consegue carregar.

- **Q:** O que é webpack?
  **A:** É um agrupador de módulos que cria um grafo de dependências e gera bundles para a aplicação.

- **Q:** O que é um grafo de dependências?
  **A:** É a rede de arquivos e módulos conectados por imports, mostrando quais arquivos dependem de quais outros.

- **Q:** Qual é o foco do modo de desenvolvimento do webpack?
  **A:** Feedback rápido durante a programação, com recompilação ágil e source maps.

- **Q:** Qual é o foco do modo de produção do webpack?
  **A:** Otimizar os arquivos finais para carregamento eficiente, normalmente com minificação e redução de tamanho.

- **Q:** O que é code splitting?
  **A:** É dividir um bundle grande em pacotes menores que podem ser carregados conforme a necessidade.

- **Q:** O que é lazy loading?
  **A:** É carregar uma parte da aplicação apenas quando ela for necessária.

- **Q:** O que é CSR?
  **A:** É renderização do lado do cliente, em que o navegador baixa um HTML básico e o React monta a UI no elemento raiz.

- **Q:** O que é SSR?
  **A:** É renderização do lado do servidor, em que os componentes React são transformados em HTML antes de chegar ao navegador.

- **Q:** O que é uma aplicação isomórfica?
  **A:** É uma aplicação que combina renderização no servidor e renderização no cliente.

## Prática guiada
- Crie uma pasta `src/assets` em um projeto React.
- Adicione uma imagem chamada `cat.jpg`.
- Importe essa imagem em um componente chamado `AnimalCard`.
- Renderize a imagem com `src` e `alt`.
- Explique quais arquivos do projeto você manteria em `public` e quais manteria em `src/assets`.
- Observe os imports de um componente React e liste quais dependências entram no grafo.
- Explique por que um app pequeno pode funcionar bem com um único bundle, mas um app grande pode precisar de code splitting.
- Compare CSR e SSR usando o caminho do primeiro carregamento da página.

## Excalidraw brief
- Tipo de diagrama: dependency and rendering map
- Conceito central: `Assets no React`
- Grupo esquerdo: `src/assets`
  - nós: `Imagens importadas`, `Fontes usadas por componentes`, `Arquivos processados pelo build`, `Dependência explícita`
- Grupo direito: `public`
  - nós: `favicon`, `arquivos estáticos`, `sem import direto`, `acesso público`
- Grupo inferior: `Componente React`
  - nós: `import cat`, `<img src={cat}>`, `alt text`
- Grupo central: `Webpack`
  - nós: `Grafo de dependências`, `Bundling`, `Transpilação`, `Source maps`, `Otimização`
- Grupo superior: `Estratégias de entrega`
  - nós: `Bundle único`, `Code splitting`, `Lazy loading`, `CSR`, `SSR`, `Isomórfico`
- Relações:
  - `Componente React -> importa -> src/assets`
  - `public -> serve -> arquivos independentes da compilação dos componentes`
  - `assets ausentes -> causam -> UI inesperada`
  - `Webpack -> constrói -> grafo de dependências`
  - `Webpack -> gera -> bundle`
  - `Bundle grande -> pode causar -> carregamento lento`
  - `Code splitting -> reduz -> custo inicial`
  - `CSR -> monta UI -> navegador`
  - `SSR -> entrega HTML -> servidor`
