// components/AnimationWrapper.tsx
"use client";

import React, { useEffect } from "react";
import styled from "styled-components";
import { gsap, CSSPlugin, Expo } from "gsap";

gsap.registerPlugin(CSSPlugin);

const AnimationWrapper = () => {
  useEffect(() => {
    const tl = gsap.timeline();

    tl.to(".follow", {
      width: "100%",
      ease: Expo.easeInOut,
      duration: 1.2,
      delay: 0.7,
    })
      .to(".hide", { opacity: 0, duration: 0.3 })
      .to(".hide", { display: "none", duration: 0.3 })
      .to(".follow", {
        height: "100%",
        ease: Expo.easeInOut,
        duration: 0.7,
        delay: 0.5,
      })
      .to(".content", { width: "100%", ease: Expo.easeInOut, duration: 0.7 })
      .to(".title-lines", { display: "block", duration: 0.1 })
      .to(".title-lines", {
        opacity: 1,
        stagger: 0.15,
        ease: Expo.easeInOut,
        duration: 0.6,
      });
  }, []);

  return (
    <AppContainer>
      <Loading>
        <Follow className="follow"></Follow>
        <ProgressBar className="hide" id="progress-bar"></ProgressBar>
        <Count id="count" className="hide">
          100%
        </Count>
      </Loading>

      <Content className="content">
        <p className="title-lines">Welcome to Our Page</p>
        <p className="title-lines">Enjoy the experience!</p>
      </Content>
    </AppContainer>
  );
};

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  color: #000000;
  position: relative;
`;

const Loading = styled.div`
  height: 100%;
  width: 100%;
  background-color: #121212;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
`;

const Follow = styled.div`
  position: absolute;
  background-color: #f48049;
  height: 2px;
  width: 0;
  left: 0;
  z-index: 2;
`;

const ProgressBar = styled.div`
  position: absolute;
  left: 0;
  background-color: #fff;
  height: 2px;
  width: 0;
  transition: 0.4s ease-out;
`;

const Count = styled.p`
  position: absolute;
  font-size: 130px;
  color: #fff;
  transform: translateY(-15px);
  font-weight: 500;
`;

const Content = styled.div`
  height: 100%;
  width: 0;
  position: absolute;
  left: 0;
  top: 0;
  background-color: #121212;
  padding: auto;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
  color: #fff;

  p {
    text-align: center;
    font-size: 104px;
    opacity: 0;
    display: none;
    font-weight: 500;
    margin: 0;
  }
`;

export default AnimationWrapper;
