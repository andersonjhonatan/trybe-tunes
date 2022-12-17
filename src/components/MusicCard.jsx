import { Component } from 'react';
import propTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { previewUrl, trackName } = this.props;
    return (
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
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: propTypes.string,
  previewUrl: propTypes.string,
}.isRequired;

export default MusicCard;
