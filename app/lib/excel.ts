import * as FileSaver from "file-saver";
import ExcelJS from "exceljs";
import dayjs from "dayjs";

import { Structure, StructureSearchParams } from "../interfaces";
import EXCEL from "../constants/excel";

export async function downloadExcel(
  data: Structure[],
  search: StructureSearchParams
) {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "Yu Hyeri";
  workbook.lastModifiedBy = "Yu Hyeri";

  const worksheet = workbook.addWorksheet(
    `${search.sigunguCd}_${search.bjdongCd}`
  );
  worksheet.columns = EXCEL.columns;
  worksheet.addRows(data);

  const excelFileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileName = `건축물대장표제부_${dayjs().format("YYYYMMDDHHmmss")}.xlsx`;
  const buffer = await workbook.xlsx.writeBuffer();
  const excelFile = new Blob([buffer], { type: excelFileType });
  FileSaver.saveAs(excelFile, fileName);
}
