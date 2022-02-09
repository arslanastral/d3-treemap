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
  margin: 0rem 2rem 1rem 2rem;
  font-size: clamp(1rem, 4vw, 1rem);
`;

const TreemapDiagramContainer = styled.div`
  width: clamp(310px, 80vw, 1100px);
  border-radius: 10px;
  width: 90vw;
  height: 800px;
  margin-top: 1rem;
`;

const TreemapDiagramSvg = styled.svg`
  width: 100%;
  height: 100%;
  animation: fadeIn;
  animation-duration: 1s;
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

    let mediaTypes = [...new Set(data.map((d) => d.Owner))];

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

    const treemap = d3
      .treemap()
      .size([width, height])
      .paddingTop(20)
      .paddingRight(4)
      .paddingInner(0.5);

    const root = treemap(hierarchy);

    svg
      .selectAll(".blocks")
      .data(root.leaves())
      .join("rect")
      .attr("class", "blocks")
      .transition()
      .attr("x", (d) => d.x0)
      .attr("y", (d) => d.y0)
      // .attr("rx", "3px")
      // .attr("ry", "3px")
      .attr("width", (d) => d.x1 - d.x0)
      .attr("height", (d) => d.y1 - d.y0)
      .attr("fill", (d) => color(d.data.OriginalMedia));

    let blockTitle = svg
      .selectAll("foreignObject")
      .data(root.leaves())
      .join("foreignObject")
      .on("mouseover", function (event, d) {
        d3.select(this).style("stroke", "blue");
        div.transition().duration(200).style("opacity", 1);
        div
          .html(
            `<span style="font-weight:600;font-size:1rem">${d.data.Franchise}</span>` +
              " " +
              `<span style="font-size:0.9rem">(${d.data.Year})</span>` +
              "<br/>" +
              `<span style="font-size:0.95rem">Revenue: $${d.data.RevenueBillionDollars} Billion</span>` +
              "<br/>" +
              `<span style="font-size:0.95rem">Original Media: ${d.data.OriginalMedia}</span>` +
              "<br/>" +
              `<span style="font-size:0.95rem">Owner: ${d.data.Owner}</span>`
          )
          .style("left", event.pageX - 20 + "px")
          .style("top", event.pageY - 110 + "px");
      })
      .on("mouseout", function () {
        d3.select(this).style("stroke", "none");
        div.transition().duration(500).style("opacity", 0);
      })

      .attr("x", function (d) {
        return d.x0;
      })
      .attr("y", function (d) {
        return d.y0;
      })
      .attr("width", (d) => d.x1 - d.x0)
      .attr("height", (d) => d.y1 - d.y0)
      .append("xhtml:div")
      .attr("class", "block-title")
      .html(function (d) {
        return (
          `<span class="block-title-name">${d.data.Franchise}</span>` +
          "<br/>" +
          `<span class="block-title-earnings">$${d.data.RevenueBillionDollars} Billion</span>`
        );
      });

    let div = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0)
      .style("left", "0px")
      .style("top", "0px");

    return () => {
      div.remove();
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
      <Subtitle>{`"Grouped By Their Original Media Type, Ranked By Media Type's Total Revenue From All Sources & Sorted Individually by Highest Revenue to Lowest"`}</Subtitle>

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
