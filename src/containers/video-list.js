// Liste des petites vidéos recommandées (en preview) qui contiendront une image et un texte.

import React from 'react';
import VideoListItem from '../components/video-list-item'



const VideoList = (props) => {    
    const {movieList} = props;
    let previous = 0;
    let next = 6;
    
        return (
        <div>
            <h4 className="titreSection">Films recommandés</h4> 
            <div className="container-videoList">
                <a href="#0" className="arrow__btn">‹</a>
                <ul className="videos">
                {/* Pour chaque vidéo recommandée, on lui donne un id pour ensuite se référer à lui pour fiare tourner le carousel. */}
                {movieList.map((movie, index) => {
                        return <div id ={index} ><VideoListItem key= {movie.id} movie={movie}/></div>
                    })}
                </ul>
                <a href={`#${next}`} className="arrow__btn" onClick={scrollRight} callback={scrollRight}>›</a>
            </div>
        </div>
        );
    
    function onClickListItem(movie){
        // console.log('Parent :', movie);
        props.callback(movie);
    };
    function scrollRight(){
        next+=1;
        alert(next);
    }
}
export default VideoList;