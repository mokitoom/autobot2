const functions = require("firebase-functions");
const request = require("request-promise");

const LINE_MESSAGING_API = "https://api.line.me/v2/bot/message/reply";
const LINE_HEADER = {
  "Content-Type": "application/json",
  Authorization: `Bearer <pDY5cSpSVUQRUameQ2tqncOfWwQkKfcW9jOeHlPUnF3ZaeOIDxJPOFVtt3TRKYAcvme7AOvdnyxDP8lyfen0gJ4TgWua6QnDL+fHePAhObqHnKQ/KS21HTWEU2Rs8CLOmRr1u52ChdPuGmjZC5m/ygdB04t89/1O/w1cDnyilFU=
>`
};

exports.LineBotReply = functions.https.onRequest((req, res) => {
  if (req.method === "POST"){
    reply(req.body);
  } else {
    return res.status(200).send(`Done`);
  }
});

const reply = bodyResponse => {
  return request({
    method: `POST`,
    uri: LINE_MESSAGING_API,
    headers: LINE_HEADER,
    body: JSON.stringify({
      replyToken: bodyResponse.events[0].replyToken,
      messages: [{
        type: `text`,
        text: JSON.stringify(bodyResponse)
      }]
    })
  });
};
