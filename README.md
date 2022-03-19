# yourgaminggear-server

## Description

yourgaminggear-server is a server side of Your Gaming Gear mini-project from Dibimbing course in the form of Back-end API Server Development. This project uses [ExpressJs](https://www.npmjs.com/package/express) framework and MySQL as the database.
This project can be accessed online at [http://yourgaminggear-server.herokuapp.com](http://yourgaminggear-server.herokuapp.com) or you can follow this documentation to use locally on your computer.

## What's in this app?

- REST API
- Database
- JSON Web Token
- Upload File Service
- Authentication and Authorization
- Data Secure HASH Algorithm (SHA-256)
- Data Validation

# Installation

In the root project directory run `npm install` on your terminal.

# Database Configuration

There are two ways how to setup the database configuration. You can choose one of the methods below:

#### 1st method

- The first of all that you have to do is install MySQL database on your computer (this only if you don't have MySQL database yet).
- Import **./db/yourgaminggear.sql** file into your MySQL database. It will automatically create new schema named "yourgaminggear" with its tables and datas.
- Open **./config/dbConnection.js** and you will see the followng code:

```javascript
const mysql = require("mysql");

const db = mysql.createPool({
  host: "YOUR_MYSQL_HOST", // "localhost" by default
  user: "YOUR_MYSQL_USER", // "root" by default
  password: "YOUR_MYSQL_PASSWORD",
  database: "yourgaminggear",
});

module.exports = db;
```

- Change the value of **host**, **user** and **password** to your MySQL configuration. If you use another port for your MySQL you can add new **port** property on it.

#### 2nd method

- The first of all that you have to do is install MySQL database on your computer (this only if you don't have MySQL database yet).
- Open **./config/dbConnection.js** and you will see the code like 1st method above.
- Change the value of **host**, **user** and **password** to your MySQL configuration. If you use another port for your MySQL you can add new **port** property on it.
- In the root project directory open your terminal and run `npm run migrate`. It will create the tables that needed.
- After create the tables you can insert data into it by running `npm run seeder`.

# Run The App

- In the root directory you can run `npm start` on your terminal.
- The server uses port: `3001` and it will be running on [http://localhost:3001](http://localhost:3001).

# API Usage

The use of the API in this project is divided into 3 groups namely product, user and upload. How to access the API is as follows:

### Product

<details>
<summary><b>Get products</b></summary>

<p>

`GET` `/product`

_Parameters:_ query

- `page` integer \*required (page number)
- `size` integer \*required (data length per page)

_Response:_ JSON

- `status: 200` get products success

```json
{
  "data": [
    {
      "id": "integer",
      "name": "string",
      "category": "string",
      "quantity": "integer",
      "price": "integer",
      "image_url": "string"
    }
  ],
  "totalPages": "integer"
}
```

- `status: 404` product not found

```json
{
  "message": "Product not found."
}
```

</p>
</details>

<details>
<summary><b>Get products by category</b></summary>

<p>

`GET` `/product/{category}`

_Parameters:_ path, query

- `category` string \*required (path) (see `category` table on database as reference)
- `page` integer \*required (query) (page number)
- `size` integer \*required (query) (data length per page)

_Response:_ JSON

- `status: 200` get products success

```json
{
  "data": [
    {
      "id": "integer",
      "name": "string",
      "category": "string",
      "quantity": "integer",
      "price": "integer",
      "image_url": "string"
    }
  ],
  "totalPages": "integer"
}
```

- `status: 404` product not found

```json
{
  "message": "Product not found."
}
```

</p>
</details>

<details>
<summary><b>Get product by id</b></summary>

<p>

`GET` `/product-id/{id}`

_Parameters:_ path

- `id` integer \*required (product id)

_Response:_ JSON

- `status: 200` get product success

```json
{
  "id": "integer",
  "name": "string",
  "category": "string",
  "quantity": "integer",
  "price": "integer",
  "image_url": "string"
}
```

- `status: 404` product not found

```json
{
  "message": "Product not found."
}
```

</p>
</details>

<details>
<summary><b>Add product</b></summary>

<p>

`POST` `/product/default`

_Authorization:_ Bearer Token

- `token` access token \*required

_Parameters:_ body

- `category` string \*required 
- `name` string, max:50 \*required
- `quantity` integer \*required
- `price` integer \*required

_Response:_ JSON

- `status: 200` add product success

```json
{
  "message": "Product added successfully."
}
```

- `status: 404` category not found

```json
{
  "message": "Category not found."
}
```

- `status: 401` unauthorized

```json
{
  "message": "Unauthorized."
}
```

- `status: 400` wrong authorization format

```json
{
  "auth": false,
  "message": "Wrong authorization format."
}
```

- `status: 401` token expired

```json
{
  "auth": false,
  "message": "Token expired."
}
```

- `status: 401` authorization failed

```json
{
  "auth": false,
  "message": "Invalid Token."
}
```

</p>
</details>

<details>
<summary><b>Add product with image</b></summary>

<p>

`POST` `/product`

_Authorization:_ Bearer Token

- `token` access token \*required

_Parameters:_ body

- `category` string \*required 
- `name` string, max:50 \*required
- `quantity` integer \*required
- `price` integer \*required
- `image_name` string \*required

_Response:_ JSON

- `status: 200` add product success

```json
{
  "message": "Product added successfully."
}
```

- `status: 404` category not found

```json
{
  "message": "Category not found."
}
```

- `status: 401` unauthorized

```json
{
  "message": "Unauthorized."
}
```

- `status: 400` wrong authorization format

```json
{
  "auth": false,
  "message": "Wrong authorization format."
}
```

- `status: 401` token expired

```json
{
  "auth": false,
  "message": "Token expired."
}
```

- `status: 401` authorization failed

```json
{
  "auth": false,
  "message": "Invalid Token."
}
```

</p>
</details>

<details>
<summary><b>Update product</b></summary>

<p>

`PUT` `/product/default/{id}`

_Authorization:_ Bearer Token

- `token` access token \*required

_Parameters:_ path, body

- `id` integer \*required (path)
- `category` string \*required (body)
- `name` string, max:50 \*required (body)
- `quantity` integer \*required (body)
- `price` integer \*required (body)

_Response:_ JSON

- `status: 200` update product success

```json
{
  "message": "Product updated successfully."
}
```

- `status: 404` product not found

```json
{
  "message": "Product not found."
}
```

- `status: 404` category not found

```json
{
  "message": "Category not found."
}
```

- `status: 401` unauthorized

```json
{
  "message": "Unauthorized."
}
```

- `status: 400` wrong authorization format

```json
{
  "auth": false,
  "message": "Wrong authorization format."
}
```

- `status: 401` token expired

```json
{
  "auth": false,
  "message": "Token expired."
}
```

- `status: 401` authorization failed

```json
{
  "auth": false,
  "message": "Invalid Token."
}
```

</p>
</details>

<details>
<summary><b>Update product with image</b></summary>

<p>

`PUT` `/product/{id}`

_Authorization:_ Bearer Token

- `token` access token \*required

_Parameters:_ path, body

- `id` integer \*required (path)
- `category` string \*required (body)
- `name` string, max:50 \*required (body)
- `quantity` integer \*required (body)
- `price` integer \*required (body)
- `image_name` string \*required (body)

_Response:_ JSON

- `status: 200` update product success

```json
{
  "message": "Product updated successfully."
}
```

- `status: 404` product not found

```json
{
  "message": "Product not found."
}
```

- `status: 404` category not found

```json
{
  "message": "Category not found."
}
```

- `status: 401` unauthorized

```json
{
  "message": "Unauthorized."
}
```

- `status: 400` wrong authorization format

```json
{
  "auth": false,
  "message": "Wrong authorization format."
}
```

- `status: 401` token expired

```json
{
  "auth": false,
  "message": "Token expired."
}
```

- `status: 401` authorization failed

```json
{
  "auth": false,
  "message": "Invalid Token."
}
```

</p>
</details>

<details>
<summary><b>Soft delete product</b></summary>

<p>

`PUT` `/product/delete/{id}`

_Authorization:_ Bearer Token

- `token` access token \*required

_Parameters:_ path

- `id` integer \*required

_Response:_ JSON

- `status: 200` delete product success

```json
{
  "message": "Product deleted successfully."
}
```

- `status: 401` unauthorized

```json
{
  "message": "Unauthorized."
}
```

- `status: 400` wrong authorization format

```json
{
  "auth": false,
  "message": "Wrong authorization format."
}
```

- `status: 401` token expired

```json
{
  "auth": false,
  "message": "Token expired."
}
```

- `status: 401` authorization failed

```json
{
  "auth": false,
  "message": "Invalid Token."
}
```

</p>
</details>

### User

<details>
<summary><b>Register</b></summary>

<p>

`POST` `/signup`

_Parameters:_ body

- `name` string, max:50 \*required
- `email` string, valid email format \*required
- `address` string, max:255 \*required
- `phone_number` string, valid phone number format (Indonesia) \*required
- `password` string, min:8 \*required
- `password_confirmation` string, min:8, match ref `password` \*required

_Response:_ JSON

- `status: 200` register success

```json
{
  "message": "Registration success."
}
```

- `status: 400` validation error

```json
{
  "message": "string"
}
```

- `status: 400` email already exist

```json
{
  "message": "Email already exist! Use another email."
}
```

- `status: 400` phone number already exist

```json
{
  "message": "Phone number already exist! Use another phone number."
}
```

</p>
</details>

<details>
<summary><b>Login by email</b></summary>

<p>

`POST` `/signin/email`

_Parameters:_ body

- `email` string, valid email format \*required
- `password` string, min:8 \*required

_Response:_ JSON

- `status: 200` login success

```json
{
  "message": "Sign in success."
}
```

- `status: 403` wrong email or password

```json
{
  "message": "Wrong email or password."
}
```

- `status: 403` account deleted

```json
{
  "message": "Your account has been deleted."
}
```

- `status: 400` validation error

```json
{
  "message": "string"
}
```

</p>
</details>

<details>
<summary><b>Login by phone number</b></summary>

<p>

`POST` `/signin/phone`

_Parameters:_ body

- `phone_number` string, valid phone number format (Indonesia) \*required
- `password` string, min:8 \*required

_Response:_ JSON

- `status: 200` login success

```json
{
  "message": "Sign in success."
}
```

- `status: 403` wrong phone number or password

```json
{
  "message": "Wrong phone number or password."
}
```

- `status: 403` account deleted

```json
{
  "message": "Your account has been deleted."
}
```

- `status: 400` validation error

```json
{
  "message": "string"
}
```

</p>
</details>

<details>
<summary><b>Get user data by access token</b></summary>

<p>

`GET` `/data-authenticate`

_Authorization:_ Bearer Token

- `token` access token \*required

_Response:_ JSON

- `status: 200` get data success

```json
{
  "id": "integer",
  "name": "string",
  "email": "string",
  "address": "string",
  "phone_number": "string",
  "image_url": "string",
  "joined_date": "string",
  "iat": "integer",
  "exp": "integer"
}
```

- `status: 401` unauthorized

```json
{
  "message": "Unauthorized."
}
```

- `status: 400` wrong authorization format

```json
{
  "auth": false,
  "message": "Wrong authorization format."
}
```

- `status: 401` token expired

```json
{
  "auth": false,
  "message": "Token expired."
}
```

- `status: 401` authorization failed

```json
{
  "auth": false,
  "message": "Invalid Token."
}
```

</p>
</details>

<details>
<summary><b>Update name</b></summary>

<p>

`PUT` `/user/name`

_Authorization:_ Bearer Token

- `token` access token \*required

_Parameters:_ body

- `name` string, max:50 \*required

_Response:_ JSON

- `status: 200` update name success

```json
{
  "message": "Update name success."
}
```

- `status: 400` validation error

```json
{
  "message": "string"
}
```

- `status: 401` unauthorized

```json
{
  "message": "Unauthorized."
}
```

- `status: 400` wrong authorization format

```json
{
  "auth": false,
  "message": "Wrong authorization format."
}
```

- `status: 401` token expired

```json
{
  "auth": false,
  "message": "Token expired."
}
```

- `status: 401` authorization failed

```json
{
  "auth": false,
  "message": "Invalid Token."
}
```

</p>
</details>

<details>
<summary><b>Update email</b></summary>

<p>

`PUT` `/user/email`

_Authorization:_ Bearer Token

- `token` access token \*required

_Parameters:_ body

- `email` string, valid email format \*required

_Response:_ JSON

- `status: 200` update email success

```json
{
  "message": "Update email success."
}
```

- `status: 400` email already exist

```json
{
  "message": "Email already exist! Use another email."
}
```

- `status: 400` validation error

```json
{
  "message": "string"
}
```

- `status: 401` unauthorized

```json
{
  "message": "Unauthorized."
}
```

- `status: 400` wrong authorization format

```json
{
  "auth": false,
  "message": "Wrong authorization format."
}
```

- `status: 401` token expired

```json
{
  "auth": false,
  "message": "Token expired."
}
```

- `status: 401` authorization failed

```json
{
  "auth": false,
  "message": "Invalid Token."
}
```

</p>
</details>

<details>
<summary><b>Update address</b></summary>

<p>

`PUT` `/user/address`

_Authorization:_ Bearer Token

- `token` access token \*required

_Parameters:_ body

- `address` string, max:255 \*required

_Response:_ JSON

- `status: 200` update address success

```json
{
  "message": "Update address success."
}
```

- `status: 400` validation error

```json
{
  "message": "string"
}
```

- `status: 401` unauthorized

```json
{
  "message": "Unauthorized."
}
```

- `status: 400` wrong authorization format

```json
{
  "auth": false,
  "message": "Wrong authorization format."
}
```

- `status: 401` token expired

```json
{
  "auth": false,
  "message": "Token expired."
}
```

- `status: 401` authorization failed

```json
{
  "auth": false,
  "message": "Invalid Token."
}
```

</p>
</details>

<details>
<summary><b>Update phone number</b></summary>

<p>

`PUT` `/user/phone`

_Authorization:_ Bearer Token

- `token` access token \*required

_Parameters:_ body

- `phone_number` string, valid phone number format (Indonesia) \*required

_Response:_ JSON

- `status: 200` update phone number success

```json
{
  "message": "Update phone number success."
}
```

- `status: 400` phone number already exist

```json
{
  "message": "Phone number already exist! Use another phone number."
}
```

- `status: 400` validation error

```json
{
  "message": "string"
}
```

- `status: 401` unauthorized

```json
{
  "message": "Unauthorized."
}
```

- `status: 400` wrong authorization format

```json
{
  "auth": false,
  "message": "Wrong authorization format."
}
```

- `status: 401` token expired

```json
{
  "auth": false,
  "message": "Token expired."
}
```

- `status: 401` authorization failed

```json
{
  "auth": false,
  "message": "Invalid Token."
}
```

</p>
</details>

<details>
<summary><b>Update user image</b></summary>

<p>

`PUT` `/user/image`

_Authorization:_ Bearer Token

- `token` access token \*required

_Parameters:_ body

- `image_name` string \*required

_Response:_ JSON

- `status: 200` update image success

```json
{
  "message": "Update image success."
}
```

- `status: 401` unauthorized

```json
{
  "message": "Unauthorized."
}
```

- `status: 400` wrong authorization format

```json
{
  "auth": false,
  "message": "Wrong authorization format."
}
```

- `status: 401` token expired

```json
{
  "auth": false,
  "message": "Token expired."
}
```

- `status: 401` authorization failed

```json
{
  "auth": false,
  "message": "Invalid Token."
}
```

</p>
</details>

<details>
<summary><b>Update password</b></summary>

<p>

`PUT` `/user/password`

_Authorization:_ Bearer Token

- `token` access token \*required

_Parameters:_ body

- `old_password` string, min:8 \*required
- `password` string, min:8 \*required
- `password_confirmation` string, min:8, match ref `password` \*required

_Response:_ JSON

- `status: 200` update password success

```json
{
  "message": "Update password success."
}
```

- `status: 403` wrong old password

```json
{
  "message": "Wrong old password."
}
```

- `status: 400` validation error

```json
{
  "message": "string"
}
```

- `status: 401` unauthorized

```json
{
  "message": "Unauthorized."
}
```

- `status: 400` wrong authorization format

```json
{
  "auth": false,
  "message": "Wrong authorization format."
}
```

- `status: 401` token expired

```json
{
  "auth": false,
  "message": "Token expired."
}
```

- `status: 401` authorization failed

```json
{
  "auth": false,
  "message": "Invalid Token."
}
```

</p>
</details>

<details>
<summary><b>Soft delete user</b></summary>

<p>

`PUT` `/user/delete`

_Authorization:_ Bearer Token

- `token` access token \*required

_Parameters:_ body

- `password` string, min:8 \*required

_Response:_ JSON

- `status: 200` soft delete user success

```json
{
  "message": "Soft delete success."
}
```

- `status: 403` wrong password

```json
{
  "message": "Wrong password."
}
```

- `status: 400` validation error

```json
{
  "message": "string"
}
```

- `status: 401` unauthorized

```json
{
  "message": "Unauthorized."
}
```

- `status: 400` wrong authorization format

```json
{
  "auth": false,
  "message": "Wrong authorization format."
}
```

- `status: 401` token expired

```json
{
  "auth": false,
  "message": "Token expired."
}
```

- `status: 401` authorization failed

```json
{
  "auth": false,
  "message": "Invalid Token."
}
```

</p>
</details>

### Upload

<details>
<summary><b>Upload product image</b></summary>

<p>

`POST` `/upload/product`

_Parameters:_ query, body (form-data type: file)

- `image_name` string \*required (query)
- `image` file, .jpg, .jpeg, .png \*required (body)

_Response:_ JSON

- `status: 200` upload success

```json
{
  "message": "Product image uploaded successfully."
}
```

</p>
</details>

<details>
<summary><b>Upload profile image</b></summary>

<p>

`POST` `/upload/profile`

_Parameters:_ query, body (form-data type: file)

- `image_name` string \*required (query)
- `image` file, .jpg, .jpeg, .png \*required (body)

_Response:_ JSON

- `status: 200` upload success

```json
{
  "message": "Profile image uploaded successfully."
}
```

</p>
</details>

To see the response you can do API testing using an application like [Postman](https://www.postman.com/).

I hope you guys like this project and ENJOY!!! :grin:
