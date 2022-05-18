import styled, { css } from "styled-components";

export const ButtonWrapper = styled.div`
  background: ${({ bggenerate }) =>
    bggenerate ? "#005B96" : "#1bc5bd"}!important;
  padding: 0.6rem 1rem;
  position: relative;

  border-radius: 0.5rem;
  gap: 1rem;
  color: white;

  & > .dropdown-content {
    padding: 0.9rem;
    display: flex;
    flex-direction: column !important;
    width: 100%;
    padding-left: 1.3rem;
    position: absolute;
    background: #1bc5bd;
    left: 0;
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;

    & > span {
      cursor: pointer;
    }
  }

  & > .btn-arr-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  & > .btn-text {
    padding-right: 0.5rem;
    font-size: 1rem;
  }
`;
