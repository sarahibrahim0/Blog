import Skeleton from "./Skeleton";

const TableSkeleton = ({ rows = 6, columns = 5 }) => {
  return (
    <div className="w-full">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="w-full flex flex-row items-center space-x-4 py-4 border-b border-[#8589a038]"
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div key={colIndex} className="flex-1">
              <Skeleton
                variant="text"
                width={colIndex === 0 ? "60%" : "80%"}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TableSkeleton;
