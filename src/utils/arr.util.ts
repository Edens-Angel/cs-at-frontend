export const shuffle = (array: any[]): any[] => {
  const clone = [...array];
  clone.sort(() => Math.random() - 0.5);
  return clone;
};
