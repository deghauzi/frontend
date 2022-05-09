import React from 'react'
import ChangePasswordForm from '../../../../auth/ChangePasswordForm'



const ChangePassword = () => {
    return (
        <div  className='password-form-container mb-5'>
        <div className = 'password-reg-heading text-white text-center'>
        <h4 className='pt-4 pb-4 text-uppercase'>Change Password</h4>
        </div>
         <ChangePasswordForm /> 
      </div>
    )
}

export default ChangePassword;