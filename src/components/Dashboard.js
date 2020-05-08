import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Question from './Question';

class Dashboard extends Component {
    state = {
        value: 0, // to keep track of active tab
    }

    handleChange = (event, value) => { // update state value on tab click
        this.setState({ value });
    }

    render () {
        const { value } = this.state;

        return (
            <div className='component-container'>
                <Paper>
                    <Tabs value={value} onChange={this.handleChange} centered>
                        <Tab label="Unanswered Questions" />
                        <Tab label="Answered Questions" />
                    </Tabs>
                </Paper>
                {value === 0 && // Unanswered Questions tab content
                    <div>
                        <Grid container spacing={16} style={{marginTop: '1rem'}}>
                            {this.props.unansweredQuestionIds.map(id => (
                                <Grid item xs={12} sm={6} key={id}>
                                    <Question id={id} />
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                }
                {value === 1 &&  // Answered Questions tab content
                    <div>
                        <Grid container spacing={16} style={{marginTop: '1rem'}}>
                            {this.props.answeredQuestionIds.map(id => (
                                <Grid item xs={12} sm={6} key={id}>
                                    <Question id={id} />
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                }
            </div>
        )
    }
}

function mapStateToProps ({ questions, authedUser, users }) {
    const answeredQuestionIds = Object.keys(users[authedUser].answers).sort((a,b)=>questions[b].timestamp-questions[a].timestamp);
    const unansweredQuestionIds = Object.keys(questions).filter(q => !answeredQuestionIds.includes(q)).sort((a,b)=>questions[b].timestamp-questions[a].timestamp);

    return {
        answeredQuestionIds,
        unansweredQuestionIds
    }
}

export default connect(mapStateToProps)(Dashboard);