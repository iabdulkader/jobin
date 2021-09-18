const Document = require("../models/Document");


const getBySlugRoute = async (req, res) => {
  const slug = req.params.slug;
  //const id = req.params.id;
  try {
    const document = await Document.findOne({ slug });
    
    //const id = document.id;
    
    res.render("code-display", { code: document.value, slug });
  } catch (e) {
    res.redirect('/');
  }
};

module.exports = getBySlugRoute;