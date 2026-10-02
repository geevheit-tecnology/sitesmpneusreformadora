# Architecture

## Frontend

- `src/config`: configurações editáveis da empresa.
- `src/content`: conteúdo institucional centralizado para futura migração a CMS.
- `src/services`: contratos de integração e implementações mock.
- `src/types.ts`: DTOs e tipos compartilhados.
- `src/App.tsx`: composição das páginas e componentes reutilizáveis.

## Future Backend

Estrutura recomendada para Laravel:

```text
app/
  DTO/
  Http/Requests/
  Models/
  Policies/
  Repositories/
  Services/Integrations/
database/migrations/
routes/api.php
```

Integrações devem depender de interfaces, não de provedores concretos.
