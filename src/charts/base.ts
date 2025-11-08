import { z } from "zod";

export const TitleSchema = z
  .string()
  .optional()
  .default("")
  .describe("Set the title of chart.");

export const AxisXTitleSchema = z
  .string()
  .optional()
  .default("")
  .describe("Set the x-axis title of chart.");

export const AxisYTitleSchema = z
  .string()
  .optional()
  .default("")
  .describe("Set the y-axis title of chart.");
