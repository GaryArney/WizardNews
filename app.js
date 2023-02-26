const express = require("express");
const app = express();
const postBank = require("./postBank");
const morgan = require("morgan");

app.use(morgan('dev'));

app.use(express.static('public'));

app.get("/", (req, res) => {

  const posts = postBank.list();

  const html = `<!DOCTYPE html>
<html>
<head>
  <title>Wizard News</title>
  <link rel="stylesheet" href="/style.css" />
</head>
<body>
  <div class="news-list">
    <header><img src="/logo.png"/>Wizard News</header>
    ${posts.map(post => `
      <div class='news-item'>
        <p>
          <span class="news-position">${post.id}. ▲</span>
          <a href="/posts/${post.id}">/${post.title}</a>
          <small>(by ${post.name})</small>
        </p>
        <small class="news-info">
          ${post.upvotes} upvotes | ${post.date}
        </small>
      </div>`
  ).join('')}
  </div>
</body>
</html>`

  res.send(html);

});





app.get('/posts/:id', (req, res) => {
  const id = req.params.id;
  const post = postBank.find(id);

  post.id ?
    res.send(`<!DOCTYPE html>
<html>
<head>
  <title>Wizard News</title>
  <link rel="stylesheet" href="/style.css" />
</head>
<body>
  <div class="news-list">
    <header><img src="/logo.png"/>Wizard News</header>
      <div class='news-item'>
        <p>
          <span class="news-position">${post.id}. ▲</span>
          ${post.title}
          <h3>${post.content}</h3>
          <small>(by ${post.name})</small>
        </p>
        <small class="news-info">
          ${post.upvotes} upvotes | ${post.date}
        </small>
      </div>
   
  </div>
</body>
</html>`)
    :
    next()
});


app.use((err, req, res, next) => {  //couldn't get this to catch an error, added ternary to the post area of app.get for post/:id.
  console.log('ERROR HANDLER STARTED');
  console.error(err.stack)
  res.send(`<p>Something broke!<p>
    <p>Please enter another post id number in the URl, or go back in your browser.</p>`)
})


const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
