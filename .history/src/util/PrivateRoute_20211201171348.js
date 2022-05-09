import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ render: Component, ...rest }) => {
    const authState = useSelector((state) => state.authReducer);
    const { access } = authState;
    return (
        <Route
      render={(props) => {
        if (!access) {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location },
              }}
            />
    );
} else {
    return <Component {...props} />;
}
}
} { ...rest }
/>
);
};

export default PrivateRoute;