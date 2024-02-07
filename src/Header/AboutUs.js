import React from "react";
import cat_image8 from "../assets/Online learning-amico.png";
import cat_image12 from "../assets/woman-1063100__180.jpg";
import ashwint from "../assets/brandng/ashwint.png";

function AboutUs() {
  return (
    <div className="w-full ml-16 pb-20 bg-white flex flex-col sm:ml-0  h-auto rounded-3xl dark:bg-color-11 dark:text-white">
      <div className="  justify-center mx-auto my-9 dark:bg-color-11 dark:text-white sm:flex-col-reverse sm:w-full flex items-center w-[80%]  ">
        <div className="w-1/2 sm:w-full gap-7 px-2 flex flex-col  p-2">
          <h1 className="font-bold px-4 sm:px-auto sm:font-medium sm:text-xl font-font-primary dark:text-white text-color-14 text-6xl">
            ABOUT US
          </h1>
          <p className="px-4 dark:text-white sm:px-auto sm:w-full para sm:text-sm">
            MyTutor is an Indian organization and an authentic destination for
            all your learnings. We provide students, tutors and institutions
            with simplified and accurate results based on their needs. Our aim
            is to make learning and sharing knowledge accessible, affordable and
            valuable. Students can choose any academic subject they wish to
            learn and any skill they wish to master by benefiting from our
            verified tutors. You can choose from the wide range of options that
            interest you. We will help you reach out to qualified teachers
            across the country from the ease of your rooms. Similarly, teachers,
            tutors, institutions can offer one or more subject areas to showcase
            their expertise and assist the students via their preferred mediums.
            At our platform, you can also create and present workshops on your
            selected topics. We are a trusted channel intending to connect the
            teacher and learner.
          </p>
          <p className="px-4 dark:text-white sm:px-auto sm:w-full sm:text-sm">
            MyTutor will help each and everyone to achieve their goals and gain
            proficiency in their required areas.
          </p>
        </div>
        <div className=" w-1/2 sm:w-full sm:m-auto flex items-center justify-center py-4 sm:py-2 h-full">
          <img className="h-[70%] w-[75%]" src={cat_image8}></img>
        </div>
      </div>
      <div className="dark:bg-color-11 dark:text-white  flex flex-col justify-center w-full h-auto">
        <div className="flex w-full justify-center py-4">
          <h1 className="text-4xl font-bold">OUR TEAM</h1>
        </div>
        <div className="flex sm:mb-16 items-center sm:flex-col sm:w-full  gap-4 flex-wrap justify-center w-full h-auto">
          <div className="w-[40%] sm:w-[95%] sm:mx-1 sm:px-1 mx-4 my-4 justify-center bg-color-3 px-3 py-2   flex  ">
            <div className="w-[30%] rounded-full     h-auto">
              <img
                className="rounded-full h-[130px] w-[130px]"
                src={ashwint}></img>
            </div>
            <div className="w-[60%] flex justify-center gap-2  flex-col">
              <a href="https://www.ashwintelmore.com" className="px-2 text-xl font-font-logo text-color-14">

                Ashwin Telmore

              </a>
              <label className="px-2 text-sm text-color-9 font-font-logo">
                ashwintelmore@gmail.com
              </label>
              <div className="flex gap-5 w-full   px-1">
                <a href="https://github.com/ashwintelmore">

                  <i
                    class="fa-brands fa-github text-2xl cursor-pointer transition-all duration-500 ease-in-out hover:bg-color-14 rounded-full py-1 px-2 hover:text-white"
                    title="Github"></i>
                </a>
                <a href="https://www.linkedin.com/in/ashwintelmore/">

                  <i
                    class="fa-brands fa-linkedin-in text-2xl cursor-pointer transition-all duration-500 ease-in-out hover:bg-color-14 rounded-full py-1 px-2 hover:text-white"
                    title="Linked In"></i>
                </a>

              </div>

            </div>

          </div>
          <div className="w-[40%] sm:w-[95%] sm:mx-1 sm:px-1 mx-4 my-4 justify-center bg-color-3 px-3 py-2   flex  ">
            <div className="w-[30%] rounded-full     h-auto">
              <img
                className="rounded-full h-[130px] w-[130px]"
                src={cat_image12}></img>
            </div>
            <div className="w-[60%] flex justify-center gap-2  flex-col">
              <label className="px-2 text-xl font-font-logo text-color-14">
                Pranay ...
              </label>
              <label className="px-2 text-sm text-color-9 font-font-logo">
                pranay@gmail.com
              </label>
              <div className="flex gap-5 w-full   px-1">
                <a href="https://github.com/ashwintelmore">

                  <i
                    class="fa-brands fa-github text-2xl cursor-pointer transition-all duration-500 ease-in-out hover:bg-color-14 rounded-full py-1 px-2 hover:text-white"
                    title="Github"></i>
                </a>
                <a href="https://www.linkedin.com/in/ashwintelmore/">

                  <i
                    class="fa-brands fa-linkedin-in text-2xl cursor-pointer transition-all duration-500 ease-in-out hover:bg-color-14 rounded-full py-1 px-2 hover:text-white"
                    title="Linked In"></i>
                </a>

              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
