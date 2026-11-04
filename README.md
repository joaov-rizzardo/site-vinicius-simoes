# Site — Vinicius Vicente Simões, Médico Veterinário

Site institucional de página única do médico veterinário **Vinicius Vicente Simões** (CRMV-SP 57.880): atendimento de cães e gatos em domicílio no Vale do Paraíba, clínicas em Cachoeira Paulista e Cruzeiro e consultoria de aquarismo.

Além do conteúdo institucional, o site tem um **sistema de avaliações** em que os clientes dão notas e deixam comentários, e uma **área administrativa** (`/admin`) onde o veterinário aprova ou recusa cada avaliação antes de ela aparecer no site.

---

## Sumário

1. [Visão geral](#1-visão-geral)
2. [Tecnologias](#2-tecnologias)
3. [Rodando localmente](#3-rodando-localmente)
4. [Estrutura de pastas](#4-estrutura-de-pastas)
5. [Configuração do Firebase](#5-configuração-do-firebase)
6. [Sistema de avaliações](#6-sistema-de-avaliações)
7. [Área administrativa](#7-área-administrativa)
8. [SEO e compartilhamento](#8-seo-e-compartilhamento)
9. [Publicação (deploy)](#9-publicação-deploy)
10. [Checklist de entrega](#10-checklist-de-entrega)
11. [Manutenção: como alterar o conteúdo](#11-manutenção-como-alterar-o-conteúdo)
12. [Solução de problemas](#12-solução-de-problemas)

---

## 1. Visão geral

| Rota | O que é |
| --- | --- |
| `/` | Página principal, com as seções **Início**, **Sobre**, **Onde atendo**, **Aquarismo** e **Avaliações**, além de um botão flutuante de WhatsApp |
| `/admin/login` | Login do administrador (e-mail e senha) |
| `/admin` | Painel de moderação das avaliações (fora do Google: `noindex` e bloqueado no `robots.txt`) |
| `/sitemap.xml`, `/robots.txt` | Gerados automaticamente a partir de `app/config.ts` |
| Qualquer outra | Página 404 personalizada (`app/not-found.tsx`) |

```
Visitante ──► Página "/" (Next.js, servidor)
                 │  lê avaliações aprovadas          ┌──────────────────────┐
                 ├──────────────────────────────────►│  Firebase Firestore  │
                 │  envia nova avaliação (pendente)  │  coleção avaliacoes  │
                 └──────────────────────────────────►│  coleção admins      │
                                                     └──────────▲───────────┘
Administrador ──► "/admin" (navegador)                          │
                 login no Firebase Auth + aprova/recusa/exclui ─┘
```

Quem protege os dados são as **regras do Firestore** (`firestore.rules`), e não o código do site. Por isso as chaves do Firebase podem ser públicas.

## 2. Tecnologias

| Tecnologia | Uso |
| --- | --- |
| [Next.js 16](https://nextjs.org/) (App Router) + React 19 | Framework do site, renderização no servidor e Server Actions |
| TypeScript | Tipagem de todo o código |
| CSS puro (`app/globals.css`, `app/admin/admin.css`) | Estilos, sem framework de CSS |
| [Motion](https://motion.dev/) | Animações de entrada ao rolar e elementos flutuantes |
| `next/font` (Google Fonts) | Fontes Lato, Libre Caslon Text, Montserrat e Satisfy, servidas pelo próprio site |
| [Firebase](https://firebase.google.com/) Firestore + Authentication | Banco das avaliações e login da área admin |

**Requisitos:** Node.js 20.9 ou superior (desenvolvido com Node 24) e npm.

## 3. Rodando localmente

```bash
# 1. Instalar as dependências
npm install

# 2. Criar o arquivo de variáveis de ambiente (ver seção 5)
cp .env.example .env.local   # e preencha os valores

# 3. Subir o servidor de desenvolvimento
npm run dev                  # http://localhost:3000
```

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento com recarregamento automático |
| `npm run build` | Gera a versão de produção (também verifica os tipos) |
| `npm run start` | Roda a versão de produção gerada pelo `build` |

> **Testar pelo celular na mesma rede:** acesse `http://<IP-do-computador>:3000`. O IP precisa estar em `allowedDevOrigins` no `next.config.ts` (hoje está `192.168.1.17`). Isso vale só para o modo de desenvolvimento.

### Variáveis de ambiente

Crie o arquivo `.env.local` na raiz (ele não vai para o Git):

```env
# Config do app web do Firebase (Configurações do projeto → Geral → Seus apps → app Web)
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu-projeto
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

As quatro são obrigatórias. Sem elas a seção de avaliações aparece vazia e a área admin não funciona.

## 4. Estrutura de pastas

```
app/
├── page.tsx              # Página principal: monta as seções e os dados estruturados (Schema.org)
├── layout.tsx            # HTML base, fontes, título e descrição (SEO)
├── config.ts             # ⭐ Domínio, nome, CRMV, telefone, WhatsApp e Instagram
├── actions.ts            # Server Action que valida e grava uma nova avaliação
├── globals.css           # Estilos do site público
├── not-found.tsx         # Página 404
├── robots.ts / sitemap.ts
├── icon.png / apple-icon.png          # Favicon e ícone do iOS
├── opengraph-image.jpg (+ .alt.txt)   # Imagem ao compartilhar o link (WhatsApp, redes sociais)
│
├── components/
│   ├── Header.tsx        # Menu de navegação
│   ├── Hero.tsx          # Primeira dobra (Início)
│   ├── Sobre.tsx         # Sobre o veterinário
│   ├── OndeAtendo.tsx    # Domicílio e clínicas
│   ├── Aquarismo.tsx     # Consultoria de aquarismo
│   ├── Avaliacoes.tsx    # Média + carrossel de avaliações aprovadas
│   ├── AvaliarModal.tsx  # Formulário "Avaliar atendimento"
│   ├── Carrossel.tsx     # Carrossel com setas, pontos e arrastar
│   ├── Footer.tsx        # Rodapé com contatos
│   ├── Movimento.tsx     # Respeita a preferência "reduzir movimento" do sistema
│   ├── Bolhas.tsx, VexLogo.tsx, icons.tsx
│
├── lib/
│   ├── firebase.ts       # Inicialização do Firebase
│   ├── avaliacoes.ts     # Leitura, criação, moderação e médias das avaliações
│   ├── topicos.ts        # ⭐ Tópicos avaliados (hoje: "Atenção e explicação" e "Carisma")
│   ├── limites.ts        # ⭐ Tamanho mínimo/máximo de nome e comentário
│   └── animacoes.ts      # Presets de animação
│
└── admin/
    ├── auth.ts           # Sessão do Firebase Auth e checagem de administrador
    ├── layout.tsx        # Layout da área admin (noindex)
    ├── page.tsx + PainelAdmin.tsx   # Painel de moderação
    └── login/            # Tela de login

public/img/               # Fotos e logo usadas nas seções
firestore.rules           # ⭐ Regras de segurança do banco (publicar no console do Firebase)
next.config.ts
```

⭐ = arquivos que costumam ser editados na manutenção.

## 5. Configuração do Firebase

Passo a passo para configurar um projeto do zero (ou conferir o que já existe).

### 5.1 Criar o projeto e o app web

1. Acesse o [Console do Firebase](https://console.firebase.google.com/) e crie um projeto (o Google Analytics é opcional).
2. Em **Configurações do projeto → Geral → Seus apps**, adicione um **app Web** (`</>`).
3. Copie `apiKey`, `authDomain`, `projectId` e `appId` para o `.env.local` (seção 3).

### 5.2 Firestore (banco de dados)

1. Em **Firestore Database**, clique em **Criar banco de dados**, no **modo de produção**. Para menor latência, use a região `southamerica-east1` (São Paulo).
2. Em **Regras**, cole todo o conteúdo de [`firestore.rules`](firestore.rules) e clique em **Publicar**.

Não é preciso criar índices: a ordenação por data é feita no código.

### 5.3 Authentication (login do admin)

1. Em **Authentication → Método de login**, ative **E-mail/senha**.
2. Em **Authentication → Usuários**, clique em **Adicionar usuário** e cadastre o e-mail e a senha do administrador.
3. Copie o **UID do usuário** que aparece na lista.
4. Em **Authentication → Configurações → Domínios autorizados**, adicione o domínio final do site (ex.: `www.seudominio.com.br`). `localhost` já vem autorizado.

### 5.4 Liberar o usuário como administrador

Estar logado **não basta** para ser admin, porque qualquer pessoa poderia criar uma conta com a config pública. Só é admin quem tem um documento na coleção `admins`:

1. Em **Firestore Database → Dados**, clique em **Iniciar coleção** e dê o nome `admins`.
2. No **ID do documento**, cole o **UID** copiado no passo 5.3.
3. Adicione qualquer campo (ex.: `nome` = `Vinicius`) e salve.

Para incluir outro administrador, repita os passos 5.3 e 5.4. Para remover, exclua o documento dele em `admins`.

### 5.5 Modelo de dados

**`avaliacoes/{id gerado automaticamente}`**

| Campo | Tipo | Regra |
| --- | --- | --- |
| `nome` | string | 2 a 30 caracteres (`"Anônimo"` se a pessoa marcar a opção) |
| `notas` | map | `{ clareza: 1–5, carisma: 1–5 }` (números inteiros) |
| `comentario` | string | 10 a 160 caracteres |
| `status` | string | `pendente` → `aprovada` ou `recusada` |
| `criadaEm` | string | Data em ISO 8601 |

**`admins/{uid}`**: um documento por administrador (o conteúdo não importa).

### 5.6 O que as regras garantem

- Visitantes só **leem** avaliações `aprovada`.
- Qualquer um pode **criar** uma avaliação, mas sempre como `pendente` e com os campos e limites acima.
- Só um admin pode **mudar o status** (e nenhum outro campo) ou **excluir**.
- Ninguém grava na coleção `admins` pelo site; ela é gerida só pelo console.

> ⚠️ Os limites aparecem em dois lugares: no código (`app/lib/limites.ts` e `app/lib/topicos.ts`) e em `firestore.rules`. Se mudar um, mude o outro e **publique as regras de novo**.

## 6. Sistema de avaliações

1. O visitante clica em **Avaliar atendimento**, dá de 1 a 5 estrelas para cada tópico, informa o nome (ou marca "anônimo") e escreve um comentário.
2. A Server Action (`app/actions.ts`) valida os dados no servidor e grava a avaliação no Firestore com status **`pendente`**.
3. A avaliação **não aparece no site** até ser aprovada em `/admin`.
4. A seção **Avaliações** é montada a cada acesso: lista as aprovadas (mais recentes primeiro) e mostra a média geral e o total. Uma avaliação aprovada aparece no próximo carregamento da página.
5. Se o Firestore estiver fora do ar, a seção aparece sem depoimentos e o resto da página continua funcionando.

## 7. Área administrativa

Acesse **`https://<seu-domínio>/admin`** (ou `/admin/login`).

- **Login:** e-mail e senha cadastrados no Firebase Authentication. Uma conta que não esteja em `admins` é desconectada e vê a mensagem "Esta conta não tem acesso à área admin."
- **Abas:** Todas · Pendentes · Aprovadas · Recusadas, cada uma com um contador.
- **Médias:** nota geral e por tópico, considerando pendentes e aprovadas.
- **Ações por avaliação:**
  - Pendente → **Aprovar** (publica no site) ou **Recusar**.
  - Aprovada → **Tirar do site** (volta para pendente).
  - Recusada → **Aprovar** ou **Excluir** (a exclusão é definitiva).
- A lista atualiza **em tempo real**: uma avaliação nova aparece sem recarregar a página.

**Esqueceu a senha?** No console do Firebase, em **Authentication → Usuários**, abra o menu (⋮) do usuário e escolha **Redefinir senha**.

## 8. SEO e compartilhamento

Já implementado:

- Título, descrição, `canonical` e Open Graph em `app/layout.tsx`.
- Imagem de compartilhamento em `app/opengraph-image.jpg`, com texto alternativo em `opengraph-image.alt.txt`.
- Dados estruturados Schema.org (`VeterinaryCare`) em `app/page.tsx`, com área atendida, telefone e Instagram.
- `sitemap.xml` e `robots.txt` automáticos, com `/admin` bloqueado.
- Favicon (`app/icon.png`) e ícone do iOS (`app/apple-icon.png`).

Tudo depende de **`site.url`** em `app/config.ts` estar com o domínio real (ver checklist).

**Depois de publicar:**

1. Cadastre o domínio no [Google Search Console](https://search.google.com/search-console) e envie `https://<seu-domínio>/sitemap.xml`.
2. Crie ou atualize o [Perfil da Empresa no Google](https://business.google.com/) com o link do site. É o que mais pesa na busca local ("veterinário em Cachoeira Paulista").
3. Teste a prévia do link no WhatsApp ou no [Open Graph Debugger](https://developers.facebook.com/tools/debug/).

## 9. Publicação (deploy)

O site **precisa de um servidor Node.js**: a seção de avaliações é renderizada a cada acesso e o formulário usa Server Action. Não dá para exportar como site estático (`next export`).

### Opção recomendada: Vercel

1. Crie uma conta na [Vercel](https://vercel.com/) e importe o repositório do GitHub.
2. O framework (Next.js) é detectado sozinho; não altere os comandos de build.
3. Em **Settings → Environment Variables**, cadastre as quatro variáveis `NEXT_PUBLIC_FIREBASE_*` (seção 3).
4. Clique em **Deploy**.
5. Em **Settings → Domains**, adicione o domínio e configure o DNS no registrador (ex.: Registro.br) como a Vercel indicar.
6. Cada `push` na branch de produção (`main`) publica uma nova versão automaticamente.

### Outras opções

Qualquer hospedagem com Node.js (Firebase App Hosting, Netlify, Render, VPS): rode `npm ci && npm run build` e depois `npm run start` (porta 3000 por padrão, ou a definida em `PORT`), com as mesmas variáveis de ambiente.

## 10. Checklist de entrega

Antes de divulgar o site:

**Conteúdo e configuração**
- [ ] `app/config.ts`: trocar `url` (`https://www.SEU-DOMINIO.com.br`) pelo domínio real, sem barra no final.
- [ ] `app/config.ts`: conferir nome, CRMV, telefone, link do WhatsApp e Instagram.
- [ ] Revisar textos e fotos de cada seção com o cliente.
- [ ] (Opcional) Remover ou ajustar `allowedDevOrigins` em `next.config.ts`; ele só afeta o modo de desenvolvimento.

**Firebase**
- [ ] Regras de `firestore.rules` publicadas no console.
- [ ] Login por e-mail/senha ativado e usuário do Vinicius criado.
- [ ] Documento `admins/{uid}` criado para esse usuário.
- [ ] Domínio de produção nos **Domínios autorizados** do Authentication.
- [ ] Apagar avaliações de teste em `/admin`.

**Deploy**
- [ ] Variáveis `NEXT_PUBLIC_FIREBASE_*` cadastradas na hospedagem.
- [ ] Domínio apontado e HTTPS ativo.
- [ ] `npm run build` sem erros.

**Testes no ar** (celular e computador)
- [ ] Menu leva a cada seção; botões de WhatsApp e Instagram abrem o contato certo.
- [ ] Enviar uma avaliação → ela aparece como pendente em `/admin` → aprovar → aparece no site após recarregar.
- [ ] Um endereço inexistente mostra a página 404.
- [ ] `/robots.txt` e `/sitemap.xml` mostram o domínio correto.
- [ ] Prévia do link no WhatsApp mostra imagem, título e descrição.
- [ ] [PageSpeed Insights](https://pagespeed.web.dev/) sem problemas graves.

**Pós-entrega**
- [ ] Google Search Console configurado e sitemap enviado.
- [ ] Link do site no Perfil da Empresa no Google e na bio do Instagram.
- [ ] Repassar ao cliente: endereço de `/admin`, e-mail de login e como redefinir a senha.
- [ ] Transferir (ou compartilhar) a propriedade do projeto Firebase, da hospedagem e do domínio para o cliente.

## 11. Manutenção: como alterar o conteúdo

| Quero mudar… | Onde |
| --- | --- |
| Telefone, WhatsApp, Instagram, CRMV, domínio | `app/config.ts` |
| Título e descrição no Google | `app/layout.tsx` (`titulo` e `descricao`) |
| Dados para o Google (cidades atendidas etc.) | `app/page.tsx` (`dadosEstruturados`) |
| Texto de uma seção | O componente da seção em `app/components/` |
| Fotos | Substituir o arquivo em `public/img/` mantendo o nome, ou trocar o caminho no componente |
| Cores, fontes e espaçamentos | `app/globals.css` (fontes carregadas em `app/layout.tsx`) |
| Imagem de compartilhamento | `app/opengraph-image.jpg` (1200×630 px) e `opengraph-image.alt.txt` |
| Favicon | `app/icon.png` e `app/apple-icon.png` |
| Tópicos avaliados | `app/lib/topicos.ts` **e** `firestore.rules` (campo `notas`) |
| Limites de nome/comentário | `app/lib/limites.ts` **e** `firestore.rules` |

Para publicar a alteração: faça commit e push na branch de produção. Na Vercel o deploy é automático.

> **Atenção ao mudar os tópicos:** as avaliações antigas guardam as notas com os ids antigos (`clareza`, `carisma`). Renomear ou remover um tópico quebra a média dessas avaliações; nesse caso, ajuste ou apague as antigas.

## 12. Solução de problemas

| Sintoma | Causa provável | Solução |
| --- | --- | --- |
| Seção de avaliações vazia, com erro "Falha ao carregar avaliações" no log | Variáveis do Firebase ausentes ou erradas | Conferir `.env.local` ou as variáveis na hospedagem e fazer novo deploy |
| "Não foi possível enviar sua avaliação agora" | Regras não publicadas ou desatualizadas | Publicar de novo o `firestore.rules` |
| "Esta conta não tem acesso à área admin." | Falta o documento `admins/{uid}` | Criar o documento (seção 5.4) com o UID exato |
| Erro `auth/unauthorized-domain` no login | Domínio não autorizado | Adicionar o domínio em Authentication → Configurações |
| Prévia no WhatsApp sem imagem ou com link errado | `site.url` ainda com o valor de exemplo | Corrigir `app/config.ts` e publicar |
| Avaliação aprovada não aparece | Página em cache no navegador | Recarregar a página (Ctrl+F5) |
