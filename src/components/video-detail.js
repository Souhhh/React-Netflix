// Titre et description de notre vidéo.
import React from 'react'

const VideoDetail = ({title, description}) => {
    return (
        <div>
            <h1>{title}</h1>
            <p>{description}</p>
        </div>
    )
}
export default VideoDetail;