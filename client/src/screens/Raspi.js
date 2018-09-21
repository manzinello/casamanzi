import React, { Component } from 'react';

import { Button } from 'antd';

class Cinemanzi extends Component {

    state = {
        led: false
    }

    async accendiLed() {

        const response = await fetch('/accendiled');
        const acceso = await response.json();

        console.log(acceso);

        // Qui c'è da gestire la richiesta e far uscire un'altra pagina in base allo state!
        this.setState({ led: acceso })

    }

    render() {
        return (
            <div>
                <Button
                    type="primary"
                    onClick={this.accendiLed}>
                    {"Accendi il LED"}
                </Button>
            </div>
        )
    }

}

export default Cinemanzi;