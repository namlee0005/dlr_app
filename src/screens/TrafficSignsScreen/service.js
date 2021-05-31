import { BE, PATHS, privateRequest } from '@src/apis/BE';
export const getTrafficSigns = async (params) => {
  try {
    let page = 0;
    let perPage = 10;
    let type = params?.type || 1;

    if (params?.current) {
      page = params?.current + 1;
    }

    const result = await privateRequest(
      BE.get,
      PATHS.TRAFFIC_SIGNS(type, page, perPage),
    );

    // console.log(result, 'result');
    return result?.data;
  } catch (error) {
    // console.error(error);
  }
};
