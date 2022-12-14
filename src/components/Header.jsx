import { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    carateres: '""',
    isLoading: false,
  };

  componentDidMount() {
    this.setState(
      { isLoading: true },
      async () => {
        const carateres = await getUser();
        this.setState({
          isLoading: false,
          carateres: carateres.name,
        });
      },
    );
  }

  render() {
    const { carateres, isLoading } = this.state;
    return (
      <header data-testid="header-component">
        {isLoading ? (
          <Loading isLoading={ isLoading } />
        ) : (
          <h1 data-testid="header-user-name">{carateres}</h1>
        )}
      </header>
    );
  }
}

export default Header;
