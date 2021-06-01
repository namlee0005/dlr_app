import { BE, PATHS, privateRequest } from '@src/apis/BE';
export const getTrafficSigns = async (params) => {
  try {
    let page = 0;
    let perPage = 10;
    let type = params?.type || 1;

    if (params?.current !== undefined) {
      page = params?.current + 1;
    }

    const result = await privateRequest(
      BE.get,
      PATHS.TRAFFIC_SIGNS(type, page, perPage),
    );
    return {
      list: result?.data?.data,
      current: page,
      totalPages: result?.data?.totalPage,
    };
  } catch (error) {
    // console.error(error);
  }
};
