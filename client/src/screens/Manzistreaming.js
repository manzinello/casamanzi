import React, { Component } from "react";

class Manzistreaming extends Component {
  manzistreamingEndpoint = "";

  state = {
    active: false
  };

  componentDidMount = () => {
    fetch(manzistreamingEndpoint)
      .then(response => {
        if (response.statusCode === 200) {
          this.setState({ active: true });
        }
      })
      .catch(() => {});
  };

  render() {
    return (
      <p>
        {this.state.active ? (
          <React.Fragment>
            manzi
            <strong>streaming</strong> è attivo al momento!
          </React.Fragment>
        ) : (
          <React.Fragment>
            manzi
            <strong>streaming</strong> NON è attivo al momento!
          </React.Fragment>
        )}
      </p>
    );
  }
}

export default Manzistreaming;
