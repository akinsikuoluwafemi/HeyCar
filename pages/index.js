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

export default function Home() {
  // states
  const [open, setOpen] = useState(false);
  const [gatewayDropdownOpen, setGatewayDropDownOpen] = useState(false);

  const [tableOpen, setTableOpen] = useState(false);
  const [projectName, setProjectName] = useState("All projects");
  const [gateWayName, setGateWayName] = useState("Gateway");
  const [currentIndex, setCurrentIndex] = useState("");

  const [currentId, setCurrentId] = useState("");

  const handleClick = (id) => {
    setCurrentIndex(id);
  };

  // hooks
  const { user } = useUser();
  const { projects } = useProject();
  const { gateways } = useGateway();
  const {
    reports,
    handleSetFrom,
    handleTo,
    handleSetProjectId,
    handleSetGatewayId,
  } = useReports();
  // console.log(gateways);
  // console.log(reports);

  const { firstName, lastName, firstLetterFirstName, firstLetterLastName } =
    getFullName(user);

  const allTotal = getTotal(reports);
  // console.log(allTotal);

  const totalOfAReport = getTotalOfAReport(reports, "bgYhx");
  console.log(totalOfAReport);

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
                                  alert(project.projectId);
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
                        onClick={() => setGatewayDropDownOpen(!open)}
                        src="/polygon.svg"
                        alt="arrow-down-logo"
                      />
                    </div>
                    {gatewayDropdownOpen && (
                      <div className="dropdown-content">
                        <span
                          onClick={() => {
                            setGatewayDropDownOpen(!gatewayDropdownOpen);
                            setGateWayName("All gateways");
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
                                  console.log(gateway.gatewayId);
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
              <MainContentWrapper showChart={false}>
                <p>All Projects | All gateways</p>

                {projects &&
                  projects.map((project, index) => (
                    <div key={project.projectId}>
                      <MainContent
                        onClick={() => {
                          handleClick(index);
                          setTableOpen((prev) => !prev);
                        }}
                      >
                        <span className="">{project.name}</span>
                        <span className="">
                          Total: {getTotalOfAReport(reports, project.projectId)}{" "}
                          {/* ?{getTotalOfAReport(reports, project.projectId)} : 0 */}
                          USD
                        </span>
                      </MainContent>
                      {/*  */}
                      {tableOpen && (
                        <table
                          className={currentIndex === index ? "open" : "close"}
                        >
                          <thead className="main-content-th">
                            <th>Date</th>
                            <th style={{ marginLeft: "5rem" }}>Gateway</th>
                            <th>Transaction ID</th>
                            <th>Amount</th>
                          </thead>

                          {reports &&
                            reports.map((report, i) => (
                              <>
                                <tr className="main-content-body">
                                  <td>{report.created}</td>
                                  <td
                                    className="gateway-head"
                                    style={{ textAlign: "center" }}
                                  >
                                    Gateway {i + 1}
                                  </td>
                                  <td>{report.paymentId.slice(0, 4)}</td>
                                  <td>{Math.round(report.amount)}</td>
                                </tr>
                              </>
                            ))}
                        </table>
                      )}
                    </div>
                  ))}

                {/*  */}
              </MainContentWrapper>
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
