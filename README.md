![Vue API Request Icon](https://ftgibran.github.io/static/v-api@256.png)
# Vue API Request

Vue API Request provides a full control on your APIs, making the calls simple, fast and easy to implement. Also, your code will be cleaner and more elegant.

## [Docs & Demo](https://ftgibran.github.io/#/vue-api-request)

## Installation

Package is installable via npm.

```bash
$ npm i vue-api-request --save
```

## Basic Usage

You have to import the library and use as a Vue plugin to enable the functionality globally on all components.

```javascript
import Vue from 'vue'
import VueApiRequest from 'vue-api-request'
Vue.use(VueApiRequest)
```

### Example

```html
<api-request :resource="apiRequest" v-model="apiResponse">
  My stuffs to be shown when the API loads
</api-request>
```

## Pre Configuration

You may also set your own default configuration, so you don't need to customize every time each ApiRequest component. You are still able to customize a specific component using props. 

### Example

```javascript
import Vue from 'vue'
import VueApiRequest from 'vue-api-request'

let options = {
  effect: 'lightSpeedIn',
  resp: 'body.foo.bar',
  spinner: 'DotLoader',
  spinnerColor: 'blue', //or #0000ff
  spinnerPadding: '2em',
  spinnerScale: 1.4,
  onSuccess: resp => {
    console.log('Success', resp)
  },
  onError: resp => {
    alert(`Error: ${resp.message}`)
  }
}

Vue.use(VueApiRequest, options)
```

The 'options' variable above is equivalent of:

```html
<api-request
  :resource="apiRequest"
  v-model="apiResponse"
  effect="lightSpeedIn"
  resp="body.foo.bar"
  spinner="DotLoader"
  spinner-color="blue"
  spinner-padding="2em"
  :spinner-scale="1.4"
  @success="successEvent"
  @error="errorEvent"
>
  My stuffs to be shown when the API loads
</api-request>
```

Go to [Demo & Docs](https://ftgibran.github.io/#/vue-api-request) to further informations.

## Contributing

``` bash
# clone project
git clone https://github.com/ftgibran/vue-api-request.git
cd vue-api-request

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## License
[MIT](https://opensource.org/licenses/MIT)
Copyright (c) 2017 Felipe Gibran <ftgibran>
