import React from 'react'
import BasicLayout from '../../layouts/BasicLayout'


const NameCard = (props) => {

    const name = props.title;
    
    return (
        <BasicLayout>
            <div className="name-card" onClick={props.whenClicked}>
                <h5>{name}</h5>
            </div>
        </BasicLayout>
    )
}

export default NameCard