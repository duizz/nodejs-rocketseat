# 03-api-solid

Este projeto é uma API desenvolvida em Node.js com foco em princípios sólidos de arquitetura e boas práticas de desenvolvimento.

## Tecnologias Utilizadas

- Node.js
- TypeScript
- Express
- Prisma ORM
- SQLite (ou outro banco configurado)
- Testes automatizados (Vitest)

## Funcionalidades

- Cadastro e autenticação de usuários
- Gerenciamento de academias (gyms)
- Registro de check-ins
- Validação de regras de negócio (ex: distância para check-in)
- Testes unitários e de integração

## Como Executar

1. Instale as dependências:
    ```bash
    npm install
    ```

2. Configure o banco de dados:
    ```bash
    npx prisma migrate dev
    ```

3. Inicie o servidor:
    ```bash
    npm run dev
    ```

4. Execute os testes:
    ```bash
    npm test
    ```

## Estrutura do Projeto

- `src/` — Código-fonte da aplicação
- `prisma/` — Migrations e schema do banco de dados
- `tests/` — Testes automatizados

## Princípios S.O.L.I.D.

O projeto segue os princípios SOLID para garantir código limpo, desacoplado e de fácil manutenção.

## Licença

Este projeto está licenciado sob a licença MIT.