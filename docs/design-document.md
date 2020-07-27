# Design Document

This is the design document for the MVP for the Placeholdy Extension. It aims to detail the first phase of the extension's development.

## Project Description

The Placeholdy extension will intercept requests to [placeholdy.com](https://placeholdy.com) and generate a response locally for placeholder text, images and APIs. This will provide access to placeholding while maintaining valid code and the request/response cycle even if resources are generated locally.

The extension will expose functionality through a REST-like API with dynamic parts extracted by the extension. An example would be `/images/black/400x400` providing a black image dynamically generated in 400x400 resolution.

By intercepting requests to [placeholdy.com](https://placeholdy.com) and generating a response locally, developers can work offline and with placeholder data by installing an extension in their browser.

## Concerns

I must ensure WebRequest will allow me to intercept requests both from localhost, domains and inside other frames. This must be possible in Chrome and Firefox for this project to be useful. A prototype using Service Workers had too many limitations to be useful for this project.

## MVP Goals

The extension intercepts requests to [placeholdy.com](https://placeholdy.com) and generates a response locally, allowing developers to work offline and with placeholder data by installing an extension in their browser.

The extension must allow a user to use normally formatted urls in their project pointing towards placeholdy.com.

The extension must allow a user to placehold images and text.

The extension should work in at least Chrome, Firefox and Edge.

The extension should have at least one mock JSON API the user can call.

## Features

### Text Generation

Generates text and serves it in a response.

#### Lorem Ipsum

Provide lorem ipsum at `/text/lorem/<number>` returning a number of words.

### Images

Generates image and serves it in a response.

#### Black Images

Provide image generation at `/image/black/<number>x<number>.<png|jpe?g>` returning a black image in the width, height and format requested.

### Mock API

Provide static useful mock/demo APIs for prototyping and playing around.

Candidates:

- TODO items
- User Data
- Pop culture APIs (if license permits)

## Milestones

Milestones are expected to be completed chronologically, but this is not enforced.

- Prove WebRequest interception can be used to capture any browser request to placeh oldy.com using at least `GET` and `POST`.
- Functional extension in Chrome allowing text generation
- Functional extension in Chrome allowing image generation
- Functional extension in Chrome with Mock API
- Functional extension in Firefox and Chrome
- Extension has icons and complete manifest files
- Extension can build to Chrome, Firefox, Edge

## Methodology

This is a solo project utilizing private tools for an agile workflow. None of the extended planning, progress or tasks are available publicly.
