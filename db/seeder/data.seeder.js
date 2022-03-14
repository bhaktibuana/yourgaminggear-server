const db = require("../../config/dbConnection");
const fs = require("fs");
const crypto = require("crypto");

const dataCategory = JSON.parse(
  fs.readFileSync("./db/seeder/dataCategory.json")
);
const dataProduct = JSON.parse(fs.readFileSync("./db/seeder/dataProduct.json"));
const dataUser = JSON.parse(fs.readFileSync("./db/seeder/dataUser.json"));

dataCategory.forEach((value) => {
  const insertQuery = `INSERT INTO category (name) VALUES (?);`;
  db.query(insertQuery, [value.name], (error, results) => {
    if (error) {
      throw new Error(error);
    } else {
      console.log(`Data category: "${value.name}" inserted!`);
    }
  });
});

dataProduct.forEach((value) => {
  const insertProductQuery = `INSERT INTO product (name, quantity, price, image_url) VALUES (?, ?, ?, ?);`;
  db.query(
    insertProductQuery,
    [value.name, value.quantity, value.price, value.image_url],
    (error, results) => {
      if (error) {
        throw new Error(error);
      } else {
        console.log(`Data product: "${value.name}" inserted!`);

        const selectProductQuery = `SELECT id FROM product WHERE name = ?;`;
        db.query(selectProductQuery, [value.name], (error, results) => {
          if (error) {
            throw new Error(error);
          } else {
            const productId = results[0].id;
            const selectCategoryQuery = `SELECT id FROM category WHERE name = ?;`;
            db.query(
              selectCategoryQuery,
              [value.category],
              (error, results) => {
                if (error) {
                  throw new Error(error);
                } else {
                  const categoryId = results[0].id;
                  const insertProductCategoryQuery = `INSERT INTO product_category (product_id, category_id) VALUES (?, ?);`;
                  db.query(
                    insertProductCategoryQuery,
                    [productId, categoryId],
                    (error, results) => {
                      if (error) {
                        throw new Error(error);
                      } else {
                        console.log(
                          `Data product category: "${productId}, ${categoryId}" inserted!`
                        );
                      }
                    }
                  );
                }
              }
            );
          }
        });
      }
    }
  );
});

dataUser.forEach((value) => {
  const insertQuery = `INSERT INTO user (name, email, password, address, phone_number, image_url) VALUES (?, ?, ?, ?, ?, ?);`;
  db.query(
    insertQuery,
    [
      value.name,
      value.email,
      crypto.createHash("sha256").update(value.password).digest("hex"),
      value.address,
      value.phone_number,
      value.image_url,
    ],
    (error, results) => {
      if (error) {
        throw new Error(error);
      } else {
        console.log(`Data user: "${value.name}" inserted!`);
      }
    }
  );
});
