import React, { useEffect, useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { Alert } from "@material-ui/lab";
import { useSelector, useDispatch } from "react-redux";
import { load_user, checkAuthenticated } from "./store/actions/Auth";
import MainApp from "./components/mainApp";
import { hideMessage } from "store/actions/Common";
import { BrowserRouter} from "react-router-dom";
import "./styles/style.js";




const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = useSelector(
    state => state.authReducer.isAuthenticated
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuthenticated());
    // dispatch(load_user())
    setIsLoading(false);
  }, []);

  // check auth state
  const commonState = useSelector(state => state.commonReducer);
  const { showMessage, Message, error } = commonState;

  // alert func
  const AlertSnackBar = props => {
    return <Alert elevation={6} variant="filled" {...props} />;
  };
  const handleClose = () => {
    dispatch(hideMessage());
  };
  return (
    <>
      <BrowserRouter>{isLoading ? null : <MainApp />}</BrowserRouter>
      {showMessage && (
        <Snackbar
          open={showMessage}
          autoHideDuration={4000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <AlertSnackBar severity={error ? "error" : "success"}>
            {Message}
          </AlertSnackBar>
        </Snackbar>
      )}
    </>
  );
};

export default App;
