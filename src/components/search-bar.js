// Notre barre de recherche.
import React, {Component} from 'react'

class SearchBar extends Component {
    constructor(props){
        super(props);
        this.state = {searchText:"", placeholder:"Entrez votre film ...",
        intervalBeforeRequest:1000,
        lockRequest: false,
        }        
    }
    render() {
        return (
            <div className="row">
                <div className="col-lg-8 input-group">
                    <input type="text" className="form-control input-lg" onChange={this.handleChange.bind(this)} placeholder={this.state.placeholder}/>
                    <span className="input-group-btn">
                        <button className="btn btn-secondary" onClick={this.handleOnClick.bind(this)}>Go</button>                  
                    </span>
                    {/* <p>{this.state.searchText}</p> */}
                </div>
            </div>
        )
    }

    handleChange(event) {
        this.setState({searchText:event.target.value}); // Entre parenthèses, on met le nom de ce qu'on veut modifier.
        if(!this.state.lockRequest){
            this.setState({lockRequest:true})
            setTimeout(function(){this.search()}.bind(this),this.state.intervalBeforeRequest)
        }
    }

    handleOnClick(){
        this.search();
    }

    search(){
        this.props.callback(this.state.searchText);
        this.setState({lockRequest:false})
    }
}
export default SearchBar;