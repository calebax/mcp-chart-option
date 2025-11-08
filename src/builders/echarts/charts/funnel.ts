export function buildFunnelOption(args: Record<string, any>) {
  const { data } = args;

  return {
    tooltip: { trigger: "item" },
    series: [
      {
        type: "funnel",
        sort: "descending",
        gap: 2,
        label: { show: true, position: "inside" },
        data: data ?? [],
      },
    ],
  };
}
