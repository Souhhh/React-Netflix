// Liste des petites vidéos recommandées (en preview) qui contiendront une image et un texte.

import React from 'react';
import VideoListItem from '../components/video-list-item'


const VideoList = (props) => {    
    const {movieList} = props;
    return (
        <div>
            <ul>
                {movieList.map(movie => {
                        return <VideoListItem key= {movie.id} movie={movie} callback={onClickListItem}/>
                    })}
            </ul>
        </div>
    );
    function onClickListItem(movie){
        // console.log('Parent :', movie);
        props.callback(movie);
    }
}
export default VideoList;