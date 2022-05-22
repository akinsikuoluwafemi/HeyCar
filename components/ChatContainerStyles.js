import styled from "styled-components";

export const ChartContainer = styled.div`
  width: 50%;
  height: 250px;
  // background: red;
  position: absolute;
  right: 0;
  top: 0;
  padding: 0 2rem;
`;

export const ChartLegend = styled.div`
  display: flex;
  justify-content: ${({ start }) => (start ? "flex-start" : "space-between")};
  align-items: center;
  background: #f1fafe;
  border-radius: 10px;
  padding: 1.5rem;
  font-weight: ${({ start }) => (start ? "bold" : "normal")};
  text-transform: ${({ start }) => (start ? "uppercase" : "capitalize")};
`;

export const ChartLegendItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > .legend-item-text {
    color: #011f4b;
  }
`;
export const LegendItemIcon = styled.div`

    width: 30px;
    height: 30px;
    border-radius: 10px;
    margin: 0 0.5rem;
    background: ${({ color }) => color}!important;
  }
`;
