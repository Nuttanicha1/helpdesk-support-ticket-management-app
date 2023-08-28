import React , { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const res = await axios.post("/api/v1/auth/register", {
            name,
            email,
            password,
        });
        
        if (confirmPassword !== password) {
                alert("Password didn't match");
        } else {
            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                navigate("/login");
                alert("Regieter Successfully !");
            } else {
                
                toast.error(res.data.message);
            }
        }
        
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

return (
    <Layout title={"Register"}>
        <div className='register'>
            <form onSubmit={handleSubmit}>
                <center><h2><b>Register Page</b></h2></center>
                    <div className="mb-3">
                        <label htmlFor="exampleInputName1" className="form-label"><b>Username</b></label>
                        <input 
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-control" 
                            id="exampleInputName1" 
                            placeholder="Please Enter Username" 
                            size="50"
                            required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label"><b>Email</b></label>
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control" 
                            id="exampleInputEmail1" 
                            placeholder="Please Enter Email" 
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
                    <div className="mb-3">
                        <label  className="form-label"><b>Confirm Password</b></label>
                        <input 
                            type="password" 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="form-control" 
                            placeholder="Please Enter Confirm Password" 
                            required/>
                    </div>
                    <center><button type="submit" className="submit"> REGISTER </button></center>
            </form>
        </div>
    </Layout>
  );
};

export default Register;