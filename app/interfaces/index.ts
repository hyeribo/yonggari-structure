// export type Structure = {
//   rnum: number; // 순번
//   newPlatPlc: string; // 도로명대지위치
//   bldNm: string; // 건물명
//   splotNm: string; // 특수지명
//   block: string; // 블록
//   lot: string; // 로트
//   bylotCnt: number; // 외필지수
//   naRoadCd: string; // 새주소도로코드
//   naBjdongCd: string; // 새주소법정동코드
//   naUgrndCd: string; // 새주소지상지하코드
//   naMainBu: number; // 새주소본번
//   naSubBun: number; // 새주소부번
//   jiyukCd: string; // 지역코드
//   jiguCd: string; // 지구코드
//   guyukCd: string; // 구역코드
//   jiyukCdNm: string; // 지역코드명
//   jiguCdNm: string; // 지구코드명
//   guyukCdNm: string; // 구역코드명
//   crtnDay: string; // 생성일자
//   platPlc: string; // 대지위치
//   sigunguCd: string; // 시군구코드
//   bjdongCd: string; // 법정동코드
//   platGbCd: string; // 대지구분코드
//   bun: string; // 번
//   ji: string; // 지
//   mgmBldrgstPk: string; // 관리건축물대장PK
//   regstrGbCd: string; // 대장구분코드
//   regstrGbCdNm: string; // 대장구분코드명
//   regstrKindCd: string; // 대장종류코드
//   regstrKindCdNm: string; // 대장종류코드명
// };

export type Structure = {
  mainPurpsCdNm: string; // 주용도코드명
  bldNm: string; // 건물명
  grndFlrCnt: number; // 지상층수
  ugrndFlrCnt: number; // 지하층수
  totDongTotArea: number; // 총동연면적(㎡)
  totArea: number; // 연면적(㎡)
  stcnsDay: string; // 착공일
  useAprDay: string; // 사용승인일
  platPlc: string; // 대지위치
  newPlatPlc: string; // 도로명대지위치
  strctCdNm: string; // 구조코드명
  rserthqkDsgnApplyYn: number; // 내진설계적용여부
  heit: number; // 높이(m)
};

export type ResponseError = {
  message: string;
};

export type StructureSearchParams = {
  sigunguCd: string; // 시군구코드
  bjdongCd: string; // 법정동코드
  platGbCd?: string; // 대지구분코드 (0:대지, 1:산, 2:블록)
  bun?: string; // 번
  ji?: string; // 지
  startDate?: string; // 검색시작일
  endDate?: string; // 검색종료일
};

export interface StructureRequestParams extends StructureSearchParams {
  serviceKey: string; // 인증키
  numOfRows: number; // 리스트수
  pageNo: number; // 페이지번호
}

export type StructurePage = {
  items: Structure[];
  numOfRows: number;
  pageNo: number;
  totalCount: number;
  totalPageCount: number;
};

export interface StructureTotalPage {
  pages: StructurePage[];
  totalCount: number;
  search: StructureSearchParams;
}
