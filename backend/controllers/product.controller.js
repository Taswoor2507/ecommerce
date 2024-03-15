//@controller --> get all products
// @access ---> all
const getAllProducts = (req, res) => {
  res.status(200).json({
    message: "all is oky",
  });
};

export { getAllProducts };
