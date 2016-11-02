# Apical

It's utility to build assets for restful API.

Installation
-
Install command via NPM:
```sh
npm install -g apical
```

Usage
-
Generate API documentation with apical command:
```sh
apical gen-doc <Restful API source file> -o <output path>
```

Example
-
There is an example in this project, we can generate documentation by using Apical:
```sh
cd examples
apical gen-doc restful-api.json -o .
```

Then you can find out `index.html` out there, which is API documentation with default theme provided.

License
-
Licensed under the MIT License

Authors
-
Copyright(c) 2016 Fred Chien（錢逢祥） <<cfsghost@gmail.com>>
