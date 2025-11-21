import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt"
const userSchema = new Schema({
        username:{
            type: String,
            require: true,
            unique: true,
            lowercase: true,
            trim: true,
            minLenght: 1,
            maxLenght: 20,
        },
        password:{
            type: String,
            require: true,
            minLenght: 6,
            maxLenght: 20,
        },
        email:{
            type: String,
            require: true,
            unique: true,
            lowercase: true,
            trim: true,
        },    
    },
    {
        timestamps: true
    }
)

//Hashing the password
userSchema.pre("save", async function(next) {
    if(!this.isModified("password")){
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);

    next();
})
//Compare password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password,this.password)
}


export const User = mongoose.model("User", userSchema)