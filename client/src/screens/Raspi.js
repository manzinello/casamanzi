import React, { Component } from 'react';

import { Button } from 'antd';

class Cinemanzi extends Component {

    render() {
        return (
            <div>
                <Button
                    type="primary">
                    {"Accendi il LED"}
                </Button>
            </div>
        )
    }

}

export default Cinemanzi;