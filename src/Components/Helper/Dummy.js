import React from "react";
import Error from "../../assets/ Error1 (1).png"


const Dummy = () => {
  return (
    <div className=" w-full flex h-screen rounded-3xl  dark:bg-color-11 justify-center items-center  p-2 ml-16">
      <div className="flex flex-col relative w-full items-center justify-center">
        <img src={Error} className="  w-[600px] h-auto "></img>
        <h1 className="text-5xl font-bold absolute dark:text-white bottom-[70px] w-auto">Error: Page Not Found !</h1>
      </div>
    </div>
  );
}

export default Dummy;
