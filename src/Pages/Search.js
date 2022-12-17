import { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

class Search extends Component {
  state = {
    disc: [],
    isLoading: false,
    carateres: '',
    pesquisaAlbum: '',
    isDisabled: true,
    resultado: true,
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ carateres: value });

    if (value.length >= 2) {
      this.setState({
        isDisabled: false,
      });
    }
  };

  handleApi = () => {
    this.setState({ isLoading: true }, async () => {
      const { carateres } = this.state;
      const pesquisa = await searchAlbumsAPI(carateres);
      this.setState({
        carateres: '',
        isLoading: false,
        disc: pesquisa,
        pesquisaAlbum: carateres,
      }, () => {
        if (pesquisa.length === 0) {
          this.setState({ resultado: false });
        }
      });
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
  };

  render() {
    const { disc,
      isLoading,
      carateres,
      pesquisaAlbum,
      isDisabled,
      resultado } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form onSubmit={ this.handleSubmit }>
          <label htmlFor="search-artist-input">
            <input
              type="text"
              data-testid="search-artist-input"
              onChange={ this.handleChange }
              value={ carateres }
            />
          </label>
          <button
            type="submit"
            data-testid="search-artist-button"
            onClick={ this.handleApi }
            disabled={ isDisabled }
          >
            Pesquisar
          </button>
          {resultado ? null : <p>Nenhum álbum foi encontrado</p>}
          <div>
            <h2>{`Resultado de álbuns de: ${pesquisaAlbum}`}</h2>
            {isLoading ? (
              <Loading />
            ) : (
              disc.map(
                ({
                  collectionName,
                  collectionId,
                  artworkUrl100,
                  artistName,
                }) => (

                  <div key={ collectionId }>
                    <img src={ artworkUrl100 } alt={ collectionName } />
                    <h3>{collectionName}</h3>
                    <h4>{artistName}</h4>
                    <Link
                      data-testid={ `link-to-album-${collectionId}` }
                      to={ `/album/${collectionId}` }
                    >
                      Indo para o Album
                    </Link>
                  </div>
                ),
              )
            )}
          </div>
        </form>
      </div>
    );
  }
}
export default Search;
