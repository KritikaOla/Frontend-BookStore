import React from 'react';
import './Login.css'; // Importing the CSS
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import { Link } from 'react-router-dom'; // Import Link for navigation

export default function Login() {
  return (
    <div className="register-photo">
      <div className="form-container">
        <div className="image-holder"></div>
        <form method="post">
          <h2 className="text-center">
            Login to your account.
          </h2>
          
          <div className="form-group">
            <input
              className="form-control"
              type="email"
              name="email"
              placeholder="Email"
            />
          </div>

          <div className="form-group">
            <input
              className="form-control"
              type="password"
              name="password"
              placeholder="Password"
            />
          </div>

          <div className="form-group">
            <button className="btn btn-primary btn-block" type="submit">
              Log in
            </button>
          </div>

          {/* Using Link for client-side routing */}
          <Link to="/signup" className="already">
            You don't have an account? Sign up here.
          </Link>
        </form>
      </div>
    </div>
  );
}
