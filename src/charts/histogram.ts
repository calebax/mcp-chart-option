import { z } from "zod";
import { zodToJsonSchema } from "../utils/schema.js";
import { TitleSchema, AxisXTitleSchema, AxisYTitleSchema } from "./base.js";

const schema = {
  data: z
    .array(z.number())
    .describe(
      "Data for histogram chart, it should be an array of numbers, such as, [78, 88, 60, 100, 95]."
    )
    .nonempty({ message: "Histogram chart data cannot be empty." }),
  binNumber: z
    .number()
    .optional()
    .describe(
      "Number of intervals to define the number of intervals in a histogram, when not specified, a built-in value will be used."
    ),
  title: TitleSchema,
  axisXTitle: AxisXTitleSchema,
  axisYTitle: AxisYTitleSchema,
};

const tool = {
  name: "create_histogram_chart_option",
  description: "Create a chart option for histogram chart.",
  inputSchema: zodToJsonSchema(schema),
};

export const histogram = {
  tool,
  schema,
};
