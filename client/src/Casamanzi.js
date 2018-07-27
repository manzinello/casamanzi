import React, { Component } from 'react';

import './Casamanzi.css';

import { Layout, Menu, Icon } from 'antd';

import Home from './screens/Home';
import Due from './screens/Due';
import Manzistreaming from './screens/Manzistreaming';

const { Header, Content, Footer, Sider } = Layout;

class Casamanzi extends Component {

  state = {
    collapsed: true,
    s: 'home'
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  select = v => {
    this.setState({
      s: v.key
    })
  }

  async componentDidMount() {

    const response = await fetch('/casamanzi');
    const c = await response.json();

    console.log(c);

    // Qui c'è da gestire la richiesta e far uscire un'altra pagina in base allo state!
    this.setState({ casamanzi: c })

  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          breakpoint="md"
          collapsedWidth="0"
          onBreakpoint={(broken) => { console.log(broken); }}
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}>
          <div className="logo" style={{ color: 'white', textAlign: 'center', height: 64, margin: 'auto' }}><img className="emoji-logo" src="images/casamanzi.png" alt="casamanzi" /></div>
          <Menu theme="dark" onSelect={this.select} selectedKeys={[this.state.s]} mode="inline">
            <Menu.Item key="home">
              <Icon type="appstore" />
              <span>casamanzi</span>
            </Menu.Item>
            <Menu.Item key="due">
              <Icon type="file-text" />
              <span>due</span>
            </Menu.Item>
            <Menu.Item key="manzistreaming">
              <Icon type="video-camera" />
              <span>manzistreaming</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} >
            <p className="header-p"><strong>casa</strong>manzi</p>
          </Header>
          <Content style={{ margin: '16px' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {
                this.state.s === 'home' ? <Home /> :
                  this.state.s === 'due' ? <Due /> :
                    <Manzistreaming />
              }
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            <strong>casamanzi</strong>, creata con ❤️ da <a href="https://matteomanzinello.com">matteo manzinello</a>
          </Footer>
        </Layout>
      </Layout>
    );
  }

}

export default Casamanzi;