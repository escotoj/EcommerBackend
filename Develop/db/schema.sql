-- DROP DATABASE
DROP DATABASE IF EXISTS ecommerce_db;

-- CREATE DATABASE
CREATE DATABASE ecommerce_db;

USE ecommerce_db;

CREATE TABLE category (
    id INT NOT NULL AUTO_INCREMENT,
    category_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id);

);

CREATE TABLE product (
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30) NOT NULL,
    price DECIMAL NOT NULL VALIDATE,
    stock INT NOT NULL DEFAULT 10,
    category_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY category_id REFERENCES category (id);

);

CREATE TABLE tag (
    id INT NOT NULL AUTO_INCREMENT,
    tag_name VARCHAR(30) NOT NULL, 
    PRIMARY KEY (id)
);

CREATE TABLE producttag (
id INT NOT NULL AUTO_INCREMENT,
product_id INT NOT NULL,
tag_id INT NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY 
(product_id) REFERENCES product (id),FOREIGN KEY tag_id INT REFERENCES tag (id);
);

