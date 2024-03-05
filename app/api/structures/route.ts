import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import qs from "query-string";

import { StructureSearchParams } from "../../interfaces";
import { getPageData } from "./util";

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams.toString();
    const parsedQuery = qs.parse(query);
    const jsonQuery: StructureSearchParams = JSON.parse(
      JSON.stringify(parsedQuery)
    );

    const firstPageRes = await getPageData(jsonQuery, 1);

    const { totalPageCount, totalCount } = firstPageRes;

    const totalPageRes = [firstPageRes];

    // records 수가 100개 이상인 경우 반복 조회 후 병합
    if (totalPageCount > 2) {
      const pageNos = Array(totalPageCount - 1)
        .fill(0)
        .map((_, i) => i + 2);

      for await (let pageNo of pageNos) {
        const pageRes = await getPageData(jsonQuery, pageNo);
        totalPageRes.push(pageRes);
      }
    }

    return NextResponse.json(
      { data: { pages: totalPageRes, totalCount, search: jsonQuery } },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      {
        status: 500,
      }
    );
  }
}
