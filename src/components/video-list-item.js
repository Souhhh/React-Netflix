// Liste des vidéos avec une image (et un peut descriptif du film).

import React from 'react';

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500/";
const VideoListItem = (props) => {
    const movie = props.movie;
    return <li className="list-group-item" onClick={handleOnClick}>
            <div className="media">
                <div className="media-left">
                    <img className="media-object img-roundd" src={`${IMAGE_BASE_URL}${movie.poster_path}`}/>
                </div>
                {/* <div className="media-body"> */}
                    {/* <h3 className="title_list_item">{movie.title}</h3>  */}
                {/* </div> */}
            </div>
           </li>

           function handleOnClick(){
               props.callback(movie);
           }
}
export default VideoListItem;