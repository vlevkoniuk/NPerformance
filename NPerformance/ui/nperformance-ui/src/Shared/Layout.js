import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import ConfigContext, { ConfigProvider } from './ConfigContext'
//import '../App.js';

export class Layout extends Component {
  static displayName = Layout.name;


  render () {
    return (
      <div>
            <NavMenu />
            <Container>
                {this.props.children}
            </Container>
            
      </div>
    );
  }
}