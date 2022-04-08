const axios 	= require("axios");
const cheerio 	= require("cheerio");
const fs 		= require("fs");

const url 		= "https://www.rxlist.com/drug-slideshows-all/article.htm";

async function scrapeData() {
	
  try {
	  
    const { data } 		= await axios.get(url);
    const $ 			= cheerio.load(data);
    const listItems 	= $("a");
    const pageLinks 	= [];

    listItems.each((idx, el) => {

      const pageLink = { uri: "" };

      pageLink.uri = $(el).attributes("href");

      pageLinks.push(pageLink);
    });

    console.dir(pageLinks);

    fs.writeFile("pageLinks.json", JSON.stringify(pageLinks, null, 2), (err) => {
		
      if (err) {
        console.error(err);
        return;
      }
	  
      console.log("Successfully written data to file");
    });
  } catch (err) {
	  
    console.error(err);
  }
}

scrapeData();