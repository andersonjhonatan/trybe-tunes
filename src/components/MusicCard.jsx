import { Component } from 'react';
import propTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    isLoading: false,
    check: false,
  };

  async componentDidMount() {
    await this.favoritMusic();
  }

  favoritMusic = async () => {
    const { trackId } = this.props;
    const salveMusic = await getFavoriteSongs();
    this.setState({
      check: salveMusic.some((elemento) => elemento.trackId === trackId),
    });
  };

  handleInput = ({ target: { type, checked, value } }) => {
    const valor = type === 'checkbox' ? checked : value;
    this.setState(
      { isLoading: valor, check: valor },
      async () => {
        await addSong(checked);
        this.setState({
          isLoading: false,
        });
      },
    );
  };

  render() {
    const { previewUrl, trackName, trackId } = this.props;
    const { isLoading, check } = this.state;
    return (
      <div>
        {isLoading ? (
          <Loading isLoading={ isLoading } />
        ) : (
          <div>
            <h3>{trackName}</h3>
            <audio
              data-testid="audio-component"
              src={ previewUrl }
              controls
            >
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
              .
            </audio>
            <label htmlFor="favorites">
              Favorita
              <input
                type="checkbox"
                name="favorites"
                id="favorites"
                data-testid={ `checkbox-music-${trackId}` }
                onChange={ this.handleInput }
                checked={ check }
              />
            </label>
          </div>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: propTypes.string,
  previewUrl: propTypes.string,
}.isRequired;

export default MusicCard;
