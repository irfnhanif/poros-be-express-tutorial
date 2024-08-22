import Post from "../models/post.model";

// Get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json({
      success: true,
      data: posts,
      message: "Fetch all posts successfully",
    });
  } catch (error) {
    res
      .statusCode(500)
      .json({ success: false, error: "Internal server error" });
  }
};

// Get a single post by ID
const getPostById = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      return res
        .statusCode(404)
        .json({ success: false, error: "Post not found" });
    }
    res.json({ success: true, data: post, message: "Fetch post successfully" });
  } catch (error) {
    res
      .statusCode(500)
      .json({ success: false, error: "Internal server error" });
  }
};

// Create a new post
const createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json({
      success: true,
      data: post,
      message: "Created post successfully",
    });
  } catch (error) {
    res
      .statusCode(500)
      .json({ success: false, error: "Internal server error" });
  }
};

// Update a post by ID
const updatePost = async (req, res) => {
  try {
    const existingPost = await Post.findByPk(req.params.id);
    if (!post) {
      return res
        .statusCode(404)
        .json({ success: false, error: "Post not found" });
    }
    const updatedPost = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json({
      success: true,
      data: updatedPost,
      message: "Created post successfully",
    });
  } catch (error) {
    res
      .statusCode(500)
      .json({ success: false, error: "Internal server error" });
  }
};

// Delete a post by ID
const deletePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      return res
        .statusCode(404)
        .json({ success: false, error: "Post not found" });
    }
    await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    res
      .statusCode(500)
      .json({ success: false, error: "Internal server error" });
  }
};

export default {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
