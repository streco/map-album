import React from 'react';
import mapboxgl from 'mapbox-gl';
import Script from 'react-load-script'
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URL, MAPBOX_ACCESS_TOKEN } from './config';

mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

class MapAlbum extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lng: -122.266447,
            lat: 37.5057133,
            zoom: 15
        };
    }

    componentDidMount() {
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom
        });

    }
    
    _authenticateGoogle(){
        window.gapi.load('auth2', function() {
            window.gapi.auth2.init({client_id: CLIENT_ID})
            .then((gAuth) => {
                gAuth.signIn()
                .then((z) => {console.log("yes", z)})
                .catch((y) => {console.log("no", y)})
            });
        })
    }

    render() {
        return (
            <div>
                <Script
                    url="https://apis.google.com/js/api.js"
                    onLoad={this._authenticateGoogle.bind(this)}
                />
                <div ref={el => this.mapContainer = el} className="mapContainer" />
            </div>
        )
    }
}

export default MapAlbum;