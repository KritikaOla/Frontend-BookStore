import React from 'react';
import './signup.css'; // Importing the CSS
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import { Link } from 'react-router-dom'; // For navigation back to login

export default function Signup() {
  return (
    <div className="register-photo">
      <div className="form-container">
        <div className="image-holder"></div>
        <form method="post">
          <h2 className="text-center"><strong>Create</strong> an account.</h2>

          {/* First Name and Last Name */}
          <div className="form-row">
            <div className="form-group col-md-6">
              <input
                className="form-control"
                type="text"
                name="firstName"
                placeholder="First Name"
              />
            </div>
            <div className="form-group col-md-6">
              <input
                className="form-control"
                type="text"
                name="lastName"
                placeholder="Last Name"
              />
            </div>
          </div>

          {/* Email */}
          <div className="form-group">
            <input
              className="form-control"
              type="email"
              name="email"
              placeholder="Email"
            />
          </div>

          {/* Password and Repeat Password */}
          <div className="form-row">
            <div className="form-group col-md-6">
              <input
                className="form-control"
                type="password"
                name="password"
                placeholder="Password"
              />
            </div>
            <div className="form-group col-md-6">
              <input
                className="form-control"
                type="password"
                name="passwordRepeat"
                placeholder="Repeat Password"
              />
            </div>
          </div>

          {/* Location */}
          

          {/* Zip Code and State */}
          <div className="form-row">
            <div className="form-group col-md-6">
              <input
                className="form-control"
                type="text"
                name="zipCode"
                placeholder="Zip Code"
              />
            </div>
            <div className="form-group col-md-6">
              <input
                className="form-control"
                type="text"
                name="state"
                placeholder="State"
              />
            </div>
          </div>

          {/* Area and City */}
          <div className="form-row">
            <div className="form-group col-md-6">
              <input
                className="form-control"
                type="text"
                name="area"
                placeholder="Area"
              />
            </div>
            <div className="form-group col-md-6">
              <input
                className="form-control"
                type="text"
                name="city"
                placeholder="City"
              />
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="form-group">
            <div className="form-check">
              <label className="form-check-label">
                <input className="form-check-input" type="checkbox" />
                I agree to the license terms.
              </label>
            </div>
          </div>

          {/* Submit */}
          <div className="form-group">
            <button className="btn btn-primary btn-block" type="submit">
              Sign Up
            </button>
          </div>

          {/* Already have an account */}
          <Link to="/login" className="already">
            You already have an account? Login here.
          </Link>
        </form>
      </div>
    </div>
  );
}
