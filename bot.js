const venom = require("venom-bot");
const searchMedicine = require("./scrappers/netmeds");



venom
  .create({
    session: "session-name", //name of session
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
  client.onMessage((message) => {
    if (message.body === "Hi" && message.isGroupMsg === false) {
      client
        .sendText(message.from, "Welcome to Medicare")
        .then((result) => {
          console.log("Result: ", result); //return object success
        })
        .catch((erro) => {
          console.error("Error when sending: ", erro); //return object error
        });
    } else {
      searchMedicine(message.body)
        .then((result) => {
          console.log(result);
          const responseMessage = `This is the medicine name ${result.productName}, at price ₹${result.productPrice}, at link ${result.productLink},on ${result.siteName} brand`;
          client.sendText(message.from, responseMessage)
            .then((result) => {
              console.log("Result: ", result); //return object success
            })
            .catch((erro) => {
              console.error("Error when sending: ", erro); //return object error
            });
        })
        .catch((error) => console.error(error));
    }
  });
}
