import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ListPlaces from './ListPlaces';
import Favourites from './Favourites';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            places: [],
            comp: 'places'
        }
    }
    clickHandler = (item) => {
        this.setState({
            comp: item
        })
    }
    render() {
        let comp = null

        // Rendering the components based on selection
        if(this.state.comp === 'places'){
            comp = <ListPlaces/>
        }
        else{
            comp = <Favourites />
        }
        return (
            <div >
                <br />
                <ButtonGroup size="large" variant="contained" aria-label="contained primary button group">
                    <Button onClick={() => this.clickHandler('places')}>Places</Button>
                    <Button onClick={() => this.clickHandler('favourite')}>Favourite places</Button>
                </ButtonGroup><br/><br/>
                {comp}
            </div>
        );
    }
}
export default Home;