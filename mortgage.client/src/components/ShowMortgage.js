import React, {  useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/mortgage";
import {
  Grid,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  withStyles,
  ButtonGroup,
  Button,
} from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";

const styles = (theme) => ({
  root: {
    "& .MuiTableCell-head": {
      fontSize: "1.25rem",
    },
  },
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
});

const DashBoard = ({ classes, ...props }) => {
  
  useEffect(() => {
    props.mortgageList();
  }, []); //componentDidMount

  //toast msg.
  const { addToast } = useToasts();

  const onDelete = (id) => {
    if (window.confirm("Are you sure to delete this record?"))
      props.deleteMortgage(id, () =>
        addToast("Deleted successfully", { appearance: "info" })
      );
  };

  return (
    <div>
      <Paper className={classes.paper} elevation={3}>
        <Grid container>
          <Grid item xs={6}>
          </Grid>
          <Grid item xs={10}>
            <TableContainer>
              <Table>
                <TableHead className={classes.root}>
                  <TableRow>
                    <TableCell>MortgageType</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>PaymentType</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody styles={"height: 400px; overflow: scroll;"}>
                  {props.customerList.map((record, index) => {
                    return (
                      <TableRow key={index} hover>
                        <TableCell>{record.mortgageType}</TableCell>
                        <TableCell>{record.mortgageAmount}</TableCell>
                        <TableCell>{record.paymentType}</TableCell>
                        <TableCell>
                          <ButtonGroup variant="text">
                            <Button>
                              <EditIcon
                                color="primary"
                                onClick={(event) =>
                                  (window.location.href = "/Mortgage")
                                }
                              ></EditIcon>
                            </Button>
                            <Button>
                              <DeleteIcon
                                color=""
                                onClick={() => onDelete(record.id)}
                              />
                            </Button>
                          </ButtonGroup>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
                <TableHead className={classes.root}>
                  <br />
                  <br />
                </TableHead>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Paper>
      <div>
        <Button
          style={{ float: "right" }}
          variant="contained"
          color="primary"
          type="submit"
          className={classes.smMargin}
          onClick={(event) => (window.location.href = "/Mortgage")}
        >
          Previous
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  customerList: state.mortgageReducers.list,
});

const mapActionToProps = {
  mortgageList: actions.fetchAllMortgage,
  deleteMortgage: actions.DeleteMortgage,
  SetCurrentMortgage: actions.SetCurrentMortgage,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(DashBoard));