import { MessageInterface } from "./interfaces/MessageInterface";
import { LoremIpsumGenerator } from "./generators/lorem-ipsum/LoremIpsumGenerator";
import { LoremIpsum } from "lorem-ipsum";

function requestController(port: any, message: MessageInterface, sender: any) {
  //LOGGER EXAMPLE
  console.log("SENDER: ", sender);

  if (!message || !message.type) {
    console.log("can has error in request: ", message);
    throw new Error("shit blew up!");
  }

  switch (message.type) {
    case "TEXT_REQUEST":
      const words = new LoremIpsumGenerator(new LoremIpsum()).generate(670);
      console.debug(words);
      const requestMessage: MessageInterface = {
        origin: "bg",
        type: "TEXT_RESPONSE",
        payload: {
          text: words,
        },
      };
      port.postMessage(requestMessage);
      break;
  }
}

/* BOOTSTRAPPING */

// Listens for single messages sent (for now just ID call)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.type) {
    case "ID":
      console.log(`TAB ID: ${sender.tab?.id}`);
      sendResponse({
        origin: "bg",
        type: "ID_RESPONSE",
        payload: { id: sender.tab?.id },
      });
      break;
  }
});

// Listens on port and sends messages to controller
chrome.runtime.onConnect.addListener((port) => {
  port.onMessage.addListener((request, sender) => {
    requestController(port, request, sender);
  });
});
