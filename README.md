# html-bricks-plugin-inline-css

Inline CSS for [html-bricks](https://github.com/html-bricks/html-bricks).

Essentially parses each HTML file's `<link rel="stylesheet" type="text/css">` tags and includes their content in a `<style>` tag instead. Order is preserved.

The goal of this is to prevent FOUC, but the tradeoff of course is longer initial page load.

## Requirements

`html-bricks` >= 0.3.

## Installation

Install using npm

`npm install --save-dev html-bricks-plugin-inline-css`

Then include the plugin in your config

```json
{
  "plugins": [
    "plugin-inline-css"
  ]
}
```

## Usage

Include your css stylesheets with a `<link rel="stylesheet" type="text/css">` (you need to specify both rel and type) like you would normally do. Then  grab a cup of ☕ and relax yourself as your stylesheets are converted into `<style>` tags.
