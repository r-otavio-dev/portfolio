# Portfólio - Rodrigo Otavio

Meu portfólio profissional, feito com HTML, CSS e JavaScript. O conteúdo reúne
minha trajetória na Plásticos do Paraná, a participação no Jovens Embaixadores
Espro 2026, projetos selecionados, plano de carreira, estratégia de networking
e uma área preparada para o vídeo de pitch profissional.

Parte dos projetos citados foi construída com apoio de ferramentas de IA. O
portfólio diferencia tecnologias que já uso em exercícios das que ainda estou
estudando.

## Adicionar o vídeo de pitch

Depois de publicar o vídeo no YouTube como **não listado**, abra `index.html` e
preencha o atributo `data-youtube-url` da seção `#pitch` com a URL completa:

```html
<section class="pitch section" id="pitch" data-youtube-url="URL_DO_YOUTUBE">
```

Sem uma URL válida, o site mantém um estado de espera e não exibe link ou vídeo
fictício. Links `youtube.com/watch`, `youtu.be`, `shorts`, `live` e `embed` são
reconhecidos automaticamente.

## Rodar localmente

Abra o arquivo `index.html` no navegador ou inicie um servidor estático:

```bash
python -m http.server 8000
```

Depois acesse `http://localhost:8000`.

## Estrutura

- `index.html`: conteúdo e estrutura da página;
- `styles.css`: identidade visual e responsividade;
- `script.js`: animações e pequenas interações;
- `favicon.svg`: ícone do site.

Não usei framework porque queria um projeto pequeno, rápido e fácil de entender linha por linha.
