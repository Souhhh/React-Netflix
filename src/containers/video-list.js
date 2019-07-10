// Liste des petites vidéos recommandées (en preview) qui contiendront une image et un texte.

import React, {Component} from 'react';
import VideoListItem from '../components/video-list-item'



class VideoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previous: 0, 
            next:6, 
            movieList:props.movieList,
            moviesComedy:props.moviesComedy
        };
        // console.log(moviesComedy)
    }
    
        render() {
            return (
        <div>
            {/* LISTE DES FILMS LES PLUS POPULAIRES */}
            <h4 className="titreSection">{this.props.title}</h4> 
            <div className="container-videoList">
                <a href={`#${this.state.previous}`} className="arrow__btn" onClick={this.scrollLeft.bind(this)}>‹</a>
                <ul className="videos">
                {/* Pour chaque vidéo recommandée, on lui donne un id pour ensuite se référer à lui pour fiare tourner le carousel. */}
                {this.state.movieList.map((movie, index) => {
                
                        return <div id ={index} ><VideoListItem key={movie.id} movie={movie} callback={this.onClickListItem.bind(this)}/></div>
                    })}
                </ul>
                <a href={`#${this.state.next}`} className="arrow__btn" onClick={this.scrollRight.bind(this)}>›</a>
            </div>
            <div>

            {/* LISTE DES FILMS TYPE COMÉDIE */}
            {/* <h4 className="titreSection">Comedy</h4>
            <div className="container-videoList">
                <a href={`#${this.state.previous}`} className="arrow__btn" onClick={this.scrollLeft.bind(this)}>‹</a>
                <ul className="videos">
                {/* Pour chaque vidéo recommandée, on lui donne un id pour ensuite se référer à lui pour fiare tourner le carousel. */}
                {/* {this.state.moviesComedy.map((movie, index) => { */}
                
                        {/* return <div id ={index} ><VideoListItem key={movie.id} movie={movie} callback={this.onClickListItem.bind(this)}/></div> */}
                    {/* })} */}
                {/* </ul> */}
                {/* <a href={`#${this.state.next}`} className="arrow__btn" onClick={this.scrollRight.bind(this)}>›</a> */}
            {/* </div> */} 
            
            {/* LISTE DES DOCUMENTAIRES */}
            {/* <h4 className="titreSection">Documentary</h4> */}
            

            {/* LISTE DES FILMS D'HORREUR */}
            {/* <h4 className="titreSection">Horror</h4> */}
        </div>
        </div>

        
    );
};
    onClickListItem(movie){
        // console.log('Parent :', movie);
        this.props.callback(movie);
    };
    
    scrollLeft(){
        if (this.state.previous > 0){
            this.setState({previous:this.state.previous-1});
            this.setState({next:this.state.next-1});
        }
    }
    scrollRight(){
        if (this.state.next < this.state.movieList.length-1){
            this.setState({previous:this.state.previous+1});
            this.setState({next:this.state.next+1});
        }
    };    
}
export default VideoList;

