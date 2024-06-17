import React from 'react';
const LoginComponent = () => {
    return (
        <div className="centerVertically">
            <div className="card">
                <div className="card-header">
                    <h2 className="text-center pt-3">HAUPCAR</h2>
                    <p className="text-center">Login to the Car Management System</p>
                </div>
                <div className="card-body">
                    <form>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-control" />
                        </div>
                        <br/>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" />
                        </div>
                        <br/>
                        <button className="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
    </div>
    );
}
export default LoginComponent;