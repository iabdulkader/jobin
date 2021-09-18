const { nanoid } = require("nanoid");
const Document = require("../models/Document");


const saveRoute = async (req, res) => {
  const value = req.body.value;
  const slug = nanoid(6).toLowerCase();
  try {
    const document = await Document.create({ value, slug });
    res.redirect(`/${document.slug}`);
  } catch (e) {
    res.render('new', { value });
  }
};

module.exports = saveRoute;