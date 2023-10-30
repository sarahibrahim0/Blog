import { posts } from '../../dummyData';
import PostItem from './PostItem';
import './Posts.css'
const PostList = (props) => {
    console.log(props.posts)
    return (
        <div className="post-list">

            {posts && props.posts.map(post=> <PostItem post={post} key={post._id}/>)}
         </div>
     );
}

export default PostList;