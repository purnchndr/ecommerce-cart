const executeQuery = require("./mysqlConnection");

let rules = {
  A: { quantity: 3, discount: 5 },
  B: { quantity: 2, discount: 2.5 },
  extra: { price: 150, discount: 20 },
};

// We can fetch letest discount rules form DB
// let rules = executeQuery('select discount_rule from rules');

const discountRule = (cart, total) => {
  const discount = {};
  cart.forEach((item) => {
    if (item.id === "A" && item.quantity >= rules[item.id].quantity) {
      discount[item.id] = rules[item.id].discount * item.quantity;
    } else if (item.id === "B" && item.quantity >= rules[item.id].quantity) {
      discount[item.id] = rules[item.id].discount * item.quantity;
    }
  });
  if (total >= rules.extra.price) {
    discount.extra = rules.extra.discount;
  }
  return discount;
};

const calculatePrices = (cart) => {
  const cartTotal = cart.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );
  const discounts = discountRule(cart, cartTotal);
  const products = cart.map((curr) => {
    const item = { ...curr };
    item.discount = discounts[curr.id] ? discounts[curr.id] : 0;
    return item;
  });

  let totalDiscount = products.reduce((acc, curr) => acc + curr.discount, 0);
  let finalPrice = cartTotal - totalDiscount;
  if (finalPrice >= 150 && discounts.extra) {
    totalDiscount += discounts.extra ? discounts.extra : 0;
    finalPrice -= discounts.extra;
  }

  return {
    cartTotal,
    finalPrice,
    totalDiscount,
    products,
  };
};

module.exports = { discountRule, calculatePrices };
