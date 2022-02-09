import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import Button from "./Button";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 97vw;
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

const ControlsContainer = styled.div``;

const TreemapDiagramContainer = styled.div`
  border-radius: 10px;
  width: 97vw;
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
  const [dataGroupTypes, setdataGroupTypes] = useState([
    { type: "Original Medium", isActive: true },
    { type: "Owner", isActive: false },
  ]);
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const dataURL =
    "https://gist.githubusercontent.com/arslanastral/3570f49c8ffa0731cbafc8560532927c/raw/217de4ab1d1165a19a71f71d876039510a766744/top-grossing-media-franchises.csv";

  useEffect(() => {
    const svg = d3.select(TreemapDiagramRef.current);
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();

    let dataType = dataGroupTypes.filter((d) => d.isActive);

    let currentDataType = dataType[0].type;

    let group = d3.group(data, (d) => d[currentDataType]);

    let hierarchy = d3
      .hierarchy(group)
      .sum((d) => d.RevenueBillionDollars)
      .sort((a, b) => b.value - a.value);

    let mediaTypes = [...new Set(data.map((d) => d[currentDataType]))];

    let colors = [
      "#18c61a",
      "#9817ff",
      "#d31911",
      "#24b7f1",
      "#1263e2",
      "#ed990a",
      "#f2917f",
      "#7b637c",
      "#a8b311",
      "#a438c0",
      "#d00d5e",
      "#1e7b1d",
      "#05767b",
      "#aaa1f9",
      "#a5aea1",
      "#a75312",
      "#026eb8",
      "#94b665",
      "#91529e",
      "#caa74f",
      "#c90392",
      "#a84e5d",
      "#6a4cf1",
      "#1ac463",
      "#d89ab1",
      "#3c764d",
      "#2dbdc5",
      "#fb78fa",
      "#a6a9cd",
      "#c1383d",
      "#8b614e",
      "#73be38",
      "#ff8d52",
      "#cea37e",
      "#b53c7e",
      "#656d61",
      "#436f90",
      "#5e7304",
    ];

    let color = d3
      .scaleOrdinal()
      .domain(mediaTypes)
      .range(colors.slice(0, mediaTypes.length));

    const treemap = d3
      .treemap()
      .size([width, height])
      .paddingTop(20)
      .paddingRight(4)
      .paddingInner(1);

    const root = treemap(hierarchy);

    svg
      .selectAll(".blocks")
      .data(root.leaves())
      .join("rect")
      .attr("class", "blocks")
      .transition()
      .duration(1000)
      .attr("x", (d) => d.x0)
      .attr("y", (d) => d.y0)
      .attr("width", (d) => d.x1 - d.x0)
      .attr("height", (d) => d.y1 - d.y0)
      .attr("fill", (d) => color(d.data[currentDataType]));

    let mediaTypeTitle;
    if (data.length) {
      let ranks = root.children.map((d) => d.data[0]);
      mediaTypeTitle = svg
        .selectAll("text")
        .data(root.children)
        .join("text")
        .attr("class", "block-type-title")
        .text(function (d) {
          return `${ranks.indexOf(d.data[0]) + 1}. ${d.data[0]}`;
        })

        .attr("x", function (d) {
          return d.x0 + 4;
        })
        .attr("y", function (d) {
          return d.y0 + 15;
        })
        .attr("width", (d) => d.x1 - d.x0)
        .attr("height", (d) => d.y1 - d.y0);
    }

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
              `<span style="font-size:0.95rem">Original Media: ${d.data["Original Media"]}</span>` +
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
      if (data.length) {
        mediaTypeTitle.remove();
      }
    };
  }, [data, dimensions, dataGroupTypes]);

  useEffect(() => {
    d3.csv(dataURL, d3.autoType).then((data) => setdata(data));
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <Wrapper>
      <Title>Top 60 Highest-Grossing Media Franchises</Title>
      <Subtitle key={dataGroupTypes}>{`Grouped By Their ${
        dataGroupTypes.filter((d) => d.isActive)[0].type
      }, Ranked By Total Revenue From All Sources`}</Subtitle>

      <ControlsContainer>
        {dataGroupTypes.map((data, i) => (
          <Button
            isActive={data.isActive}
            key={i}
            type={data.type}
            setdataGroupTypes={setdataGroupTypes}
            dataGroupTypes={dataGroupTypes}
          />
        ))}
      </ControlsContainer>

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
