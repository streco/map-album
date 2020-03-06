import React from 'react';
import Script from 'react-load-script'
import { CLIENT_ID } from './config';

class GooglePhotosProvider extends React.Component {
    constructor(props) {
        super(props);
        this._getAuthInstance = this._getAuthInstance.bind(this);
    }

    _authenticateGoogle() {
        const load = new Promise(function(resolve, reject) {
            window.gapi.load('auth2', resolve);
        });
        load.then(async () => {
            return await window.gapi.auth2
            .init({
              client_id: CLIENT_ID,
              scope: 'https://www.googleapis.com/auth/photoslibrary.readonly'
            })
            .then(authInstance => {
              this._getAuthInstance(authInstance)
            });
        });
    }

    _signInChanged(val) {
        console.log('Signin state changed to ', val);
    };

    _userChanged(user) {
        console.log('User now: ', user);
    };

    _getAuthInstance = (authInstance) => {
        //authInstance.signOut(); Used to kill session
        authInstance.isSignedIn.listen((val) => console.log('Signin state changed to ', val));
        authInstance.currentUser.listen((user) => console.log('User now: ', user));

        if (!authInstance.isSignedIn.get()){
            authInstance.signIn()
                .then((resp) => { this._getGoogleUser(authInstance) })
                .catch((err) => { console.log("Error", err) })
        }
        else{
            this._getGoogleUser(authInstance); 
        }
    }

    _getGoogleUser(authInstance){
        const googleUser = authInstance.currentUser.get();
        console.log(googleUser.getAuthResponse(true));   //TODO: Do something with access token
    }

    render() {
        return (
            <div>
                <Script
                    url="https://apis.google.com/js/api.js"
                    onLoad={this._authenticateGoogle.bind(this)}
                />
            </div>
        )
    }
}

export default GooglePhotosProvider;