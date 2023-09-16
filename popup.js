

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("searchButton")
    .addEventListener("click", function () {
      const title = document.getElementById("jobTitle").value;

      chrome.tabs.update({
        url: `https://www.linkedin.com/jobs/search/?keywords=${title}&origin=JOBS_HOME_KEYWORD_SUGGESTION`,
      });

      setTimeout(() => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          const tabId = tabs[0].id;

          chrome.scripting.executeScript({
            target: { tabId, allFrames: true },
            files: ["injector.js"],
          });
        });
      }, 9000);
    });
});
