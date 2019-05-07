'use strict';

module.exports.meatballs = async () => ({
    statusCode: 200,
    headers: {
      "Content-Type": "text/html"
    },
    body: `
    <html>
      <head>
        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-138002525-1"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'UA-138002525-1');
        </script>
        <meta http-equiv="Content-Type" content="text/html; charset=windows-1252" />
        <title>Is today Meatballs day?</title>
        <meta name="theme-color" content="#ffffff" />
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, sans-serif, Roboto,
              Ubuntu, "Segoe UI";
            text-align: center;
            font-size: 100px;
            color: #222222;
          }
        </style>
      </head>
      <body data-gr-c-s-loaded="true">
        <div align="center" id="answer" style="font-size: 100px;">
          <br />
          <h1 id="answer-title"></h1>
        </div>
        <script>
          var queryFields = window.location.search
            .substring(1)
            .split("&")[0]
            .split("=");
          if (queryFields[0] == "promocode" && queryFields[1] == "atp") {
            var theAnswer = document.getElementById("answer");
            theAnswer.style.fontSize = "90%"; // 10% off is a good deal!
          }
        </script>
        <script>
        (async () => {
          let complete = false;
          while (!complete) {
            try {
              const { msg } = await (await fetch(
                "https://api.istodaymeatballsday.com/"
              )).json();
              console.log(msg);
              document.getElementById("answer-title").innerHTML = msg;
              complete = true;
            } catch (err) {
              console.log("failed");
            }
          }
        })();
    </script>
      </body>
    </html>
    `
  });
