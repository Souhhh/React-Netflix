// Notre vidéo youtube.

import React from 'react';

const BASE_URL = "https://www.youtube.com/embed/";

const Video = ({videoId}) => {
    return (
        <div className="embed-responsive embed-responsive-16by9">
            <iframe className="embed-responsive-item"  src={`${BASE_URL}${videoId}?autoplay=1&loop=1;controls=0;showinfo=0`} name="youtube embed" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        </div>
    )
}
export default Video;
