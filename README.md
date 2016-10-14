# pages-redux ![build status](https://travis-ci.org/zhangkaiyulw/pages-redux.svg)
The declarative pages architecture for building web UI working with redux.

## Documentation

To create a page reducer:

 ``` javaScript
 import {createPageReducer} from 'pages-redux';
 let reducer = createPageReducer(yourInitialState);
 ```

 To create an normal page update action:

 ``` javaScript
  import {createSetPagePropsAction} from 'pages-redux';
  let action = createSetPagePropsAction(['home-page', 'camera-page'], {flash: true});
 ```

## Installation

```
npm install pages-redux
```