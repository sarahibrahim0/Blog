import Skeleton from "./Skeleton";

const PostCardSkeleton = () => {
  return (
    <div className="box-border bg-white w-full rounded-2xl ">
      <article className="w-full  h-auto flex flex-col rounded-2xl box-border relative border-[1px] border-[#8589a038] md:p-5  sm:p-2">
        <div className="w-full relative self-center mb-3 ">
          <Skeleton variant="image" height="290px" radius="1rem" />
        </div>

        <div className="box-border   flex flex-col h-auto items-start space-y-5 w-full mb-4 ">
          <Skeleton variant="title" width="85%" />

          <div className="w-full flex flex-row items-center space-x-2">
            <Skeleton variant="circle" width="48px" height="48px" />
            <Skeleton variant="text" width="120px" />
            <Skeleton variant="text" width="80px" />
          </div>

          <div className="w-full flex flex-col space-y-2">
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="95%" />
            <Skeleton variant="text" width="65%" />
          </div>

          <Skeleton variant="text" width="130px" height="41px" radius="9999px" />
        </div>
      </article>
    </div>
  );
};

export default PostCardSkeleton;
