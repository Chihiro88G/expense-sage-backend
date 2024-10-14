DROP TABLE public.user_category;

CREATE TABLE public.user_category (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  category_id INT NOT NULL,
  CONSTRAINT fk_user
    FOREIGN KEY (user_id) 
    REFERENCES public.users(id),
  CONSTRAINT fk_category
    FOREIGN KEY (category_id) 
    REFERENCES public.category(id)
);