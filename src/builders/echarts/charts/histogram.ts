function computeBins(values: number[], binNumber?: number) {
  if (values.length === 0) return { labels: [], counts: [] };
  const min = Math.min(...values);
  const max = Math.max(...values);
  if (min === max) return { labels: [String(min)], counts: [values.length] };
  const n = binNumber && binNumber > 0 ? binNumber : Math.ceil(Math.sqrt(values.length));
  const width = (max - min) / n;
  const counts = Array(n).fill(0);
  const labels = Array.from({ length: n }, (_, i) => {
    const start = min + i * width;
    const end = i === n - 1 ? max : start + width;
    return `${start.toFixed(2)} - ${end.toFixed(2)}`;
  });
  for (const v of values) {
    let idx = Math.floor((v - min) / width);
    if (idx >= n) idx = n - 1;
    if (idx < 0) idx = 0;
    counts[idx]++;
  }
  return { labels, counts };
}

export function buildHistogramOption(args: Record<string, any>) {
  const values: number[] = Array.isArray(args.data) ? args.data : [];
  const { labels, counts } = computeBins(values, args.binNumber);

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
    tooltip: { trigger: "axis" },
    xAxis: { type: "category", data: labels, ...args.axisXTitle },
    yAxis: { type: "value", ...args.axisYTitle },
    series: [
      {
        type: "bar",
        data: counts,
      },
    ],
  };
}