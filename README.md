# e-commerce

------

## API Documentation:

#### List of Basic routes:

| Route                                                    | HTTP   | Query                      | Body                                                         | Description                       | Output                                |
| -------------------------------------------------------- | ------ | -------------------------- | ------------------------------------------------------------ | --------------------------------- | ------------------------------------- |
| <span style="color:#FF69B4">/users</span>                | GET    |                            |                                                              | Get all the users info            | "successfully get all users data."    |
| <span style="color:#FF69B4">/users/find</span>           | GET    | userId: String(required)   |                                                              | Find a user with id               | "successfully get user."              |
| <span style="color:#FF69B4">/users/login</span>          | POST   |                            | username:String(required)<br />passsword:String(required)    | Log a user on app                 | "user logged in successfully"         |
| <span style="color:#FF69B4">/users/register</span>       | POST   |                            | username:String(required)<br />email:String(required)<br />passsword:String(required) | Register a user                   | "user successfully registered"        |
| <span style="color:#FF69B4">/users/addToCart</span>      | POST   | userId: String(required)   | productId:String(required)                                   | Add a Product to user's cart      | "product successfully added"          |
| <span style="color:#FF69B4">/users/deleteFromCart</span> | PUT    | userId: String(required)   | productId:String(required)                                   | Delete a Product from user's cart | "product deleted successfully"        |
| <span style="color:#FF69B4">/users/checkout</span>       | DELETE | userId: String(required)   |                                                              | Empty user's cart                 | "successfully emptied user's cart"    |
| <span style="color:#FF69B4">/products</span>             | GET    |                            |                                                              | Get all the products              | "successfully get all products data." |
| <span style="color:#FF69B4">/products</span>             | POST   |                            | name:String(required)<br />price:Number(requied)<br />stock:Number(required)<br />photo:File(required) | Create new product                | "successfully created new product"    |
| <span style="color:#FF69B4">/products</span>             | PUT    | productId:String(required) | name:String<br />price:Number<br />stock:Number<br />photo:File | Update a product                  | "update product success."             |
| <span style="color:#FF69B4">/products</span>             | DELETE | productId:String(required) |                                                              | Delete a new product              | "delete product success"              |
| <span style="color:#FF69B4">/products/find</span>        | GET    | productId:String(required) |                                                              | Find a product by id              | "product found"                       |
|                                                          |        |                            |                                                              |                                   |                                       |

## Usage

Make sure you have Node.js and npm installed in your computer, and then run this commands in both client and server folders:

```
$npm install
```

Run this command in server folder:

```
$nodemon app
```

Run this command in client folder: 

```
$npm run serve
```

 Access the Server side via http://localhost:3000/.

Access the Client side via http://localhost:8080/.