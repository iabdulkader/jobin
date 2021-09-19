const { nanoid } = require("nanoid");
const Document = require("../models/Document");
require('dotenv').config();


const createBin = async (req, res) => {
  const value = req.body.value;
  const slug = nanoid(6).toLowerCase();
  console.log(value, slug)
  try {
    const document = await Document.create({ value, slug });
    res.json({
      status: true,
      binUrl: `${process.env.BASE_URL}/${document.slug}`,
      rawUrl: `${process.env.BASE_URL}/${document.slug}/raw`,
    });
  } catch (e) {
    res.json({
      status: false,
      binUrl: "error",
      rawUrl: "error"
    });
  }
};

module.exports = createBin;