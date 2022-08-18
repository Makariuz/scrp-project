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
let content = [];

try {
    axios(website).then((res) => {
      const data = res.data;
      const $ = cheerio.load(data);

      
        
      $(process.env.class, data).each(function () {
        const title = $(this).text();
        const price = $('.ct-price-formatted').html()
  
        content.push({
          title,
          price
        });
  
        app.get('/', (req, res) => {
          res.json(content);

        });
      });
    });
  } catch (error) {
    console.log(error, error.message);
  }
   /* try {
    axios(website).then((res) => {
      const data = res.data;
      const $ = cheerio.load(data);

        
      $('.ct-price-formatted', data).each(function () {
        const price = $(this).text();

        const url = $(this).find('a').attr('href');
  
        content.push({
          price,
          
        });
  
        app.get('/', (req, res) => {
          res.json(content);

        });
      });
    });
  } catch (error) {
    console.log(error, error.message);
  }  */

app.listen(PORT, () => {
  console.log(`server is running on PORT:${PORT}`);
});