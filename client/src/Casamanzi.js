import React, { Component } from 'react';

import './Casamanzi.css';

import { Button } from 'evergreen-ui'

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

        <p>Casamanzi</p>

        <Button>I am using 🌲 Evergreen!</Button>

      </div>
    );
  }

}

export default Casamanzi;

