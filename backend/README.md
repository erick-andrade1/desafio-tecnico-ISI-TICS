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

```bash
npm start
```

Executa o script start:backend. Inicia a aplicação backend com ts-node-dev, que reinicia automaticamente a aplicação ao detectar alterações no código. Utiliza transpile-only para agilizar o processo.

```bash
npm run start:backend
```

Executa diretamente o servidor Express com TypeScript utilizando ts-node-dev, ignorando alterações na pasta node_modules.

```bash
npm run db:reset
```

Reseta o banco de dados, revertendo todas as migrations e reaplicando-as. Útil para reiniciar o estado do banco durante o desenvolvimento. Usa o comando do Prisma migrate reset.

```bash
npm run db:migrate
```

Inicializa o sistema de migrations do Prisma. Deve ser rodado na primeira vez que o projeto for configurado para criar a pasta de migrations.

```bash
npm run db:rebuild
```

Executa o comando prisma migrate dev rebuild, que reaplica as migrations e sincroniza o banco de dados, útil para reconstruir o banco com as últimas alterações no schema.

```bash
npm run tsc
```

Executa o compilador TypeScript para compilar o código no modo padrão, gerando os arquivos .js na pasta de saída configurada.

```bash
npm run tsc:check
```

Roda o compilador TypeScript em modo de verificação (--noEmit), sem gerar arquivos, apenas para checar se existem erros de tipagem e sintaxe. Usa a flag --skipLibCheck para ignorar checagem de bibliotecas de terceiros, acelerando o processo.

### Considerações finais:

O banco já está preparado para uso, contendo 8 cupons ao total para serem aplicados aos produtos.
