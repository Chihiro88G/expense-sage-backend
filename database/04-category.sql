CREATE TABLE public.category (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  category_type INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  modified_at TIMESTAMP NOT NULL DEFAULT NOW()
);