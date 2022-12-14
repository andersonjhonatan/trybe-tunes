import { Component } from 'react';
import Header from '../components/Header';

class Album extends Component {
  render() {
    return (
      <div data-testid="page-album">
        Album
        <div>
          <Header />
        </div>
      </div>
    );
  }
}
export default Album;
