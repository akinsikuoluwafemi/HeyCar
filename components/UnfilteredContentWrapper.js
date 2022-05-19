import React, { useState } from "react";
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
}) {
  const [isFiltered, setIsFiltered] = useState(false);

  // console.log(reports);

  return (
    <MainContentWrapper showChart={false}>
      <p>
        {/* All Projects | All gateways */}
        {projectName} | {gateWayName}
      </p>
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
              <table className={currentIndex === index ? "open" : "close"}>
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
  );
}
