import axios from "axios";

import {
  StructureSearchParams,
  StructureRequestParams,
} from "../../interfaces";
import config from "../../constants/config";

const instance = axios.create({
  baseURL: config.baseUrl,
});

export async function getPageData(
  searchParams: StructureSearchParams,
  searchPageNo = 1
) {
  try {
    const params: StructureRequestParams = {
      serviceKey: config.serviceKey2,
      numOfRows: 100,
      ...searchParams,
      pageNo: searchPageNo,
    };

    const res = await instance.get(config.operation, { params });
    const { items, numOfRows, pageNo, totalCount } = res.data.response.body;
    const totalPageCount = !totalCount ? 0 : Math.ceil(totalCount / 100);

    const result = {
      items: items?.item?.length ? items?.item : [],
      numOfRows,
      pageNo,
      totalCount,
      totalPageCount,
    };
    return result;
  } catch (error) {
    console.error(error);
    throw Error("Failed to get data.");
  }
}
