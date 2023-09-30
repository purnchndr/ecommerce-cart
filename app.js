const express = require("express");
const app = express();

const productList = require("./src/products");
const discountRule = require("./src/discountRule");
const cart = require("./src/cart");

app.use(express.json());

app.get("/cart", (req, res, next) => {
  const cartTotal = cart.reduce((acc, curr) => acc + curr.price, 0);
  const discounts = discountRule(cart, cartTotal);
  console.log(cart);
  console.log(discounts);

  const products = cart.map((curr) => {
    const item = { ...curr };
    item.discount = discounts[curr.id] ? discounts[curr.id] : 0;
    return item;
  });

  const totalDiscount = products.reduce((acc, curr) => acc + curr.discount, 0);

  res.send({ cartTotal, totalDiscount, ...products });
});

app.post("/cart/add", (req, res, next) => {
  const { item } = req.body;

  if (
    !item ||
    !item.id ||
    !item.quantity ||
    item.id.charCodeAt(0) < 65 ||
    item.id.charCodeAt(0) > 68
  )
    return res.status(400).send({ message: "Invalid Request" });

  const product = cart.find((curr) => curr.id === item.id);

  if (product) {
    product.quantity = product.quantity + item.quantity;
    return res.status(200).send({
      message: "Product Already present in cart, merging Quantity",
      product,
    });
  } else {
    const newItem = {
      quantity: item.quantity,
      ...productList[item.id.charCodeAt(0) - 65],
    };
    cart.push(newItem);
    console.log(cart);
    res.status(200).send({ message: "Added to cart", newItem });
  }
});

app.listen(3000, () => console.log("App is runnign on port 3000"));
