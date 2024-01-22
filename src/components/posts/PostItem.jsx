import { Link } from "react-router-dom";
import  './Posts.css';
import { useNavigate } from "react-router-dom";
const PostItem = (props) => {
    const profileLink = props?.userId ? `/profile/${props.userId}`: `/profile/${props.post?.user._id}`;
    const navigate = useNavigate();

    const goToPostDetails =()=>{
        navigate(`details/${props.post?._id}`);

    }
  return (
    <div className="box-border bg-white w-full rounded-2xl  " >
            <article className="w-full  h-auto flex flex-col rounded-2xl box-border relative border-[1px] border-[#8589a038] md:p-5  sm:p-2 transition-all duration-[842.435ms] ease-in-out boxShadow">
<div className="w-full relative self-center mb-3 ">

        <Link className="box-border w-full block image rounded-2xl  h-[290px] min-h[290px] overflow-hidden "
        to={`/posts/details/${props.post?._id}`}>
        <img src={props.post?.image?.url} alt={props.post?.title} className=" inline-block cursor-pointer rounded-2xl w-full  h-full object-cover transition-all duration-[.7s] ease-in-out hover:scale-[1.2]"/>
        </Link>
    <Link to={`/posts/categories/${props.post?.category}`} >
    <span className=" inline-block w-auto  bottom-[30px] left-0  absolute hover:bg-very-blue  transition-all duration-500 ease-in-out  hover:text-white bg-black text-white px-4 py-[7px] text-xs whitespace-normal">    {props.post?.category}
</span>
    </Link>

</div>

<div className="box-border   flex flex-col h-auto items-start space-y-5 w-full mb-4 ">
<h3 className="title w-full xl:px-5 ">
<a className=" titleLink  cursor-pointer w-full " href={`/posts/details/${props.post?._id}`}>
        <span  className="break-all text-blue-black font-bold text-lg hover:text-[#4776E6] ">
        {props.post?.title}
        </span>
    </a>
</h3>

<div className=" h-auto xl:px-5 sm:px-0 ">
<div className="w-full info flex flex-row items-center italic flex-nowrap min-w-max  ">
        <img src={props.post?.user?.profilePhoto?.url} alt="author" className="inline-block rounded-full w-12  h-12 object-cover "  />
        <span className="mx-1 text-[13px] whitespace-nowrap ">By</span>
    <Link className="font-bold text-[13px] whitespace-nowrap mr-1" to={profileLink}>{props.username? props.username : props.post?.user.username}</Link>
    <span className="text-[13px] whitespace-nowrap ">
        {new Date(props.post?.createdAt).toDateString()}

        </span>
</div>
</div>

<p className="text-sm leading-normal w-full overflow-hidden  h-[96px]  xl:px-5">
    <span className="inline-block h-full w-full  text-pretty break-words ">{props.post?.description}</span>
</p>

<Link className=  "hover:text-white min-h-[41.6px] box-border  hover:bg-[#4776E6] transition-all duration-500 ease-in-out  border-[1px] rounded-full py-2 px-7 mr-2"to={`/posts/details/${props.post?._id}`} >
    <span className="text-inherit text-xs inline-block mr-1">
        Read More
    </span>
    <i className=" fa-solid fa-chevron-up text-inherit rotate-90 text-xs" ></i>

</Link>

</div>



</article>

    </div>
  );
};

export default PostItem;
