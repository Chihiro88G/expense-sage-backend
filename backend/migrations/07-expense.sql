DROP TABLE public.expense;

CREATE TABLE public.expense (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  year_month INT NOT NULL,
  user_id INT NOT NULL,
  category_id INT NOT NULL,
  amount NUMERIC(10, 2) NOT NULL,
  note VARCHAR(100),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  modified_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT fk_user
    FOREIGN KEY (user_id) 
    REFERENCES public.users(id),
  CONSTRAINT fk_category
    FOREIGN KEY (category_id) 
    REFERENCES public.category(id)
);