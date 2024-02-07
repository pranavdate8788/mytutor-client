import React from "react";
import landingimage1 from "../../assets/landingimage1-removebg-preview.png";
import landingimage2 from "../../assets/tutorial.png";
import landingimage3 from "../../assets/landing2.png";
import landingimage4 from "../../assets/landing4.png";
import landingimage5 from "../../assets/landing5.png";
import landingimage6 from "../../assets/landing6.png";
import landingimage7 from "../../assets/YT Thumbnail1.png";
import landingimage8 from "../../assets/YT Thumbnail2.png";
import landingimage9 from "../../assets/YT Thumbnail3.png";
import landingimage10 from "../../assets/landing10.png";
import { Link } from "react-router-dom";

function Landing_page() {
  return (
    <div className="ml-16 h-auto w-full flex flex-col sm:mb-[40%] items-center bg-white  sm:ml-0 sm:w-full  ">
      <div className="flex flex-col w-[45%] absolute mt-[8%]      items-center sm:w-fit sm:mt-[20%]  sm:h-auto sm:gap-1">
        <h1 className="text-5xl font-extrabold mt-2 text-[#0D0E2F] sm:text-2xl">
          {" "}
          Your Knowledge Sharing{" "}
        </h1>
        <h1 className="text-5xl font-extrabold mb-2 text-[#0D0E2F] sm:text-2xl ">Platform</h1>
        <p className="text-[#898CA9] text-[15px]  sm:text-[11px] sm:mt-3 ">
          Are you passionate about sharing your expertise and knowledge with
          others?{" "}
        </p>{" "}
        <p className="text-[#898CA9] text-[15px]  sm:text-[11px]">
          Do you have unique skills or insights that could benefit someone else?{" "}
        </p>{" "}
        <p className="text-[#898CA9] text-[15px]  sm:text-[11px]">
          Look no further – MyTutor is here.
        </p>
        <Link to="/explore" className="w-28 mt-7 text-center border text-color-3 border-color-7 h-auto p-2 rounded-lg bg-gradient-to-r from-[#933FFE] to-[#18C8FF]">
          Explore
        </Link>
      </div>
      <div className="flex justify-around items-center   mt-[17%] sm:hidden  pt-5 w-full">
        <div>
          <img src={landingimage1} className="h-60 w-72"></img>
        </div>
        <div>
          <img src={landingimage2} className="h-60 w-72"></img>
        </div>
      </div>

      <div className="flex flex-col w-[45%]  mt-[11%]    items-center sm:w-full">
        <h1 className="text-5xl font-extrabold mt-2 text-[#0D0E2F] sm:text-2xl">
          {" "}
          How It Works:{" "}
        </h1>
      </div>
      <div className="flex mt-[2%] sm:w-full  relative">
        <div className="w-[90%] bg-color-13 h-fit sm:hidden ">
          <img className="h-[600px]  w-full " src={landingimage10}></img>
        </div>
        <div className="absolute w-[75%] flex flex-col  -right-56 sm:w-full sm:left-0 sm:ml-10  top-10">
          <label className="mt-5 text-2xl text-[#0D0E2F] font-semibold sm:text-xl sm:font-extrabold">
            Step 1. Sign Up
          </label>
          <p className="text-[#898CA9] sm:text-[10px]">
            Create your MyTutor profile, showcasing your skills, expertise, and
            availability.
          </p>
          <label className="mt-9  text-2xl text-[#0D0E2F] font-semibold  sm:text-xl sm:font-extrabold">
            Step 2. Browse Requests
          </label>
          <p className="text-[#898CA9] sm:text-[10px]">
            Browse through learner requests for specific topics or skills.
            Choose the ones that align with your expertise.
          </p>

          <label className="mt-9  text-2xl text-[#0D0E2F] font-semibold  sm:text-xl sm:font-extrabold">
            Step 3. Schedule Sessions
          </label>
          <p className="text-[#898CA9] sm:text-[10px]">
            Coordinate with learners to schedule video call sessions at mutually
            convenient times.
          </p>

          <label className="mt-9 text-2xl text-[#0D0E2F] font-semibold  sm:text-xl sm:font-extrabold">
            Step 4. Share Knowledge
          </label>
          <p className="text-[#898CA9] sm:text-[10px]">
            During the video call, engage with your learners, share your
            insights, and guide them on their learning journey.
          </p>

          <label className="mt-9  text-2xl text-[#0D0E2F] font-semibold  sm:text-xl sm:font-extrabold">
            Step 5. Get Rewarded
          </label>
          <p className="text-[#898CA9] sm:text-[10px]">
            Earn rewards for your time and expertise. The more you share, the
            more you earn!
          </p>
        </div>
      </div>
      <div className="flex flex-col w-[45%]  mt-[11%] sm:w-full  sm:mt-[80%]    items-center   sm:items-center">
        <h1 className="text-5xl font-extrabold mt-2 text-[#0D0E2F] sm:text-2xl">
          {" "}
          Why Choose MyTutor?{" "}
        </h1>
        <p className="text-[#898CA9] mt-4 text-[15px] sm:text-[11px]">
          Are you passionate about sharing your expertise and knowledge with
          others?{" "}
        </p>{" "}
        <p className="text-[#898CA9] text-[15px] sm:text-[11px]">
          Do you have unique skills or insights that could benefit someone else?{" "}
        </p>{" "}
        <p className="text-[#898CA9] text-[15px] sm:text-[11px]">
          Look no further – MyTutor is here.
        </p>
      </div>
      <div className="w-[80%] flex  mt-[7%] items-center justify-around sm:w-full  sm:flex-col-reverse ">
        <div className="w-1/2 sm:w-[90%]">
          <img src={landingimage3}></img>
        </div>
        <div className="w-1/2 flex flex-col gap-3 sm:w-full sm:items-center">
          <h1 className="text-4xl font-extrabold mt-2 text-[#0D0E2F] sm:text-2xl">
            Empower Others
          </h1>
          <p className="sm:text-[11px] sm:w-[80%]">
            Your knowledge is valuable. By becoming a tutor on MyTutor, you'll
            be empowering individuals to expand their horizons and achieve their
            goals.
          </p>
        </div>
      </div>

      <div className="w-[80%] flex mt-[7%] items-center justify-around ml-10 sm:w-full sm:flex-col">
        <div className="w-1/2 flex flex-col gap-3 sm:w-full sm:items-center ">
          <h1 className="text-4xl font-extrabold mt-2  text-[#0D0E2F] sm:text-2xl">
            Earn While Sharing
          </h1>
          <p className="sm:text-[11px] sm:w-[80%]">
            Turn your expertise into earnings. Receive compensation for the
            knowledge you share with learners.
          </p>
        </div>
        <div className="w-1/2 sm:w-[90%]">
          <img className="ml-10 sm:ml-0" src={landingimage4}></img>
        </div>
      </div>

      <div className="w-[80%] flex mt-[7%] items-center justify-around sm:w-full  sm:flex-col-reverse ">
        <div className="w-1/2 sm:w-[90%]">
          <img className="h-60 ml-10 w-80" src={landingimage5}></img>
        </div>
        <div className="w-1/2 flex flex-col gap-3 sm:w-full sm:items-center">
          <h1 className="text-4xl font-extrabold mt-2 text-[#0D0E2F] sm:text-2xl">
            Seamless Video Calls
          </h1>
          <p className="sm:text-[11px] sm:w-[80%]">
            Our platform provides a smooth and secure video calling experience.
            Connect with your students from anywhere in the world.
          </p>
        </div>
      </div>
      <div className="w-[80%] flex mt-[7%] items-center justify-around ml-10 sm:w-full sm:flex-col">
        <div className="w-1/2 flex flex-col gap-3 sm:w-full sm:items-center">
          <h1 className="text-4xl font-extrabold mt-2 text-[#0D0E2F] sm:text-2xl">
          Flexible Schedule
          </h1>
          <p className="sm:text-[11px] sm:w-[80%]">
          Set your availability according to your convenience. MyTutor lets you manage your time and commitments effortlessly.
          </p>
        </div>
        <div className="w-1/2 sm:w-[85%]">
          <img className="ml-10 sm:ml-0" src={landingimage6}></img>
        </div>
      </div>
      <div className="flex flex-col w-[45%]  mt-[11%]    items-center sm:w-full sm:items-center sm:justify-center sm:mt-[15%]">
        <h1 className="text-5xl font-extrabold mt-2 text-[#0D0E2F] sm:text-2xl">
          {" "}
          Key Features of MyTutor{" "}
        </h1>
        <p className="text-[#898CA9] mt-4 text-[15px] sm:text-[8px]">
          "Unlock the Power of Direct Learning. Your Expertise, Your Connection,
          Your Earnings."
        </p>{" "}
      </div>
      <div className="flex gap-10 justify-center w-full mt-7 sm:flex-col sm:justify-center sm:items-center">
        <div>
          <img src={landingimage7} className="h-60 w-72"></img>
        </div>
        <div>
          <img src={landingimage8} className="h-60 w-72"></img>
        </div>
        <div>
          <img src={landingimage9} className="h-60 w-72"></img>
        </div>
      </div>
    

      <div className="flex flex-col w-[55%] mt-[8%]  mb-20  items-center sm:w-full sm:mt-[500px] ">
        <h1 className="text-5xl font-extrabold mt-2 text-[#0D0E2F] sm:text-2xl">
          {" "}
          Ready to Get Started?{" "}
        </h1>
        <p className="text-[#898CA9] text-[12px] ml-10 mt-5 sm:text-[10px] sm:mx-10 sm:w-[70%]">
          Join the MyTutor community today and make a positive impact on
          someone's learning experience. Whether you're a student seeking
          guidance or a tutor eager to share your knowledge, MyTutor brings you
          a world of learning opportunities.{" "}
        </p>{" "}
        <button className="w-28 mt-7 border text-color-3 border-color-7 h-auto p-2 rounded-lg bg-gradient-to-r from-[#933FFE] to-[#18C8FF]">
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Landing_page;
