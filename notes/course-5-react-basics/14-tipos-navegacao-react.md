---
type: lesson-note
course: Meta Full Stack Developer
session: course-5-react-basics
lesson: Tipos de navegação no React
source: coursera-transcript
status: draft
tags:
  - meta-full-stack
  - react
  - spa
created: 2026-04-16
updated: 2026-04-16
---

# Tipos de navegação no React

## TL;DR
Na web moderna, uma boa navegação prioriza previsibilidade e utilidade, não criatividade desnecessária.
Os padrões mais comuns são navbar horizontal, sidebar, menu hambúrguer, mega menu e navegação de rodapé.
Em uma SPA React, a interface pode parecer multipágina, mas o app normalmente atualiza uma única árvore montada no DOM real.
Essa ilusão depende de roteamento client-side, geralmente com uma biblioteca como React Router.
A diferença central é esta: em sites tradicionais o navegador carrega outro HTML; em React, o app troca views e atualiza a UI sem recarga completa.

## Por que isso importa
Entender navegação em React evita duas confusões comuns:
- achar que mudar de tela em uma SPA funciona igual a clicar em links HTML tradicionais
- achar que padrões visuais de menu e mecanismo técnico de roteamento são a mesma coisa

Em projetos reais, isso impacta:
- experiência do usuário
- desempenho percebido
- organização de rotas e layouts
- consistência entre desktop e mobile
- escolha correta entre links tradicionais e links de roteamento client-side

## Conceitos centrais

### 1. Navegação de site é um padrão de interface
Navegação é a parte da interface que permite acessar outras áreas do site a partir de um ponto comum.

O objetivo não é surpreender o usuário.
O objetivo é reduzir atrito.

A regra prática é a mesma defendida por boas referências de UX: a navegação deve ser fácil de reconhecer e usar.

### 2. Padrões visuais mais comuns
Os tipos básicos citados na aula são:
- navbar horizontal
- sidebar vertical
- menu hambúrguer
- mega menu
- navegação no rodapé

Eles podem coexistir no mesmo produto.
Exemplo comum:
- desktop com navbar horizontal
- mobile com menu hambúrguer
- rodapé com links institucionais e secundários

### 3. Layout responsivo muda a forma, não a intenção
Um mesmo conjunto de links pode aparecer de formas diferentes conforme a tela.

Exemplo:
- em telas largas, a navegação aparece como barra horizontal
- em telas pequenas, os mesmos links podem virar um menu lateral aberto por um botão hambúrguer

Ou seja, o padrão visual muda, mas a arquitetura de navegação continua coerente.

### 4. Site tradicional navega carregando outro documento
Em um app tradicional de múltiplas páginas, clicar em um link normalmente faz o navegador:
- solicitar outro HTML ao servidor
- receber a nova página completa
- renderizar tudo de novo

Isso funciona bem, mas pode aumentar custo de servidor, banda e tempo de carregamento, especialmente em aplicações complexas.

### 5. SPA reescreve a experiência dentro da mesma página
Em uma SPA, o navegador baixa o app e depois a interface vai sendo atualizada sem trocar o documento inteiro a cada navegação.

O efeito percebido pelo usuário é de múltiplas páginas.
Tecnicamente, o app costuma manter um único ponto de montagem e trocar a view renderizada conforme a rota e o estado mudam.

### 6. React controla views, não arquivos HTML separados
No React, a troca de tela normalmente acontece porque o conteúdo renderizado muda dentro da árvore de componentes.

Isso significa:
- a URL pode mudar
- a tela pode parecer outra página
- mas a navegação não depende de baixar um novo HTML completo a cada clique

A aula descreve isso como uma atualização da visualização baseada em mudanças no Virtual DOM.

### 7. Links normais e links de SPA não têm o mesmo papel
Uma tag âncora tradicional tenta navegar para outro recurso HTML.
Em uma SPA React, isso quebra o fluxo de atualização client-side se usada da forma errada.

Por isso, apps React usam componentes de link do roteador para:
- interceptar a navegação
- atualizar a URL
- trocar a view correta
- evitar recarga completa da página

### 8. O roteamento não vem da biblioteca React sozinha
React cuida da UI.
Para construir a ilusão de múltiplas páginas em uma SPA, normalmente é preciso adicionar uma biblioteca de roteamento, como React Router.

Esse ponto é importante porque muita gente confunde React com todo o ecossistema ao redor.

### 9. SPAs podem carregar tudo de uma vez ou sob demanda
A leitura complementar destaca duas estratégias:
- bundling: carregar logo o HTML, CSS e JavaScript necessários para o app inteiro
- lazy loading ou code splitting: carregar primeiro o mínimo necessário e baixar partes extras depois

