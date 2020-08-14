# DISCONTINUED Placeholdy Browser Extension

This extension plans to intercept requests to [placeholdy.com](https://placeholdy.com) and generates a response locally.

**NB! DISCONTINUED:** This project is discontinued due to difficulty in finding a cross browser way to intercept requests and serve a locally generated response while maintaining the request/response cycle. I believe the best bet would be hijacking `XMLHttpRequest` and everything related. However the project fails the effort/reward ratio I'm comfortable with for freeware. If interested, this show the issue fairly well: [chrome bug issue](https://bugs.chromium.org/p/chromium/issues/detail?id=104058).

To get an overview of the project concept, please see [the design document for the MVP](./docs/design-document.md)

## Features

This list of features are either considered or planned: None of them are done.

### Text Generation

Generates text and serves it in a response.

#### Lorem Ipsum (planned)

Provide lorem ipsum at `/text/lorem/<number>` returning a number of words.

### Images

Generates image and serves it in a response.

#### Black Images (planned)

Provide image generation at `/image/black/<number>x<number>.<png|jpe?g>` returning a black image in the width, height and format requested.

### Mock API

Provide static useful mock/demo APIs for prototyping and playing around.

Candidates:

- TODO items
- User Data
- Pop culture APIs (if license permits)

### Cache

Cache responses from URLs provided by user to allow later offline development. Likely done through options page and saved to IndexedDB.

### User Defined Responses

A way for users to define their own endpoints with custom responses.

This is an unlikely stretch goal if there is no monetization strategy for the product: It would be fantastic to allow API mocking using OpenAPI 3. An easier alternative would be to allow the user to set urls and declare the response they would want back (body, status, content type).
