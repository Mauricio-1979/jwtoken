CREATE DATABASE base_jwt;

CREATE TABLE users(
    users_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
	UNIQUE(user_email)
);

CREATE TABLE todo (
	todo_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	title VARCHAR(50) NOT NULL,
	task VARCHAR(250) NOT NULL,
	users_id uuid REFERENCES users(users_id)
);


