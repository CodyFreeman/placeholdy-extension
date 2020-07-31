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

const tabIds: number[] = [];
// Listens for single messages sent (for now just ID call)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.type) {
    case "ID":
      const tabId = sender.tab?.id;
      if (!tabId) {
        console.error("tab id not received");
        return;
      }
      tabIds.push(tabId);

      console.log(`TAB ID: ${tabId}`);

      const x = chrome.debugger.attach({ tabId }, "1.3", () => {
        chrome.debugger.sendCommand(
          { tabId },
          "Network.setRequestInterception",
          { enabled: true, patterns: [{ urlPattern: "*.js" }] }
        );
        chrome.debugger.onEvent.addListener((source, method, params: any) => {
          console.log("INTERCEPTION: ", JSON.stringify(params.request));
          params.request.continue();
        });
        console.log("x: ", x);
      });

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
