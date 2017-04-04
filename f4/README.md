# npm init
# npm install lite-server --save-dev
# Inside package.json...
  "scripts": {
    "dev": "lite-server --c bs-chrome.json"
  },
# bs-chrome.json
{
  "browser": "chrome"
}
# npm run dev

## https://github.com/babel/babel-loader
# npm install --save-dev babel-cli babel-preset-env
# create file .babelrc
{
  "presets": ["env"]
}
# npm install --save-dev babel
# npm install --save-dev babel-loader
# npm install --save-dev babel-core

# npm install --save-dev webpack

# create app/index.js
+ import _ from 'lodash';
function component () {
  var element = document.createElement('div');
  /* lodash is required for the next line to work */
  element.innerHTML = _.join(['Hello','webpack'], ' ');
  return element;
}
document.body.appendChild(component());

# npm install --save lodash

# index.html
<html>
  <head>
    <title></title>
  </head>
  <body>
    <script src="dist/bundle.js"></script>
  </body>
</html>