import "./admin-table.css";
import AdminSidebar from "./AdminSidebar";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteComment, fetchComments } from "../../redux/apiCalls/commentApiCalls";
import myImage from '../../images/9264822.jpg'


const CommentsTable = () => {
  const dispatch = useDispatch();
  const { comments } = useSelector(state => state.comment);


  useEffect(() => {
    dispatch(fetchComments());
  }, [comments]);

  // Delete Comment Handler
  const deleteCommentHandler = (commentId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this comment!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteComment(commentId));
      }
    });
  };

  return (
    <div className="box-border w-full px-2 grid gap-5 grid-cols-12 mt-10 h-full  min-h-[80vh]">
    <div className="2xl:col-span-2 xl:col-span-2 lg:col-span-3 md:col-span-12 sm:col-span-12">
    <AdminSidebar/>
    </div>
    <div className="w-full 2xl:col-span-10 xl:col-span-10 lg:col-span-9 md:col-span-12 sm:col-span-12">
     <span className="inline-block mb-5 text-xl font-semibold text-blue-black ">Comments</span>

     {comments?.length >0 ?  (
      <div className="mt-4 mb-3 w-full  ">
      <div className="z-0 relative w-full   not-prose bg-[#dee3ff92] rounded-xl  overflow-hidden">
      <div style={{"backgroundPosition":"10px 10px"}} className="z-0  absolute inset-0 bg-grid-slate-100  "></div>

      <div className="box-border relative py-5 w-full h-auto rounded-xl border-[1px]  bg-[#dee3ff08] text-blue-black overflow-auto">
      <div className="box-border relative z-20 h-[70%] w-full   my-8 shadow-sm">
      <table className=" w-full h-full table text-sm border-collapse  align-middle 	">

            <thead className="  align-middle border-b-[1px]">
            <tr className=" border-[#e5e7eb] align-middle ">
            <th className="text-start 2xl:p-4 xl:p-4 lg:p-4 md:p-10 sm:p-10 pl-8">Count</th>
            <th className="text-start 2xl:p-4 xl:p-4 lg:p-4 md:p-10 sm:p-10">User</th>
                    <th className="text-start 2xl:p-4 xl:p-4 lg:p-4 md:p-10 sm:p-10">Comment</th>
                    <th className="text-start 2xl:p-4 xl:p-4 lg:p-4 md:p-10 sm:p-10 pr-8 ">Action</th>
                  </tr>
                </thead>
                <tbody className=" bg-white ">

                  {comments?.map((item, index) => (
                    <tr key={item?._id} className="border-b-[1px]">
                    <td className="2xl:p-4 xl:p-4 lg:p-4 md:p-10 sm:p-10 pl-8 ">{index + 1}</td>
                    <td className="2xl:p-4 xl:p-4 lg:p-4 md:p-10 sm:p-10">
                    <div className="flex flex-row space-x-2 items-center">
                          <img
                            src={`${item?.user?.profilePhoto?.url}`}
                            alt=""
                            className="w-10 h-10 rounded-full object-cover"
                            />
                          <span className="whitespace-nowrap">{item?.user?.username}</span>
                        </div>
                      </td>
                      <td className="flex 2xl:p-4 xl:p-4 lg:p-4 md:p-10 sm:p-10 w-[400px] h-full  overflow-hidden">
                        <span className="inline-block w-full  self-center whitespace-nowrap truncate ...  md:border-spacing-x-2	 sm:border-spacing-x-2	 ">{item?.text}</span>
                      </td>
                      <td className="2xl:p-4 xl:p-4 lg:p-4 md:p-10 sm:p-10 pr-8">
                      <div className="flex flex-row items-center space-x-4 ">


                          <button onClick={()=>deleteCommentHandler(item?._id)} className="relative z-20 text-sm  my-1 !bg-gradient-to-r from-sky-500 to-indigo-500  text-white min-h-[41.6px] box-border  hover:!bg-custom-color  transition-all duration-500 ease-in-out  border-[1px] rounded-full py-2 px-6 mr-2" >
      <span className="text-inherit text-sm inline-block mr-1 whitespace-nowrap  ">
      Delete
      </span>
      </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </div>
            </div>
            </div>
     ) : (
      <div className='box-border w-full h-auto my-10 flex flex-col items-center justify-start '>


      <div className='box-border flex flex-row justify-center items-center  2xl:w-full xl:w-full lg:w-full md:w-[80%] sm:w-[80%] h-[40vh]' >
      <div  className='w-full h-full ' style={{'backgroundImage':`url(${myImage})` , 'backgroundRepeat' :'no-repeat' , 'backgroundPosition' :'center','backgroundSize' :'contain'}}>

      </div>
      </div>


          <p className='w-full  h-[10vh] text-blue-black font-semibold 2xl:3xl xl:text-3xl lg:text-2xl md:text-xl sm:text-base leading-tight text-center '>No Comments Were Found</p>

          </div>
     )}

    </div>
  </div>
  );
};

export default CommentsTable;
