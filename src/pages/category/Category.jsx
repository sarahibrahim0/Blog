
import { useParams, Link } from 'react-router-dom';
import PostList from '../../components/posts/PostList';
import'./Category.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchPostsByCategory } from '../../redux/apiCalls/postApiCalls';
const Category = () => {

    const {category}= useParams();
    const dispatch = useDispatch();
    const{postsCategories} = useSelector(state=>state.post);

    useEffect(()=>{
     dispatch(fetchPostsByCategory(category));
     window.scrollTo(0,0);
    },[category])
    return ( <section className='category'>

{postsCategories.length === 0 ? (
        <>
          <h1 className="category-not-found">
            Posts with <span>{category}</span> category not found
          </h1>
          <Link to="/posts" className="category-not-found-link">
            Go to posts page
          </Link>
        </>
      ) : (
        <>
          <h1 className="category-title">Posts based on {category}</h1>
          <PostList posts={postsCategories} />
        </>
      )}
    </section> );
}

export default Category;