import { Combobox, ComboboxInput, ComboboxList, ComboboxOption, ComboboxPopover } from '@reach/combobox';
import "@reach/combobox/styles.css";
import { useLoadScript } from '@react-google-maps/api'
import { Label } from 'evergreen-ui';
import React, { useRef, useState } from 'react'
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import Map from './Map';

const MapInput = (props) => {

    const { mapSearchField, setMapSearchField } = props;
    const { mapLocation, setMapLocation } = props;

    const mapRef = useRef();

    // This state is required to prevent a warning about reloading the library
    const [ libraries ] = useState(['places']);
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: libraries
    });

    const {
        ready,
        value,
        setValue,
        suggestions: {status, data},
        clearSuggestions
    } = usePlacesAutocomplete({
        defaultValue: mapSearchField
      });


    const handleSelect = async (selection) => {
        setValue(selection, false);
        clearSuggestions();

        const results = await getGeocode({address: selection})
        const {lat, lng} = await getLatLng(results[0]);
        setMapSearchField(selection);
        setMapLocation({
            lat: lat,
            lng: lng
        })

        mapRef.current?.panTo({lat:lat,lng:lng})

    }

    if (!isLoaded) return <div>Loading...</div>

    return (
        <>
            <Label>Use Google Maps to find location (optional)</Label>
            <Combobox onSelect={handleSelect}>
                <ComboboxInput
                    value={value}
                    onChange={e=>setValue(e.target.value)}
                    disabled={!ready}
                    placeholder='Search for Location...'
                />
                <ComboboxPopover>
                    <ComboboxList>
                        {status === "OK" && data.map(
                            ({place_id, description}) => 
                                <ComboboxOption key={place_id} value={description} />
                        )}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
            <Map mapLocation={mapLocation} mapRef={mapRef} isLoaded={isLoaded} />
        </>
    )
}

export default MapInput