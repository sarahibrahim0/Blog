
import { useDispatch, useSelector } from 'react-redux';
import AddCategoryForm from './AddCategoryForm';
import './Admin.css';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchCategories } from '../../redux/apiCalls/categoryApiCalls';
import { getUsersCount } from '../../redux/apiCalls/profileApiCalls';
import { getPostsCount } from '../../redux/apiCalls/postApiCalls';
import { fetchComments } from '../../redux/apiCalls/commentApiCalls';
import DashboardItem from '../../components/dashboard-item/DashboardItem';
const AdminMain = () => {
    const dispatch = useDispatch();
    const{categories} = useSelector(state=>state.category);
    const{userCount} = useSelector(state=>state.profile);
    const{postsCount} = useSelector(state=>state.post);
    const{comments} = useSelector(state=>state.comment);



    useEffect(()=>{
        dispatch(fetchCategories());
        dispatch(getUsersCount());
        dispatch(getPostsCount());
        dispatch(fetchComments());
    },[])
    return (
    <div className="w-full ">

        <div className="w-auto grid 2xl:grid-flow-col xl:grid-flow-col  lg:grid-flow-col 2xl:grid-cols-4 xl:grid-cols-4  lg:grid-cols-4  md:grid-cols-12 sm:grid-cols-12 gap-2 ">

            <div className="2xl:col-span-1 xl:col-span-1 lg:col-span-1 md:col-span-6 sm:col-span-6">
                <DashboardItem title='Users' number={userCount} link='users-table'/>
            </div>

            <div className="2xl:col-span-1 xl:col-span-1 lg:col-span-1  md:col-span-6 sm:col-span-6">
                <DashboardItem title='Posts' number={postsCount} link='posts-table'/>
            </div>

            <div className="2xl:col-span-1 xl:col-span-1 lg:col-span-1  md:col-span-6 sm:col-span-6">
                <DashboardItem title='Categories' number={categories.length} link='categories-table'/>
            </div>

                      <div className="2xl:col-span-1 xl:col-span-1 lg:col-span-1  md:col-span-6 sm:col-span-6">
                <DashboardItem title='Comments' number={comments.length} link='comments-table'/>
            </div>
        </div>

        <AddCategoryForm/>


    </div>  );
}

export default AdminMain;