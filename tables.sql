CREATE TABLE date (
    date_id integer PRIMARY KEY,
    daynumber integer NOT NULL,
    dayname character varying(20) NOT NULL,
    monthnumber integer NOT NULL,
    monthname character varying(20) NOT NULL,
    year integer NOT NULL,
    date date NOT NULL
);

CREATE TABLE "user" (
    user_id SERIAL PRIMARY KEY,
    login character varying(20) NOT NULL,
    password character varying(100) NOT NULL,
    name character varying(20),
    lastname character varying(20),
    email character varying(30) NOT NULL
);

CREATE TABLE matter (
    matter_id SERIAL PRIMARY KEY,
    title character varying(50) NOT NULL,
    desription character varying(500),
    starthour time without time zone,
    endhour time without time zone,
    category character varying(20),
    date_id integer REFERENCES date(date_id),
    user_id integer REFERENCES "user"(user_id)
);

CREATE TABLE todolist (
    todolist_id SERIAL PRIMARY KEY,
    matter_id integer REFERENCES matter(matter_id)
);

CREATE TABLE todolistitem (
    todolistitem_id SERIAL PRIMARY KEY,
    item_content character varying(200),
    todolist_id integer REFERENCES todolist(todolist_id)
);

CREATE TABLE alert (
    alert_id SERIAL PRIMARY KEY,
    alert_hour time without time zone,
    matter_id integer REFERENCES matter(matter_id)
);

CREATE TABLE note (
    note_id SERIAL PRIMARY KEY,
    content text,
    matter_id integer REFERENCES matter(matter_id)
);
