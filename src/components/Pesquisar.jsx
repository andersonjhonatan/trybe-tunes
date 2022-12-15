import { Component } from 'react';

class Pesquisar extends Component {
  state = {
    carateres: '',
    isDisabled: true,
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ carateres: value,
    });

    if (value.length >= 2) {
      this.setState({
        isDisabled: false,
      });
    }
  };

  render() {
    const { carateres, isDisabled } = this.state;
    return (
      <form>
        <label htmlFor="search-artist-input">
          <input
            type="text"
            data-testid="search-artist-input"
            onChange={ this.handleChange }
            value={ carateres }
          />
        </label>
        <button
          type="submit"
          data-testid="search-artist-button"
          onClick={ this.handleClick }
          disabled={ isDisabled }
        >
          Pesquisar
        </button>
      </form>
    );
  }
}

export default Pesquisar;
