function quantiles(values: number[]) {
  const arr = [...values].sort((a, b) => a - b);
  const q = (p: number) => {
    if (arr.length === 0) return 0;
    const idx = (arr.length - 1) * p;
    const lo = Math.floor(idx);
    const hi = Math.ceil(idx);
    if (lo === hi) return arr[lo];
    const w = idx - lo;
    return arr[lo] * (1 - w) + arr[hi] * w;
  };
  return {
    min: arr.length ? arr[0] : 0,
    q1: q(0.25),
    median: q(0.5),
    q3: q(0.75),
    max: arr.length ? arr[arr.length - 1] : 0,
  };
}

export function buildBoxplotOption(args: Record<string, any>) {
  const { data } = args;

  if (!Array.isArray(data) || data.length === 0) {
    return {
      tooltip: { trigger: "item" },
      xAxis: { type: "category", data: [] },
      yAxis: { type: "value" },
      series: [],
    };
  }

  const categories = Array.from(new Set(data.map((d: any) => d.category)));
  const groupMap = new Map<string, Map<string, number[]>>();

  for (const { category, value, group } of data) {
    const g = group ?? "__default__";
    if (!groupMap.has(g)) groupMap.set(g, new Map());
    const catMap = groupMap.get(g)!;
    if (!catMap.has(category)) catMap.set(category, []);
    catMap.get(category)!.push(value);
  }

  const groups = Array.from(groupMap.keys()).sort();
  const series = groups.map((g) => ({
    name: g === "__default__" ? "" : g,
    type: "boxplot",
    data: categories.map((c) => {
      const vals = groupMap.get(g)?.get(c) ?? [];
      const { min, q1, median, q3, max } = quantiles(vals);
      return [min, q1, median, q3, max];
    }),
  }));

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

  return {
    legend: { right: "right", top: 35 },
    tooltip: { trigger: "item" },
    xAxis: { type: "category", data: categories, ...args.axisXTitle },
    yAxis: { type: "value", ...args.axisYTitle },
    series,
  };
}