
# Previewer

This is little utility to help preview hymns in different formats, currently we support markdown and html.


## Demo

https://previewer-psi.vercel.app

## Run Locally

Clone the project

```bash
  git clone https://github.com/OlivierJM/previewer.git
```

Go to the project directory

```bash
  cd previewer
```

Install dependencies

```bash
  npm install
```

Start the dev server

```bash
  npm run dev
```


## Features

- Song listing
- Song Preview
- HTML/Markdown
- Upload/Url JSON preview


### Supported file structure

Currently we support JSON files that have a structure that looks like this

```json
[
    {
        "title": "3 Face To Face",
        "number": 3,
        "content": "<h1>some html here, content can also in markdown</h1>"
    }
]
```
The above HTML or Markdown can be in the content property, the previewer will render whichever is provided accordingly.

Another supported format is the followin

```json

[
    {
        "title": "3 Face To Face",
        "number": 3,
        "markdown": "### some markdown here"
    }
]
```
In the above example, the property name is makrdown instead of content, this too is supported as long as the provided content is valid markdown.

## Feedback

If you have any feedback, please reach out to us at manolivier93@gmail.com or create an issue.


## License

[MIT](https://choosealicense.com/licenses/mit/)

