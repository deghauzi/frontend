import React from 'react'
import ChangePasswordForm from 'ui/Forms/ChangePasswordForm'



const ChangePassword = () => {
    return (
        <form  className='password-form-container mb-5'>
        <div className = 'password-reg-heading text-white text-center'>
        <h4 className='pt-4 pb-4 text-uppercase'>Change Password</h4>
        </div>
         <ChangePasswordForm /> 
      </form>
    )
}

export default ChangePassword;