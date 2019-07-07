import React from 'react';
// import 'Toolbar.css';
import SearchBar from '../search-bar'

const toolbar = (props) => (
    <header className="toolbar mb-5">
        <nav className="toolbar__navigation">
            <div></div>
            <div className="toolbar__logo"><a href="/">Netflix</a></div>
            {/* <div className="spacer"></div> */}
            <div className="toolbar_navigation-items">
                <ul>
                    <li><a className="li" href="/">Home</a></li>
                    <li><a href="/">TV Shows</a></li>
                    <li><a href="/">Movies</a></li>
                    <li><a href="/">Recently Added</a></li>
                    <li><a href="/">My List</a></li>
                {/* <SearchBar/> */}
                </ul>
            </div>
            <div className="spacer"></div>
            <div className="toolbar_navigation-items">
                <ul>
                    <li><a href="/">KIDS</a></li>
                    <li className="navDroite"><a href="/">DVD</a></li>
                    {/* <img src="../../../images/cloche-notifications.png"></img> */}
                </ul>
            </div>
        </nav>
    </header>
);
export default toolbar;