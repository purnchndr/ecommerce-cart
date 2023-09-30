const express = require("express");
const app = express();

app.use(express.json());

const cart = [
  {
    id: "A",
    name: "Apple",
    price: 30,
    quantity: 90,
  },

  {
    id: "B",
    name: "Orange",
    price: 20,
    quantity: 10,
  },
  {
    id: "C",
    name: "Grapes",
    price: 50,
    quantity: 40,
  },
  {
    id: "D",
    name: "Mango",
    price: 15,
    quantity: 70,
  },
];

app.get("/cart", (req, res, next) => {
  const cartPrices = cart.reduce(
    (acc, curr, i) => {
      acc.price += curr.price;
      return acc;
    },
    { price: 0 }
  );
  console.log(cartPrices);
  res.send({ cartTotal: cartPrices.price, ...cart });
});

app.post("/cart/add", (req, res, next) => {
  const { item } = req.body;

  if (!item || !item.id || !item.name || !item.price || !item.quantity)
    return res.status(400).send({ message: "Invalid Request" });

  const product = cart.find((curr) => curr.id === item.id);

  if (product) {
    product.quantity = product.quantity + item.quantity;
    res.status(200).send({
      message: "Product Already present in cart merging, Quantity",
      product,
    });
  } else {
    cart.push(item);
    res.status(200).send({ message: "Added to cart", item });
  }
});

app.listen(3000, () => console.log("App is runnign on port 3000"));
