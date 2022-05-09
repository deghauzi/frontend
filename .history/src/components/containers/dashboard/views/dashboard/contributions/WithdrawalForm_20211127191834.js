import React, { useState } from "react";
import { Field, reduxForm, stopSubmit, reset } from "redux-form";
import axiosInstance from "util/api";
import { setLoading, offLoading } from "store/actions/Common";
import * as actionTypes from "store/actions/ActionTypes";
import { useDispatch } from "react-redux";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";



const ProjectForm = ({ mime, handleSubmit, submitting, pristine, history }) => {
  const dispatch = useDispatch();

  const renderInput = ({ input, type, meta }) => {
    return (
      <div>
        <input
          name={input.name}
          type={type}
          accept={mime}
          onChange={(event) => handleChange(event, input)}
        />
        {meta && meta.invalid && meta.error && (
          <p style={{ color: "red", fontSize: "10px" }}>{meta.error}</p>
        )}
      </div>
    );
  };
  const handleChange = (event, input) => {
    event.preventDefault();
    let imageFile = event.target.files[0];
    if (imageFile) {
      const localImageUrl = URL.createObjectURL(imageFile);
      const imageObject = new window.Image();

      imageObject.onload = () => {
        imageFile.width = imageObject.naturalWidth;
        imageFile.height = imageObject.naturalHeight;
        input.onChange(imageFile);
        URL.revokeObjectURL(imageFile);
      };
      imageObject.src = localImageUrl;
    }
  };

  const onSubmit = async (formValues) => {
    let formData = new FormData();
    formData.append("project_name", formValues.project_name);
    formData.append("project_endAt", formValues.project_endAt);
    formData.append("project_description", formValues.project_description);
    formData.append("project_cash_amount", formValues.project_cash_amount);
    formData.append("project_img", formValues.project_img);

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

    dispatch(setLoading());
    try {
      const res = await axiosInstance.post("project/create", formData, config);
      dispatch({ type: actionTypes.SHOW_SUCCESS_MESSAGE, payload: "Project Created!" });
      dispatch(stopSubmit("projectForm"));
      dispatch(reset("projectForm"));
      dispatch(offLoading());
    } catch (error) {
      dispatch({ type: actionTypes.CREATE_PROJECT_FAIL });
      dispatch({ type: actionTypes.SHOW_ERROR_MESSAGE, payload: error.response.message });
      dispatch(stopSubmit("projectForm"));
      dispatch(reset("projectForm"));
      dispatch(offLoading());
    }
  };

  
  const [activeStep, setActiveStep] = useState(0);
  const getSteps = () => {
    return ["Project Title", "Add a photo", "Description"];
  };

  const steps = getSteps();
  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return getPersonalInformation();
      case 1:
        return getItems();
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
          name="project_description"
          component="textarea"
          placeholder="breifly describe the project"
        />
        <h2 className="fs-title text-uppercase font-weight-bold">Amount</h2>
        <Field
          type="number"
          className="input-text"
          placeholder="Project amount needed?"
          component="input"
          name="project_cash_amount"
        />
        <h2 className="fs-title mt-4 text-uppercase font-weight-bold">Request date</h2>
        <Field type="date" name="project_endAt" component="input" className="input-date" />
      </fieldset>
    );
  };

  const getTrack = () => {
    return (
      <fieldset>
        <h2 className="fs-title text-uppercase font-weight-bold">
          <i>Project description</i>
        </h2>
        <Field
          type="text"
          className="input-textarea"
          name="project_description"
          component="textarea"
          placeholder="breifly describe the project"
        />
        <h2 className="fs-title mt-4 text-uppercase font-weight-bold">Project end date</h2>
        <Field type="date" name="project_endAt" component="input" className="input-date" />
      </fieldset>
    );
  };

  const getItems = () => {
    return (
      <fieldset>
        <h2 className="fs-title text-uppercase font-weight-bold">Add a cover photo</h2>
        <h3 className="fs-subtitle font-weight-bold">
          Please upload a picture that describes your project
        </h3>

        <div>
          <Field name="project_img" type="file" component={renderInput} className="input-file" />
        </div>
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
                      Submit
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
    form: "projectForm",
  })(ProjectForm)
);