create table if not exists app_users (
  id text primary key,
  name text not null,
  email text unique,
  password_hash text,
  role text not null check (role in ('admin', 'employee')),
  department text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists service_types (
  id text primary key,
  name text not null unique,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists customer_sources (
  id text primary key,
  name text not null unique,
  active boolean not null default true
);

create table if not exists customers (
  id text primary key,
  name text not null,
  source text,
  level text,
  owner_id text references app_users(id),
  phone text,
  address text,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists contacts (
  id text primary key,
  customer_id text not null references customers(id) on delete cascade,
  name text not null,
  phone text,
  title text,
  is_primary boolean not null default false
);

create table if not exists projects (
  id text primary key,
  code text unique not null,
  customer_id text not null references customers(id),
  name text not null,
  service_type text not null references service_types(id),
  owner_id text references app_users(id),
  status text not null,
  start_date date,
  end_date date,
  location text,
  service_scope text,
  crew_equipment text,
  contract_amount numeric(12,2) not null default 0,
  budget_cost numeric(12,2) not null default 0,
  delivery text,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists project_subprojects (
  id text primary key,
  project_id text not null references projects(id) on delete cascade,
  name text not null,
  service_type text not null references service_types(id),
  employee_id text references app_users(id),
  shooting_employee_ids text[] not null default '{}',
  production_employee_ids text[] not null default '{}',
  quantity numeric(12,2) not null default 1,
  unit_price numeric(12,2) not null default 0,
  total_amount numeric(12,2) not null default 0,
  amount numeric(12,2) not null default 0,
  cost_budget numeric(12,2) not null default 0,
  commission_rate numeric(6,2) not null default 0,
  status text not null,
  delivery text,
  created_at timestamptz not null default now()
);

create table if not exists project_tasks (
  id text primary key,
  project_id text not null references projects(id) on delete cascade,
  subproject_id text references project_subprojects(id) on delete set null,
  assignee_id text references app_users(id),
  title text not null,
  task_type text,
  task_date date,
  location text,
  status text not null,
  notes text
);

create table if not exists project_costs (
  id text primary key,
  project_id text not null references projects(id) on delete cascade,
  subproject_id text references project_subprojects(id) on delete set null,
  category text not null,
  vendor text,
  amount numeric(12,2) not null,
  occurred_on date,
  notes text
);

create table if not exists payments (
  id text primary key,
  project_id text not null references projects(id) on delete cascade,
  amount numeric(12,2) not null,
  paid_on date,
  account text,
  method text,
  invoice_status text,
  notes text
);

create table if not exists reimbursements (
  id text primary key,
  employee_id text not null references app_users(id),
  project_id text references projects(id),
  category text not null,
  amount numeric(12,2) not null,
  occurred_on date,
  status text not null,
  reason text,
  approved_by text references app_users(id),
  approved_at timestamptz
);

create table if not exists salary_records (
  id text primary key,
  employee_id text not null references app_users(id),
  month text not null,
  base_amount numeric(12,2) not null default 0,
  bonus_amount numeric(12,2) not null default 0,
  commission_amount numeric(12,2) not null default 0,
  reimbursement_amount numeric(12,2) not null default 0,
  deduction_amount numeric(12,2) not null default 0,
  status text not null,
  notes text
);

create table if not exists commission_rules (
  id text primary key,
  employee_id text not null references app_users(id),
  service_type text not null references service_types(id),
  rate numeric(6,2) not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists annual_targets (
  id text primary key,
  employee_id text not null references app_users(id),
  year int not null,
  service_type text not null references service_types(id),
  annual_amount numeric(12,2) not null,
  q1_amount numeric(12,2) not null default 0,
  q2_amount numeric(12,2) not null default 0,
  q3_amount numeric(12,2) not null default 0,
  q4_amount numeric(12,2) not null default 0
);

create table if not exists attachments (
  id text primary key,
  entity_type text not null,
  entity_id text not null,
  file_name text not null,
  file_url text,
  file_type text,
  uploaded_by text references app_users(id),
  created_at timestamptz not null default now()
);

create table if not exists audit_logs (
  id text primary key,
  actor_id text references app_users(id),
  action text not null,
  entity_type text,
  entity_id text,
  detail jsonb,
  created_at timestamptz not null default now()
);
