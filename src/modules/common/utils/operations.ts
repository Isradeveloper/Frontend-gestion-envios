export const calculateTotalPages = (total: number, size: number) => {
  return Math.ceil(total / size);
};
