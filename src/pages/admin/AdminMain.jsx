
import { useDispatch, useSelector } from 'react-redux';
import AddCategoryForm from './AddCategoryForm';
import './Admin.css';
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
    <div className="admin-main">
        <header className="admin-overview-header">
            <span className="admin-overview-eyebrow">Dashboard</span>
            <h1 className="admin-overview-title">Overview</h1>
            <p className="admin-overview-sub">
                A quick summary of your blog activity.
            </p>
        </header>

        <div className="admin-stats-grid">
            <DashboardItem title='Users' number={userCount} link='users-table' icon='fa-regular fa-user'/>
            <DashboardItem title='Posts' number={postsCount} link='posts-table' icon='fa-regular fa-newspaper'/>
            <DashboardItem title='Categories' number={categories.length} link='categories-table' icon='fa-solid fa-list-ul'/>
            <DashboardItem title='Comments' number={comments.length} link='comments-table' icon='fa-regular fa-comment'/>
        </div>

        <AddCategoryForm/>
    </div>  );
}

export default AdminMain;