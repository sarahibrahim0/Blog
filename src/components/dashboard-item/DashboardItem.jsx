
import { Link } from "react-router-dom";
const DashboardItem = (props) => {
    return (
        <div className="w-full h-auto  border-[1px] p-3 rounded-lg flex flex-col space-y-2">
            <div className="flex flex-row justify-start items-end">
              <span className="text-xs font-semibold text-blue-black">
              {props.title}
              </span>
            </div>
            <div className="flex flex-row justify-between items-end">
                <h2 className="font-semibold text-very-blue">{props.number}</h2>
                <div>
                <Link to={`/admin-dashboard/${props.link}`} className="hover:text-very-blue transition-all duration-500 ease-in-out">
                    <span className="text-xs text-blue-black hover:text-very-blue">
                    View More
                    </span>
                    </Link>
                </div>

            </div>
        </div>
     );
}

export default DashboardItem;