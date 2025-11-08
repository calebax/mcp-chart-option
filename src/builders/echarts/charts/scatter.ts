export function buildScatterOption(args: Record<string, any>) {
  const { data } = args;

  const axisTitle = {
    nameLocation: "middle",
    nameTextStyle: { fontSize: 14, fontWeight: 600 },
  };

  args.axisXTitle = args.axisXTitle
    ? { name: args.axisXTitle, nameGap: 30, ...axisTitle }
    : {};
  args.axisYTitle = args.axisYTitle
    ? { name: args.axisYTitle, nameGap: 60, ...axisTitle }
    : {};

  if (!Array.isArray(data) || data.length === 0) {
    return {
      tooltip: { trigger: "item" },
      xAxis: { type: "value", ...args.axisXTitle },
      yAxis: { type: "value", ...args.axisYTitle },
      series: [],
    };
  }

  const map = new Map<string, Array<[number, number]>>();
  for (const { x, y, group } of data) {
    const g = group ?? "__default__";
    if (!map.has(g)) map.set(g, []);
    map.get(g)!.push([x, y]);
  }

  const groups = Array.from(map.keys()).sort();
  const series = groups.map((g) => ({
    name: g === "__default__" ? "" : g,
    type: "scatter",
    data: map.get(g) ?? [],
  }));

  return {
    legend: { right: "right", top: 35 },
    tooltip: { trigger: "item" },
    xAxis: { type: "value", ...args.axisXTitle },
    yAxis: { type: "value", ...args.axisYTitle },
    series,
  };
}