/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import {
  ContentHeader,
  HomePageContainer,
  HomePageHeader,
  MainWrapper,
  UserIcon,
  MainContentFooter,
  NoReportsContainer,
} from "../components/HomePageStyles";
import { Globalstyle } from "../utils/Global";
import { ButtonWrapper, DropDownWrapper } from "../components/ButtonWrapper";
import react, { useState, useEffect } from "react";
import { DatePicker } from "antd";
import moment from "moment";

import useUser from "../hooks/useUser";
import useGateway from "../hooks/useGateway";
import useProject from "../hooks/useProject";

import getFullName from "../utils/getFullName";
import useReports from "../hooks/useReports";
import { getTotal, getTotalOfAReport } from "../utils/getTotals";
import FilteredContentWrapper from "../components/FilteredContentWrapper";
import UnfilteredContentWrapper from "../components/UnfilteredContentWrapper";
import { numberWithCommas } from "../utils/getCommas";
import ChartWrapper from "../components/ChartWrapper";
import { ToastContainer, toast } from "react-toastify";

export default function Home() {
  // states
  const [open, setOpen] = useState(false);
  const [gatewayDropdownOpen, setGatewayDropDownOpen] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [isGatewayFiltered, setIsGatewayFiltered] = useState(false);
  const [tableOpen, setTableOpen] = useState(false);
  const [projectName, setProjectName] = useState("Select Project");
  const [gateWayName, setGateWayName] = useState("Select Gateway");
  const [currentIndex, setCurrentIndex] = useState(null);
  const [showChart, setShowChart] = useState(false);

  const handleClick = (id) => {
    setCurrentIndex(id);
  };

  // hooks
  const { user } = useUser();
  const { projects, fetchProjects, handleFilter, singleProject, isError } =
    useProject();
  const { gateways, handleGatewayFilter, singleGateway, isGatewayError } =
    useGateway();

  const {
    reports,
    handleSetFrom,
    handleTo,
    handleSetProjectId,
    handleSetGatewayId,
    isReportError,
  } = useReports();

  function onFromDateChange(date, dateString) {
    handleSetFrom(dateString);
  }

  function onToDateChange(date, dateString) {
    handleTo(dateString);
  }

  const { firstName, lastName, firstLetterFirstName, firstLetterLastName } =
    getFullName(user);

  const allTotal = getTotal(reports);

  return (
    <>
      <div>
        <Head>
          <title>Hey Car Reports</title>
          <meta name="description" content="Reports of projects and gateways" />
          <link rel="icon" href="/favicon.ico" />
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
                  <p style={{ marginTop: ".6rem", color: "#7e8299" }}>
                    Easily generate a report of your transactions
                  </p>
                </div>
                {/*  */}
                {isError ||
                  isGatewayError ||
                  (isReportError && (
                    <div role="alert" className="error-message">
                      <ToastContainer />
                    </div>
                  ))}

                {/*  */}
                <div className="dropdowns">
                  <ButtonWrapper>
                    <div className="btn-arr-wrapper">
                      <span className="btn-text">{projectName}</span> &nbsp;
                      &nbsp;
                      <img
                        role="button"
                        style={{ cursor: "pointer" }}
                        onClick={() => setOpen(!open)}
                        src="/polygon.svg"
                        alt="arrow-down-logo"
                        name="arrow-down-logo"
                      />
                    </div>
                    {open && (
                      <div
                        role="option"
                        aria-selected="false"
                        className="dropdown-content"
                      >
                        <span
                          onClick={() => {
                            setOpen(!open);
                            setProjectName("All projects");
                            handleSetProjectId("");
                            setGateWayName(gateWayName);

                            setIsFiltered(false);
                            fetchProjects();
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
                                  handleSetProjectId(project.projectId);

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
                            handleSetGatewayId("");
                            setIsGatewayFiltered(false);
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
                                  setIsGatewayFiltered(true);

                                  handleSetGatewayId(gateway.gatewayId);
                                  handleGatewayFilter(
                                    reports,
                                    gateway.gatewayId
                                  );
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

                  <DatePicker
                    style={{
                      borderRadius: "0.5rem",
                      background: "#1bc5bd",
                      padding: "0.6rem 1rem",
                      border: "none",
                      color: "white",
                    }}
                    placeholder="From date"
                    name="From date"
                    disabledDate={(current) => {
                      return (
                        current && current < moment("2021-01-01", "YYYY-MM-DD")
                      );
                    }}
                    onChange={onFromDateChange}
                  />

                  <DatePicker
                    style={{
                      borderRadius: "0.5rem",
                      background: "#1bc5bd",
                      padding: "0.6rem 1rem",
                      border: "none",
                      color: "white",
                    }}
                    placeholder="To date"
                    name="To date"
                    disabledDate={(current) => {
                      return (
                        current && current > moment("2021-12-31", "YYYY-MM-DD")
                      );
                    }}
                    onChange={onToDateChange}
                  />
                  <ButtonWrapper
                    style={{
                      pointerEvents:
                        projects && projects.length > 0 ? "all" : "none",
                    }}
                    bggenerate={true}
                    onClick={() => {
                      setShowChart(!showChart);
                    }}
                  >
                    <div className="btn-arr-wrapper">
                      <span className="btn-text">Generate report</span> &nbsp;
                      &nbsp;
                    </div>
                  </ButtonWrapper>
                </div>
              </ContentHeader>
              {/*  */}

              {projects && projects.length > 0 ? (
                <div
                  data-testid="project-list"
                  style={{ position: "relative" }}
                >
                  {isFiltered ? (
                    <FilteredContentWrapper
                      showChart={showChart}
                      projectName={projectName}
                      gateWayName={gateWayName}
                      singleProject={singleProject}
                      singleGateway={singleGateway}
                      reports={reports}
                      tableOpen={tableOpen}
                      handleClick={handleClick}
                      currentIndex={currentIndex}
                      setTableOpen={setTableOpen}
                      isGatewayFiltered={isGatewayFiltered}
                      setIsGatewayFiltered={setIsGatewayFiltered}
                    />
                  ) : (
                    <UnfilteredContentWrapper
                      showChart={showChart}
                      projectName={projectName}
                      gateWayName={gateWayName}
                      singleGateway={singleGateway}
                      projects={projects}
                      reports={reports}
                      tableOpen={tableOpen}
                      handleClick={handleClick}
                      currentIndex={currentIndex}
                      setTableOpen={setTableOpen}
                      isGatewayFiltered={isGatewayFiltered}
                      setIsGatewayFiltered={setIsGatewayFiltered}
                    />
                  )}
                  {showChart && (
                    <ChartWrapper
                      projects={projects}
                      reports={reports}
                      isFiltered={isFiltered}
                    />
                  )}
                </div>
              ) : (
                <NoReportsContainer>
                  <h1>No reports</h1>
                  <p style={{ color: "#7E8299;" }}>
                    Currently you have no data for the reports to be generated.
                    Once you start generating traffic through the Balance
                    application the reports will be shown.
                  </p>
                  <img src="/no-reports.svg" alt="no reports image" />
                </NoReportsContainer>
              )}

              {/*  */}

              {/* footer */}
              <div
                style={{
                  // background: "red",
                  zIndex: "-3",
                  position: "fixed",
                  bottom: "0",
                  width: "89%",
                }}
              >
                {!showChart && (
                  <>
                    {projects && projects.length > 0 && (
                      <MainContentFooter>
                        Total:{" "}
                        <span>
                          {allTotal && numberWithCommas(allTotal)} USD
                        </span>
                      </MainContentFooter>
                    )}
                  </>
                )}

                <div
                  style={{
                    padding: "1rem",
                    color: "#005B96",
                    fontWeight: "bold",
                  }}
                  className="policy"
                >
                  Terms&Conditions | Privacy policy
                </div>
              </div>
              {/*  */}
            </div>
          </MainWrapper>
        </HomePageContainer>
      </div>
      <Globalstyle />
    </>
  );
}
