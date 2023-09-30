const express = require("express");
const app = express();

const productList = require("./src/products");
const { discountRule, calculatePrices } = require("./src/discountRule");
const cart = require("./src/cart");
const executeQuery = require("./src/mysqlConnection");
const { validateItem } = require("./src/validation");

app.use(express.json());

/*******IMPORTANT NOTE&***********
 * I am usng local local variables to store data, due to not having an active MySQL server
 * I have write the sql connection class as well as query which can be run in place of local variables
 */

// GET route for get all items in  cart with calculated price
app.get("/cart", async (req, res, next) => {
  // const cart = await executeQuery('select * from cart');
  const result = calculatePrices(cart);
  res.send(result);
});

//POST Route to add Item in to CART
app.post("/cart", validateItem, async (req, res, next) => {
  const { item } = req.body;
  //   const cart = await executeQuery("select * from cart");
  //   const prequantity = await executeQuery(`SELECT *  FROM cart WHERE id = ${item.id}`);
  const product = cart.find((curr) => curr.id === item.id);
  if (product) {
    //await executeQuery( `UPDATE products SET quantity = ${product.quantity + item.quantity} WHERE id = ${item.id}`);
    product.quantity = product.quantity + item.quantity;
    product.totalPrice = product.price * product.quantity;
    return res.status(200).send({
      message: "Product Already present in cart, merging Quantity",
      product,
    });
  } else {
    const product = productList[item.id.charCodeAt(0) - 65];
    const newItem = {
      ...product,
      quantity: item.quantity,
      totalPrice: product.price,
    };
    // await executeQuery(`INSERT INTO cart (id,name, price, quantity) VALUES ( ${newItem.id},'${newItem.name}', ${newItem.price}, ${newItem.quantity})`);
    cart.push(newItem);
    res.status(200).send({ message: "Added to cart", newItem });
  }
});

//DELETE Route to delete all Items in the cart
app.delete("/cart", async (req, res, next) => {
  cart.length = 0;
  res.status(200).send({ message: "All item deleted from cart" });
});

app.listen(3000, () => console.log("App is runnign on port 3000"));
