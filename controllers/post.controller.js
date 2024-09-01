import Joi from "joi";
import Post from "../models/post.model.js";

// Get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json({
      message: "Fetch all posts successfully",
      data: posts,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get a single post by ID
const getPostById = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json({ message: "Fetch post successfully", data: post });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new post
const createPost = async (req, res) => {
  try {
    const { isValid, error } = validatePost(req.body);
    if (!isValid) {
      return res.status(400).json({ error });
    }
    const post = await Post.create(req.body);
    res.status(201).json({
      message: "Created post successfully",
      data: post,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a post by ID
const updatePost = async (req, res) => {
  try {
    const existingPost = await Post.findByPk(req.params.id);
    if (!existingPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    const { isValid, error } = validatePost(req.body);
    if (!isValid) {
      return res.status(400).json({ error });
    }
    const updatedPost = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "Updated post successfully",
      data: updatedPost,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a post by ID
const deletePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const validatePost = (requestBody) => {
  const postValidationSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    category: Joi.string().required(),
  });

  const { error } = postValidationSchema.validate(requestBody, {
    abortEarly: false,
  });

  if (error) {
    return {
      isValid: false,
      error: error.details.map((detail) => detail.message).join(", "),
    };
  } else {
    return { isValid: true, error: null };
  }
};

export { getAllPosts, getPostById, createPost, updatePost, deletePost };
