const homeRoute = (req, res) => {
  const code = `Hey Dude 🙂
What's Up,
I am a pastebin.
Give Me something I will store that
And provide you your text's Share link
I also support code highlighting`;

  res.render("code-display", { code, language: 'plaintext' });
};



module.exports = homeRoute;