import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfilePrompt from "./ProfilePrompt";
import placeholder_image from '../../../../../../assets/images/homepage/banner.jpg'


const Profile = () => {

  // const profileState = useSelector(state => state.userTypeReducer);
  // const { profile_user } = profileState;

  let gender = "";
  let profile_img = "";

  //  profile_user.length &&
  //   profile_user.map(profile => {
  //     gender = profile.gender;
  //     profile_img = profile.profile_image;
  //   });
  
  // const userState = useSelector(state => state.authReducer.user);
  // const { email, first_name, last_name } = userState;

  return (
    <>
      <p>fr</p>
      {/* <div className="container-fluid mt--7">
        <div className="row">
          <div className="col-xl-4 order-xl-2 mb-5 mb-xl-0">
            <div className="card card-profile shadow">
              <div className="row justify-content-center">
                <div className="col-lg-3 order-lg-2">
                  <div className="card-profile-image">
                    {
                      profile_img ?
                        <img src={profile_img} alt="rounded-circle" className="rounded-circle-img" />
                        : 
                        <img src={placeholder_image} alt="rounded-circle" className="rounded-circle-img" />
                    }
                  </div>
                </div>
              </div>

              <div className="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                  <Link to="/dashboard/profile/edit" className="btn btn-sm edit-btn  mr-4">
                    Change Password
                  </Link>
                  <a href="/#" className="btn btn-sm btn-default float-right">
                    Message
                  </a>
                </div>
              </div>

              <div className="card-body pt-0 pt-md-4">
                <div className="row">
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div>
                        <h3 className="all-heading">{first_name + " " + last_name}</h3>
                        <div className="h5 font-weight-300">
                          <i className="ni location_pin mr-2"></i>
                        </div>
                        <hr className="my-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* account info */}
          {/* <div className="col-xl-8 order-xl-1">
            <div className="card shadow">
              <div className="card-header bg-white border-0">
                <div className="row">
                  <div className="col-8">
                    <h3 className="all-heading mb-0">My account</h3>
                  </div>
                </div>
                
              </div>
              <div className="card-body">
                <h6 className="heading-small text-muted mb-4">User information</h6>
                <div className="pl-lg-4">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label className="profile-control-label" for="input-email">
                          Email address
                        </label>
                        <input
                          type="email"
                          id="input-email"
                          className="form-control form-control-alternative"
                          placeholder="email"
                          value={email}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label className="profile-control-label" for="gender">
                          Gender
                        </label>
                        <input
                          type="text"
                          id="gender"
                          className="form-control form-control-alternative"
                          placeholder="gender"
                          value={gender}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group focused">
                        <label className="profile-control-label" for="input-first-name">
                          First name
                        </label>
                        <input
                          type="text"
                          id="input-first-name"
                          className="form-control form-control-alternative"
                          placeholder="First name"
                          value={first_name}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group focused">
                        <label className="profile-control-label" for="input-last-name">
                          Last name
                        </label>
                        <input
                          type="text"
                          id="input-last-name"
                          className="form-control form-control-alternative"
                          placeholder="Last name"
                          value={last_name}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="my-4" />

                {/* contact information */}
                {/* <h6 className="heading-small text-muted all-heading mb-4">Create Profile</h6>
                <ProfilePrompt />
              </div>
            </div>
          </div>
        </div>
      </div>   */}
    </>
  );
};

export default Profile;
