const db = require("../../config/dbConnection.js");

const createProductQuery = `
  CREATE TABLE product (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR (50) NOT NULL,
    quantity INT NOT NULL,
    price INT NOT NULL,
    image_url VARCHAR (255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    is_deleted BOOLEAN NOT NULL DEFAULT false,
    PRIMARY KEY (id)
  );
`;

db.query(createProductQuery, (error, results) => {
  if (error) {
    throw new Error(error);
  } else {
    console.log("Table product created!");
  }
});

const createCategoryQuery = `
  CREATE TABLE category (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR (50) NOT NULL,
    PRIMARY KEY (id)
  );
`;

db.query(createCategoryQuery, (error, results) => {
  if (error) {
    throw new Error(error);
  } else {
    console.log("Table category created!");
  }
});

const createProductCategoryQuery = `
  CREATE TABLE product_category (
    product_id INT NOT NULL,
    category_id INT NOT NULL,
    PRIMARY KEY (product_id, category_id),
    FOREIGN KEY (product_id) REFERENCES product (id),
    FOREIGN KEY (category_id) REFERENCES category (id)
  );
`;

db.query(createProductCategoryQuery, (error, results) => {
  if (error) {
    throw new Error(error);
  } else {
    console.log("Table product_category created!");
  }
});

const createUserQuery = `
  CREATE TABLE user (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR (50) NOT NULL,
    email VARCHAR (50) NOT NULL,
    password VARCHAR (255) NOT NULL,
    address VARCHAR (255) NOT NULL,
    phone_number VARCHAR (20) NOT NULL,
    image_url VARCHAR (255) NOT NULL,
    join_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    is_deleted BOOLEAN NOT NULL DEFAULT false,
    PRIMARY KEY (id)
  );
`;

db.query(createUserQuery, (error, results) => {
  if (error) {
    throw new Error(error);
  } else {
    console.log("Table user created!");
  }
});