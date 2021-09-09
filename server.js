const express = require('express');
const app = express();
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))


require('dotenv').config();

const Document = require("./models/Document");
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}) 

app.get("/", (req, res) =>{
  const code = `Hey Dude 🙂
What's Up,
I am a pastebin.
Give Me something I will store that
And provide you your text's Share link`;
  res.render("code-display", { code, language: 'plaintext' })
});

app.get("/new", (req, res) => {
  res.render("new")
});

app.post("/save", async (req, res) => {
  const value = req.body.value;
  try {
    const document = await Document.create({ value });
    res.redirect(`/${document.id}`)
  } catch (e) {
    res.render('new', { value })
  }
})

app.get('/:id/duplicate', async (req, res) => {
  const id = req.params.id;
   try {
    const document = await Document.findById(id);
    
    res.render('new', { value: document.value })
  } catch (e) {
    res.redirect(`/${id}`)
  }
})

app.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const document = await Document.findById(id);
    
    res.render('code-display', { code: document.value, id })
  } catch (e) {
    res.redirect('/')
  }
})

const PORT = process.env.PORT || 3000;

app.listen(PORT);
