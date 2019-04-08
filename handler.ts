import { APIGatewayProxyHandler } from "aws-lambda";

export const meatballs: APIGatewayProxyHandler = async () => {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/html"
    },
    body: `
    <html>
      <head>
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
          <h1>Nope.</h1>
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
      </body>
    </html>
    `
  };
};
