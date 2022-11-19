import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import styled from 'styled-components';
import "./quill.bubble.css";


const CardLayout = styled.div`
width: 450px;
height: auto;
display: grid;
grid-template-columns: 1fr 2fr;
justify-content: center;
align-items: center;
font-size: 16px;
border-style: solid;
border-radius: 16px;
margin: 8px auto 8px 5px;
box-shadow: -2px 6px;
cursor: pointer;
`;


const EntryCardOriginal = (props) => {

    const [imageSource, setImageSource] = useState("loading.png")
    const [quillArea, setQuillArea] = useState("");
    const [imgDims, setImgDims] = useState({height:"100px",
                                            width:"100px"})

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
                    console.log("Something went wrong with getting picture(s) from AWS S3");
                    console.log(err);
                }
            } else {
                setImageSource("journal.png")
            }
        }
        setImage()
        setQuillArea(props.entry.details.slice(0,150));
    }, [props.orderChange, props.entriesArray])

    const onImgLoad = ({target:img}) => {
        setImgDims({height:img.offsetHeight, width:img.offsetWidth});
    }
    

    return (
        <div onClick={()=>props.whenClicked()}>
            {imgDims.height>=imgDims.width ? <CardLayout>
            <div className="first-column" style={{padding: "5px 5px 10px 5px"}}>
                <img onLoad={onImgLoad} src={imageSource} style={imageSource!=="journal.png" ? {height: "200px"} : {height: "100px"}} alt="Image representing this entry"></img>
            </div>
            <div className="second-column" style={{padding: "5px 10px 5px 5px"}}>
                {props.entry.pictures.length>1 && 
                    <p style={{textAlign: "right", fontSize: "10px"}}>More Pictures inside <img src="more_pix.png" alt="Polaroids icon" style={{maxHeight: "20px"}}></img></p>
                }
                <h4>{props.entry.startDate}</h4>
                <h3>{props.entry.title}</h3>
                <h4>{props.entry.subtitle}</h4>
                <ReactQuill theme="bubble" value={quillArea} readOnly={true} />
            </div>
        </CardLayout>
        : <CardLayout>
            <div className="first-column" style={{padding: "5px 5px 5px 5px", display: "flex", flexDirection: "column", alignItems: "center"}}>
                <img onLoad={onImgLoad} src={imageSource} style={{width: "200px"}} alt="Image representing this entry"></img>
                <h4>{props.entry.startDate}</h4>
            </div>
            <div className="second-column" style={{padding: "5px 5px 5px 5px"}}>
                {props.entry.pictures.length>1 && 
                    <p style={{textAlign: "right", fontSize: "10px"}}>More Pictures inside <img src="more_pix.png" alt="Polaroids icon" style={{maxHeight: "20px"}}></img></p>
                }
                <h3>{props.entry.title}</h3>
                <h4>{props.entry.subtitle}</h4>
                <ReactQuill theme="bubble" value={quillArea} readOnly={true} />
            </div>
        </CardLayout>}
        </div>
        
        
    )
}

export default EntryCardOriginal