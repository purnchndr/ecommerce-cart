const discountRule = (cart, total) => {
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
