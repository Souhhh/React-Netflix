import React, {Component} from 'react'
import SearchBar from '../components/search-bar'
import VideoList from './video-list'
import VideoDetail from '../components/video-detail'
import Video from '../components/video'
import axios from 'axios'
//import Row from 'react-bootstrap/Row';
import Toolbar from '../components/Toolbar/Toolbar'
import Carousel from '../components/Carousel/Carousel';

const API_END_POINT = "https://api.themoviedb.org/3/" // point d'entrer de l'API
const POPULAR_MOVIES_URL = "discover/movie?language=fr&sort_by=popularity.desc&include_adult=false&append_to_response=images"
const API_KEY = "api_key=844132b4db1beb141b6a86d0d727445a"
const SEARCH_URL = "search/movie?language=fr&include_adult=false"


class App extends Component {
    constructor(props) {
        super(props)
        this.state = {movieList:{}, currentMovie:{}}
    }

    componentWillMount() {
        this.initMovies();
    }
    // Changement du slice. Avant : 1,6 et maintenant : 1,19.
    initMovies(){
        axios.get(`${API_END_POINT}${POPULAR_MOVIES_URL}&${API_KEY}`).then(function(response){
            this.setState({movieList:response.data.results.slice(1,19), currentMovie:response.data.results[0]}, function(){
                this.applyVideoToCurrentMovie();
            });

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
            this.setState({movieList:response.data.results.slice(0,19)});
        }.bind(this));
    }
    

    onClickSearch(searchText){
        if(!searchText) return;

        axios.get(`${API_END_POINT}${SEARCH_URL}&${API_KEY}&query=${searchText}`).then((response) => {
            if(!response.data || !response.data.results[0]) return;
            if(response.data.results[0].id != this.state.currentMovie.id){
            this.setState({currentMovie: response.data.results[0]},() => {
                this.applyVideoToCurrentMovie();
                this.setRecommendation();
            })
        }
    });
}


    render() {
        const renderVideoList = () => {
            if(this.state.movieList.length>=5){
                return <VideoList movieList={this.state.movieList} callback={this.onClickListItem.bind(this)}/>
            }
        }
        return (
            <div>
                <div>
                <header className="toolbar mb-5">
        <nav className="toolbar__navigation">
            <div></div>
            <div className="toolbar__logo"><a href="/">Netflix</a></div>
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
                <div>
                    {renderVideoList()} 
                </div>
            </div>
        )
    }
}
export default App;