import request from "../../utils/reques";
import getErrMsg from "../../utils/errorMsg";
import {toast} from 'react-toastify';
import { commentActions } from "../slices/commentSlice";
import { postActions } from "../slices/postSlice";


export function fetchComments(){
    return async (dispatch, getState)=>{

        dispatch(commentActions.setLoading());
        try{
            const {data} = await request.get('/api/comments',{
                headers:{
                    Authorization:'Bearer ' + getState().auth.user.token
                }
            });
            dispatch(commentActions.setComments(data));
        }catch(error){
        toast.error(getErrMsg(error));
        } finally {
            dispatch(commentActions.clearLoading());
        }

    }
}

export function setComment(newComment){
    return async (dispatch, getState)=>{

        try{
            const {data} = await request.post('/api/comments', newComment ,{
                headers: {
                    Authorization : "Bearer "+getState().auth.user.token
                }
            });

            dispatch(postActions.addCommentToPost(data));
        }catch(error){
        toast.error(getErrMsg(error));
        }

    }
}

export function deleteComment(commentId){
    return async (dispatch, getState)=>{

        try{
            const res = await request.delete(`/api/comments/${commentId}`,{
                headers:{
                    Authorization:"Bearer "+ getState().auth.user.token
                }
            });

            try{
                dispatch(postActions.deletePostComment(commentId));
                dispatch(commentActions.deleteComment(commentId));
                toast.success(res.data?.message);

            }catch(er){
              toast.error(getErrMsg(er))
            }

        }catch(error){
            toast.error(getErrMsg(error))

        }

    }
}

export function updateComment(commentId, newComment){
    return async (dispatch, getState)=>{

        try{
            const {data} = await request.put(`/api/comments/${commentId}`,newComment,{
                headers:{
                    Authorization:"Bearer "+ getState().auth.user.token
                }
            });
            dispatch(postActions.updatePostComment(data));
            toast.success(data.message);

        }catch(error){
        toast.error(getErrMsg(error));
        }

    }
}