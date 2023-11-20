import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const UserTopics = ({handleDisplayedContent,selectedTopic}) => {
  const blogs = useSelector((state) => state?.blogs?.blogs);
  // const allTopics = blogs.map((blog) => blog.category); // Filter out undefined values
  const topics = blogs.map((blog) => blog.category); // Filter out undefined values
  const allTopics = ["For you",...topics];
  const [startIndex, setStartIndex] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const topicsPerPageLarge = 6;
  const topicsPerPageSmall = 3; // Number of topics to show at a time

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const topicsPerPage = isSmallScreen ? topicsPerPageSmall : topicsPerPageLarge;

  const goToNextSlide = () => {
    setStartIndex(Math.min(startIndex + 1, allTopics.length - topicsPerPage));

    // explanations for above line

    // const goToNextSlide = () => {
    //   // Calculate the index for the next slide
    //   const nextIndex = startIndex + 1;
    //   // Don't go past the end of the list
    //   const maxIndex = allTopics.length - topicsPerPage;
    //   // Set the index to either nextIndex or maxIndex (whichever is smaller)
    //   setStartIndex(Math.min(nextIndex, maxIndex));
    // };
  };

  const goToPrevSlide = () => {
    setStartIndex(Math.max(startIndex - 1, 0));

    // explanations for above line

    // const goToNextSlide = () => {
    //   // Calculate the index for the next slide
    //   const prvIndex = startIndex -1 ;
    //   // Don't go past the end of the list
    //   const minIndex = 0;
    //   // Set the index to either nextIndex or maxIndex (whichever is smaller)
    //   setStartIndex(Math.max(prvIndex, 0));
    // };
  };

  //handle content
 

  const visibleTopics = allTopics.slice(startIndex, startIndex + topicsPerPage);
  return (
    <div className=" relative flex mb-5 items-center gap-2">
      <button
        className={` ${startIndex === 0 ? "hidden" : ""}`}
        onClick={goToPrevSlide}
      >
        &#8249;
      </button>
      <div>
        <div className="topics flex gap-5">
          {visibleTopics.map((topic, index) => (
            <div style={{ fontSize: "12px" }} className={`topic cursor-pointer ${topic === selectedTopic && "underline"}`} onClick={() => handleDisplayedContent(topic)} key={index}>
              {topic}
            </div>
          ))}
        </div>
      </div>
      <button
        className={`${
          startIndex + topicsPerPage >= allTopics.length ? "hidden" : ""
        }`}
        onClick={goToNextSlide}
      >
        &#8250;
      </button>
    </div>
  );
};

export default UserTopics;
