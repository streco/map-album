import React from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1Ijoic3RyZWNvIiwiYSI6ImNrNjRqaGJqcTEwbXczanFvdm1kbXB4NW0ifQ.KqTVv6xamprq1sUD2jWAZQ';

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

    render() {
        return (
            <div>
                <div ref={el => this.mapContainer = el} className="mapContainer" />
            </div>
        )
    }
}

export default MapAlbum;