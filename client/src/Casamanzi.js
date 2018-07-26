import React, { Component } from 'react';

import './Casamanzi.css';

import { Layout, Menu, Breadcrumb, Icon } from 'antd';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class Casamanzi extends Component {

  state = {
    collapsed: true,
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
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}>
          <div className="logo" style={{ color: 'white', textAlign: 'center', height: 64, margin: 'auto' }}><p className="logo-p">🏡</p></div>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <Icon type="appstore" />
              <span>casamanzi</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="file-text" />
              <span>due</span>
            </Menu.Item>
            <Menu.Item key="3">
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
              Bill is a cat.
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