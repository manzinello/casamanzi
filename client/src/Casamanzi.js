import React, { Component } from 'react';

import './Casamanzi.css';

import App from 'grommet/components/App';
import Header from 'grommet/components/Header';
import Section from 'grommet/components/Section';
import Paragraph from 'grommet/components/Paragraph'
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';

class Casamanzi extends Component {

  state = {
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
      <App>

        <Header size='large'>
          <Title>
            casamanzi
          </Title>
        </Header>

        <Section>
          <Paragraph size='medium'><strong>lorem</strong> ipsum</Paragraph>
        </Section>

        <Footer justify='between'
          size='small'>
          <Box direction='row'
            align='center'
            pad={{ "between": "medium" }}>
            <Paragraph size='small'>
              casamanzi v0.1, creata da <a href="https://matteomanzinello.com" target="_blank" rel="noopener noreferrer"><strong>matteo manzinello</strong></a>
            </Paragraph>
          </Box>
        </Footer>

      </App>
    );
  }

}

export default Casamanzi;

