import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
    try{
        const {name, email, confirmPassword, password} = req.body
        //validations
        if(!name){
            return res.send({message: "Name is Required"})
        }
        if(!email){
            return res.send({message: "Email is Required"})
        }
        if(!password){
            return res.send({message: "Password is Required"})
        }

        //check user
        const exisitingUser = await userModel.findOne({ email });
        //exisiting user
        if(exisitingUser){
            return res.status(200).send({
                success: false,
                message: "Already Register please login",
            })
        }
        
        //register user
        const hashedPassword = await hashPassword(password)
        //save
        const user = await new userModel({
            name,
            email,
            password: hashedPassword,
        }).save();

        res.status(201).send({
            success: true,
            message: "User Register Successfully",
            user,
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Registeration",
            error,
        });
    }
};

//POST LOGIN
export const loginController = async (req, res) => {
    try{
        const {email,password} = req.body;
        //validation
        if(!email || !password){
            return res.status(404).send({
                success: false,
                message: "Invalid email or password",
            });
        }
        //check user
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(204).json({
                success: false,
                message: "Email is not registered",
            });
        }
        const match = await comparePassword(password,user.password);
        if(!match){
            return res.status(200).send({
                success:false,
                message: "Invalid Password",
            });
        }
        //token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.status(200).send({
            success: true,
            message: "login successfully",
            user:{
                _id: user._id,
                name: user.name,
                email: user.email,
            },
            token,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in login",
            error,
        });
    }
};

//test controller
export const testController = (req, res) => {
    try {
      res.send("Protected Routes");
    } catch (error) {
      console.log(error);
      res.send({ error });
    }
  };

//update prfole
export const updateProfileController = async (req, res) => {
    try {
      const { name, password } = req.body;
      const user = await userModel.findById(req.user._id);
      //password
      if (password && password.length < 6) {
        return res.json({ error: "Passsword is required and 6 character long" });
      }
      const hashedPassword = password ? await hashPassword(password) : undefined;
      const updatedUser = await userModel.findByIdAndUpdate(
        req.user._id,
        {
          name: name || user.name,
          password: hashedPassword || user.password,
        },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "Profile Updated Successfully",
        updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error While Update profile",
        error,
      });
    }
  };

  //get all user
  export const getUsersController = async (req, res) => {
    try {
      const users = await userModel.find({});
      res.status(200).send({
        success: true,
        message: "All Users List",
        users,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error while getting all users",
      });
    }
  };

  // single user
  export const singleUserController = async (req, res) => {
    try {
      const user = await userModel.findOne({ slug: req.params.slug });
      res.status(200).send({
        success: true,
        message: "Get Single User SUccessfully",
        user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error While getting Single User",
      });
    }
  };

  //delete user
  export const deleteUserController = async (req, res) => {
    try {
      const { id } = req.params;
      await userModel.findByIdAndDelete(id);
      res.status(200).send({
        success: true,
        message: "User Deleted Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "error while deleting user",
        error,
      });
    }
  };