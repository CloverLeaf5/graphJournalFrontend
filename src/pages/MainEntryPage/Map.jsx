import { GoogleMap, Marker } from '@react-google-maps/api'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import "./map.css"

const homeCenterLat = 33.505238;
const homeCenterLng = -111.919051;

const Map = (props) => {

    const { mapRef, mapLocation, isLoaded } = props;
    const [renderMarker, setRenderMarker] = useState(false)
    
    const [center, setCenter] = useState({
        lat: homeCenterLat,
        lng: homeCenterLng
    })

    const options = useMemo(() => ({
        clickableIcons: false
    }), []);
    
    useEffect(() => {
        mapLocation.lat ? setCenter(mapLocation)
        : navigator.geolocation.getCurrentPosition(position => {
            setCenter({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            })
      })
    
    }, [mapLocation])

    useEffect(() => {
      if (isLoaded){
        setRenderMarker(true);
    }
    }, [isLoaded])
    

    const onLoad = useCallback((map) => (mapRef.current=map), [mapRef])
    const onUnMount = () => (mapRef.current=null)
    
    return (
        <div className="map">
            <GoogleMap
                zoom={12}
                center={center}
                mapContainerClassName="map-container"
                options={options}
                onLoad={onLoad}
                onUnMount={onUnMount}>
                {renderMarker && mapLocation.lat && <Marker position={mapLocation} />}
            </GoogleMap>
        </div>
    )
}


export default Map