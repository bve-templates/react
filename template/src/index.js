import React from 'react'
import { render } from "react-dom"
import Routers from '$routers'
/**
 * 修改index.html页面会重新加载
 * 如果index.html不常修改，即使修改也是手动刷新，则可以去掉这个require
 */
if (process.env.NODE_ENV === 'development') {
  require('./index.html')

}

{{#if_eq csscompiler 'Sass'}}
import './index.scss'
{{/if_eq}}
{{#if_eq csscompiler 'Less'}}
import './index.less'
{{/if_eq}}

render(<Routers />, document.querySelector('#main'));
