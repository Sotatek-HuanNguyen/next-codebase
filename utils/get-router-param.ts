const getRouterParam = (val: string | string[] | undefined, defaultVal: ''): string =>
  val && Array.isArray(val) ? val.join(',') : val || defaultVal;

export default getRouterParam;
