import React, {Component} from 'react'
import SearchBar from '../components/search-bar'
import VideoList from './video-list'
import VideoDetail from '../components/video-detail'
import Video from '../components/video'
import axios from 'axios'

const API_END_POINT = "https://api.themoviedb.org/3/" // point d'entrée de l'API
const POPULAR_MOVIES_URL = "discover/movie?language=fr&sort_by=popularity.desc&include_adult=false&append_to_response=images"
const API_KEY = "api_key=844132b4db1beb141b6a86d0d727445a"
const SEARCH_URL = "search/movie?language=fr&include_adult=false"

const DOC_MOVIES_URL = "discover/movie?language=fr&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=99"

const TRILLER_MOVIES_URL = "discover/movie?language=fr&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=53"

const HORROR_MOVIES_URL = "discover/movie?language=fr&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=27"


class Souflix extends Component {
    constructor(props) {
        super(props)
        this.state = {movieList:{}, currentMovie:{}, moviesDoc:{}, moviesTriller:{}, moviesHorror:{}}
    }

    componentWillMount() {
        this.initMovies();
        this.docMovies();
        this.trillerMovies();
        this.horrorMovies();
    }
    // Changement du slice. Avant : 1,6 et maintenant : 1,19.
    initMovies(){
        axios.get(`${API_END_POINT}${POPULAR_MOVIES_URL}&${API_KEY}`).then(function(response){
            this.setState({movieList:response.data.results.slice(1,19), currentMovie:response.data.results[0]}, function(){
                this.applyVideoToCurrentMovie();
            });

        }.bind(this)); 
    }

    docMovies(){
        axios.get(`${API_END_POINT}${DOC_MOVIES_URL}&${API_KEY}`).then(function(responseDoc){
            //console.log(responseDoc)
            this.setState({moviesDoc:responseDoc.data.results.slice(0,19)});
        }.bind(this)); 
    }

    trillerMovies(){
        axios.get(`${API_END_POINT}${TRILLER_MOVIES_URL}&${API_KEY}`).then(function(responseTr){
            //console.log(responseDoc)
            this.setState({moviesTriller:responseTr.data.results.slice(0,19)});
        }.bind(this)); 
    }

    horrorMovies(){
        axios.get(`${API_END_POINT}${HORROR_MOVIES_URL}&${API_KEY}`).then(function(responseHr){
            //console.log(responseDoc)
            this.setState({moviesHorror:responseHr.data.results.slice(0,19)});
        }.bind(this)); 
    }

    applyVideoToCurrentMovie(){
        axios.get(`${API_END_POINT}movie/${this.state.currentMovie.id}?${API_KEY}&append_to_response=videos&include_adult=false`).then(function(response){
          
            // console.log(response);

            const youtubeKey = response.data.videos.results[0].key;

            let newCurrentMovieState = this.state.currentMovie;
            newCurrentMovieState.videoId = youtubeKey;
            this.setState({currentMovie : newCurrentMovieState});
            // console.log(newCurrentMovieState);
        }.bind(this));
    }

    onClickListItem(movie){
        this.setState({currentMovie:movie}, function(){
            this.applyVideoToCurrentMovie();
            this.setRecommendation();
        })
    }
    
    setRecommendation(){
        axios.get(`${API_END_POINT}movie/${this.state.currentMovie.id}/recommendations?${API_KEY}&language=fr`).then(function(response){
            // Même chose ici, j'ai changé le slice pour avoir plus de 5 recommendations.
            this.setState({movieList:{}});
            // this.setState({movieList:response.data.results.slice(0,19)});    
            const newState = { ...this.state }
            newState.movieList = response.data.results.slice(0,19)
            this.setState(newState)
        }.bind(this));
    }
   
    onClickSearch(searchText){
        if(!searchText) return;

        axios.get(`${API_END_POINT}${SEARCH_URL}&${API_KEY}&query=${searchText}`).then((response) => {
            if(!response.data || !response.data.results[0]) return;
            console.log(response.data.results[0].id)
            console.log(this.state.currentMovie.id)
            if(response.data.results[0].id != this.state.currentMovie.id){               
            this.setState({currentMovie : response.data.results[0]},() => {
                this.applyVideoToCurrentMovie();
                this.setRecommendation();
            })
        }
    });
}


    render() {
        const renderVideoList = () => {
            if(this.state.movieList.length>=5){
                return <VideoList title="Recommendations" movieList={this.state.movieList} callback={this.onClickListItem.bind(this)}/>
            }
        }
        const renderMoviesDoc = () => {
            if(this.state.moviesDoc.length>=5){
                return <VideoList title="Documentary" movieList={this.state.moviesDoc} callback={this.onClickListItem.bind(this)}/>
            }
        }
        const renderMoviesTriller = () => {
            if(this.state.moviesTriller.length>=5){
                return <VideoList title="Triller" movieList={this.state.moviesTriller} callback={this.onClickListItem.bind(this)}/>
            }
        }
        const renderMoviesHorror = () => {
            if(this.state.moviesHorror.length>=5){
                return <VideoList title="Horror" movieList={this.state.moviesHorror} callback={this.onClickListItem.bind(this)}/>
            }
        }
        return (
            <div>
            <div>
                {/* NAVBAR */}
                <div>
                    <header className="toolbar mb-5">
                        <nav className="toolbar__navigation">
                            <div></div>
                            <div className="toolbar__logo"><a href="/">souflix</a></div>
                            {/* <div className="spacer"></div> */}
                            <div className="toolbar_navigation-items">
                                <ul>
                                    <li id="myLi"><a href="/">Home</a></li>
                                    <li><a href="/">TV Shows</a></li>
                                    <li><a href="/">Movies</a></li>
                                    <li><a href="/">Recently Added</a></li>
                                    <li><a href="/">My List</a></li>
                                {/* <SearchBar/> */}
                                </ul>
                            </div>
                            <div className="spacer"></div>
                            <div className="search_bar"> 
                                    <SearchBar callback={this.onClickSearch.bind(this)}/>
                                </div>
                            <div className="toolbar_navigation-items">
                                <ul>
                                    <li><a href="/">KIDS</a></li>
                                    <li className="navDroite"><a href="/">DVD</a></li>
                                    {/* <img src="../../../images/cloche-notifications.png"></img> */}
                                </ul>
                            </div>
                        </nav>
                    </header>
                </div>
                
                {/* PREMIÈRE SECTION DU SITE AVEC LA VIDEO PRINCIPALE ET SON RÉSUMÉ */}
                <div className="container-fluid">
                    <div className="wrapper">
                        <div className="description">
                            <VideoDetail title={this.state.currentMovie.title} description={this.state.currentMovie.overview}/>
                        </div>
                        <div className="lavideo">
                            <Video videoId={this.state.currentMovie.videoId}/>                        
                        </div>
                    </div>
                </div>

                {/* SECONDE SESSION AVEC LE CAROUSEL DE VIDÉOS */}
                <div>
                    {renderVideoList()} 
                    {renderMoviesDoc()}
                    {renderMoviesTriller()}
                    {renderMoviesHorror()}
                </div>
            </div>
            </div>
        )
    }
}
export default Souflix;