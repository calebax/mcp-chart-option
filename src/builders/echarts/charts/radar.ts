export function buildRadarOption(args: Record<string, any>) {
  const { data } = args;

  if (!Array.isArray(data) || data.length === 0) {
    return {
      tooltip: { trigger: "item" },
      radar: { indicator: [] },
      series: [],
    };
  }

  const map = new Map<string, Map<string, number>>();
  for (const { name, value, group } of data) {
    const g = group ?? "__default__";
    if (!map.has(g)) map.set(g, new Map());
    map.get(g)!.set(name, value);
  }

  const indicators = Array.from(new Set(data.map((d) => d.name))).map((n) => ({ name: n }));
  const groups = Array.from(map.keys()).sort();

  const seriesData = groups.map((g) => ({
    name: g === "__default__" ? "" : g,
    value: indicators.map((ind) => map.get(g)?.get(ind.name) ?? 0),
  }));

  return {
    legend: { right: "right", top: 35 },
    tooltip: { trigger: "item" },
    radar: { indicator: indicators },
    series: [
      {
        type: "radar",
        data: seriesData,
      },
    ],
  };
}