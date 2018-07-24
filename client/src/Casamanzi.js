import React, { Component } from 'react';

import './Casamanzi.css';

import { Heading, Text, Button, Code } from 'evergreen-ui'

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
      <div>

        <Heading>casamanzi</Heading>

        <br />

        <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec scelerisque tortor justo, eu viverra nulla placerat id. Vestibulum turpis est, lacinia eget rhoncus ut, ornare at tortor. Donec venenatis vestibulum neque, ac posuere ante pulvinar sit amet. Etiam sed tempus metus, a fringilla sem. Aenean condimentum lorem ac lorem consectetur convallis. Praesent semper mauris neque, vel ultrices mi accumsan a. Aenean lacinia laoreet fringilla.</Text>

        <br /><br />

        <Button>I am using 🌲 Evergreen!</Button>

        <br /><br />

        <Code>casamanzi, fatta con ❤️ da matteo manzinello</Code>

      </div>
    );
  }

}

export default Casamanzi;

