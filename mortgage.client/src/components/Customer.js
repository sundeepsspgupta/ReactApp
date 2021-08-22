import React, { useState, useEffect, useRef } from "react";
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
import * as actions from "../actions/customer";
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
  title: "",
  firstName: "",
  lastName: "",
  dob: "",
  smoker: "",
};

const CustomerForm = ({ classes, ...props }) => {
  const { addToast } = useToasts();

  const validate = (fieldValues = values) => {
    let validationErrors = { ...errors };
    if ("title" in fieldValues)
      validationErrors.title = fieldValues.title
        ? ""
        : "This field is required.";
    if ("firstName" in fieldValues)
      validationErrors.firstName = fieldValues.firstName
        ? ""
        : "This field is required.";
    if ("lastName" in fieldValues)
      validationErrors.lastName = fieldValues.lastName
        ? ""
        : "This field is required.";
    if ("dob" in fieldValues)
      validationErrors.dob = fieldValues.dob ? "" : "This field is required.";
    if ("smoker" in fieldValues)
      validationErrors.smoker = fieldValues.smoker
        ? ""
        : "This field is required.";

    setErrors({
      ...validationErrors,
    });

    if (fieldValues === values)
      return Object.values(validationErrors).every((x) => x === "");
  };

  const { values,  errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFieldValues, validate, props.setCurrentId);

  //material-ui select
  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const onSuccess = () => {
        resetForm();
        addToast("Submitted successfully", { appearance: "success" });
      };
      props.createCustomer(values, onSuccess);
    }
  };
  return (
    <div
      style={{
        boxShadow: 1,
        border: "1px solid black",
      }}
    >
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
              Title
            </InputLabel>
            <br /> <br />
            <InputLabel className={classes.formControl} ref={inputLabel}>
              First Name
            </InputLabel>
            <br /> <br />
            <InputLabel className={classes.formControl} ref={inputLabel}>
              Last Name
            </InputLabel>
            <br /> <br />
            <InputLabel className={classes.formControl} ref={inputLabel}>
              DOB{" "}
            </InputLabel>
            <br /> <br />
            <InputLabel className={classes.formControl} ref={inputLabel}>
              Smoke/NonSMoker
            </InputLabel>
            <br /> <br />
            <br /> <br />
          </Grid>
          <Grid item xs={6}>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              {...(errors.title && { error: true })}
            >
              <TextField
                name="title"
                variant="outlined"
                label="Title"
                value={values.title}
                onChange={handleInputChange}
                {...(errors.title && {
                  error: true,
                  helperText: errors.fullName,
                })}
              />
              <br />
              <TextField
                name="firstName"
                variant="outlined"
                label="First Name"
                value={values.firstName}
                onChange={handleInputChange}
                {...(errors.firstName && {
                  error: true,
                  helperText: errors.firstName,
                })}
              />
              <br />
              <TextField
                name="lastName"
                variant="outlined"
                label="Last Name"
                value={values.lastName}
                onChange={handleInputChange}
                {...(errors.lastName && {
                  error: true,
                  helperText: errors.lastName,
                })}
              />
              <br />
              <TextField
                name="dob"
                variant="outlined"
                value={values.dob}
                type="date"
                onChange={handleInputChange}
                {...(errors.dob && {
                  error: true,
                  helperText: errors.dob,
                })}
              />
              <br />
              <Select
                name="smoker"
                value={values.smoker}
                onChange={handleInputChange}
                labelWidth={labelWidth}
                displayEmpty
              >
                <MenuItem value="">Select Smoker</MenuItem>
                <MenuItem value="1">Yes</MenuItem>
                <MenuItem value="0">No</MenuItem>
              </Select>
              {errors.smoker && (
                <FormHelperText>{errors.smoker}</FormHelperText>
              )}
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
          onClick={(event) => (window.location.href = "/Mortgage")}
        >
          NEXT
        </Button>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  createCustomer: actions.create
};

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(CustomerForm));
