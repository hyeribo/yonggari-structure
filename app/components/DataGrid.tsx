import { useMemo } from "react";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react"; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
// import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import "ag-grid-community/styles/ag-theme-balham.css"; // Optional Theme applied to the grid
// import "ag-grid-community/styles/ag-theme-material.css"; // Optional Theme applied to the grid

import { Structure } from "../interfaces";

type DataGridProps = {
  data: Structure[];
};

const DataGrid: React.FC<DataGridProps> = ({ data }) => {
  const colDefs = useMemo<ColDef[]>(
    () => [
      { field: "mainPurpsCdNm", headerName: "주용도코드명" },
      { field: "bldNm", headerName: "건물명" },
      { field: "grndFlrCnt", headerName: "지상층수" },
      { field: "ugrndFlrCnt", headerName: "지하층수" },
      { field: "totDongTotArea", headerName: "총동연면적(㎡)" },
      { field: "totArea", headerName: "연면적(㎡)" },
      { field: "stcnsDay", headerName: "착공일" },
      { field: "useAprDay", headerName: "사용승인일" },
      { field: "platPlc", headerName: "대지위치" },
      { field: "newPlatPlc", headerName: "도로명대지위치" },
      { field: "strctCdNm", headerName: "구조코드명" },
      { field: "rserthqkDsgnApplyYn", headerName: "내진설계적용여부" },
      { field: "heit", headerName: "높이(m)" },
    ],
    []
  );

  return (
    <div className="ag-theme-balham" style={{ height: "100%" }}>
      <AgGridReact columnDefs={colDefs} rowData={data} />
    </div>
  );
};
export default DataGrid;
