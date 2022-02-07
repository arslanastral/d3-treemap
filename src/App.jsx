import React from "react";
import styled from "styled-components";
import TreemapDiagram from "./components/TreemapDiagram";

const AppContainer = styled.div`
  background-repeat: repeat;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  min-width: 100vw;
`;

function App() {
  return (
    <AppContainer>
      <TreemapDiagram />
    </AppContainer>
  );
}

export default App;
