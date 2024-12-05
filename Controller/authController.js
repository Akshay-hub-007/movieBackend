const User=require("../Schema/UserSchema")
const bcrypt = require('bcryptjs');
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }
        
        const user = await User.findOne({ email: email });
        console.log(user);
        
        if (user == null) {
            return res.status(400).json({
                success: false,
                message: "User does not exist"
            });
        }
        
        console.log(user.password);
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Wrong password"
            });
        }
        
        // const userWithoutPass = await User.findOne({ email })
        // .select("-password");
        // const userToken = generateToken(userWithoutPass);
        
        return res.status(200).json({
            success: true,
            message: "Login is successful",
            name:user.name,
            email:user.email
            // user: userWithoutPass,
            // token: userToken // Ensure you're including the token in the response
        });
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            success: false,
            message: "An error occurred during login"
        });
    }
};

const  register=async(req,res)=>{
    try{
        const {name,email,password}=req.body
        
        const saltRounds=10
         const salt=await bcrypt.genSalt(saltRounds);
         const hashedPassword=await bcrypt.hash(password,salt)

         const newUser=new User({
            name,
            email,
            password:hashedPassword
         })

         await newUser.save();
        
         res.status(200).json({
            success:true,
            message:"User added successfully"
         })
    }catch(e)
    {
        console.log(e)
        res.status(500).json({
            success: false,
            message: "Error in registering the user"
        });
    }
}

const reset=async(req,res)=>{

    try{
        const {email,password}=req.body
        if(!email || !password)
        {
            res.status(400).json({
                success:false,
                message:"email and password is required"
            })
        }
        const user=await User.findOne({email:email})
 
        if(!user)
        {
            console.log("user does not exist");
            res.status(400).json({
                success:false,
               message:"user does not exist"
            })
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        user.password = hashedPassword;
        await user.save();

        console.log("Password reset successfully");
        res.status(200).json({
            success: true,
            message: "Password reset successfully",
        })
    }catch(err)
    {
        console.log(err)
    }
}
module.exports={register,login,reset}