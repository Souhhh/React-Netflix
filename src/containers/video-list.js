// Liste des petites vidéos recommandées (en preview) qui contiendront une image et un texte.

import React from 'react';
import VideoListItem from '../components/video-list-item'


const VideoList = (props) => {    
    const {movieList} = props;
    return (
        <div>
        <h4 className="titreSection">Films recommandés</h4> 

    <a href="#section3" className="arrow__btn">‹</a>
            <ul className="videos">
                {movieList.map(movie => {
                        return <VideoListItem key= {movie.id} movie={movie} callback={onClickListItem}/>
                    })}
            </ul>

    <a href="#section3" className="arrow__btn">‹</a>
        </div>
    );
    function onClickListItem(movie){
        // console.log('Parent :', movie);
        props.callback(movie);
    }
}
export default VideoList;