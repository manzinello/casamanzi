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
    isLoading: false,
    email: '',
    url: ''
  }

  async componentDidMount() {

    const response = await fetch('/controlla');
    const c = await response.json();

    console.log(c);

    // Qui c'è da gestire la richiesta e far uscire un'altra pagina in base allo state!
    this.setState({ controlla: c })

  }

  _onHandleUrl = (e) => {
    this.setState({ url: e.target.value });
  }

  _onHandleEmail = (e) => {
    this.setState({ email: e.target.value });
  }

  _onHandleSubmit = (e) => {
    // TODO FIX
    console.log(this.state.url);
    console.log(this.state.email);
    this.setState({
      isLoading: true
    })
  }

  render() {
    return (
      <App>

        <Header size='large'>
          <Title>
            casamanzi
          </Title>
        </Header>

        {!this.state.isLoading ?

          <Section>

            <img src="../subito-logo.png" width={200} />

            <Paragraph size='medium'>Inserisci un URL valido da <strong className="subitocolor">Subito.it</strong> e il tuo indirizzo email e <strong>controllasubito</strong> ti invierà un'email se ci sono nuovi articoli che possono interessarti!</Paragraph>

            <Form onSubmit={this._onHandleSubmit}>
              <FormField label='URL da Subito.it'>
                <TextInput value={this.state.url} onDOMChange={this._onHandleUrl} />
              </FormField>
              <FormField label='Indirizzo email'>
                <TextInput value={this.state.email} onDOMChange={this._onHandleEmail} />
              </FormField>
              <Footer pad={{ "vertical": "medium" }}>
                <Button label='Tienimi aggiornato!'
                  type='submit'
                  primary={true} />
              </Footer>
            </Form>
          </Section>

          : //<Spinning size='large' />

          <Section>
            <Paragraph size='medium'><strong>Controllasubito</strong> non è ancora disponibile, è ancora in alpha-test!</Paragraph>
          </Section>

        }

        <Footer justify='between'
          size='small'>
          <Box direction='row'
            align='center'
            pad={{ "between": "medium" }}>
            <Paragraph margin='none'>
              controllasubito v0.1, creato da <a href="https://matteomanzinello.com" target="_blank" rel="noopener noreferrer"><strong>matteo manzinello</strong></a>
            </Paragraph>
          </Box>
        </Footer>

      </App>
    );
  }

}

export default Casamanzi;

