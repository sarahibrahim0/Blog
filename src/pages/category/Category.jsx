
import { useParams, Link } from 'react-router-dom';
import'./Category.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchPostsByCategory } from '../../redux/apiCalls/postApiCalls';
import Pagination from '../../components/pagination/Pagination';
import { fetchCategories, fetchCategoryPosts } from '../../redux/apiCalls/categoryApiCalls';
import myImage from '../../images/9264822.jpg'
const POST_PER_PAGE = 6;

const Category = () => {


    const {category}= useParams();
    const dispatch = useDispatch();
    const{postsCategories} = useSelector(state=>state.post);
    const {categoryPosts} = useSelector(state=>state.category);
    const [currentPage, setCurrentPage] = useState(1);


    useEffect(()=>{
      dispatch(fetchCategories());
      window.scrollTo(0,0);
     },[])



    useEffect(()=>{
     dispatch(fetchPostsByCategory(category));
     window.scrollTo(0,0);
    },[category])

    useEffect(() => {
      dispatch(fetchCategoryPosts(category , currentPage));
      window.scrollTo(0, 0);
    }, [currentPage]);


    const pages = Math.ceil(postsCategories.length/POST_PER_PAGE);

    return (
<>
{postsCategories.length > 0 ? (
  <div className="box-border  h-full relative my-10 mx-2">


  <section className="box-border w-full rounded-xl   grid  grid-cols-12 border-[1px] min-h-max mb-10  p-12  ">


  <div className="col-span-12 box-border w-full flex  flex-col  xl:h-[190px] lg:h-[190px] ">

  <span className='text-[14px] whitespace-nowrap text-faint-gray leading-[1.8] font-thin '>
    Browse Category
  </span>
  <h1 className='text-3xl text-blue-black font-bold'>
    {category}
  </h1>

  <div className=" box-border h-auto overflow-hidden   my-2">
            <div className="dividerLine0 box-border border-blue-black rounded-full w-screen "></div>
          </div>

          <p className='text-[14px]  text-faint-gray leading-[1.8] font-thin mt-4'>
          A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine.
          </p>










          </div>




      </section>



      <div className="box-border w-full grid  xl:gap-y-7 lg:gap-y-7 md:gap-y-2 sm:gap-y-2 ">

              {
                categoryPosts?.map((post, index) => (

  <article key={index}  className="box-border w-full   bg-white h-auto p-5 grid grid-cols-12 rounded-2xl relative border-[1px] border-[#8589a038]  transition-all duration-[842.435ms] ease-in-out boxShadow">
                  <div className=" flex flex-row items-center justify-start xl:p-5 lg:p-5  box-border h-full w-full  xl:col-span-4 lg:col-span-4 md:col-span-12  sm:col-span-12  md:mb-3 sm:mb-3">
                          <Link className="box-border  w-full block h-full image rounded-2xl overflow-hidden  "
                          to={`/posts/details/${post?._id}`}>

<div className="h-auto w-auto relative overflow-hidden  rounded-2xl">
<img src={post?.image?.url} alt={post?.title} className=" inline-block cursor-pointer rounded-2xl w-full h-[301px]    object-cover transition-all duration-[.7s] ease-in-out hover:scale-[1.2]"/>

<Link to={`/posts/categories/${post?.category}`}>
                          <span className=" inline-block w-auto  bottom-[30px] left-0  absolute bg-black text-white px-4 py-[7px] text-xs whitespace-normal">    {post?.category}
                      </span>
                          </Link>
</div>




                          </Link>


                      </div>

      <div className="box-border flex flex-col h-auto xl:justify-center lg:justify-center items-start md:space-y-5 sm:space-y-5  xl:col-span-8 lg:col-span-8 md:col-span-12 sm:col-span-12 m:mb-4 sm:mb-4 xl:p-5 lg:p-5 ">
      <h3 className="title min-h-max  w-full ">
      <a className=" titleLink  cursor-pointer w-full break-normal " href={`/posts/details/${post?._id}`}>
          <span className="break-all text-blue-black font-bold text-lg hover:text-[#4776E6] ">
              {post?.title}
              </span>
          </a>
      </h3>
      <div className="info flex flex-row items-center italic justify-between flex-nowrap min-h-[48px] ">
          <div className="author flex flex-row items-center justify-between">
              <div className="authorImage  min-w-max min-h-max">
              <img src={post.user?.profilePhoto?.url} alt="author" className="rounded-full w-12  h-12 object-cover"  />
              </div>
              <div>
              <span className="mx-1 text-[13px] whitespace-nowrap ">By</span>
          <Link className="font-bold text-[13px] whitespace-nowrap" >{post.user?.username}</Link>
              </div>

          </div>
          <div className="date whitespace-nowrap">
              <span className="text-[13px] ">
              {new Date(post?.createdAt).toDateString()}

              </span>

          </div>
      </div>
      <p className="text-sm leading-normal w-full overflow-hidden  h-[96px] ">
          <span className="inline-block break-all h-full text-faint-gray">{post?.description}</span>
      </p>

      <Link className=  "hover:text-white min-h-[41.6px] box-border  hover:bg-[#4776E6] transition-all duration-500 ease-in-out  border-[1px] rounded-full py-2 px-7 mr-2"to={`/posts/details/${post?._id}`} >
          <span className="text-inherit text-xs inline-block mr-1">
              Read More
          </span>
          <i className=" fa-solid fa-chevron-up text-inherit rotate-90 text-xs" ></i>

      </Link>

      </div>



      </article>


                ))
              }

              {pages > 1 &&
              (
                <div className="self-center w-full flex flex-row justify-center items-center mt-11  ">

                <Pagination pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
                </div>

              ) }


  </div>

  </div>)
  :
  (
    <div className='box-border w-full h-auto my-10 flex flex-col items-center justify-start '>


<div className='box-border flex flex-row justify-center items-center  2xl:w-full xl:w-full lg:w-full md:w-[80%] sm:w-[80%] h-[40vh]' >
<div  className='w-full h-full ' style={{'backgroundImage':`url(${myImage})` , 'backgroundRepeat' :'no-repeat' , 'backgroundPosition' :'center','backgroundSize' :'contain'}}>

</div>
</div>


    <p className='w-full  h-[10vh] text-blue-black font-semibold 2xl:3xl xl:text-3xl lg:text-2xl md:text-xl sm:text-base leading-tight text-center '>No Posts Were Found</p>

    </div>
  )
}
</>



    );
}

export default Category;