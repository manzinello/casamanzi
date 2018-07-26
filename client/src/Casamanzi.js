import React, { Component } from 'react';

import './Casamanzi.css';

import { Layout, Menu, Breadcrumb, Button } from 'antd';

const { Header, Content, Footer } = Layout;

class Casamanzi extends Component {

  state = {
    collapsed: false,
  };

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
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">Benvenuto!</Menu.Item>
            <Menu.Item key="2">manzistreaming</Menu.Item>
            <Menu.Item key="3">altro</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            Content
          <br />
            <Button type="primary">Primary</Button>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          casamanzi, creata con ❤️ da <a href="https://matteomanzinello.com">matteo manzinello</a>
        </Footer>
      </Layout>
    );
  }

}

export default Casamanzi;

