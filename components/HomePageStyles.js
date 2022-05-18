import styled from "styled-components";
import { yellow } from "../utils/colors";

export const HomePageContainer = styled.div`
  height: 100vh;
  width: 100vw;
`;

export const HomePageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  // background: teal;
  // padding: 1rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-right: 2rem;
  padding-right: 2rem;
  border-bottom: 1px solid #f3f6f9;
  // box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

  & > .header-logo {
    padding-left: 2rem;
    & > img {
      width: 30px;
      height: 30px;
      margin-right: 1rem;
    }
  }
`;

export const UserIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.1rem;
  font-weight: bold;

  & > .userlogo {
    color: white;
    background-color: ${yellow[500]};
    border-radius: 5px;
    padding: 0.8rem;
  }

  & > .user-logo-text {
    color: #005b96;
  }

  & > * {
    margin-right: 1rem;
  }
`;

export const MainWrapper = styled.div`
  height: 100%;
  display: flex;
  .sidebar {
    width: 100px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    text-align: center;
    padding-top: 2.5rem;

    & > img {
      width: 30px;
      height: 30px;
    }
  }

  .content {
    width: 90%;
    // background: teal;
    // padding: 1rem;
  }
`;

export const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1rem;
  padding-top: 2rem;
  // background: red;

  & > .content-header-text-wrapper {
    margin: 0;
    padding: 0;
    color: #011f4b;
    & > p {
      margin: 0;
      color: #7e8299;
    }
  }

  & > .dropdowns {
    z-index: 1000;
    margin-right: 1rem;
    width: 70%;
    // background: #f3f6f9;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

export const MainContentWrapper = styled.div`
  background: #f1fafe;
  // background: red;
  padding: 1rem;
  margin-right: 3rem;


  border-radius: 0.5rem;
  z-index: -1;
  width: ${({ showChart }) => (showChart ? "50%" : "97%")};


  & > div {


  & > p {
    font-weight: bold;
  }

  & > .open {
    display: block;
  }
  & > .close {
    display: none;
  }

  & > table {
    width: 100%;
    & > .main-content-th {
      display: flex;

      justify-content: space-between;
      align-items: center;
      padding-left: 2rem;
      padding-right: 2rem;
      padding-top: .5rem;
      padding-bottom: .5rem;
      background: white;
      color: #011f4b;
    }

    & > .main-content-body {
      display: flex;

      justify-content: space-between;
      align-items: center;
      padding-left: 2rem;
      padding-right: 2rem;
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
      color: #011f4b;
      margin-bottom: 1rem;


      &:nth-child(even) {
        background: #f1fafe;
      }
      &:nth-child(odd) {
        background: #fff;
      }
    }
  }

`;

export const MainContent = styled.div`
  display: flex;
  cursor: pointer;
  background: #fff;
  padding: 1.5rem;

  border-radius: 0.5rem;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  & > span {
    font-weight: bold;
    font-size: 1.2rem;
  }
`;

export const MainContentFooter = styled.div`
  background: #f1fafe;
  // background: red;
  padding: 1rem;
  margin-right: 4rem;
  width: 100%;

  border-radius: 0.5rem;
  font-size: 1.1rem;
  font-weight: bold;
  margin-top: 2rem;
`;
