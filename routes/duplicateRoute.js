const Document = require("../models/Document");

const duplicateRoute = async (req, res) => {
  const slug = req.params.slug;
   try {
    const document = await Document.findOne({ slug });
    
    res.render('new', { value: document.value });
  } catch (e) {
    res.redirect(`/${slug}`);
  }
};

module.exports = duplicateRoute;