Trade-off:
- carregar tudo simplifica a navegação inicial depois do load
- lazy loading reduz custo inicial, mas adiciona carregamentos sob demanda

## Mental model
Pense em dois prédios.

No prédio tradicional, cada botão do elevador leva você para um andar diferente de verdade: você sai de um lugar e vai para outro documento.
No prédio React, o elevador parece mudar de andar, mas boa parte da experiência é uma troca inteligente de cenário dentro da mesma estrutura.

Outra forma de lembrar:
- MPA: novo clique, novo documento
- SPA: novo clique, nova view

## Exemplos

### Exemplo mínimo
HTML tradicional com navegação entre páginas:

```html
<ul>
  <li><a href="/home.html">Home</a></li>
  <li><a href="/profile.html">Perfil</a></li>
</ul>
```

Esse padrão faz o navegador buscar outro arquivo HTML.

### Exemplo prático em React
Em uma SPA com React Router, a navegação usa componentes de rota:

```jsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/profile">Perfil</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}
```

Aqui, o usuário percebe mudança de página, mas a aplicação troca componentes renderizados em vez de recarregar o documento inteiro.

## Erros comuns
- Confundir padrão visual de menu com mecanismo técnico de roteamento.
- Achar que React sozinho já resolve roteamento multipágina aparente.
- Usar tags âncora comuns em uma SPA para navegação interna e causar recarga completa sem necessidade.
- Pensar que SPA sempre é mais rápida em qualquer cenário. Se o bundle inicial for grande demais, a experiência pode piorar.
- Supor que navbar, sidebar e hambúrguer sejam alternativas mutuamente exclusivas. Muitas vezes eles coexistem.

## Conexões
- [[01-visao-geral-do-react]]
- [[04-estrutura-padrao-react]]
- [[12-gerenciando-estados]]
- [[13-context-api-usecontext-usereducer]]

## Ângulo de entrevista
- Qual é a diferença entre uma SPA e uma aplicação de múltiplas páginas?
- Por que uma SPA não deve depender de tags âncora tradicionais para navegação interna?
- Qual é o papel de uma biblioteca como React Router?
- Quando bundling inicial pode piorar a experiência do usuário?
- Como a navegação muda entre desktop e mobile sem mudar a arquitetura da informação?

## Flashcards
- **Q:** O que é navegação em um site?
  **A:** É a parte da interface que permite acessar páginas, seções ou views diferentes a partir de links e menus.

- **Q:** Qual é a diferença central entre MPA e SPA?
  **A:** Na MPA o navegador carrega outro documento; na SPA a aplicação troca a view dentro da mesma página.

- **Q:** O que um menu hambúrguer representa?
  **A:** Um padrão de navegação compacta, comum em telas menores, que revela links sob demanda.

- **Q:** React sozinho resolve roteamento?
  **A:** Não. Normalmente é preciso uma biblioteca de roteamento para navegação client-side.

- **Q:** O que é lazy loading em uma SPA?
  **A:** É carregar apenas o essencial no início e baixar código adicional quando necessário.

## Prática guiada
- Liste quais padrões de navegação você usaria em um e-commerce desktop e quais manteria no mobile.
- Explique com suas palavras por que `Link` de um roteador não é a mesma coisa que uma tag `a` comum.
- Compare o ciclo de navegação de uma MPA e de uma SPA passo a passo.
- Desenhe uma árvore simples com `App`, `Navbar`, `Routes`, `HomePage` e `ProfilePage`.

## Excalidraw brief
- Tipo de diagrama: comparison map
- Conceito central: `Navegação Web`
- Grupo esquerdo: `MPA`
  - nós: `Link HTML`, `Request ao servidor`, `Novo HTML`, `Reload da página`
- Grupo direito: `SPA React`
  - nós: `Router`, `URL`, `Troca de view`, `Virtual DOM`, `Sem reload completo`
- Grupo superior: `Padrões visuais`
  - nós: `Navbar`, `Sidebar`, `Hambúrguer`, `Mega menu`, `Footer nav`
- Relações:
  - `Padrões visuais -> são independentes de -> mecanismo de roteamento`
  - `MPA -> depende de -> novo documento`
  - `SPA React -> depende de -> roteamento client-side`
  - `Router -> troca -> view`
- Layout sugerido:
  - topo com os padrões visuais
  - centro com `Navegação Web`
  - parte inferior dividida em duas colunas: `MPA` vs `SPA React`

## Referências
- Curso: Meta Full Stack Developer
- Sessão: `course-5-react-basics`
- Origem: aula sobre tipos de navegação e leitura complementar sobre SPAs e navegação em React
