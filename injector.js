var myHeaders = new Headers();
myHeaders.append(
  "apikey",
  "<KEY>"
);
myHeaders.append(
  "Authorization",
  "Bearer <KEY>"
);

myHeaders.append("Content-Type", "application/json");
myHeaders.append("Prefer", "return=minimal");

function getElementByXpath(path) {
  return document.evaluate(
    path,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;
}

let title = getElementByXpath(
  `//h2[contains(@class,'job-title')]`
).textContent.trim();

let company_name = getElementByXpath(
  `//div[contains(@class,'primary-description')]//a[contains(@class,'app-aware-link')]`
).textContent.trim();

const allParagraphs = document.evaluate(
  `//div[@id='job-details']//p`,
  document,
  null,
  XPathResult.ANY_TYPE,
  null
);

let currentParagraph = allParagraphs.iterateNext();

let description = "";

while (currentParagraph) {
  description = description + currentParagraph.textContent + "\n";
  currentParagraph = allParagraphs.iterateNext();
}

let applyButton = getElementByXpath(
  `//div[contains(@class,'display-flex')]//button[contains(@class,'jobs-apply-button')]`
);

applyButton.click();

var raw = JSON.stringify({
  title,
  description,
  company_name,
});

var requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

var requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow",
};

fetch("https://jfluywctqwrpvoygmqtg.supabase.co/rest/v1/jobs", requestOptions)
  .then((response) => response.text())
  .then((result) => alert(result))
  .catch((error) => alert("error", error));
