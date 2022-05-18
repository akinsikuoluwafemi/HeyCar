export function getTotal(arr) {
  return arr.reduce((acc, curr) => {
    return Math.round(acc + curr.amount);
  }, 0);
}

export function getTotalOfAReport(arr, id) {
  const report = arr.filter((item) => item.projectId === id);
  console.log(report.length);
  return (
    report &&
    report.reduce((acc, curr) => {
      return Math.round(acc + curr.amount);
    }, 0)
  );
}
