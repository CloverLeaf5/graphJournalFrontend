import React from 'react'
import { useLocation } from 'react-router-dom'

const SavedViewPage = () => {

    const location = useLocation();
    console.log(location.state)

    return (
        <div>SavedViewPage</div>
    )
}

export default SavedViewPage