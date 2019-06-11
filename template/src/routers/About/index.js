import React, { Component } from 'react'
{{#if_eq csscompiler 'Sass'}}
import './index.scss'
{{/if_eq}}
{{#if_eq csscompiler 'Less'}}
import './index.less'
{{/if_eq}}
export default class Index extends Component {
  render() {
    return (
      <>
        <h1>about BVE!</h1>
      </>
    )
  }
}
