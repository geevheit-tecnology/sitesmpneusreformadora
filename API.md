# API

Base versionada proposta:

```text
GET  /api/v1/settings
POST /api/v1/leads
POST /api/v1/quotes
GET  /api/v1/services
GET  /api/v1/blog
GET  /api/v1/faq
POST /api/v1/contact
```

Todos os endpoints de escrita devem aplicar validação, rate limit, CSRF quando aplicável, logs estruturados e consentimento LGPD.
