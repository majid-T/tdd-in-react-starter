import React, { Component, Fragment } from "react";
import axios from "axios";
import Joke from "./joke";

export default class JokeGenerator extends Component {
  state = {
    joke: null,
    loading: false,
  };

  loadJoke = async () => {
    this.setState({ loading: true });

    const {
      data: {
        value: { joke },
      },
    } = await axios.get("https://api/icndb.com/jokes/random");

    this.setState({ loading: false, joke });
  };
  render() {
    const { joke, loading } = this.state;

    return (
      <Fragment>
        {!joke && <div>You havent loaded any jokes yet</div>}
        {loading && <div>Loading...</div>}
        {joke && !loading && <Joke text={joke} />}

        <button onClick={this.loadJoke} type="button">
          Load a random joke
        </button>
      </Fragment>
    );
  }
}
