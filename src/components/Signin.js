import React, { Component } from 'react';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { setAuthedUser } from '../actions/authedUser';

class Signin extends Component {
    state={
        selectedUser: '' // keep track of selected user
    }

    handleUserSelect = (value) => { // update state selectedUser based user selection
        this.setState(()=> ({
            selectedUser: value
        }))
    }

    handleSubmit = (e) => { // to handle signin button click
        e.preventDefault();

        const { dispatch } = this.props;
        dispatch(setAuthedUser(this.state.selectedUser));
    }

    render () {
        const { users } = this.props;

        return (
            <div className="component-container">
                <Typography variant="subheading" gutterBottom>
                    Signin to create poll, vote and compete in leaderboard
                </Typography>
                <FormControl className='form-container'>
                    <InputLabel htmlFor="select-user">Select User</InputLabel>
                    <Select
                        value={this.state.selectedUser}
                        onChange={(e)=>this.handleUserSelect(e.target.value)}
                        inputProps={{
                            name: 'user',
                            id: 'select-user',
                        }}
                        fullWidth
                    >
                        {users && 
                            Object.keys(users).map(user => (
                                <MenuItem key={user} value={user}>
                                    <Avatar alt={users[user].name+' profile picture'} src={users[user].avatarURL} className="select-avatar" />                                    
                                    {users[user].name}
                                </MenuItem>
                            ))
                        }
                    </Select>
                </FormControl><br />
                <Button variant="contained" color="primary" 
                    onClick={this.handleSubmit} 
                    disabled={!this.state.selectedUser}
                    style={{marginTop: '1rem'}}
                >
                    Signin
                </Button>
            </div>
        )
    }
}

function mapStateToProps ({ users }) {
    return {
        users
    }
  }
  
export default connect(mapStateToProps)(Signin);