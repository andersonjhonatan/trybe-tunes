import { Component } from 'react';
import Header from '../components/Header';
import Pesquisar from '../components/Pesquisar';

class Search extends Component {
  render() {
    return (
      <div data-testid="page-search">
        Search
        <div>
          <Header />
        </div>
        <section>
          <Pesquisar />
        </section>
      </div>
    );
  }
}
export default Search;
