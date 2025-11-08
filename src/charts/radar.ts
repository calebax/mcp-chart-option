import { z } from "zod";
import { zodToJsonSchema } from "../utils/schema.js";
import { TitleSchema } from "./base.js";

const data = z.object({
  name: z.string(),
  value: z.number(),
  group: z.string().optional(),
});

// Radar chart input schema
const schema = {
  data: z
    .array(data)
    .describe(
      "Data for radar chart, it should be an array of objects, each object contains a `name` field and a `value` field, such as, [{ name: 'Design', value: 70 }]."
    )
    .nonempty({ message: "Radar chart data cannot be empty." }),
  title: TitleSchema,
};

const tool = {
  name: "create_radar_chart_option",
  description: "Create a chart option for radar chart.",
  inputSchema: zodToJsonSchema(schema),
};

export const radar = {
  tool,
  schema,
};
