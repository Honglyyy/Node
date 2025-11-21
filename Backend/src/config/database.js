import mongoose from "mongoose"

const connectDB = async () =>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.DB_URI}`)

        console.log(`\n DB connected!!! ${connectionInstance.connection.host}`);
        
    } catch (error) {
        console.log(`Connection failed. ` , error);
        process.exit()
    }
}

export default connectDB;