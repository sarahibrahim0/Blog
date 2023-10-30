
import { useEffect, useState } from "react";
import Pagination from "../../components/pagination/Pagination";
import PostList from "../../components/posts/PostList";
import Sidebar from "../../components/sidebar/Sidebar";
import { useDispatch , useSelector} from "react-redux";
import { getPostsCount , fetchPosts } from "../../redux/apiCalls/postApiCalls";
import './PostsPages.css'

const POST_PER_PAGE = 3;

const PostsPages = () => {
  const dispatch = useDispatch();
  const { postsCount, posts } = useSelector(state => state.post);
  const {categories} = useSelector(state=>state.category)

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
    <>
      <section className="posts-page">
        <PostList posts={posts} />
        <Sidebar categories={categories} />
      </section>
      {posts.length > 0 && (
        <Pagination
        pages={pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
       />
      )}
    </>
  );
};

export default PostsPages;
