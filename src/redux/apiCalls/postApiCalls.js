import request from "../../utils/reques";
import { postActions } from "../slices/postSlice";
import { toast } from "react-toastify";

//fetch posts based on page number
export function fetchPosts(pageNumber) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts?pageNumber=${pageNumber}`);
      //Must write the action in dispatch method
      dispatch(postActions.setPosts(data));

    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

//fetch posts based on category
export function fetchPostsByCategory(category) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts?category=${category}`);
      //Must write the action in dispatch method
      dispatch(postActions.setPostsCategories(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

export function getPostsCount() {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts/count`);
      //Must write the action in dispatch method
      dispatch(postActions.setPostsCount(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

//fetch posts based on category
export function createPost(newPost) {
  //   for (let pair of newPost.entries()) {
  //     console.log(pair[0] + ', ' + pair[1]);
  // }
  return async (dispatch, getState) => {
    try {
      // console.log(getState().auth.user.token)
      dispatch(postActions.setLoading());

      await request.post(`/api/posts`, newPost, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
          "Content-Type": "multipart/form-data",
        },
      });
      //Must write the action in dispatch method
      dispatch(postActions.setIsPostCreated());
      setTimeout(() => dispatch(postActions.clearIsPostCreated()), 2000);
    } catch (error) {

      toast.error(error.response.data.message);
      dispatch(postActions.clearLoading());
    }
  };
}

export function fetchPostById(postId) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts/${postId}`);
      //Must write the action in dispatch method
      dispatch(postActions.setPost(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

export function toggleLikePost(postId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/posts/like/${postId}`,
        {},
        {
          headers: { Authorization: "Bearer " + getState().auth.user.token },
        }
      );
      //Must write the action in dispatch method
      dispatch(postActions.setPostLikes(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

export function updatePostImage(newImage, postId) {
  return async (dispatch, getState) => {
    try {
      await request.put(`/api/posts/post-image/${postId}`, newImage, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("New Post Image Uploaded Successfully");
      //Must write the action in dispatch method
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

export function updatePost(newPost, postId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(`/api/posts/${postId}`, newPost, {
        headers: { Authorization: "Bearer " + getState().auth.user.token },
      });
      dispatch(postActions.setPost(data));
      toast.success("Post Updated Successfully");
      //Must write the action in dispatch method
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

export function deletePost(postId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(`/api/posts/${postId}`,
        {
          headers: { Authorization: "Bearer " + getState().auth.user.token},
        }
      );
      dispatch(postActions.deletePost(data?.postId));
      toast.success(data?.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}


export function fetchAllPosts() {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts`);
      //Must write the action in dispatch method
      dispatch(postActions.setPosts(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}