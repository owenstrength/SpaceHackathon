import React, { Component } from "react";
import styled from "styled-components";
import StarfieldAnimation from "react-starfield-animation";

export default class Starfield extends Component {
    render() {
        return (
            <Wrapper
                style={{
                    background: "none",
                    alignItems: "center"
                }}
            >
                <StarfieldAnimation depth={5000} />
            </Wrapper>
        );
    }
}
const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  text-align: center;
`;