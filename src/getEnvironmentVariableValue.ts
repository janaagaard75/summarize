import dotenv from "dotenv";

dotenv.config({
  quiet: true,
});

export const getEnvironmentVariableValue = (variableName: string): string => {
  const value = process.env[variableName];
  if (value === undefined) {
    throw new Error(`${variableName} must be defined.`);
  }

  return value;
};
