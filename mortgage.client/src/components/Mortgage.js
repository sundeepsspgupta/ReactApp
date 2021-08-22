import React, { useState } from "react";
import {
  Grid,
  TextField,
  withStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  FormHelperText,
} from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/mortgage";
import { useToasts } from "react-toast-notifications";

const styles = (theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      minWidth: 230,
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 230,
  },
  smMargin: {
    margin: theme.spacing(1),
  },
});

const initialFieldValues = {
  customerID: 0,
  mortgageType: "",
  mortgageAmount: "",
  paymentType: "",
};

const MortgageForm = ({ classes, ...props }) => {
  const { addToast } = useToasts();

  const validate = (fieldValues = values) => {
    let validationErrors = { ...errors };
    if ("mortgageType" in fieldValues)
      validationErrors.mortgageType = fieldValues.mortgageType
        ? ""
        : "This field is required.";
    if ("mortgageAmount" in fieldValues)
      validationErrors.mortgageAmount = fieldValues.mortgageAmount
        ? ""
        : "This field is required.";
    if ("paymentType" in fieldValues)
      validationErrors.paymentType = fieldValues.paymentType
        ? ""
        : "This field is required.";

    setErrors({
      ...validationErrors,
    });

    if (fieldValues === values)
      return Object.values(validationErrors).every((x) => x === "");
  };

  const { values, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFieldValues, validate, props.setCurrentId);

  //material-ui select
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const onSuccess = () => {
        resetForm();
        addToast("Submitted successfully", { appearance: "success" });
      };
      props.createMortgage(values, onSuccess);
    }
  };
 
  return (
    <div style={{
      boxShadow: 1,
      border: "1px solid black",
    }}>
      <form
        autoComplete="off"
        noValidate
        className={classes.formControl}
        onSubmit={handleSubmit}
      >
        <Grid container>
          <Grid item xs={3}>
            <br />
            <InputLabel className={classes.formControl} ref={inputLabel}>
              Mortgage Type
            </InputLabel>
            <br /> <br />
            <InputLabel className={classes.formControl} ref={inputLabel}>
              Amount
            </InputLabel>
            <br /> <br />
            <InputLabel className={classes.formControl} ref={inputLabel}>
              Payment Type
            </InputLabel>
            <br /> <br />
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="outlined" className={classes.formControl}>
            <Select
                name="mortgageType"
                value={values.mortgageType}
                onChange={handleInputChange}
                labelWidth={labelWidth}
                displayEmpty
              >
                <MenuItem value="">Select Mortgage Type</MenuItem>
                <MenuItem value="Mortgage1">Mortgage1</MenuItem>
                <MenuItem value="Mortgage2">Mortgage2</MenuItem>
                <MenuItem value="Mortgage3">Mortgage3</MenuItem>
                <MenuItem value="Mortgage4">Mortgage4</MenuItem>
              </Select>
              {errors.paymentType && (
                <FormHelperText>{errors.paymentType}</FormHelperText>
              )}
              <br />
              <TextField
                name="mortgageAmount"
                variant="outlined"
                label="Amount"
                value={values.mortgageAmount}
                onChange={handleInputChange}
                {...(errors.mortgageAmount && {
                  error: true,
                  helperText: errors.mortgageAmount,
                })}
              />
              <br />
              <Select
                name="paymentType"
                value={values.paymentType}
                onChange={handleInputChange}
                labelWidth={labelWidth}
                displayEmpty
              >
                <MenuItem value="">Select Payment Type</MenuItem>
                <MenuItem value="Monthly">Monthly</MenuItem>
                <MenuItem value="Yearly">Yearly</MenuItem>
              </Select>
              {errors.paymentType && (
                <FormHelperText>{errors.paymentType}</FormHelperText>
              )}
              <br />
            </FormControl>

            <div>
              <Button
                variant="contained"
                className={classes.smMargin}
                onClick={resetForm}
              >
                Reset
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.smMargin}
              >
                Submit
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
      <div>
        <Button
          style={{ float: "right" }}
          variant="contained"
          color="primary"
          type="submit"
          className={classes.smMargin}
          onClick={(event) => (window.location.href = "/ShowMortgage")}
        >
          NEXT
        </Button>
      </div>
    </div>
  );
};

const mapActionToProps = {
  createMortgage: actions.createMortgage
};

export default connect(
  null,
  mapActionToProps
)(withStyles(styles)(MortgageForm));
