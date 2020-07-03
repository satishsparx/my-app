import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import StarIcon from '@material-ui/icons/Star';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { getPlaces,getPlaceInfo } from '../service';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import * as placesActions from '../actions.js';
import '../assets/modals.scss';

class ListPlaces extends Component {
    constructor(props){
        super(props);
        this.state = {
            places: [],
            show: false,
            iconColor: new Array(100).fill('grey'),
            selectedPlace: '',
        }
    }
    componentDidMount(){
        const resp = getPlaces();
        resp.then(data => {
            this.setState({
                places: data.data.places
            })
        })
        .catch(err => {
            console.log(err);
        })
    }
    // Making an api call to retrieve the data
    clickHandler = (id) => {    
        const resp = getPlaceInfo(id);
        resp.then(data => {
            this.setState({
                selectedPlace: data.data[0],
                show: true
            })
        })
        .catch(err => {
            console.log(err);
        })
    }
    // Changing the color of the favourite icon based on select and unselect
    iconClick = (index, place) => {
        let color;
        if(this.props.iconColors[index] === 'red'){
            color = 'grey'
            this.props.actions.removeFavouritePlace(place);
        }
        else{
            this.props.actions.addFavouritePlace(place);
            color = 'red'
        }
        this.props.actions.changeIconColor(index, color);
    }
    // Modal open
    showModal = () => {
        this.setState({ show: true });
    } 
    hideModal = () => {
        this.setState({ show: false });
    }
    render() {
        let comp = null;
        if(this.state.places.length > 0){
            comp = this.state.places.map((place, index) => {
                return <List key={index} >
                        <ListItem alignItems="flex-start" button onClick={() => this.clickHandler(place.id)}>
                        <ListItemAvatar>
                            <Avatar alt={place.name} src={place.cover} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={place.name}
                        />
                        <ListItemIcon>
                            <StarIcon style={{ color: this.props.iconColors[index] }} onClick={() => this.iconClick(index,place)}/>
                        </ListItemIcon>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    </List>
            })
        }
        else {
            comp = <h3>Loading places....</h3>;
        }
        return (
            <div>
                {comp}
                <Modal show={this.state.show} handleClose={this.hideModal} >
                <List >
                    <ListItem alignItems="flex-start" >
                        <ListItemAvatar>
                            <Avatar alt={this.state.selectedPlace.name} src={this.state.selectedPlace.cover} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={this.state.selectedPlace.name}
                            secondary={
                                <React.Fragment>
                                  <Typography
                                    component="span"
                                    variant="body2"
                                    color="textPrimary"
                                  >
                                    {this.state.selectedPlace.location+ " "+this.state.selectedPlace.pincode}
                                  </Typography>
                                  {" - "+this.state.selectedPlace.official_description}
                                </React.Fragment>
                              }
                        />
                    </ListItem>
                </List>
                </Modal>
            </div>
        );
    }
}

const propTypes = {
    favouritePlaces: PropTypes.array
}

ListPlaces.propTypes = propTypes;

const mapStateToProps = state => ({
    favouritePlaces: state.favouritePlaces,
    iconColors: state.iconColors
})

const mapDispatchToProps = dispatch => ({
    actions : bindActionCreators(placesActions,dispatch)
})

// Handling the Modal
const Modal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? 'modal display-block' : 'modal display-none';
  
    return (
      <div className={showHideClassName}>
        <section className='modal-main'>
          {children}
          <button
            onClick={handleClose}
          >
            Close
          </button>
        </section>
      </div>
    );
  };

export default connect(mapStateToProps, mapDispatchToProps)(ListPlaces);