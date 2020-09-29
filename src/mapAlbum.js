import React from 'react';
import mapboxgl from 'mapbox-gl';
import { MAPBOX_ACCESS_TOKEN } from './config';
import AWS from 'aws-sdk';

mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

/*
AWS.config.region = 'us-east-2'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-2:39c898ec-b8df-417b-9df8-681588cbffb8',
});
*/

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

        // **DO THIS**:
        //   Replace BUCKET_NAME with the bucket name.
        //
        var albumBucketName = 'mapalbum';

        // **DO THIS**:
        //   Replace this block of code with the sample code located at:
        //   Cognito -- Manage Identity Pools -- [identity_pool_name] -- Sample Code -- JavaScript
        //
        // Initialize the Amazon Cognito credentials provider
        AWS.config.region = 'us-east-2'; // Region
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: 'us-east-2:39c898ec-b8df-417b-9df8-681588cbffb8',
        });

        // Create a new service object
        var s3 = new AWS.S3({
            apiVersion: '2006-03-01',
            params: {Bucket: albumBucketName}
        });

        s3.listObjects({Delimiter: '/'}, function(err, data){
            if(err){
                console.log('unable to retrieve objects');
            }
            else{
                console.log(data);
                for(let photo of data.Contents){
                    console.log(`${this.request.httpRequest.endpoint.href}mapalbum/${photo.Key}`);
                }
            }
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