import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as placesActions from '../actions.js';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

class Favourites extends Component {
    render() {
        let comp = null;
        if(this.props.favouritePlaces.length > 0){
            comp = this.props.favouritePlaces.map((place, index) => {
                return <List key={index} >
                        <ListItem alignItems="flex-start" >
                        <ListItemAvatar>
                            <Avatar alt={place.name} src={place.cover} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={place.name}
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    </List>
            })
        }
        else {
            comp = <h3>No favourite places</h3>;
        }
        return (
            <div>
                {comp}
            </div>
        );
    }
}

const propTypes = {
    favouritePlaces: PropTypes.array
}

Favourites.propTypes = propTypes;

const mapStateToProps = state => ({
    favouritePlaces : state.favouritePlaces
})

const mapDispatchToProps = dispatch => ({
    actions : bindActionCreators(placesActions,dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Favourites);