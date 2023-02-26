const express = require("express");
const app = express();
const postBank = require("./postBank");
const morgan = require("morgan");

app.use(morgan('dev'));

app.use(express.static('public'));

app.get("/", (req, res) => {
  
const posts = postBank.list();
console.log(postBank.list,'consolelog');
// const html = `<!DOCTYPE html>
// <html>
// <head>
//   <title>Wizard News</title>
//   </head>
//   <body>
//     <ul>
//     ${posts.map(post => `<li> ${post.title}</li>`)}
//     </ul>
//     </body>
//     </html>`

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
//   res.send(`<!DOCTYPE html>
//   <html>
//   <head>
//    <title>Post #${post.id}, ${post.title}</title>
//    <link rel="stylesheet" href="/style.css" />
//    </head>
//    <body>
//    <
//    <header><img src="/logo.png"/>Wizard News</header>
//   <p>${post.title}</p>
//   <p>${post.name}</p>
//   <p>${post.content}</p>
//   <p>${post.date}</p>
//   <p>${post.upvotes}</p>`);



// });
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
</html>`)});

const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
//Don't forget to use join to get rid of the commas. Moving on for now.