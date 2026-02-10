export const toInteger = (value: string | undefined): number | undefined => {
  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    return undefined;
  }

  return parsed;
};
