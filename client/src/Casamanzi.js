import React, { Component } from 'react';

import './Controllasubito.css';

import App from 'grommet/components/App';
import Header from 'grommet/components/Header';
import Section from 'grommet/components/Section';
import Paragraph from 'grommet/components/Paragraph'
import Title from 'grommet/components/Title';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
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
    this.setState({ controlla: c })

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
          <Paragraph size='medium'><strong>casamanzi</strong> powered by Raspberry Pi</Paragraph>
        </Section>

        <Footer justify='between'
          size='small'>
          <Box direction='row'
            align='center'
            pad={{ "between": "medium" }}>
            <Paragraph margin='none'>
              casamanzi v0.1, creato da <a href="https://matteomanzinello.com" target="_blank" rel="noopener noreferrer"><strong>matteo manzinello</strong></a>
            </Paragraph>
          </Box>
        </Footer>

      </App>
    );
  }

}

export default Casamanzi;

