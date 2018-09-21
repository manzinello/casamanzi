import React, { Component } from 'react';

import './Casamanzi.css';

import { Layout, Menu, Icon } from 'antd';

import Home from './screens/Home';
import Due from './screens/Due';
import Manzistreaming from './screens/Manzistreaming';
import Cinemanzi from './screens/Cinemanzi';
import Raspi from './screens/Raspi';

const { Header, Content, Footer, Sider } = Layout;

class Casamanzi extends Component {

  state = {
    collapsed: true,
    s: 'home'
  };

  onCollapse = (collapsed) => {
    // console.log(collapsed);
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
          // onBreakpoint={(broken) => { console.log(broken); }}
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
          style={{ background: '#fff' }}>
          <div className="logo" style={{ color: 'white', textAlign: 'center', margin: 'auto' }}><img className="emoji-logo" src="images/casamanzi.png" alt="casamanzi" /></div>
          <Menu onSelect={this.select} selectedKeys={[this.state.s]} mode="inline">
            <Menu.Item key="home" style={{ marginTop: 0 }}>
              <Icon type="home" />
              <span>casamanzi</span>
            </Menu.Item>
            <Menu.Item key="cinemanzi" style={{ marginTop: 0 }}>
              <Icon type="video-camera" />
              <span>cinemanzi</span>
            </Menu.Item>
            <Menu.Item key="manzistreaming" style={{ marginTop: 0 }}>
              <Icon type="play-circle" />
              <span>manzistreaming</span>
            </Menu.Item>
            <Menu.Item key="due" style={{ marginTop: 0 }}>
              <Icon type="tags" />
              <span>chiamo il due</span>
            </Menu.Item>
            <Menu.Item key="raspi" style={{ marginTop: 0 }}>
              <Icon type="usb" />
              <span>raspberry</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff' }}>Casamanzi</Header>
          <Content style={{ margin: '16px' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {
                this.state.s === 'home' ? <Home /> :
                  this.state.s === 'due' ? <Due /> :
                    this.state.s === 'cinemanzi' ? <Cinemanzi /> :
                      this.state.s === 'raspi' ? <Raspi /> :
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
