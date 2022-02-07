import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import styled from "styled-components";

const Wrapper = styled.div`
  width: clamp(320px, 90vw, 1200px);
  height: 900px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  color: black;
  animation: fadeInDown;
  animation-duration: 1s;
  font-family: Inter;
  margin: 1rem 1rem 2rem 2rem;
  line-height: 35px;
  font-size: clamp(2rem, 5vw, 2.8rem);
`;

const TreemapDiagramContainer = styled.div`
  border-radius: 10px;
  width: clamp(310px, 80vw, 1100px);
  height: 800px;
  margin-top: 1rem;
`;

const TreemapDiagramSvg = styled.svg`
  width: 100%;
  height: 100%;
  animation: fadeIn;
  animation-duration: 1s;
  background-color: #3784ff;
  border-radius: 12px;
`;

const ChoroplethMap = () => {
  const [data, setdata] = useState([]);
  const TreemapDiagramRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const dataURL =
    "";

  useEffect(() => {
    const svg = d3.select(TreemapDiagramRef.current);
    const { width, height } = dimensions

   
    return () => {
     
    };
  }, [data, dimensions]);

  useEffect(() => {
    d3.csv(dataURL, d3.autoType).then((data) => setdata(data));
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <Wrapper>
      <Title>
      </Title>

      <TreemapDiagramContainer ref={wrapperRef}>
        <TreemapDiagramSvg ref={TreemapDiagramRef}>
        </TreemapDiagramSvg>
      </TreemapDiagramContainer>

    </Wrapper>
  );
};

const useResizeObserver = (ref) => {
  const [dimensions, setDimensions] = useState(null);
  useEffect(() => {
    const observeTarget = ref.current;
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        setDimensions(entry.contentRect);
      });
    });
    resizeObserver.observe(observeTarget);
    return () => {
      resizeObserver.unobserve(observeTarget);
    };
  }, [ref]);
  return dimensions;
};

export default ChoroplethMap;
