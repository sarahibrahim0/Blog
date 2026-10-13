import Skeleton from "./Skeleton";
import "./Skeleton.css";

const PageSkeleton = () => {
  return (
    <div className="page-skeleton">
      <div className="page-skeleton-hero">
        <Skeleton variant="title" width="45%" height="34px" />
        <Skeleton variant="text" width="70%" />
        <Skeleton variant="text" width="55%" />
      </div>
      <div className="page-skeleton-grid">
        {[0, 1, 2].map((i) => (
          <div key={i} className="page-skeleton-card">
            <Skeleton variant="image" height="170px" />
            <Skeleton variant="title" width="70%" />
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="85%" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PageSkeleton;
