import * as React from "react";
import { render, act, waitFor } from "@testing-library/react";
import useProject from "../hooks/useProject";

test("exposes the projects, singleProject and handleFilter and fetchProject functions", async () => {
  let result;
  function TestComponent() {
    result = useProject();

    return null;
  }

  render(<TestComponent />);

  let arr = [
    {
      projectId: 1,
      projectName: "Project 1",
    },
    {
      projectId: 2,
      projectName: "Project 2",
    },
  ];

  expect(result.singleProject).toEqual([]);
  expect(result.projects).toEqual([]);
  // act(() => {
  //   result.handleFilter(arr, 1);
  // });

  expect(
    act(() => {
      result.handleFilter(arr, 1);
    })
  ).toBeDefined();
  expect(result.singleProject).toBeDefined();
  expect(result.fetchProjects).toBeDefined();
});
