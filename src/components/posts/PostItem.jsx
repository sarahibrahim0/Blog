import { Link } from "react-router-dom";
import  './Posts.css';
const PostItem = (props) => {
    const profileLink = props?.userId ? `/profile/${props.userId}`: `/profile/${props.post?.user._id}`
  return (
    <div className="post-item">
      <div className="post-item-image-wrapper">
        <img src={props.post?.image.url} alt={props.post?.title} className="post-item-image" />
        </div>

<div className="post-item-info-wrapper">
    <div className="post-item-info">
    <div className="post-item-author">
        <strong>Author </strong>
        <Link className="post-item-username" to={profileLink}>{props.username? props.username : props.post?.user.username}</Link>
    </div>
    <div className="post-item-date">
        {new Date(props.post.createdAt).toDateString()}
    </div>
</div>
<div className="post-item-details">
    <h4 className="post-item-title">{props.post?.title}</h4>
    <Link className="post-item-category" to={`/posts/categories/${props.post?.category}`}>
    {props.post?.category}
    </Link>
    </div>

    <p className="post-item-description">
        {props.post?.description}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod explicabo placeat beatae fugit maxime aliquid veritatis error? Rerum porro libero magni voluptatibus veniam. Id possimus ratione, ex distinctio ea fugit!
    </p>
    <Link className="post-item-link" to={`/posts/details/${props.post?._id}`}>
        Read More ...
    </Link>
</div>

    </div>
  );
};

export default PostItem;
