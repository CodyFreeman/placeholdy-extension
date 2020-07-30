function init() {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ type: "ID" }, (response) => {
      resolve(response.payload.id);
    });
  });
}

function responseController(port: any, response: any) {
  if (!response || !response.type || !response.payload) {
    console.log("can has error in response: ", response);
    throw new Error("shit blew up!");
  }

  switch (response.type) {
    case "TEXT_RESPONSE":
      console.log("TEXT_RESPONSE: ", JSON.stringify(response));
      break;
  }
}
/* BOOTSTRAPPING */
init()
  .then((id) => {
    const tabId = id;
    console.log(`TAB ID: ${tabId}...`);

    // Creating port to background script
    const port = chrome.runtime.connect();

    // Creating listener on port
    port.onMessage.addListener((response) => {
      responseController(port, response);
    });

    port.postMessage({
      origin: tabId,
      type: "ID",
      payload: Math.ceil(Math.random() * 42),
    });
    port.postMessage({ origin: tabId, type: "TEXT_REQUEST" }); // TODO: remove
  })
  .catch((e) => {
    console.log("--- ERROR CAUGHT ---");
    console.log(e.message);
    console.log("---");
  });
