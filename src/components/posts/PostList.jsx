import PostItem from './PostItem';
import './Posts.css'
const PostList = (props) => {
    return (
        <div className="post-list">
            {props.posts.map(post=> <PostItem post={post} key={post._id}/>)}
         </div>
     );
}

export default PostList;