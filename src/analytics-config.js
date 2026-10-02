export const analyticsConfig={
  provider:"ERN_FIRST_PARTY",
  enabled:true,
  endpoint:"https://ern-analytics-api.jjcadenza6.workers.dev/api/analytics",
  privacyMode:"AGGREGATE_ONLY",
  visitorRetentionDays:90
};
export function analyticsReady(c=analyticsConfig){
  return Boolean(c?.enabled&&c?.provider==="ERN_FIRST_PARTY"&&/^https:\/\//.test(String(c?.endpoint||"")));
}
