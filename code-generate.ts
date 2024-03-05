// require("core-js/modules/es.promise");
// require("core-js/modules/es.string.includes");
// require("core-js/modules/es.object.assign");
// require("core-js/modules/es.object.keys");
// require("core-js/modules/es.symbol");
// require("core-js/modules/es.symbol.async-iterator");
// require("regenerator-runtime/runtime");

// const ExcelJS = require('exceljs/dist/es5');

const ExcelJS = require("exceljs");
const fs = require("fs");

(async () => {
  try {
    console.info("code-generate :: Start generating.");
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile("./public/xlsx/codes.xlsx");

    console.log(workbook.worksheets[0]._rows);

    // console.log(workbook.worksheets[0].columns);

    // columns
    // [0]: 법정동코드
    // [1]: 시도명
    // [2]: 시군구명
    // [3]: 읍면동명
    // [4]: 리명
    // [5]: 순위
    // [6]: 생성일자
    // [7]: 삭제일자
    // [8]: 과거법정동코드

    const data = { test: "" };
    fs.writeFile(
      "./public/xlsx/codes.json",
      JSON.stringify(data),
      "utf8",
      function () {
        console.log("code-generate :: Generation completed. ===");
      }
    );
  } catch (error) {
    console.error(error);
  }
})();
