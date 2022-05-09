import React, { useState,useEffect } from "react";
import axiosInstance from "util/api";
import { setLoading, offLoading } from "store/actions/Common";
import * as actionTypes from "store/actions/ActionTypes";
import { useDispatch, useSelector } from "react-redux";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import CircularProgress from "util/CircularProgress";
import { load_user } from 'store/actions/Auth.js';
import { tokenConfig } from 'util/TokenConfig';
import { fetchBankAccountBonus, fetchBankAccountMain, withdrawalRequestSubmit } from "store/actions/Contributions";

var numeral = require("numeral");

const ProjectForm = ({history}) => {
  const dispatch = useDispatch();

  useEffect(() => {
     dispatch(load_user());
    dispatch(fetchBankAccountMain());
    dispatch(fetchBankAccountBonus());
  }, [])

  const auctionState = useSelector((state) => state.commonReducer);
  const balanceState = useSelector((state) => state.contributionReducer);
  const {mainAccount,bonusAccount} = balanceState
  const { loading } = auctionState;
  const [formValue, SetformValue] = useState({
    request_expected_date:"",
    request_reasons:"",
    request_amount: "",
    request_from_account:"",
  })
 const handleChange = (e) => {
    const { name, value } = e.target;
    SetformValue((prev) => ({ ...prev, [name]: value }));
  };
  

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(withdrawalRequestSubmit({...formValue}));
  };

  const Main = formValue.request_from_account === 'Main' && parseInt(formValue.request_amount) >= parseInt(mainAccount[0].bank_account_balance)
  const Wallet = formValue.request_from_account === 'Wallet' && parseInt(formValue.request_amount) >= parseInt(bonusAccount.wallet_balance)
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
        <input
          type="textarea"
          className="input-textarea"
          name="request_reasons"
          placeholder="breif reasons for withdrawal"
            onChange={handleChange}
        />
      </fieldset>
    );
  };

  const getDate = () => {
    return (
      <fieldset>
        <h2 className="fs-title mt-4 text-uppercase font-weight-bold">Request Expected Date</h2>
        <input onChange={handleChange} type="date" name="request_expected_date" className="input-date" />
      </fieldset>
    );
  };

  const getAmount = () => {
    return (
      <fieldset>
        <select name="request_from_account" className="input-textarea"onChange={handleChange}>
            <option>Select Account</option>
            <option value="Main">Main</option>
            <option value="Wallet">Wallet</option>
          </select>
        <h2 className="fs-title text-uppercase font-weight-bold">Amount</h2>
        <input
          type="text"
          className="input-text"
          placeholder="amount needed?"
          name="request_amount"
          onChange={handleChange}
        />
        {Main ?
          <p className='text-danger'>amount can't be greater than balance: ₦{numeral(mainAccount[0].bank_account_balance).format("0,0")}</p> :
          Wallet ? <p className='text-danger'>amount can't be greater than balance: ₦{numeral(bonusAccount.wallet_balance).format("0,0")}</p>:null}
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
        <form onSubmit={handleSubmit} className="fundforms_container">
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
                      onClick={() => { history.push("/"); SetformValue({})}}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="mr-2 float-right"
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
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
                      disabled={formValue.request_amount === '' || formValue.request_expected_date=== '' ||
                        formValue.request_from_account === '' || formValue.request_reasons === ''||
                        // parseInt(formValue.request_amount) >= parseInt(bonusAccount.wallet_balance)
                        parseInt(formValue.request_amount) >= parseInt(mainAccount[0].bank_account_balance)
                      }
                      onClick={() => {
                        setTimeout(() => {
                          handleReset();
                        }, 5000);
                      }}
                    >
                      {loading ? <CircularProgress/>: "Submit"}
                    </Button>
                    {Main ?
          <p className='text-danger'>amount can't be greater than balance: ₦{numeral(mainAccount[0].bank_account_balance).format("0,0")}</p> :
          Wallet ? <p className='text-danger'>amount can't be greater than balance: ₦{numeral(bonusAccount.wallet_balance).format("0,0")}</p>:null}
                  </>
                )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProjectForm
;