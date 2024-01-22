
import './Pagination.css'
const Pagination = ({pages, currentPage, setCurrentPage}) => {

    const generatedPages = [];
    for(let i = 1; i <= pages ; i++){
     generatedPages.push(i)
    }

    return (
         <nav aria-label="Page navigation example z-10 ">
    <ul className="list-style-none   flex space-x-1 z-10 ">
      <button  onClick={()=> setCurrentPage(prev => prev-1)} disabled={currentPage === 1}  >
        <a
          className={currentPage === 1? 'disabled' : 'page'}
          ><i class="fa-solid fa-arrow-left"></i></a
        >
      </button>

      {
        generatedPages.map((pageNumber, index)=>
        <li key={index}>
        <a
          className={currentPage === pageNumber? 'active' :'page'} onClick={()=>setCurrentPage(pageNumber)}
          href="#!"
          >{pageNumber}</a>
      </li>)
      }

      {/* <li aria-current="page">
        <a
          className="ease-in-out relative block rounded-full bg-primary-100 hover:text-[#4776E6] border-[1px] px-6 py-4 text-lg font-medium text-primary-700 transition-all duration-300 hover:border-[#4776E6]"
          href="#!"
          >2
          <span
            className=" ease-in-out absolute -m-px h-px w-px overflow-hidden border-[#4776E6] text-[#4776E6] whitespace-nowrap border-[1px]  p-0 [clip:rect(0,0,0,0)]"
            >(current)</span>
        </a>
      </li>
      <li>
        <a
          className="ease-in-out relative block rounded-full bg-transparent hover:text-[#4776E6] border-[1px] px-6 py-4 text-lg text-neutral-600 transition-all duration-300 hover:border-[#4776E6] dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
          href="#!"
          >3</a
        >
      </li> */}
      <button  onClick={()=> setCurrentPage(prev => prev+1)} disabled={currentPage === pages}>
        <a
         className={currentPage === pages? 'disabled' : 'page'}
          ><i class="fa-solid fa-arrow-right"></i></a
        >
      </button>
    </ul>
  </nav>
  );
}

export default Pagination;