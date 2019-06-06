import { hot } from 'react-hot-loader'
import React from 'react'
import { Route, HashRouter, Switch, NavLink } from 'react-router-dom';
import Loadable from '$components/Loadable'

const About = Loadable(() => import('./About'))
const Home = Loadable(() => import('./Home'))

class Main extends React.Component {
  render() {
    return (
      <HashRouter>
        <NavLink to='/home'>home</NavLink>
        &nbsp;|&nbsp;
        <NavLink to='/about'>about</NavLink>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/about" component={About} />
        </Switch>
      </HashRouter>
    )
  }
}
export default hot(module)(Main)