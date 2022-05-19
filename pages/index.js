/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Image from "next/image";
import { Menu, Dropdown, Space } from "antd";
import {
  ContentHeader,
  HomePageContainer,
  HomePageHeader,
  MainWrapper,
  UserIcon,
  MainContentWrapper,
  MainContent,
  ContentGrid,
  MainContentFooter,
} from "../components/HomePageStyles";
import { Globalstyle } from "../utils/Global";
import { ButtonWrapper, DropDownWrapper } from "../components/ButtonWrapper";
import react, { useState, useEffect } from "react";
import "ag-grid-community/dist/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/dist/styles/ag-theme-alpine.css"; // Optional theme CSS
import useUser from "../hooks/useUser";
import useGateway from "../hooks/useGateway";
import useProject from "../hooks/useProject";

import axios from "axios";
import getFullName from "../utils/getFullName";
import useReports from "../hooks/useReports";
import { getTotal, getTotalOfAReport } from "../utils/getTotals";
import FilteredContentWrapper from "../components/FilteredContentWrapper";
import UnfilteredContentWrapper from "../components/UnfilteredContentWrapper";
// import { handleFilter } from "../utils/filterRecords";

export default function Home() {
  // states
  const [open, setOpen] = useState(false);
  const [gatewayDropdownOpen, setGatewayDropDownOpen] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);

  const [tableOpen, setTableOpen] = useState(false);
  const [projectName, setProjectName] = useState("All projects");
  const [gateWayName, setGateWayName] = useState("All Gateway");
  const [currentIndex, setCurrentIndex] = useState("");

  const handleClick = (id) => {
    setCurrentIndex(id);
  };

  // hooks
  const { user } = useUser();
  const { projects, handleFilter, singleProject } = useProject();
  const { gateways, handleGatewayFilter, singleGateway } = useGateway();
  // console.log(gateways);
  const {
    reports,
    handleSetFrom,
    handleTo,
    handleSetProjectId,
    handleSetGatewayId,
  } = useReports();
  // console.log(gateways);
  // console.log(reports);
  // console.log(projects);

  const { firstName, lastName, firstLetterFirstName, firstLetterLastName } =
    getFullName(user);

  const allTotal = getTotal(reports);
  // console.log(allTotal);

  const totalOfAReport = getTotalOfAReport(reports, "bgYhx");
  // console.log(totalOfAReport);

  return (
    <>
      <div>
        <Head>
          <title>Hey Car Reports</title>
          <meta name="description" content="Reports of projects and gateways" />
          <link rel="icon" href="/favicon.ico" />

          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css"
            integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
            crossOrigin="anonymous"
          />
        </Head>

        <HomePageContainer>
          <HomePageHeader>
            <div className="header-logo">
              <img src="/reports-logo.svg" alt="home-page-logo" />
              <img src="/hamburger.svg" alt="home-page-logo" />
            </div>
            <UserIcon>
              <span className="userlogo">
                {firstLetterFirstName} {firstLetterLastName}
              </span>
              <span className="user-logo-text">
                {user && firstName} {user && lastName}
              </span>
            </UserIcon>
          </HomePageHeader>

          <MainWrapper>
            <div className="sidebar">
              <img src="/wallet.svg" alt="wallet-logo" />
              <img src="/layer.svg" alt="wallet-logo" />
              <img src="/layer2.svg" alt="wallet-logo" />
              <img src="/pie.svg" alt="wallet-logo" />
              <img src="/sign-out.svg" alt="wallet-logo" />
            </div>

            <div className="content">
              <ContentHeader>
                <div className="content-header-text-wrapper">
                  <h2 style={{ margin: "0" }}>Reports</h2>
                  <p style={{ marginTop: ".6rem" }}>
                    Easily generate a report of your transactions
                  </p>
                </div>
                <div className="dropdowns">
                  <ButtonWrapper>
                    <div className="btn-arr-wrapper">
                      <span className="btn-text">{projectName}</span> &nbsp;
                      &nbsp;
                      <img
                        style={{ cursor: "pointer" }}
                        onClick={() => setOpen(!open)}
                        src="/polygon.svg"
                        alt="arrow-down-logo"
                      />
                    </div>
                    {open && (
                      <div className="dropdown-content">
                        <span
                          onClick={() => {
                            setOpen(!open);
                            setProjectName("All projects");
                            handleSetProjectId("");
                            setIsFiltered(false);
                          }}
                        >
                          All projects
                        </span>
                        {projects &&
                          projects.map((project) => {
                            return (
                              <span
                                onClick={() => {
                                  setOpen(!open);
                                  setProjectName(project.name);
                                  // handleProjectId(project.projectId);
                                  handleSetProjectId(project.projectId);
                                  alert(project.projectId);

                                  setIsFiltered(true);
                                  handleFilter(projects, project.projectId);
                                }}
                                key={project.projectId}
                              >
                                {project.name}
                              </span>
                            );
                          })}
                      </div>
                    )}
                  </ButtonWrapper>
                  <ButtonWrapper>
                    <div className="btn-arr-wrapper">
                      <span className="btn-text">{gateWayName}</span> &nbsp;
                      &nbsp;
                      <img
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          setGatewayDropDownOpen(!gatewayDropdownOpen)
                        }
                        src="/polygon.svg"
                        alt="arrow-down-logo"
                      />
                    </div>
                    {gatewayDropdownOpen && (
                      <div className="dropdown-content">
                        <span
                          onClick={() => {
                            setGatewayDropDownOpen(!gatewayDropdownOpen);
                            setGateWayName("All Gateways");
                          }}
                        >
                          All Gateways
                        </span>
                        {gateways &&
                          gateways.map((gateway) => {
                            return (
                              <span
                                onClick={() => {
                                  setGatewayDropDownOpen(!gatewayDropdownOpen);
                                  setGateWayName(gateway.name);
                                  handleSetGatewayId(gateway.gatewayId);
                                }}
                                key={gateway.gatewayId}
                              >
                                {gateway.name}
                              </span>
                            );
                          })}
                      </div>
                    )}
                  </ButtonWrapper>
                  <ButtonWrapper>
                    <div className="btn-arr-wrapper">
                      <span className="btn-text">From date</span> &nbsp; &nbsp;
                      <img
                        style={{ cursor: "pointer" }}
                        src="/polygon.svg"
                        alt="arrow-down-logo"
                      />
                    </div>
                  </ButtonWrapper>
                  <ButtonWrapper>
                    <div className="btn-arr-wrapper">
                      <span className="btn-text">To date</span> &nbsp; &nbsp;
                      <img
                        style={{ cursor: "pointer" }}
                        src="/polygon.svg"
                        alt="arrow-down-logo"
                      />
                    </div>
                  </ButtonWrapper>
                  <ButtonWrapper bggenerate>
                    <div className="btn-arr-wrapper">
                      <span className="btn-text">Generate report</span> &nbsp;
                      &nbsp;
                    </div>
                  </ButtonWrapper>
                </div>
              </ContentHeader>
              {/*  */}
              {isFiltered ? (
                <FilteredContentWrapper
                  projectName={projectName}
                  gateWayName={gateWayName}
                  singleProject={singleProject}
                  reports={reports}
                  tableOpen={tableOpen}
                  handleClick={handleClick}
                  currentIndex={currentIndex}
                  setTableOpen={setTableOpen}
                />
              ) : (
                <UnfilteredContentWrapper
                  projectName={projectName}
                  gateWayName={gateWayName}
                  projects={projects}
                  reports={reports}
                  tableOpen={tableOpen}
                  handleClick={handleClick}
                  currentIndex={currentIndex}
                  setTableOpen={setTableOpen}
                />
              )}
              {/*  */}
              <MainContentFooter>
                Total: <span>{allTotal && allTotal} USD</span>
              </MainContentFooter>
              <div className="policy">Terms&Conditions | Privacy policy</div>
            </div>
          </MainWrapper>
        </HomePageContainer>
      </div>
      <Globalstyle />
    </>
  );
}
