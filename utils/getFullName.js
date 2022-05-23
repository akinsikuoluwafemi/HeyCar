export default function getFullName(arr) {
  const firstName = arr?.map((user) => user.firstName);
  const lastName = arr?.map((user) => user.lastName);

  const firstLetterFirstName = arr?.map((user) => user.firstName.charAt(0));
  const firstLetterLastName = arr?.map((user) => user.lastName.charAt(0));

  return {
    firstName,
    lastName,
    firstLetterFirstName,
    firstLetterLastName,
  };
}
