function validateItem(req, res, next) {
  const { item } = req.body;
  if (
    !item ||
    !item.id ||
    !item.quantity ||
    item.id.length > 1 ||
    item.id.charCodeAt(0) < 65 ||
    item.id.charCodeAt(0) > 68
  )
    return res.status(400).send({ message: "Invalid Request" });
  next();
}

module.exports = { validateItem };
