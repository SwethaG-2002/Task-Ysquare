import { comparePassword, hashpassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import JWT from "jsonwebtoken";
export const registerController = async (req,res) => {
try{
   const {name,email,number,address,password,answer} = req.body
   //validations
   if(!name){
    return res.send({message:'Name is Required'})
   }
   if(!email){
    return res.send({message:'Email is Required'})
   }
   if(!number){
    return res.send({message:'Number is Required'})
   }
   if(!password){
    return res.send({message:'Password is Required'})
   }
   if(!address){
    return res.send({message:'Address is Required'})
   }
   if(!answer){
    return res.send({message:'Answer is Required'})
   }
   //check user
   const exisitinguser = await userModel.findOne({email})
   //exisiting user
   if(exisitinguser){
    return res.status(200).send({
        success:false,
        message:'Already Register please login',
    })
   }
   //register user
   const hashedPassword= await hashpassword(password)
   //save
   const user = await new userModel({name,email,number,address,password:hashedPassword,answer}).save();
   res.status(200).send({
    success:true,
    message:'User Register Successfully',
    user
   })
   
}catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        message:'Error in Registration',
        error
    })
}
};

//post login
export const loginController = async (req,res) => {
    try{
        
      const{email,password}=req.body
//validation
if(!email || !password){
    return res.status(404).send({
        success:false,
        message:'Invalid email or password'
    })
} 
//check user
const user = await userModel.findOne({email})
if(!user){
    return res.status(404).send({
        success:false,
        message:'Email is not registered'
    })
}

     const match = await comparePassword(password,user.password)   
     if(!match){
        return res.status(200).send({
            success:false,
            message:'Invalid password'
        })
     } 

     //token
     const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"7d",});
    res.status(200).send({
        success:true,
        message:'Login Succesfully',
        user:{
            name:user.name,
            email:user.email,
            number:user.number,
            address:user.address,
            role:user.role,
        },
        token, 
    });

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Login',
            error
        });
    }
};
// forgetPasswordController
export const forgetpasswordController= async(req,res)=>{
try{
const {email,answer, newPassword}= req.body
if(!email){
    res.status(400).send({message:'Email is required'})
}
if(!answer){
    res.status(400).send({message:'Answer is required'})
}
if(!newPassword){
    res.status(400).send({message:'New Password is required'})
}
//check
const user = await userModel.findOne({email,answer})

//validation
if(!user){
    return res.status(404).send({
        success:false,
        message:'Wrong Email Or Answer'
    })
}
const hashed = await hashpassword(newPassword)
await userModel.findByIdAndUpdate(user._id,{password:hashed})
res.status(200).send({
    success:true,
    message:'Password Reset Successfully',
});

}catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        message:'Something went wrong',
    })

}
}

//test controller
export const testController = (req, res) => {
    try {
      res.send("Protected Routes");
    } catch (error) {
      console.log(error);
      res.send({ error });
    }
  };

  //update profile
export const updateProfileController = async (req, res) => {
    try {
      const { name, email,number,address, password } = req.body;
      const user = await userModel.findById(req.user._id);
      //password
      if (password && password.length < 6) {
        return res.json({ error: "Passsword is required and 6 character long" });
      }
      const hashedPassword = password ? await hashpassword(password) : undefined;
      const updatedUser = await userModel.findByIdAndUpdate(
        req.user._id,
        {
          name: name || user.name,
          email:email || user.email,
          number: number || user.number, 
          address:address || user.address,
          password: hashedPassword || user.password,
          
        },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "Profile Updated Successfully",
        updatedUser
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


  //orders
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error Wile Geting Orders",
      error,
    });
  }
};

//all orders
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Geting Orders",
      error,
    });
  }
};

//order status
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing Order",
      error,
    });
  }
};
  