import { ResponseBase } from '~/utils/api/api.types';
import ApiUtils from '~/utils/api/api.utils';

const apiName = {
  demo: '/test',
};

export const demoEffect = async (req: number) =>
  await ApiUtils.post<number, ResponseBase<any>>(apiName.demo, req);
