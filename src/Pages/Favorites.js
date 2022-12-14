import { Component } from 'react';
import Header from '../components/Header';

class Favorites extends Component {
  render() {
    return (
      <div data-testid="page-favorites">
        Login
        <div>
          <Header />
        </div>
      </div>
    );
  }
}
export default Favorites;
