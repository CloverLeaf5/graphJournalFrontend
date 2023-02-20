import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import "./map.css"

const homeCenterLat = 33.505238;
const homeCenterLng = -111.919051;

const MapSingle = (props) => {

    const { entry } = props;
    const [renderMarkers, setRenderMarkers] = useState(false)
    const [center, setCenter] = useState({
        lat: homeCenterLat,
        lng: homeCenterLng
    })

    const options = useMemo(() => ({
        clickableIcons: false,
        disableDefaultUI: true
    }), []);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    });
    
    useEffect(() => {
        if (entry.useAPILocation && entry.APILocationLat && entry.APILocationLng){
            setCenter({lat: entry.APILocationLat, lng: entry.APILocationLng})
        }
    
    }, [])

    useEffect(() => {
      if (isLoaded){
        setRenderMarkers(true);
    }
    }, [isLoaded])
    

    const onLoad = useCallback((map) => {
        // mapRef.current=map;
        if(entry.useAPILocation && entry.APILocationLat && entry.APILocationLat.toString().length>0) {
            map.setCenter({lat: entry.APILocationLat, lng: entry.APILocationLng})
        }
    }, [])
    // const onUnMount = () => (mapRef.current=null)

    if (!isLoaded) return <div>Loading...</div>
    
    return (
        <div className="map">
            <GoogleMap
                zoom={12}
                center={center}
                mapContainerClassName="map-container"
                options={options}
                onLoad={onLoad}
                // onUnMount={onUnMount}
                >
                {renderMarkers && <Marker position={center} />}
            </GoogleMap>
        </div>
    )
}


export default MapSingle