import React from 'react';
import './faceRecognitionStyles.css';

const FaceRecognition = ({imageURL, box}) => {
    return (
        <div className="center ma">
            <div className="image absolute mt2">
                <img id="inputimage" src={imageURL} alt=""/>
                <div className="bounding-box"
                     style={{top: box.topRow, bottom: box.bottomRow, right: box.rightCol, left: box.leftCol}}
                />
            </div>
        </div>
    );
}

export default FaceRecognition;