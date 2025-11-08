import { z } from "zod";
import { zodToJsonSchema } from "../utils/schema.js";
import { TitleSchema, AxisXTitleSchema, AxisYTitleSchema } from "./base.js";

// Scatter chart data schema
const data = z.object({
  x: z.number(),
  y: z.number(),
  group: z.string().optional().describe("Group name for the data point."),
});

// Scatter chart input schema
const schema = {
  data: z
    .array(data)
    .describe("Data for scatter chart, such as, [{ x: 10, y: 15 }].")
    .nonempty({ message: "Scatter chart data cannot be empty." }),
  title: TitleSchema,
  axisXTitle: AxisXTitleSchema,
  axisYTitle: AxisYTitleSchema,
};

const tool = {
  name: "create_scatter_chart_option",
  description: "Create a chart option for scatter chart.",
  inputSchema: zodToJsonSchema(schema),
};

export const scatter = {
  tool,
  schema,
};
