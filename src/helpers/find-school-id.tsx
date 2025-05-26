export const findSchoolName = (
  schoolID: number,
  schoolList: any[] | undefined
) => {
  const school = schoolList?.find((item) => item.value === schoolID);
  return school ? school.label : "";
};
