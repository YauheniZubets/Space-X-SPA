import React from 'react';

import './Preloadcircle.css';

const Preloadcircle = ({hide}) => {
    return ( 
        <div style={{display: hide ? 'none' : 'block', height: '40vh'}}> 
            <div className="preloader-5 "></div>
        </div>
    )
};

export default Preloadcircle;