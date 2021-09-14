import React from 'react';
import './ImageLinkFormStyles.css';

const ImageLinkForm = ({onChange, onDetect}) => {
    return (
        <div>
            <p className='white f3 mt0'>
                Detect faces in pictures.
            </p>
            <div className="center">
                <div className="search-container center pa4 br3 shadow-5">
                    <input type='text' className='search-input f4 pa2' onChange={onChange}/>
                    <button className='search-detect grow link ph3 pv2 dib bg-light-purple'
                            onClick={onDetect}>
                        Detect
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;