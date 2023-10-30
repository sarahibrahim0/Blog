
import './Pagination.css'
const Pagination = ({pages, currentPage, setCurrentPage}) => {
    const generatedPages = [];
    for(let i = 1; i <= pages ; i++){
     generatedPages.push(i)
    }
    return ( <div className="pagination">
        <button className="page previous"
        onClick={()=> setCurrentPage(prev => prev-1)}
        disabled={currentPage === 1}>
            Previous
        </button>
        {generatedPages.map(page => (
        <div key={page} className={currentPage === page ? "page active" : "page"} onClick={()=>setCurrentPage(page)}>
{page}
        </div>))}
        <button className="page next"
                onClick={()=> setCurrentPage(prev => prev+1)}
                disabled={currentPage === pages}>
            Next
        </button>
    </div> );
}

export default Pagination;