import { z } from "zod";
import { zodToJsonSchema } from "../utils/schema.js";
import { TitleSchema, AxisXTitleSchema, AxisYTitleSchema } from "./base.js";

const data = z.object({
  category: z
    .string()
    .describe("Category of the data point, such as '分类一'."),
  value: z.number().describe("Value of the data point, such as 10."),
  group: z
    .string()
    .optional()
    .describe(
      "Optional group for the data point, used for grouping in the boxplot."
    ),
});

const schema = {
  data: z
    .array(data)
    .describe(
      "Data for boxplot chart, such as, [{ category: '分类一', value: 10 }] or [{ category: '分类二', value: 20, group: '组别一' }]."
    )
    .nonempty({ message: "Boxplot chart data cannot be empty." }),
  title: TitleSchema,
  axisXTitle: AxisXTitleSchema,
  axisYTitle: AxisYTitleSchema,
};

const tool = {
  name: "create_boxplot_chart_option",
  description: "Create a chart option for boxplot chart.",
  inputSchema: zodToJsonSchema(schema),
};

export const boxplot = {
  tool,
  schema,
};
