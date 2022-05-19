export function handleFilter(arr, id) {
  const record = arr.filter((item) => item.projectId === id);
  console.log(record);
  alert(JSON.stringify(record));
  return record;
}
