
import { useParams } from 'react-router-dom';
import PostList from '../../components/posts/PostList';
import {posts} from '../../dummyData'
import'./Category.css';
const Category = () => {

    const {category}= useParams()
    return ( <section className='category'>

        <h1 className="category-title">Posts based on {category}</h1>
<PostList posts={posts}/>
    </section> );
}

export default Category;