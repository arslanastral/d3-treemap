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
  margin: 1rem 1rem 1rem 2rem;
  line-height: 35px;
  font-size: clamp(2rem, 5vw, 2.8rem);
`;

const Subtitle = styled.p`
  color: #414142;
  animation: fadeIn;
  animation-duration: 1s;
  font-family: Inter;
  text-align: center;
  margin: 0rem 2rem 2rem 2rem;
  font-size: clamp(1rem, 4vw, 1rem);
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
  border-radius: 12px;
`;

const TreemapDiagram = () => {
  const [data, setdata] = useState([]);
  const TreemapDiagramRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const dataURL =
    "https://gist.githubusercontent.com/arslanastral/3570f49c8ffa0731cbafc8560532927c/raw/434f9113c7aa6829da0de9853fe18e3743e4bb76/gistfile1.csv";

  useEffect(() => {
    const svg = d3.select(TreemapDiagramRef.current);
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();

    let group = d3.group(data, (d) => d.OriginalMedia);

    let hierarchy = d3
      .hierarchy(group)
      .sum((d) => d.RevenueBillionDollars)
      .sort((a, b) => b.value - a.value);

    let mediaTypes = [...new Set(data.map((d) => d.OriginalMedia))];

    let color = d3
      .scaleOrdinal()
      .domain(mediaTypes)
      .range([
        "#18c61a",
        "#9817ff",
        "#d31911",
        "#24b7f1",
        "#fa82ce",
        "#736c31",
        "#1263e2",
        "#18c199",
        "#ed990a",
        "#f2917f",
        "#ad4eb1",
        "#2f9e8f",
        "#a438c0",
        "#802d50",
        "#b4005a",
      ]);

    const treemap = d3.treemap().size([width, height]).padding(1);

    const root = treemap(hierarchy);

    svg
      .selectAll(".blocks")
      .data(root.leaves())
      .join("rect")
      .attr("class", "blocks")
      .attr("x", (d) => d.x0)
      .attr("y", (d) => d.y0)
      .attr("width", (d) => d.x1 - d.x0)
      .attr("height", (d) => d.y1 - d.y0)
      .attr("rx", "3px")
      .attr("ry", "3px")
      .attr("fill", (d) => color(d.data.OriginalMedia));

    let blockTitle = svg
      .selectAll("foreignObject")
      .data(root.leaves())
      .join("foreignObject")
      .attr("x", function (d) {
        return d.x0;
      })
      .attr("y", function (d) {
        return d.y0;
      })
      .attr("width", (d) => d.x1 - d.x0)
      .attr("height", (d) => d.y1 - d.y0)
      .on("click", (e, d) => console.log(d))
      .append("xhtml:div")
      .attr("class", "block-title")
      .html(function (d) {
        return d.data.Franchise;
      });

    return () => {
      blockTitle.remove();
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
      <Title>Top 50 Highest-Grossing Media Franchises</Title>
      <Subtitle>{`"Grouped by their original media form & sorted by highest revenue to lowest"`}</Subtitle>

      <TreemapDiagramContainer ref={wrapperRef}>
        <TreemapDiagramSvg ref={TreemapDiagramRef}></TreemapDiagramSvg>
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

export default TreemapDiagram;
