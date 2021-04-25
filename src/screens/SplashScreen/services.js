import { BE, PATHS, privateRequest } from '@src/apis/BE';
export const getAllA1 = async () => {
  const result = await privateRequest(BE.get, PATHS.A1);
  return result?.data;
};
