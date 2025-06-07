export const isEmptyObj = (obj) => {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }

  return true;
};

export const isEmptyPatient = (p) => {
  return Object.values(p).every(
    (val) =>
      val === "" || val === null || (Array.isArray(val) && val.length === 0)
  );
};
