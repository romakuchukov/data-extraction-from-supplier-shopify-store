import * as fs from "fs";
import * as cheerio from "cheerio";

type Product = {
  src: string | undefined;
  title: string;
  price: string;
  tags: string[];
};

// couldn't get cheerio's fromURL function to work for some reason. could be a bun thing.
const html = await fetch(
  "https://www.mollyjogger.com/collections/inventory?page=1"
).then((response) => response.text());

const $ = cheerio.load(html);

const products: Product[] = [];

$(".box.product").each((_, product) => {
  products.push({
    tags: ["tag1", "tag2"],
    src: $(product).find("img").attr("src"),
    price: $(product).find(".money").text(),
    title: $(product).find(".product-title").text().replace(/\s+/g, " ").trim(),
  });
});

// write to a file
fs.writeFileSync("products.json", JSON.stringify(products, null, 2));
