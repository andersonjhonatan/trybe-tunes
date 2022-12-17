import { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  state = {
    musicAlbuns: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    this.setState({
      musicAlbuns: response,
    });
  }

  render() {
    const {
      musicAlbuns,
    } = this.state;

    // Formas que tentei;

    // const musicAlbun = musicAlbuns.slice(1);

    /* const musicAlbun = this.setState({
      musicAlbuns: [...musicAlbuns].shift(),
    }); */

    return (
      <div data-testid="page-album">
        <div>
          <Header />
          <h1>Album</h1>

          {/* Como Referencia */}
          {/* https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Optional_chaining */}

          <h2 data-testid="artist-name">{musicAlbuns[0]?.artistName}</h2>
          <h2
            data-testid="album-name"
          >
            {musicAlbuns[0]?.collectionName}
          </h2>
        </div>
        <div>

          {/* oque estar retornando
          collectionId: id -
          nome do artista: artistName
          nome do album: collectionName
          trackId: o unico que tem nas musicas e nele não
          */}

          { musicAlbuns.filter((elemento) => elemento.trackId)
            .map((elemento) => (
              <MusicCard
                key={ elemento.trackId }
                { ...elemento }
              />
            ))}
        </div>
      </div>
    );
  }
}
export default Album;

Album.propTypes = {
  match: PropTypes.objectOf(
    PropTypes.string,
  ),
}.isRequired;
