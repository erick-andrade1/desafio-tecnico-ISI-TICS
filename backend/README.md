# Backend - Desafio Técnico ISI TICS

Este projeto é uma API desenvolvida com Node.js, Express e TypeScript, seguindo os princípios de Clean Code, Arquitetura Hexagonal e boas práticas de desenvolvimento. A API é aderente aos padrões RESTful.

## Tecnologias Utilizadas

### Plataforma

- **Node.js** — Ambiente de execução para JavaScript no servidor.

- **TypeScript** — Superset do JavaScript que adiciona tipagem estática, tornando o desenvolvimento mais seguro e produtivo.

### Servidor e Roteamento

- **Express** — Framework web minimalista e flexível para criação de rotas e middlewares.

- **express-async-errors** — Middleware que permite o uso de async/await sem a necessidade de try/catch em todas as rotas, facilitando o tratamento global de erros.

### Inversão de Dependência

- **InversifyJS** — Container para Inversão de Controle (IoC) que permite aplicar o princípio da Inversão de Dependência, facilitando testes e organização do código.

### Validações

- **Zod** — Biblioteca de validação e parsing que atua como uma camada intermediária entre o frontend e o backend. Garante que os dados enviados estejam no formato correto e sejam seguros de utilizar.

### ORM e Banco de Dados

- **Prisma** — ORM moderno e robusto, utilizado para abstrair e facilitar a manipulação do banco de dados SQLite, com suporte a migrations e tipagem automática e suporte a transactions.

### Logs

- **Winston** — Biblioteca de logging flexível e extensível, utilizada para registrar logs do sistema e eventos no console, facilitando o monitoramento e debugging da aplicação.

- **winston-transport** — Permite a criação de transportes personalizados para os logs, se necessário.

### CORS

- **cors** — Middleware para habilitar o compartilhamento de recursos entre diferentes origens (Cross-Origin Resource Sharing), necessário para comunicação entre frontend e backend em ambientes separados.

### Variáveis de Ambiente

- **dotenv** — — Carrega variáveis de ambiente a partir de um arquivo .env, permitindo configuração externa e segura dos parâmetros da aplicação.

## Organização e arquitetura do projeto

Como foi dito anteriormente o projeto se baseia nos princípios do Clean Code com arquitetura hexagonal, tendo isso em vista podemos adiantar que a pasta Core é onde está a parte mais importante do sistema, contendo regras de negócio, casos de uso e afins.

```plaintext
backend/
├── prisma/ # Configurações e arquivos do Prisma ORM
├── src/
│ ├── adapters/ # Adapta dados e interfaces externas
│ ├── config/ # Configurações gerais da aplicação, como variáveis de ambiente
│ ├── controllers/ # Controladores responsáveis por lidar com requisições HTTP
│ ├── core/ # Camada de domínio com entidades, casos de uso, regras de domínio, objetos de valor, services e providers e etc.
│ ├── errors/ # Definição e tratamento de erros personalizados
│ ├── external/ # Integrações com sistemas e serviços externos (DB, Validators (zod))
│ ├── factories/ # Conversão de Entidades do sistema para DTO, para controle dos dados retornados (Factory Pattern)
│ ├── generated/ # Arquivos gerados automaticamente pelo Prisma
│ ├── inject/ # Configuração dos módulos para inversão de dependência
│ ├── middlewares/ # Só se encontra o logRouter que serve para mostrar no console as rotas que estão sendo acessadas no momento
│ ├── repositories/ # Repositórios responsáveis pelo acesso a dados com o Prisma
│ ├── routes/ # Definição e organização das rotas da aplicação
│ ├── app.ts # Inicialização da aplicação, middlewares e criação das rotas
│ ├── index.ts # Ponto de entrada principal da aplicação
│ ├── inversify.config.ts # Configuração do container de injeção de dependência
│ ├── logger.ts # Configuração do sistema de logs
│ └── routes.ts # Responsável pelo carregamento das rotas, que são lidas como arquivos .route e transformadas para uso do app
└── .env.example # Exemplo de configuração de ambiente
```

## Scripts Disponíveis

Abaixo estão os scripts configurados para facilitar o desenvolvimento e o gerenciamento do banco de dados:

- **`npm start`**  
  Inicia o servidor backend com `ts-node-dev`, monitorando alterações no código e reiniciando automaticamente. Usa `--transpile-only` para acelerar a execução.

- **`npm run start:backend`**  
  Executa diretamente o servidor Express com TypeScript via `ts-node-dev`, ignorando a pasta `node_modules`.

- **`npm run db:reset`**  
  Reseta completamente o banco de dados, removendo e reaplicando todas as migrations com `prisma migrate reset`. Útil para recomeçar do zero durante o desenvolvimento.

- **`npm run db:rebuild`**  
  Reaplica todas as migrations com `prisma migrate dev`, sincronizando o banco com o schema atual.

- **`npm run tsc`**  
  Compila o projeto TypeScript para JavaScript, gerando os arquivos `.js` na pasta configurada.

- **`npm run tsc:check`**  
  Executa o verificador de tipos TypeScript (`tsc --noEmit`) sem gerar arquivos. Usa `--skipLibCheck` para ignorar verificação de bibliotecas externas e melhorar a performance.

## Como rodar o projeto

✅ Requisitos

- Node.js 18+
- npm
- Banco de dados configurado (via DATABASE_URL no .env)
- Prisma instalado localmente (npx prisma)

Siga os passos abaixo para configurar e iniciar o servidor:

1. Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

2. Após isso instale as dependências do projeto:

```bash
npm install
```

3. Gere os arquivos do Prisma Client com base no schema:

```bash
npx prisma generate
```

4. Execute o servidor na porta padrão 8000 (ou na porta que preferir modificando no `.env`):

```bash
npm start
```

### Considerações finais:

O banco já está preparado para uso, contendo 8 cupons ao total para serem aplicados aos produtos.
