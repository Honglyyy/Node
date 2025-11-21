import {Post} from "../models/post.model.js"

const createPost = async (req,res) =>{
    try {
        const {name, description, age} = req.body;

        if(!name || !description || !age){
            return res.status(404).json({message: "Post can't be create! all field must be filled"})
        }

        const post = await Post.create({name, description, age})

        res.status(201).json({message: "Post created!!", post})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error!! ", error})
    }
}

const getAllPost = async(req , res) =>{
    try {
        const posts = await Post.find();
        res.status(201).json(posts);

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error!! ", error})
    }
}

const updatePost = async(req, res) =>{
    try {
        //Check if body is empty
        if(Object.keys(req.body).length === 0) return res.status(400).json({message: "No data provide for update!!"})

        const post = await Post.findByIdAndUpdate(req.params.id, req.body,{new: true});

        if(!post) return res.status(404).json({message : "Post not found"})

        res.status(200).json({message: "Post update successfully", post})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error!! ", error})
    }
}

const deletePost = async(req,res) =>{
    try {
        const deleted = await Post.findByIdAndDelete(req.params.id);
        if(!deleted) return res.status(404).json({message: "Post not found"})
        
        return res.status(201).json({message: "Post deleted", deleted})

    } catch (error) {
        console.log(error);
        
        return res.status(500).json({message: "Internal server error", error})
    }
}
export {
    createPost,
    getAllPost,
    updatePost,
    deletePost
}