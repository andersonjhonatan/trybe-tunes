import { Component } from 'react';
import propTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
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

  handleInput = async ({ target: { checked } }) => {
    if (checked) {
      this.setState(
        { isLoading: true },
        async () => {
          await addSong();
          this.setState({
            isLoading: false,
            check: true,
          });
        },
      );
    } else {
      this.setState({
        isLoading: true,
      }, async () => {
        await removeSong(checked);
        this.setState({
          check: false,
          isLoading: false,
        });
      });
    }
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
