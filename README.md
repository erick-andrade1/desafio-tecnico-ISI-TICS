# desafio-tecnico-ISI-TICS

### Todos as explicações relativas a pastas do projeto, como arquitetura, scripts, modo de utilização, tecnologias e afins estão separadas por pasta, ou seja, na pasta do Backend poderá ser encontrado um README específico para o mesmo, assim como para o Frontend.

### Instruções de uso:

Abaixo seguem algumas instruções de como rodar o projeto de forma mais prática:

#### Backend:

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

#### Frontend:

1. Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

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

- **IMPORTANTE** - Lembre-se de configurar as pastas .env para o frontend e backend.

## Extra:

Na pasta **`resources`** é possível utilizar e verificar todas as requisições e JSON utilizados na aplicação, porém para isso será necessário ter a extensão do VSCode conhecida como 🔗 [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client), ela permite fazer o uso dessas requisições diretamente no VSCode sem precisar fazer uso de postman. Essa é uma forma prática de documentar as requisições diretamente no projeto.
