const Document = require("../models/Document");

const rawRoute = async (req, res) => {
  const slug = req.params.slug;
   try {
    const document = await Document.findOne({ slug });
    
    const code = `${document.value}`;
    
    res.render('raw', { code });
    
  } catch (e) {
    res.redirect(`/${slug}`);
  }
};

module.exports = rawRoute;