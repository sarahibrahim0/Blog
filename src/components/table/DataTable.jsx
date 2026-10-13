import myImage from "../../images/9264822.jpg";
import TableSkeleton from "../skeleton/TableSkeleton";
import "./DataTable.css";

const DataTable = ({
  columns = [],
  rows = [],
  rowKey = "_id",
  loading = false,
  skeletonRows = 6,
  emptyText = "No data were found",
}) => {
  const getRowKey = (row, index) =>
    typeof rowKey === "function" ? rowKey(row, index) : row?.[rowKey] ?? index;

  if (loading && rows.length === 0) {
    return (
      <div className="data-table-skeleton">
        <TableSkeleton rows={skeletonRows} columns={columns.length + 1} />
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className="data-table-empty">
        <div
          className="data-table-empty-image"
          style={{ backgroundImage: `url(${myImage})` }}
        />
        <p className="data-table-empty-text">{emptyText}</p>
      </div>
    );
  }

  return (
    <div className="data-table-wrap">
      <div className="data-table-scroll">
        <table className="data-table">
          <thead>
            <tr>
              <th className="data-table-th data-table-th--count">Count</th>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`data-table-th ${col.headerClassName || ""}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={getRowKey(row, index)} className="data-table-tr">
                <td className="data-table-td data-table-td--count">
                  {index + 1}
                </td>
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`data-table-td ${col.cellClassName || ""}`}
                  >
                    {col.render ? col.render(row, index) : row?.[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
