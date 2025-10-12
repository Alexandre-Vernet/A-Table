CREATE SEQUENCE IF NOT EXISTS ingredients_id_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE IF NOT EXISTS ingredients_recipe_id_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE IF NOT EXISTS recipe_saved_id_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE IF NOT EXISTS recipe_saved_recipe_id_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE IF NOT EXISTS recipe_saved_user_id_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE IF NOT EXISTS recipe_step_id_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE IF NOT EXISTS recipe_step_recipe_id_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE IF NOT EXISTS recipes_id_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE IF NOT EXISTS recipes_user_id_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE IF NOT EXISTS users_id_seq START WITH 1 INCREMENT BY 1;

CREATE TABLE ingredients
(
    id        BIGINT DEFAULT nextval('ingredients_id_seq')        NOT NULL,
    recipe_id BIGINT DEFAULT nextval('ingredients_recipe_id_seq') NOT NULL,
    name      VARCHAR                                             NOT NULL,
    quantity  INTEGER                                             NOT NULL,
    unit      VARCHAR,
    CONSTRAINT ingredients_pk PRIMARY KEY (id)
);

CREATE TABLE recipe_saved
(
    id        BIGINT DEFAULT nextval('recipe_saved_id_seq')        NOT NULL,
    user_id   BIGINT DEFAULT nextval('recipe_saved_user_id_seq')   NOT NULL,
    recipe_id BIGINT DEFAULT nextval('recipe_saved_recipe_id_seq') NOT NULL,
    CONSTRAINT recipe_user_pk PRIMARY KEY (id)
);

CREATE TABLE recipe_step
(
    id          BIGINT DEFAULT nextval('recipe_step_id_seq')        NOT NULL,
    recipe_id   BIGINT DEFAULT nextval('recipe_step_recipe_id_seq') NOT NULL,
    step_number INTEGER                                             NOT NULL,
    description VARCHAR                                             NOT NULL,
    CONSTRAINT recipe_step_pk PRIMARY KEY (id)
);

CREATE TABLE recipes
(
    id               BIGINT DEFAULT nextval('recipes_id_seq')      NOT NULL,
    name             VARCHAR                                       NOT NULL,
    nb_person        SMALLINT                                      NOT NULL,
    category         VARCHAR                                       NOT NULL,
    preparation_time INTEGER,
    cooking_time     INTEGER,
    note             VARCHAR,
    image            BYTEA,
    user_id          BIGINT DEFAULT nextval('recipes_user_id_seq') NOT NULL,
    CONSTRAINT recipes_pk PRIMARY KEY (id)
);

CREATE TABLE users
(
    id         BIGINT DEFAULT nextval('users_id_seq') NOT NULL,
    email      VARCHAR                                NOT NULL,
    password   VARCHAR                                NOT NULL,
    last_name  VARCHAR                                NOT NULL,
    first_name VARCHAR                                NOT NULL,
    CONSTRAINT users_pk PRIMARY KEY (id)
);

ALTER TABLE users
    ADD CONSTRAINT users_unique UNIQUE (email);

ALTER TABLE ingredients
    ADD CONSTRAINT fk_recipe_ingredients FOREIGN KEY (recipe_id) REFERENCES recipes (id) ON DELETE CASCADE;

ALTER TABLE recipe_saved
    ADD CONSTRAINT fk_recipe_saved_recipe FOREIGN KEY (recipe_id) REFERENCES recipes (id) ON DELETE NO ACTION;

ALTER TABLE recipe_saved
    ADD CONSTRAINT fk_recipe_saved_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE NO ACTION;

ALTER TABLE recipe_step
    ADD CONSTRAINT fk_recipe_step_recipe FOREIGN KEY (recipe_id) REFERENCES recipes (id) ON DELETE CASCADE;

ALTER TABLE recipes
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE;