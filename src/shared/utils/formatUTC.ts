export const formatUTC = (timestamp: number) => {
  return new Date(timestamp).toISOString().replace(/\.\d{3}Z$/, "Z");
};
