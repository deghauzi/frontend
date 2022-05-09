import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { change_password, logout } from "store/actions/Auth";

const ChangePasswordForm = () => {
  const dispatch = useDispatch();
  const requestSent = useSelector(state => state.authReducer.changePassword);
  const [formData, setFormData] = useState({
    new_password: "",
    re_new_password: "",
    current_password: ""
  });

  const { current_password, new_password, re_new_password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    dispatch(change_password({current_password, new_password, re_new_password}));
  };

  if (requestSent) {
    setTimeout(() => {
      dispatch(logout())
      
    }, 3000);
  }

  return (
    <div className="container mt-5">
      <form onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            className="form-control"
            type="password"
            placeholder="Current Password"
            name="current_password"
            value={current_password}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="password"
            placeholder="New Password"
            name="new_password"
            value={new_password}
            onChange={e => onChange(e)}
            minLength="6"
            required
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="password"
            placeholder="Confirm New Password"
            name="re_new_password"
            value={re_new_password}
            onChange={e => onChange(e)}
            minLength="6"
            required
          />
        </div>
        <button className="btn btn-success" type="submit">
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
