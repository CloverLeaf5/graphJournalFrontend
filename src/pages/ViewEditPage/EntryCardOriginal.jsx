import axios from 'axios';
import React, { useEffect, useState } from 'react'

const EntryCardOriginal = (props) => {

    const [imageSource, setImageSource] = useState("loading.png")

    useEffect(() => {
        const setImage = async () => {
            if (props.entry.whichImage===2){
                setImageSource(`${props.entry.APIImageDBPath}${props.entry.APIImagePath}`)
            } else if (props.entry.whichImage===1){
                try {
                    const response = await axios
                        .post("http://localhost:5000/api/v1/entry/getAWSPhotoURL", {s3Key: props.entry.pictures[0].location}, { withCredentials: true })
                    if (response && response.data){
                        setImageSource(response.data);
                    }
                }catch (err) {
                    console.log("Something went wrong with group creation");
                    console.log(err);
                }
            }
        }
        setImage()
    }, [])
    

    return (
        <div><img src={imageSource} style={{height: "200px"}}></img></div>
    )
}

export default EntryCardOriginal