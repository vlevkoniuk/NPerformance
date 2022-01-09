import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import ConfigContext from './ConfigContext';
import {PerformanceContext} from './PerformanceContext'
import '../App.css'

export class Layout extends Component {
  static displayName = Layout.name;


  render () {
    return (
      <>
        <NavMenu />
        <Container>
          {this.props.children}
        </Container>
      </>
      
    );
  }
}