const express = require('express');
const { nanoid } = require("nanoid");
const { wakeDyno } = require('heroku-keep-awake');
const app = express();
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

require('dotenv').config();


// Keep Heroku Dyno alive
const DYNO_URL = process.env.BASE_URL;
const opts = {
    interval: 25,
    logging: false,
    stopTimes: { start: '18:50', end: '02:00' }
}

// Database Model
const Document = require("./models/Document");
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

// Routes
app.get("/", (req, res) => {
  const code = `Hey Dude 🙂
What's Up,
I am a pastebin.
Give Me something I will store that
And provide you your text's Share link
I also support code highlighting`;

  res.render("code-display", { code, language: 'plaintext' });
});

app.get("/new", (req, res) => {
  res.render("new");
});


app.post("/save", async (req, res) => {
  const value = req.body.value;
  const slug = nanoid(6).toLowerCase();
  try {
    const document = await Document.create({ value, slug });
    res.redirect(`/${document.slug}`);
  } catch (e) {
    res.render('new', { value });
  }
});

app.get('/:slug', async (req, res) => {
  const slug = req.params.slug;
  //const id = req.params.id;
  try {
    const document = await Document.findOne({ slug });
    
    //const id = document.id;
    
    res.render('code-display', { code: document.value, slug });
  } catch (e) {
    res.redirect('/');
  }
});

app.get('/:slug/duplicate', async (req, res) => {
  const slug = req.params.slug;
   try {
    const document = await Document.findOne({ slug });
    
    res.render('new', { value: document.value });
  } catch (e) {
    res.redirect(`/${slug}`);
  }
});

app.get('/:slug/raw', async (req, res) => {
  const slug = req.params.slug;
   try {
    const document = await Document.findOne({ slug });
    
    const code = `${document.value}`;
    
    res.render('raw', { code });
    
  } catch (e) {
    res.redirect(`/${slug}`);
  }
});



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  wakeDyno(DYNO_URL, opts);
});
