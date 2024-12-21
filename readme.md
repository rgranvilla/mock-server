# Mock Server V1.0

## Descrição
Este repositório é um servidor mock protegido, construído com json-server e JWT (JSON Web Tokens). Ele permite que desenvolvedores front-end trabalhem com dados simulados antes que o backend seja completamente implementado. Inclui ferramentas para geração de dados mock, hashing de senhas e suporte para inicializar o servidor com ou sem autenticação.

## Recursos principais
- **Autenticação JWT**: Implementação de endpoints protegidos com tokens JWT.
- **Geração de dados mock**: Uso do `@faker-js/faker` para popular o banco de dados JSON com dados realistas.
- **Mock de APIs RESTful**: Criação automática de endpoints baseados no arquivo `db.json`.
- **Customização de respostas**: Middleware para paginação e filtros de busca.

## Estrutura do diretório
```plaintext
rgranvilla-mock-server/
├── api_v1/
│   ├── server.js        # Servidor principal com autenticação
│   ├── generateData.js  # Script para geração de dados mock
│   ├── users.json       # Arquivo com dados de usuários
│   ├── db.json          # Banco de dados fake
│   └── tools.js         # Ferramentas auxiliares
├── package.json         # Dependências e scripts
└── readme.md            # Documentação do projeto
```

## Como executar

### Requisitos
- Node.js instalado.

### Instruções
1. Clone o repositório:
   ```bash
   git clone https://github.com/rgranvilla/rgranvilla-mock-server.git
   cd rgranvilla-mock-server
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Gere dados mock:
   ```bash
   npm run mock-data
   ```
4. Execute o servidor:
   - Sem autenticação:
     ```bash
     npm start
     ```
   - Com autenticação:
     ```bash
     npm run start-auth
     ```
5. Para gerar senhas com hash:
   ```bash
   npm run hash
   ```

O servidor estará disponível em: `http://localhost:3000`

## Início rápido dos servidores
| Descrição                 | Script         |
|---------------------------|----------------|
| Iniciar servidor sem auth | `npm start`    |
| Iniciar servidor com auth | `npm run start-auth` |

## Ferramentas disponíveis
| Descrição                     | Script           |
|-------------------------------|------------------|
| Gerar dados mock              | `npm run mock-data` |
| Gerar senhas com hash         | `npm run hash`      |

## Endpoints do servidor com autenticação
| Endpoint                     | Descrição               |
|------------------------------|-------------------------|
| `localhost:3000/auth/login`  | Login de usuário        |
| `localhost:3000/purchases`   | Lista de compras (token necessário) |
| `localhost:3000/campaigns`   | Lista de campanhas (token necessário) |

## Dependências principais
- `bcrypt`: Para hashing de senhas.
- `body-parser`: Para parsing de corpos de requisição.
- `cors`: Para habilitar CORS (Cross-Origin Resource Sharing).
- `json-server`: Para criar o servidor mock.
- `jsonwebtoken`: Para criar e verificar tokens JWT.
- `@faker-js/faker`: Para geração de dados mock.
- `moment`: Para manipulação de datas.
- `ramda`: Para utilitários de programação funcional.

## Contribuições
Sugestões e feedback são bem-vindos via Pull Requests ou Issues no repositório.

## Licença
Este projeto está licenciado sob a [MIT License](./LICENSE).

## Desenvolvedor

[![Ricardo Granvilla](./assets/author.png)](https://github.com/rgranvilla)

[Ricardo Granvilla 🚀](https://github.com/rgranvilla)
