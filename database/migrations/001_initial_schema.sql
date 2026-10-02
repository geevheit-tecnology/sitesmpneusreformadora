CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(160) NOT NULL,
  company VARCHAR(180) NOT NULL,
  document VARCHAR(32),
  phone VARCHAR(32) NOT NULL,
  whatsapp VARCHAR(32),
  email VARCHAR(180) NOT NULL,
  city VARCHAR(120),
  state VARCHAR(2),
  source VARCHAR(80) NOT NULL DEFAULT 'website',
  status VARCHAR(32) NOT NULL DEFAULT 'NEW',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX leads_status_idx ON leads(status);
CREATE INDEX leads_email_idx ON leads(email);

CREATE TABLE quotes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id),
  tire_quantity INTEGER,
  tire_type VARCHAR(120),
  tire_size VARCHAR(80),
  service_type VARCHAR(120),
  message TEXT,
  status VARCHAR(32) NOT NULL DEFAULT 'NEW',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID,
  action VARCHAR(120) NOT NULL,
  entity VARCHAR(120) NOT NULL,
  entity_id UUID,
  old_data JSONB,
  new_data JSONB,
  ip INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE consents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id),
  purpose VARCHAR(120) NOT NULL,
  consented_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  ip INET,
  user_agent TEXT
);
