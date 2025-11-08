import { buildPieOption } from "./charts/pie.js";
import { buildColumnOption } from "./charts/column.js";
import { buildLineOption } from "./charts/line.js";
import { buildAreaOption } from "./charts/area.js";
import { buildBarOption } from "./charts/bar.js";
import { buildRadarOption } from "./charts/radar.js";
import { buildFunnelOption } from "./charts/funnel.js";
import { buildHistogramOption } from "./charts/histogram.js";
import { buildScatterOption } from "./charts/scatter.js";
import { buildBoxplotOption } from "./charts/boxplot.js";

export const echartsOptionRegistry = {
  pie: buildPieOption,
  column: buildColumnOption,
  line: buildLineOption,
  area: buildAreaOption,
  bar: buildBarOption,
  radar: buildRadarOption,
  funnel: buildFunnelOption,
  histogram: buildHistogramOption,
  scatter: buildScatterOption,
  boxplot: buildBoxplotOption,
} as const;

export type EChartsType = keyof typeof echartsOptionRegistry;
