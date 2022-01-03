import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
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
            {/* <div className="site-grid-columns">
                <div className="grid-item">

                </div>
                <div className="grid-item">
                    <div className="main-grid-columns">
                        <div className="grid-item menu-background">
                            <SideMenu />
                        </div>
                        <div className="grid-item main-grid-background">
                            <Container>
                                {this.props.children}
                            </Container>
                        </div>
                    
                    </div>
                </div>
                <div className="grid-item">

                </div>
            </div>   */}
      </div>
    );
  }
}