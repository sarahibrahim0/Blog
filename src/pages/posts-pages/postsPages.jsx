
import { useEffect } from "react";
import Pagination from "../../components/pagination/Pagination";
import PostList from "../../components/posts/PostList";
import Sidebar from "../../components/sidebar/Sidebar";
import { posts,categories } from "../../dummyData";

const PostsPages = () => {

    useEffect(()=>{
        window.scrollTo(0,0);
    },[]);

    return (
        <>
        <section className="post-page">
            <PostList posts={posts}/>
            <Sidebar categories={categories}/>
        </section>
        <Pagination/>
        </>
    );
}

export default PostsPages;