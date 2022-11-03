import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import "./map.css"

const homeCenterLat = 33.505238;
const homeCenterLng = -111.919051;

const Map = (props) => {

    const { entriesArray, googleMapCenterLat, googleMapCenterLng, googleMapZoom, googleMapTypeId } = props; // Needed to set the map and markers
    const [renderMarkers, setRenderMarkers] = useState(false) // Only render when the map is ready
    const [locationsArray, setLocationsArray] = useState([]); // For setting the markers
    const [center, setCenter] = useState({ // A baseline home center
        lat: homeCenterLat,
        lng: homeCenterLng
    })

    // Options for the map passed as props below
    const options = useMemo(() => ({
        clickableIcons: false,
        disableDefaultUI: true
    }), []);

    // Load the map using the API key
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    });
    
    useEffect(() => {
        // Get all the locations from the entries in the view, then store in an array for markers on the map
        const pulledLocations = [];
        for (const entry of entriesArray){
            if (entry.useAPILocation && entry.APILocationLat && entry.APILocationLng){
                pulledLocations.push({lat: entry.APILocationLat, lng: entry.APILocationLng})
            }
        }
        setLocationsArray(pulledLocations);
    
    }, [])

    // Start rendering the markers when the map is loaded
    useEffect(() => {
      if (isLoaded){
        setRenderMarkers(true);
    }
    }, [isLoaded])
    
    // Map settings sent in from the view editing page
    const onLoad = useCallback((map) => {
        if(googleMapCenterLat && googleMapCenterLat.toString().length>0) {
            map.setCenter({lat: googleMapCenterLat, lng: googleMapCenterLng})
            map.setMapTypeId(googleMapTypeId)
            map.setZoom(googleMapZoom)
        }
    }, [])

    if (!isLoaded) return <div>Loading...</div>
    
    return (
        <div className="map">
            <GoogleMap
                zoom={12}
                center={center}
                mapContainerClassName="map-container"
                options={options}
                onLoad={onLoad} >
                {/*Render a marker for each location found in the entries array*/}
                {renderMarkers && locationsArray && locationsArray.length>0 && 
                    locationsArray.map((location) => (location.lat && <Marker key={location.lat} position={location} />))}
            </GoogleMap>
        </div>
    )
}


export default Map