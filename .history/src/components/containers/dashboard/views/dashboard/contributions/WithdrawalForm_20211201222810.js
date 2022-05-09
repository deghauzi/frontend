import React, { useState } from "react";
import { Field, reduxForm, stopSubmit, reset } from "redux-form";
import axiosInstance from "util/api";
import { setLoading, offLoading } from "store/actions/Common";
import * as actionTypes from "store/actions/ActionTypes";
import { useDispatch, useSelector } from "react-redux";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import CircularProgress from "util/CircularProgress";


const ProjectForm = ({ mime, handleSubmit, submitting, pristine, history }) => {
  const dispatch = useDispatch();
  const auctionState = useSelector((state) => state.commonReducer);
  const { loading } = auctionState;
  const onSubmit = async (formValues) => {
    let formData = new FormData();
    formData.append("request_date", formValues.request_date);
    formData.append("request_reasons", formValues.request_reasons);
    formData.append("request_amount", formValues.request_amount);

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

    dispatch(setLoading());
    try {
      const res = await axiosInstance.post("request/withdrawal", formData, config);
      dispatch({ type: actionTypes.SHOW_SUCCESS_MESSAGE, payload: "Request Submitted" });
      dispatch(stopSubmit("requestForm"));
      dispatch(reset("requestForm"));
      dispatch(offLoading());
    } catch (error) {
      dispatch({ type: actionTypes.CREATE_PROJECT_FAIL });
      dispatch({ type: actionTypes.SHOW_ERROR_MESSAGE, payload: error.response.message });
      dispatch(stopSubmit("requestForm"));
      dispatch(reset("requestForm"));
      dispatch(offLoading());
    }
  };

  
  const [activeStep, setActiveStep] = useState(0);
  const getSteps = () => {
    return ["Reason", "Amount", "Date"];
  };

  const steps = getSteps();
  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return getPersonalInformation();
      case 1:
        return getAmount();
      case 2:
        return getDate();
      default:
        return "Uknown stepIndex";
    }
  };

  const getPersonalInformation = () => {
    return (
      <fieldset>
        <h2 className="fs-title text-uppercase font-weight-bold">Reason For Withdrawal</h2>
        <Field
          type="text"
          className="input-textarea"
          name="request_reasons"
          component="textarea"
          placeholder="breif reasons for withdrawal"
        />
        
      </fieldset>
    );
  };

  const getDate = () => {
    return (
      <fieldset>
        <h2 className="fs-title mt-4 text-uppercase font-weight-bold">Request Expected Date</h2>
        <Field type="date" name="request_date" component="input" className="input-date" />
      </fieldset>
    );
  };

  const getAmount = () => {
    return (
      <fieldset>
        <h2 className="fs-title text-uppercase font-weight-bold">Amount</h2>
        <Field
          type="number"
          className="input-text"
          placeholder="amount needed?"
          component="input"
          name="request_amount"
        />
      </fieldset>
    );
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <>
      <div className="d-flex mt-5 justify-content-center">
        <form onSubmit={handleSubmit(onSubmit)} className="fundforms_container">
          <div>
            <Stepper activeStep={activeStep} alternativeLabel className="horizontal-stepper-linear">
              {steps.map((label, index) => {
                return (
                  <Step
                    key={label}
                    className={`horizontal-stepper ${index === activeStep ? "active" : ""}`}
                  >
                    <StepLabel className="stepperlabel">{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>

            <div>
              {activeStep !== steps.length ? (
                <div>
                  {getStepContent(activeStep)}
                  <div className="mt-4">
                    {activeStep !== 0 && (
                      <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className="mr-2 float-left"
                        color="primary"
                      >
                        Back
                      </Button>
                    )}
                    <Button
                      className="mr-2 float-left"
                      color="primary"
                      onClick={() => history.push("/")}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="mr-2 float-right"
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                    // disabled={true}
                    >
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                  </div>
                </div>
              ) : (
                  <>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className="mr-2 float-left"
                      color="primary"
                    >
                      Back
                  </Button>
                    <Button
                      type="submit"
                      name="submit"
                      className="MuiButton-containedPrimary"
                      disabled={pristine || submitting}
                      onClick={() => {
                        setTimeout(() => {
                          handleReset();
                        }, 7000);
                      }}
                    >
                      {loading ? <CircularProgress/>: "Submit"}
                  </Button>
                  </>
                )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default withRouter(
  reduxForm({
    form: "requestForm",
  })(ProjectForm)
);