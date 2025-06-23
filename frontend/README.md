# Frontend - Projeto React + Vite + TypeScript

Este projeto é o frontend da aplicação, desenvolvido utilizando **React**, com foco em desempenho e modernidade, utilizando o bundler **Vite** e a linguagem **TypeScript** para garantir maior segurança e produtividade.

## Tecnologias Utilizadas

### Frameworks e Bibliotecas

- **React** — Biblioteca para construção de interfaces de usuário, com foco em componentes reutilizáveis e reatividade.
- **Vite** — Bundler moderno e rápido, que facilita o desenvolvimento com hot reload ultra rápido e builds otimizados.
- **TypeScript** — Superset do JavaScript que adiciona tipagem estática, melhorando a manutenção e escalabilidade do código.
- **React Router** — Biblioteca para gerenciamento de rotas no React.
- **React Hook Form** — Biblioteca para criação e controle de formulários com menos código e melhor performance.
- **Zod** — Utilizada para validação e parsing dos dados do frontend, garantindo que os dados enviados ao backend estejam corretos.

### UI e Estilos

- **TailwindCSS** — Framework CSS utilitário que facilita a estilização rápida e responsiva.
- **ShadcnUI** — Componentes acessíveis e sem estilização para construir interfaces mais complexas (Avatar, Dialog, Switch, Label, Slot).
- **Lucide-react** — Biblioteca de ícones para React.
- **Material Symbols** — Conjunto de ícones para uso em interfaces.
- **tw-animate-css** — Biblioteca de animações CSS integradas ao Tailwind.

### Gerenciamento de Estado e Dados

- **@tanstack/react-query** — Ferramenta para gerenciamento e cache de dados assíncronos, facilitando requisições HTTP e sincronização do estado remoto.
- **Axios** — Cliente HTTP para fazer requisições à API backend.

### Qualidade de Código e Lint

- **ESLint** com plugins para React e React Hooks — Garantem a qualidade do código, seguindo boas práticas e padrões.
- **TypeScript ESLint** — Integração do ESLint com o TypeScript para validação estática.

---

## Organização e arquitetura do projeto

frontend/
├── public/ # Arquivos públicos acessíveis diretamente, como imagens estáticas, favicon, etc.
├── src/ # Código-fonte principal da aplicação
│ ├── assets/ # Recursos estáticos como imagens, fontes e ícones
│ ├── components/ # Componentes reutilizáveis da interface (UI)
│ ├── lib/ # Módulo utilitário para o tailwind
│ ├── pages/ # Páginas da aplicação
│ ├── router/ # Configuração do roteamento (React Router Dom)
│ ├── schemas/ # Schemas de validação e tipagem (Zod)
│ ├── services/ # Lógica de comunicação utilizando o Axios para chamadas de API
│ ├── types/ # Definições e interfaces TypeScript globais
│ ├── utils/ # Funções utilitárias reutilizáveis
│ ├── App.tsx # Componente raiz da aplicação
│ ├── config.ts # Tratamento de variáveis de ambiente para uso na aplicação
│ ├── index.css # Estilos globais da aplicação
│ ├── main.tsx # Ponto de entrada da aplicação React
│ └── vite-env.d.ts # Declarações de tipos para o Vite
├── .env.example # Exemplo de arquivo de ambiente para referência
├── eslint.config.js # Configuração do ESLint para padronização de código
├── tailwind.config.ts # Padronização de variáveis do tailwind para facilitar o uso
└── index.html # HTML principal servido pela aplicação

## Scripts Disponíveis

- **`npm run dev`**  
  Inicia o servidor de desenvolvimento do Vite com hot reload, acessível em `http://localhost:8080`.

- **`npm run build`**  
  Compila o projeto para produção. Primeiro compila os arquivos TypeScript usando `tsc -b` (build mode), depois gera o bundle otimizado com Vite.

- **`npm run lint`**  
  Executa o ESLint para analisar o código e apontar problemas de estilo, erros ou más práticas.

- **`npm run preview`**  
  Executa um servidor local para pré-visualizar a versão de produção gerada pelo build.

---

## Como rodar localmente

1. Clone este repositório e acesse a pasta do frontend.

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor

```bash
npm run dev
```

4. Abra o seu navegador:

```bash
localhost:8080
```
