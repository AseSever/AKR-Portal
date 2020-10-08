import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

//MATERIAL-UI
import ViewListIcon from '@material-ui/icons/ViewList';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Tooltip,
    Grid,
    Button,
} from '@material-ui/core';

// styles for table cells
const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

// styling every other table row
const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        maxWidth: '50%',
    },
});

function InactiveMembers(props) {

    useEffect(() => {
        //Setting users
        props.dispatch({ type: 'GET_INACTIVE_USERS' })

    }, []);

    // function to deactivate a user
    const handleDeactivateUser = (event) => {

    }

    const classes = useStyles();

    return (
        <div>
            <Grid container justify="center" alignItems="center">
                <Grid item xs={12} align="center">
                    <TableContainer component={Paper} className={classes.table}>
                        <Table aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">Name</StyledTableCell>
                                    <StyledTableCell align="center">Status</StyledTableCell>
                                    <StyledTableCell align="center">More</StyledTableCell>
                                    {props.store.user.auth_level >= 20 &&
                                        <StyledTableCell align="center">Remove</StyledTableCell>
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.store.members.inactiveMembersReducer.map((member, id) => {
                                    return (
                                        <StyledTableRow component="tr" scope="row" key={id}>
                                            <StyledTableCell align="center">{member.fname} {member.lname}</StyledTableCell>
                                            <StyledTableCell align="center">
                                                {!member.is_current_member || member.auth_level === 0
                                                    ?
                                                    <Button>Activate</Button>
                                                    : ''}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                <Tooltip title="Add Note" placement="left">
                                                    <IconButton>
                                                        <NoteAddIcon
                                                            color="primary"
                                                        ></NoteAddIcon>
                                                    </IconButton>
                                                </Tooltip>
                                                {member.notes || member.equipment_checkout ?
                                                    <Tooltip title="Instructor Notes" placement="left">
                                                        <IconButton>
                                                            <SpeakerNotesIcon></SpeakerNotesIcon>
                                                        </IconButton>
                                                    </Tooltip>
                                                    :
                                                    ''
                                                }
                                            </StyledTableCell>
                                            {props.store.user.auth_level >= 20 &&
                                                <StyledTableCell align="center">
                                                    <Tooltip title="Delete User" placement="left">
                                                        <IconButton>
                                                            <DeleteIcon
                                                                color="secondary"
                                                            ></DeleteIcon>
                                                        </IconButton>
                                                    </Tooltip>
                                                </StyledTableCell>
                                            }
                                        </StyledTableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </div>
    );
}

export default connect(mapStoreToProps)(InactiveMembers);