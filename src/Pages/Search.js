import { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  render() {
    return (
      <div data-testid="page-search">
        Search
        <div>
          <Header />
        </div>
      </div>
    );
  }
}
export default Search;
