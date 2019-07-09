import React, { Component } from "react";
import Button from "react-bootstrap/Button";

class Profile extends Component {
  state = {
    profile: null,
    error: ""
  };

  componentDidMount() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.props.auth.getProfile((profile, error) =>
      this.setState({ profile, error })
    );
  }

  render() {
    const { profile } = this.state;

    if (!profile) return null;

    return (
      <>
        <Button href="/profile/edit">Edit</Button>

        <h1>Profile</h1>
        <p>{profile.nickname}</p>
        <img
          style={{ maxWidth: 50, maxHeight: 50 }}
          src={profile.picture}
          alt="profile pic"
        />
        <pre>{JSON.stringify(profile, null, 2)}</pre>

        <h2>Address</h2>
      </>
    );
  }
}

export default Profile;
