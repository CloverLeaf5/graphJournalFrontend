import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import "./map.css"

const homeCenterLat = 33.505238;
const homeCenterLng = -111.919051;

const Map = (props) => {

    const { entriesArray, mapRef, location } = props;
    const [renderMarkers, setRenderMarkers] = useState(false)
    const [locationsArray, setLocationsArray] = useState([]);
    
    const [center, setCenter] = useState({
        lat: homeCenterLat,
        lng: homeCenterLng
    })

    const options = useMemo(() => ({
        clickableIcons: false
    }), []);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    });
    
    useEffect(() => {
        const pulledLocations = [];
        for (const entry of entriesArray){
            if (entry.useAPILocation && entry.APILocationLat && entry.APILocationLng){
                pulledLocations.push({lat: entry.APILocationLat, lng: entry.APILocationLng})
            }
        }
        setLocationsArray(pulledLocations);

        (pulledLocations && pulledLocations.length>0) ? setCenter(pulledLocations[0])
        : navigator.geolocation.getCurrentPosition(position => {
            setCenter({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            })
      })
    
    }, [])

    useEffect(() => {
        const pulledLocations = [];
        for (const entry of entriesArray){
            if (entry.useAPILocation && entry.APILocationLat && entry.APILocationLng){
                pulledLocations.push({lat: entry.APILocationLat, lng: entry.APILocationLng})
            }
        }
        setLocationsArray(pulledLocations);
    }, [entriesArray])

    useEffect(() => {
      if (isLoaded){
        setRenderMarkers(true);
    }
    }, [isLoaded])
    

    const onLoad = useCallback((map) => {
        mapRef.current=map;
        if(location.state.googleMapCenterLat && location.state.googleMapCenterLat.toString().length>0) {
            mapRef.current.setCenter({lat: location.state.googleMapCenterLat, lng: location.state.googleMapCenterLng})
            mapRef.current.setMapTypeId(location.state.googleMapTypeId)
            mapRef.current.setZoom(location.state.googleMapZoom)
        }
    }, [mapRef])
    const onUnMount = () => (mapRef.current=null)

    if (!isLoaded) return <div>Loading...</div>
    
    return (
        <div className="map">
            <GoogleMap
                zoom={12}
                center={center}
                mapContainerClassName="map-container"
                options={options}
                onLoad={onLoad}
                onUnMount={onUnMount}>
                {renderMarkers && locationsArray && locationsArray.length>0 && 
                    locationsArray.map((location) => (location.lat && <Marker position={location} />))}
            </GoogleMap>
        </div>
    )
}


export default Map