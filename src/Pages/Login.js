import { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends Component {
  state = {
    carateres: '',
    isDisabled: true,
    isLoading: false,
  };

  handleClick = () => {
    const { carateres } = this.state;
    const { history } = this.props;
    this.setState({ isLoading: true });
    createUser({ name: carateres })
      .then(() => history.push('/search'));
  };

  handleChange = ({ target: { value } }) => {
    const number = 3;
    this.setState({ carateres: value,
    });

    if (value.length >= number) {
      this.setState({
        isDisabled: false,
      });
    }
  };

  render() {
    const { carateres, isDisabled, isLoading } = this.state;
    return (
      <div data-testid="page-login">
        {isLoading ? (
          <Loading isLoading={ isLoading } />
        ) : (
          <form>
            <div>
              <label htmlFor="login-name-input">
                <input
                  id="login-name-input"
                  type="text"
                  name="name"
                  data-testid="login-name-input"
                  onChange={ this.handleChange }
                  value={ carateres }
                />
              </label>
            </div>
            <button
              type="submit"
              data-testid="login-submit-button"
              onClick={ this.handleClick }
              disabled={ isDisabled }
            >
              Entrar
            </button>
          </form>
        )}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
