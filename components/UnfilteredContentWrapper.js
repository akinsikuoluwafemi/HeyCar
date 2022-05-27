import React, { useState, useEffect } from "react";
import { numberWithCommas } from "../utils/getCommas";
import { getTotalOfAReport } from "../utils/getTotals";
import { MainContent, MainContentWrapper } from "./HomePageStyles";

export default function UnfilteredContentWrapper({
  projectName,
  gateWayName,
  projects,
  reports,
  tableOpen,
  handleClick,
  currentIndex,
  setTableOpen,
  singleGateway,
  isGatewayFiltered,
  showChart,
}) {
  // console.log(reports);
  // console.log(showChart);

  return (
    <MainContentWrapper showChart={showChart}>
      <p>
        {/* All Projects | All gateways */}
        {projectName} | {gateWayName}
      </p>
      {projects &&
        projects.map((project, index) => (
          <div key={project.projectId}>
            <MainContent
              role="button"
              onClick={() => {
                handleClick(index);
                if (currentIndex !== index) {
                  setTableOpen(true);
                } else {
                  setTableOpen(!tableOpen);
                }
              }}
            >
              <span className="">{project.name}</span>
              <span className="">
                Total:
                {numberWithCommas(
                  getTotalOfAReport(reports, project.projectId)
                )}{" "}
                USD{" "}
              </span>
            </MainContent>
            {/*  */}
            {tableOpen && (
              <table
                role="table"
                className={currentIndex === index ? "open" : "close"}
              >
                <thead className="main-content-th">
                  <th>Date</th>
                  <th style={{ marginLeft: "5rem" }}>Gateway</th>
                  <th>Transaction ID</th>
                  <th>Amount</th>
                </thead>

                {/* {reports &&
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
                        <td>
                          {numberWithCommas(Math.round(report.amount))} USD
                        </td>
                      </tr>
                    </>
                  ))} */}
                {/* isGatewayFiltered && singlegateway.length is === 0 */}
                {isGatewayFiltered ? (
                  <>
                    {singleGateway &&
                      singleGateway.map((report, i) => (
                        <>
                          <tr className="main-content-body">
                            <td>
                              {report.created}
                              {singleGateway.length}
                            </td>
                            <td
                              className="gateway-head"
                              style={{ textAlign: "center" }}
                            >
                              Gateway {i + 1}
                            </td>
                            <td>{report.paymentId.slice(0, 4)}</td>
                            <td>
                              {numberWithCommas(Math.round(report.amount))} USD
                            </td>
                          </tr>
                        </>
                      ))}
                  </>
                ) : (
                  <>
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
                            <td>
                              {numberWithCommas(Math.round(report.amount))} USD
                            </td>
                          </tr>
                        </>
                      ))}
                  </>
                )}
              </table>
            )}
          </div>
        ))}
      {/*  */}
    </MainContentWrapper>
  );
}
