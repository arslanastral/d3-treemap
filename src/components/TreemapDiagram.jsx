import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 90vw;
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

// const LegendContainer = styled.div`
//   width: clamp(310px, 80vw, 600px);
//   height: 30px;
//   margin: 0rem 0 2rem 0rem;
// `;

// const LegendSvg = styled.svg`
//   width: 100%;
//   height: 100%;
//   animation: fadeIn;
//   animation-duration: 1s;
//   overflow: visible !important;
// `;

const TreemapDiagramContainer = styled.div`
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
  // const legendContainerRef = useRef();
  // const legend = useRef();
  // const legendDimensions = useResizeObserver(legendContainerRef);
  const dataURL =
    "https://gist.githubusercontent.com/arslanastral/3570f49c8ffa0731cbafc8560532927c/raw/434f9113c7aa6829da0de9853fe18e3743e4bb76/gistfile1.csv";

  useEffect(() => {
    const svg = d3.select(TreemapDiagramRef.current);
    // const LegendSvg = d3.select(legend.current);
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();

    let group = d3.group(data, (d) => d.OriginalMedia);

    let hierarchy = d3
      .hierarchy(group)
      .sum((d) => d.RevenueBillionDollars)
      .sort((a, b) => b.value - a.value);

    let mediaTypes = [...new Set(data.map((d) => d.Owner))];

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
      "#82b792",
      "#fb88a3",
      "#dd8df2",
      "#6a5cc0",
      "#d098d5",
      "#ac15dc",
      "#a4543b",
      "#76b4cc",
      "#6963a4",
      "#8e620d",
      "#77adf8",
      "#c9a918",
      "#99537d",
      "#acaf7d",
      "#7850d5",
      "#ae3a9f",
      "#68bd74",
      "#e09d60",
      "#1069cd",
      "#d50438",
      "#c03d17",
      "#79b6af",
      "#517430",
      "#db9b94",
      "#095cf8",
      "#b1b045",
      "#c0a4a9",
      "#bc01c1",
      "#906033",
      "#e49c3f",
      "#8e4db9",
      "#bb3a64",
      "#cb1478",
      "#776b09",
      "#94b743",
      "#763eff",
      "#1a7a3e",
      "#617046",
      "#915c62",
      "#ec8dc0",
      "#ba22ac",
      "#437461",
      "#913ddc",
      "#4bbda8",
      "#b4482e",
      "#a9a5e3",
      "#78b1e2",
      "#855b91",
      "#fc902e",
      "#2cbada",
      "#64c104",
      "#8abb0b",
      "#3cc441",
      "#68be5c",
      "#b9ac66",
      "#11c37b",
      "#5e6c7c",
      "#686690",
      "#f09469",
      "#66bc8a",
      "#736a4e",
      "#776768",
      "#c43251",
      "#c1a0c6",
      "#a2acb7",
      "#457713",
      "#f87fe4",
      "#c1a693",
      "#b14949",
      "#487175",
      "#eb929c",
      "#e18fdc",
      "#326ea4",
      "#147861",
      "#9b584f",
      "#dba103",
      "#cca567",
      "#5464b9",
      "#c797f2",
      "#94b57c",
      "#d3084b",
      "#e09b7e",
      "#cd2729",
      "#525ae2",
      "#a04c8a",
      "#bb308b",
      "#1d7489",
      "#a82bce",
      "#ee9751",
      "#a94b70",
      "#9432ea",
      "#9c5a24",
      "#9cb193",
      "#816722",
      "#826540",
      "#fb8b8e",
      "#696f20",
      "#33b4ff",
      "#d3a434",
      "#7b5aab",
      "#5b5bd4",
      "#c22c71",
      "#ca2f01",
      "#34792f",
      "#81bb4c",
      "#3064d4",
      "#80ba6d",
      "#4f68ab",
      "#b6a5bf",
      "#8a5d76",
      "#dc9f50",
      "#935e41",
      "#a94491",
      "#147953",
      "#8cb1be",
      "#41c183",
      "#acb05e",
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

    let mediaTypeTitle;
    if (data.length) {
      let ranks = root.children.map((d) => d.data[0]);
      mediaTypeTitle = svg
        .selectAll("text")
        .data(root.children)
        .join("text")
        // .on("click", (e, d) => console.log(ranks.indexOf(d.data[0])))
        .attr("class", "block-type-title")
        .attr("x", function (d) {
          return d.x0 + 4;
        }) // +10 to adjust position (more right)
        .attr("y", function (d) {
          return d.y0 + 15;
        }) // +20 to adjust position (lower)
        .attr("width", (d) => d.x1 - d.x0)
        .attr("height", (d) => d.y1 - d.y0)
        .text(function (d) {
          return `${ranks.indexOf(d.data[0]) + 1}. ${d.data[0]
            .toLowerCase()
            .split(" ")
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(" ")}`;
        });
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
      if (data.length) {
        mediaTypeTitle.remove();
      }
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

      {/* <LegendContainer ref={legendContainerRef}>
        <LegendSvg ref={legend}></LegendSvg>
      </LegendContainer> */}

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
