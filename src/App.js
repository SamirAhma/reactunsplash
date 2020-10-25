import React, { useState, useEffect } from "react";
import Heading from "./Components/Heading.js";
import Loader from "./Components/Loader.js";
import UnsplashImage from "./Components/UnsplashImage";
import axios from "axios";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";
import "bootstrap/dist/css/bootstrap.min.css";

import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
const GlobalStyle = createGlobalStyle`
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
}
body{
  font-family:sans-serif;
  
}
`;

const WrapperImage = styled.section`
  max-width: 70rem;
  margin: 4rem auto;
  display: grid;
  grid-gap: 1em;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-auto-rows: 300px;
`;

function App() {
  const [activeTab, setActiveTab] = useState("1");
  // const accessKey = process.env.REACT_APP_ACCESKEY;
  const [currentPage, setCurrentPage] = useState(0);
  const [currentPagesecond, setcurrentPagesecond] = useState(360);
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const [images, setImages] = useState([]);
  const [secondimages, setSecondimages] = useState([]);
  useEffect(() => {
    fetchImages();
    fetchImagessecond();
  }, []);

  const fetchImages = () => {
    const apiRoot = "https://api.unsplash.com";
    const accessKey = process.env.REACT_APP_ACCESKEY;
    axios
      .get(
        `${apiRoot}/photos/?client_id=${accessKey}&per_page=8&page=${
          currentPage + 1
        }`
      )
      .then((res) => {
        setImages([...images, ...res.data]);
        setCurrentPage(currentPage + 1);
      });
  };
  const fetchImagessecond = () => {
    const apiRoot = "https://api.unsplash.com";
    const accessKey = process.env.REACT_APP_ACCESKEY;
    axios
      .get(
        `${apiRoot}/photos/?client_id=${accessKey}&per_page=8&page=${
          currentPagesecond + 1
        }`
      )
      .then((res) => {
        setSecondimages([...secondimages, ...res.data]);
        setcurrentPagesecond(currentPagesecond + 1);
      });
  };
  return (
    <div className="App">
      <Heading></Heading>
      <div>
        <div className="container">
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "1" })}
                onClick={() => {
                  toggle("1");
                }}
              >
                Trending
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "2" })}
                onClick={() => {
                  toggle("2");
                }}
              >
                People
              </NavLink>
            </NavItem>
          </Nav>
        </div>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <InfiniteScroll
              dataLength={images.length}
              next={fetchImages}
              hasMore={true}
              loader={<Loader></Loader>}
            >
              <WrapperImage>
                {images.map((image) => (
                  <UnsplashImage
                    url={image.urls.thumb}
                    key={image.urls.thumb}
                  ></UnsplashImage>
                ))}
              </WrapperImage>
            </InfiniteScroll>
          </TabPane>
          <TabPane tabId="2">
            <InfiniteScroll
              dataLength={secondimages.length}
              next={fetchImagessecond}
              hasMore={true}
              loader={<Loader></Loader>}
            >
              <WrapperImage>
                {secondimages.map((image) => (
                  <UnsplashImage
                    url={image.urls.thumb}
                    key={image.urls.thumb}
                  ></UnsplashImage>
                ))}
              </WrapperImage>
            </InfiniteScroll>
          </TabPane>
        </TabContent>
      </div>

      <GlobalStyle />
    </div>
  );
}

export default App;
