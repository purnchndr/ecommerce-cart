const rules = {
  A: { quantity: 3, discount: 5 },
  B: { quantity: 2, discount: 2.5 },
  extra: { price: 150, discount: 20 },
};

const discountRule = (cart, total) => {
  const discount = {};
  cart.forEach((item) => {
    if (item.id === "A" && item.quantity >= rules[item.id].quantity) {
      discount[item.id] = rules[item.id].discount * item.quantity;
    } else if (item.id === "B" && item.quantity >= rules[item.id].quantity) {
      discount[item.id] = rules[item.id].discount * item.quantity;
    } else if (total >= rules.extra.price) {
      discount.extra = rules.extra.discount;
    }
  });
  return discount;
};

const discountRule1 = (cart, total) => {
  const discount = {};
  cart.forEach((item) => {
    if (item.id === "A" && item.quantity >= 3) {
      discount[item.id] = 5 * item.quantity;
    } else if (item.id === "B" && item.quantity >= 2) {
      discount[item.id] = 2.5 * item.quantity;
    } else if (total >= 150) {
      discount.extra = 20;
    }
  });
  return discount;
};

module.exports = discountRule;
