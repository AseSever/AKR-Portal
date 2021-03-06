import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import {
  Paper,
  Grid,
  Typography
} from '@material-ui/core'


function MyDojo(props) {
  const [heading, setHeading] = useState('My Dojo');

  useEffect(() => {
    props.dispatch({
      type: "GET_MY_DOJO"
    });
    props.dispatch({
      type: "FETCH_USER_INFO",
      payload: "user",
    });
  }, [])

  return (
    <div>
      {/* map through our myDojo reducer */}
      <Grid container justify="center" alignItems="center">
        <Grid item xs={12} align="center">
          <Typography variant="h4" style={{ margin: 10 }}>{heading}</Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Paper
            elevation={10}
            style={{ width: "87vmin", padding: "10px", backgroundColor: "#945C39" }}>

            {props.store.myDojo.map((member, id) => {
              return (
                <Paper
                  key={id}
                  elevation={5}
                  style={{ padding: 10, margin: 10, backgroundColor: "#ECE7D1" }}>
                  <Grid container justify="center" alignItems="center">
                    <Grid item xs={4} align="left">
                      <Typography variant="overline" display="block">
                        {member.fname} {member.lname}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} align="center">
                      <Typography variant="overline" display="block">
                        {member.fname_japanese} {member.lname_japanese}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} align="right">
                      <Typography variant="overline" display="block">
                        {member.student_rank} {member.teaching_rank}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              )
            })}
          </Paper>
        </Grid>
      </Grid>

    </div>
  );
}

export default connect(mapStoreToProps)(MyDojo);