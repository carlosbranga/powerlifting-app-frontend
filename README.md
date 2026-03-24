# App Powerlifting - Frontend (Angular) 🏋️‍♂️

Bem-vindos ao repositório do frontend do nosso sistema de Powerlifting!
Este projeto foi estruturado com o [Angular CLI](https://github.com/angular/angular-cli) versão 20.3.5.

---

## 🛑 Pré-requisitos (Instale antes de tudo!)

Antes de clonar o projeto, garanta que você tem as ferramentas abaixo instaladas no seu computador:

1. **Git:** Para baixar o código e versionar. [Baixe aqui](https://git-scm.com/downloads).
2. **Node.js:** Obrigatório para rodar os comandos do projeto. Baixe a versão **LTS** (Recomendada). [Baixe aqui](https://nodejs.org/).
3. **Angular CLI:** Depois de instalar o Node.js, abra o seu terminal (CMD ou PowerShell) e rode o comando abaixo para instalar o Angular globalmente na sua máquina:
   ```bash
   npm install -g @angular/cli
   ```

---

## 🚀 Como começar (Primeiros Passos)

Siga este passo a passo para rodar o projeto na sua máquina pela primeira vez:

**1. Clone o repositório:**
Abra o terminal na pasta onde deseja salvar o projeto e rode:
```bash
git clone [https://github.com/carlosbranga/powerlifting-app-frontend.git](https://github.com/carlosbranga/powerlifting-app-frontend.git)
```

**2. Entre na pasta do projeto:**
```bash
cd powerlifting-app-frontend
```

**3. Instale as dependências:**
Isso vai baixar todas as bibliotecas necessárias para o Angular e os gráficos funcionarem (pode demorar alguns minutos na primeira vez).
```bash
npm install
```

**4. Rode o servidor de desenvolvimento:**
```bash
ng serve
```

**5. Abra no navegador:**
Acesse `http://localhost:4201/`. A aplicação vai recarregar automaticamente sempre que você salvar alguma alteração no código.

---

## 🛠️ Regras de Versionamento (Git)




Para mantermos o código organizado e evitarmos conflitos na hora de juntar os trabalhos para a entrega, **nunca faça commits direto na branch `main`**. Além disso, **antes de começar a mexer em qualquer código, tenha sempre a certeza de que você está na branch `develop`**.

1. Vá para a branch principal de desenvolvimento e puxe as últimas atualizações(se tiver usando o GitHub Desktop é mais fácil de fazer esses passos, não precisa fica digitando comandos):
   `git checkout develop` e depois `git pull`
2. Crie uma branch para a sua tarefa a partir da develop. Exemplo: `git checkout -b feat/tela-de-login`
3. Faça as suas alterações no código e salve.
4. Suba a sua branch clicando em "Publish branch" no GitHub Desktop (ou `git push origin sua-branch` no terminal).
5. Abra um **Pull Request (PR)** lá no site do GitHub (apontando as suas mudanças para a branch `develop`) para que outro membro da equipe possa revisar e aprovar o código.

Qualquer dúvida na instalação, mandem no grupo! Bora quebrar tudo! 🚀