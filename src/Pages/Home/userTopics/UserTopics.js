import { Box, Tab, Tabs, useMediaQuery } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const UserTopics = ({ handleDisplayedContent, selectedTopic }) => {
  const blogs = useSelector((state) => state?.blogs?.blogs);
  const uniqueCategory = new Set();
  const [value, setValue] = useState(0);

  if (blogs && blogs?.length) {
    blogs?.map((blog) => uniqueCategory.add(blog?.category));
  }

  const uniqueCategoryArray = Array.from(uniqueCategory);
  const allTopics = ["For you", ...uniqueCategoryArray];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <div className="mb-5 md:pr-16">
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          aria-label="scrollable force tabs example"
          TabIndicatorProps={{
            style: {
              backgroundColor: isMobile ? "black" : "black",
            },
          }}
        >
          {allTopics.map((category, index) => (
            <Tab
            onClick={() => handleDisplayedContent(category)}
              key={index}
              style={{
                fontSize: "10px",
                color: value === index ? "black" : "inherit",
                fontWeight:value === index ? "bold" : "normal",
                // Set the active tab color to red
              }}
              label={category}
            />
          ))}
        </Tabs>
      </Box>
    </div>
  );
};

export default UserTopics;
