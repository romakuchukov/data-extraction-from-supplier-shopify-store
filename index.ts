import * as cheerio from "cheerio";
import * as fs from "fs";

type Product = {
  src: string | undefined;
  title: string;
  price: string;
  tags: string[];
};

const buffer = await fetch(
  "https://www.mollyjogger.com/collections/inventory?page=1"
).then((response) => response.text());

const $ = cheerio.load(buffer);

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
