CREATE TABLE public.user_currency (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  currency_id INT NOT NULL,
  CONSTRAINT fk_user
    FOREIGN KEY (user_id) 
    REFERENCES public.users(id),
  CONSTRAINT fk_currency
    FOREIGN KEY (currency_id) 
    REFERENCES public.currency(id)
);