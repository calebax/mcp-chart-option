export function buildBarOption(args: Record<string, any>) {
  const { data, stack: isStacked = false } = args;

  if (!Array.isArray(data) || data.length === 0) {
    return {
      tooltip: { trigger: "axis" },
      xAxis: { type: "value" },
      yAxis: { type: "category", data: [] },
      series: [],
    };
  }

  const map = new Map<string, Map<string, number>>();
  for (const { category, value, group } of data) {
    const g = group ?? "__default__";
    if (!map.has(g)) map.set(g, new Map());
    map.get(g)!.set(category, value);
  }

  const categories = Array.from(new Set(data.map((d) => d.category)));
  const groups = Array.from(map.keys()).sort();
  const isMultiGroup = map.size > 1;

  const series = groups.map((g) => ({
    name: g === "__default__" ? "" : g,
    type: "bar",
    ...(isMultiGroup && isStacked ? { stack: "total" } : {}),
    data: categories.map((c) => map.get(g)?.get(c) ?? 0),
  }));

  const axisTitle = {
    nameLocation: "middle",
    nameTextStyle: {
      fontSize: 14,
      fontWeight: 600,
    },
  };

  args.axisXTitle = args.axisXTitle
    ? { name: args.axisXTitle, nameGap: 30, ...axisTitle }
    : {};
  args.axisYTitle = args.axisYTitle
    ? { name: args.axisYTitle, nameGap: 60, ...axisTitle }
    : {};

  return {
    legend: { right: "right", top: 35 },
    tooltip: { trigger: "axis" },
    xAxis: { type: "value", ...args.axisXTitle },
    yAxis: { type: "category", data: categories, ...args.axisYTitle },
    series,
  };
}