import * as fs from "fs";

const newHTML = fs
  .readFileSync("./site/index.template.html", { encoding: "utf8" })
  .replace("_ANSWER_", "NOPE.");

fs.writeFileSync("./site/index.html", newHTML, { encoding: "utf8" });
