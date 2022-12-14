import { Component } from 'react';
import Header from '../components/Header';

class Profile extends Component {
  render() {
    return (
      <div data-testid="page-profile">
        Profile
        <div>
          <Header />
        </div>
      </div>
    );
  }
}
export default Profile;
