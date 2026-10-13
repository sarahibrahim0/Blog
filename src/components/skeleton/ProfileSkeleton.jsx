import Skeleton from "./Skeleton";

const ProfileSkeleton = () => {
  return (
    <div className="w-full flex flex-col items-center justify-start py-10 space-y-5">
      <Skeleton variant="circle" width="160px" height="160px" />
      <Skeleton variant="title" width="220px" />
      <Skeleton variant="text" width="320px" />
      <div className="w-full max-w-[600px] flex flex-col space-y-3 pt-5">
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="90%" />
        <Skeleton variant="text" width="70%" />
      </div>
    </div>
  );
};

export default ProfileSkeleton;
