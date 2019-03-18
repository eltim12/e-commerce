# e-commerce

------

## API Documentation:

#### List of Basic routes:

| Route                                              | HTTP   | Query                      |      | Body                                                         | Description            | Output                                |
| -------------------------------------------------- | ------ | -------------------------- | ---- | ------------------------------------------------------------ | ---------------------- | ------------------------------------- |
| <span style="color:#FF69B4">/users</span>          | GET    |                            |      |                                                              | Get all the users info | "successfully get all users data."    |
| <span style="color:#FF69B4">/users/find</span>     | GET    | userId: String(required)   |      |                                                              | Find a user with id    | "successfully get user."              |
| <span style="color:#FF69B4">/users/register</span> | POST   |                            |      | username:String(required)<br />email:String(required)<br />passsword:String(required) | Register a user        | "user successfully registered"        |
| <span style="color:#FF69B4">/products</span>       | GET    |                            |      |                                                              | Get all the products   | "successfully get all products data." |
| <span style="color:#FF69B4">/products</span>       | POST   |                            |      | name:String(required)<br />price:Number(requied)             | Create new product     | "successfully created new product"    |
| <span style="color:#FF69B4">/products</span>       | PUT    | productId:String(required) |      | name:String<br />price:Number                                | Update a product       | "update product success."             |
| <span style="color:#FF69B4">/products</span>       | DELETE | productId:String(required) |      |                                                              | Delete a new product   | "delete product success"              |
| <span style="color:#FF69B4">/carts</span>          | POST   |                            |      | productId:String(required)<br />userId:String(required)      | Create a new cart      | "create new cart success"             |
| <span style="color:#FF69B4">/carts</span>          | DELETE | cartId:String(required)    |      |                                                              | Delete a cart          | "delete cart success"                 |
|                                                    |        |                            |      |                                                              |                        |                                       |

## Usage

Make sure you have Node.js and npm installed in your computer, and then run these commands:

```
$npm install
$nodemon app.js
$live-server --host=localhost
```

Access the Server side via http://localhost:3000/.

Access the Client side via http://localhost:8080/.