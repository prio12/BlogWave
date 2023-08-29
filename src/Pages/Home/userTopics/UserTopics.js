import React, { useState,useEffect } from 'react'; 


const allTopics = [
    "Technology",
    "Science",
    "Art",
    "Health",
    "Travel",
    "Food",
    "Fashion",
    "Sports",
    "Music",
    "Books",
  ]; // Your array of topics
  const topicsPerPageLarge = 6;
  const topicsPerPageSmall = 3; // Number of topics to show at a time

  
  

const UserTopics = () => {


    // const [startIndex, setStartIndex] = useState(0);
    const [startIndex,setStartIndex] = useState(0)
    const [isSmallScreen, setIsSmallScreen] = useState(false);


    useEffect(() => {
        const handleResize = () => {
          setIsSmallScreen(window.innerWidth <= 768);
        };
    
        // Initial check
        handleResize();
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
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
    //   const nextIndex = startIndex + 1;
    //   // Don't go past the end of the list
    //   const maxIndex = allTopics.length - topicsPerPage;
    //   // Set the index to either nextIndex or maxIndex (whichever is smaller)
    //   setStartIndex(Math.min(nextIndex, maxIndex));
    // };
  };

  const visibleTopics = allTopics.slice(startIndex, startIndex + topicsPerPage);
    return (
        <div className="slider-container flex gap-5 px-12">
      <div>
        <button
          className={`slider-button prev ${startIndex === 0 ? 'hidden' : ''}`}
          onClick={goToPrevSlide}
        >
          &#8249;
        </button>
      </div>

      <div className="topics flex gap-5">
        {visibleTopics.map((topic, index) => (
          <div className="topic" key={index}>
            {topic}
          </div>
        ))}
      </div>
      <div>
        <button
          className={`slider-button next ${
            startIndex + topicsPerPage >= allTopics.length ? 'hidden' : ''
          }`}
          onClick={goToNextSlide}
        >
          &#8250;
        </button>
      </div>
    </div>
    );
};

export default UserTopics;