
import { useEffect, useState } from "react";
import Pagination from "../../components/pagination/Pagination";
import { useDispatch , useSelector} from "react-redux";
import { getPostsCount , fetchPosts } from "../../redux/apiCalls/postApiCalls";
import './PostsPages.css'
import PostItem from './../../components/posts/PostItem';
import myImage from '../../images/9264822.jpg'


const POST_PER_PAGE = 6;

const PostsPages = () => {

  const dispatch = useDispatch();
  const { postsCount, posts } = useSelector(state => state.post);

  const [currentPage, setCurrentPage] = useState(1);
  const pages = Math.ceil(postsCount / POST_PER_PAGE);

  useEffect(() => {
    dispatch(fetchPosts(currentPage));
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    dispatch(getPostsCount());
  }, []);

  return (
      <section className="box-border w-full h-auto  min-h-auto mt-10  px-5   flex flex-col items-center  justify-between" >
<div className=" h-auto box-border w-full min-h-full justify-center  grid gap-7 2xl:grid-cols-3 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 ">
{posts.length>0 ? (
posts.map((post,index)=>
<PostItem key={index} post={post}/>
)
):(

  <div className='box-border w-full h-auto my-10 flex flex-col items-center justify-start col-span-12  '>


  <div className='box-border flex flex-row justify-center items-center  2xl:w-full xl:w-full lg:w-full md:w-[80%] sm:w-[80%] h-[40vh]' >
  <div  className='w-full h-full ' style={{'backgroundImage':`url(${myImage})` , 'backgroundRepeat' :'no-repeat' , 'backgroundPosition' :'center','backgroundSize' :'contain'}}>

  </div>
  </div>


      <p className='w-full  h-[10vh] text-blue-black font-semibold 2xl:3xl xl:text-3xl lg:text-2xl md:text-xl sm:text-base leading-tight text-center '>No Posts Were Found</p>

      </div>

)}

</div>



  <div className="self-center  mt-11 ">
  {pages> 1 && (
    <Pagination pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
    )}

  </div>





      </section>

  );
};

export default PostsPages;
