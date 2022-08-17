const express = require('express');
const app = express();
const axios = require('axios')
const cheerio = require('cheerio');
const dotenv = require('dotenv')

dotenv.config()


var cors = require('cors')
app.use(cors())


const PORT = process.env.port || 5001;

const website = process.env.website;


try {
    axios(website).then((res) => {
      const data = res.data;
      const $ = cheerio.load(data);

      let content = [];
  
      $(process.env.class, data).each(function () {
        const title = $(this).text();
        const url = $(this).find('a').attr('href');
  
        content.push({
          title,
          url,
        });
  
        app.get('/', (req, res) => {
          res.json(content);
          console.log(content)
        });
      });
    });
  } catch (error) {
    console.log(error, error.message);
  }

app.listen(PORT, () => {
  console.log(`server is running on PORT:${PORT}`);
});