import { useState } from "react";
import "./header.css";
import HeaderLeft from "./HeaderLeft";
import Navbar from "./Navbar";
import HeaderRight from "./HeaderRight";
import HeaderUpper from "./HeaderUpper";
import Sidenaav from "./sidenav/Sidenaav";

const Header = () => {
  const [toggle, setToggle] = useState(false);



  return (
    <div className="w-full">
      <HeaderUpper/>


<header className="box-border bg-white w-full h-24 py-0 px-5 flex  flex-row justify-between items-center">
        <div className="flex-1 basis-0 flex flex-row  justify-start ">
        <HeaderLeft toggle={toggle} setToggle={setToggle} />
        </div>
        <div className=" flex-1 basis-0 lg:flex items-center   flex-row   justify-center  md:hidden sm:hidden  ">
        <Navbar toggle={toggle} setToggle={setToggle}/>
        </div>
        <div className="flex-1 basis-0 flex flex-row justify-end  ">
        <HeaderRight />
        </div>
    </header>

    <div className="  py-0 2xl:px-5 xl:px-5 lg:px-5 md:px-2 sm:px-2 box-border h-auto ">
          <div className="dividerLine box-border"></div>
        </div>

    </div>

  );
};

export default Header;
