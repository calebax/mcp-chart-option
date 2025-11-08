import { z } from "zod";
import { zodToJsonSchema } from "../utils/schema.js";
import { TitleSchema } from "./base.js";

const data = z.object({
  category: z.string(),
  value: z.number(),
});

const schema = {
  data: z
    .array(data)
    .describe(
      "Data for funnel chart, such as, [{ category: '浏览网站', value: 50000 }, { category: '放入购物车', value: 35000 }, { category: '生成订单', value: 25000 }, { category: '支付订单', value: 15000 }, { category: '完成交易', value: 8000 }]."
    )
    .nonempty({ message: "Funnel chart data cannot be empty." }),
  title: TitleSchema,
};

const tool = {
  name: "create_funnel_chart_option",
  description: "Create a chart option for funnel chart.",
  inputSchema: zodToJsonSchema(schema),
};

export const funnel = {
  tool,
  schema,
};
