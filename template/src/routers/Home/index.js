import React, { Component } from 'react'
import logo from '$images/logo.png'
{{#if_eq csscompiler 'Sass'}}
import './index.scss'
{{/if_eq}}
{{#if_eq csscompiler 'Less'}}
import './index.less'
{{/if_eq}}
export default class Home extends Component {
  render () {
    return (
      <>
        <h1>Hello BV!</h1>
        <img src={logo} width="120" height="50" />
      </>
    )
  }
}