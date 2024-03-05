import { useState } from "react";
import axios from "axios";
import { Button, Input, Space } from "antd";
import { FileExcelOutlined } from "@ant-design/icons";
import Link from "next/link";

import DataGrid from "./DataGrid";

import {
  StructureSearchParams,
  StructureTotalPage,
  Structure,
} from "../interfaces";
import { downloadExcel } from "../lib/excel";

const Main: React.FC = () => {
  const [sigunguCd, setSigunguCd] = useState("");
  const [bjdongCd, setBjdongCd] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Structure[]>([]);
  const [prevSearchParams, setPrevSearchParams] =
    useState<StructureSearchParams>({ sigunguCd: "", bjdongCd: "" });
  const [isDownloading, setIsDownloading] = useState(false);

  const handleSearch = async () => {
    try {
      const regex = /^[0-9]{5}$/;
      if (!regex.test(sigunguCd)) {
        alert("시군구코드를 5자리 숫자로 입력하세요.");
        return;
      }
      if (!regex.test(bjdongCd)) {
        alert("법정동코드를 5자리 숫자로 입력하세요.");
        return;
      }

      setIsLoading(true);
      const params = { sigunguCd, bjdongCd };
      const res = await axios.get(
        `https://yonggari-structure.vercel.app/api/structures`,
        {
          params,
        }
      );
      const { pages, totalCount, search } = res.data.data as StructureTotalPage;
      const totalPageItems: Structure[][] =
        pages?.map?.((page) => page.items) ?? [];
      const totalItems: Structure[] = totalPageItems.flat?.() ?? [];

      setData(totalItems);
      setPrevSearchParams({ ...search });
    } catch (error) {
      alert("검색 실패");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      await downloadExcel(data, prevSearchParams);
    } catch (error) {
      alert("다운로드 실패");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="absolute top-1 right-1">
        <Link href="/xlsx/codes.xlsx" target="_blank">
          <Button size="small">코드</Button>
        </Link>
      </div>

      <div className="flex flex-row justify-center items-center h-[60px] gap-1 px-3">
        <Space.Compact>
          <Input
            addonBefore="시군구코드"
            placeholder="11680"
            value={sigunguCd}
            onChange={(e) => setSigunguCd(e.target.value)}
            onPressEnter={handleSearch}
          />
        </Space.Compact>
        <Space.Compact>
          <Input
            addonBefore="법정동코드"
            placeholder="10300"
            value={bjdongCd}
            onChange={(e) => setBjdongCd(e.target.value)}
            onPressEnter={handleSearch}
          />
        </Space.Compact>
        <Button type="primary" onClick={handleSearch} loading={isLoading}>
          Search
        </Button>
      </div>

      <div className="flex flex-row justify-end items-end h-[60px] gap-1 px-3 mb-2">
        <Button
          onClick={handleDownload}
          icon={<FileExcelOutlined />}
          loading={isDownloading}
          disabled={!data.length}
        >
          엑셀 다운
        </Button>
      </div>
      <div className="px-3" style={{ height: "calc(100vh - 140px)" }}>
        <DataGrid data={data} />
      </div>
    </div>
  );
};

export default Main;
