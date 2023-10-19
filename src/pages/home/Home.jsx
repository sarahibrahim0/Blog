
import styles from './Home.module.css'
import { Link } from "react-router-dom";
import { categories, posts } from "../../dummyData";
import PostList from '../../components/posts/PostList';
import Sidebar from '../../components/sidebar/Sidebar';
import CreatePost from '../create-post/CreatePost';
const Home = () => {
    return (     <section className="home">
    <div className={styles.homeHeroHeader}>
      <div className={styles.homeHeroHeaderLayout}>
        <h1 className={styles.homeTitle}>Welcome to Blog</h1>
      </div>
    </div>
    <div className={styles.homeLatestPost}>Latest Posts</div>
    <div className={styles.homeContainer}>
      <PostList posts={posts.slice(0, 3)} />
      <Sidebar categories= {categories}/>
    </div>
    <div className={styles.homeSeePostsLink}>
      <Link className="home-link" to="/posts">
        See All Posts
      </Link>
    </div>
  </section> );
}

export default Home;




