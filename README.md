# Front Earning Backend

## Models

### Vault

- `id`: String (Primary Key)
- `name`: String
- `address`: String
- `createdAt`: DateTime
- `updatedAt`: DateTime
- `deposits`: Deposit[] (Relation)

### Token

- `id`: String (Primary Key)
- `name`: String
- `symbol`: String
- `address`: String
- `createdAt`: DateTime
- `updatedAt`: DateTime
- `purchases`: Purchase[] (Relation)

### Deposit

- `id`: String (Primary Key)
- `amount`: Float
- `vaultId`: String (Foreign Key)
- `createdAt`: DateTime
- `updatedAt`: DateTime
- `vault`: Vault (Relation)

### Purchase

- `id`: String (Primary Key)
- `amount`: Float
- `tokenId`: String (Foreign Key)
- `createdAt`: DateTime
- `updatedAt`: DateTime
- `token`: Token (Relation)

## API Endpoints

| Resource  | Endpoints      | Methods          |
| --------- | -------------- | ---------------- |
| Vaults    | /vaults        | GET, POST        |
|           | /vaults/:id    | GET, PUT, DELETE |
| Tokens    | /tokens        | GET, POST        |
|           | /tokens/:id    | GET, PUT, DELETE |
| Deposits  | /deposits      | GET, POST        |
|           | /deposits/:id  | GET, PUT, DELETE |
| Purchases | /purchases     | GET, POST        |
|           | /purchases/:id | GET, PUT, DELETE |

## Error Responses

```json
{
  "message": "Error description"
}
```

- 400: Bad Request
- 404: Not Found
- 500: Server Error
