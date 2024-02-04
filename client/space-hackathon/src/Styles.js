import React from 'react';
import styled, { keyframes } from 'styled-components';

const generateRandomBoxShadow = (n) => {
    let boxShadow = '';

    for (let i = 0; i < n; i++) {
        boxShadow += `${Math.random() * 100}% ${Math.random() * 100}% #FFF`;

        if (i < n - 1) {
            boxShadow += ', ';
        }
    }

    return boxShadow;
};

const StarsKeyframe = keyframes`
  0% {
    box-shadow: ${generateRandomBoxShadow(800)};
  }

  100% {
    box-shadow: ${generateRandomBoxShadow(800)};
  }
`;

const StarsContainer = styled.div`
  width: 1px;
  height: 1px;
  background: transparent;
  box-shadow: ${generateRandomBoxShadow(800)};
  animation: ${StarsKeyframe} 5s infinite;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    top: 200%;
    width: 1px;
    height: 1px;
    background: white;
    box-shadow: ${generateRandomBoxShadow(800)};
    animation: ${StarsKeyframe} 5s infinite;
  }
`;

const Stars = () => {
    return <StarsContainer />;
};

export default Stars;
