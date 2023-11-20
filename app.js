//import some libraries and initialize the server
const express = require('express');
const axios = require('axios');
const fs = require('fs');
const app = express();
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    });
// Serve static files from the 'public' directory
app.use(express.static('public'));
//Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
// Set the view engine to EJS
app.set('view engine', 'ejs');
const api = 'bec8489fa16549bbace447ad0cf25971'; 

//use ejs to render pages
app.get('/', (req, res) => {
    res.render('index');
});
app.get('/index', (req, res) => {
    res.render('index');
});

app.get('/show', (req, res) => {
    res.render('show');
});
app.get('/get-started', (req, res) => {
    res.render('get-started');
});

//Using API to get data
app.post('/getnews', (req, res) => {
    //get keywords
    const keyword=req.body.keyword;
    //get the current time to limit search results
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth() + 1;
    var day = currentDate.getDate();
    const url = `https://newsapi.org/v2/everything?q=${keyword}&from=${year}-${month}-${day}&to=${year}-${month}-${day}&sortBy=popularity&apiKey=bec8489fa16549bbace447ad0cf25971`;
    //Organize the data and transform it into a suitable structure
    axios.get(url)
    .then(response => {
        const data = response.data;
        const newsdata = {
            status: data.status,
            totalResults: data.totalResults,
            articles: data.articles.map(article => ({
                source: {
                    id: article.source.id,
                    name: article.source.name
                },
                author: article.author,
                title: article.title,
                description: article.description,
                url: article.url,
                urlToImage: article.urlToImage,
                publishedAt: article.publishedAt,
                content: article.content
            }))
        };
        res.json(newsdata);
        //Store it in a file
        fs.writeFileSync("./public/resultdata.json", JSON.stringify(newsdata, null, 4));
    })
    .catch(error => {
        console.error(error);
    });
});
