import React , { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { useAuth } from '../../context/auth';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const res = await axios.post("/api/v1/auth/login", {
            email,
            password,
        });
        if (res && res.data.success) {
            toast.success(res.data && res.data.message);
            setAuth({
                ...auth,
                user: res.data.user,
                token: res.data.token,
                role: res.data.user.role,
            });
            localStorage.setItem('auth',JSON.stringify(res.data))
            alert("Login Successfully")
            navigate(location.state || "/");
        } else {
            toast.error(res.data.message);

            if (res.status === 200) {
                alert("Invalid password , Please try again.");
            };

            if (res.status === 204) {
                alert("Email is not registered")
            };
        }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

return (
    <Layout title={"Login"}>
        <div className='login'>
            <form onSubmit={handleSubmit}>
                <center><h2><b>Login Page</b></h2></center>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label"><b>Email</b></label>
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control" 
                            id="exampleInputEmail1" 
                            placeholder="Please Enter Email" 
                            size="50"
                            required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label"><b>Password</b></label>
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control" 
                            id="exampleInputPassword1" 
                            placeholder="Please Enter Password"
                            required/>
                    </div>
                        
                      <p class="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                        Don't have an account?{" "}
                        <Link to="/register" style={{ color: "#393f81" }}>
                          Register here
                        </Link>
                      </p>
                    <center><button type="submit" className="submit"> LOGIN </button></center>
            </form>
        </div>
    </Layout>
  );
};

export default Login;