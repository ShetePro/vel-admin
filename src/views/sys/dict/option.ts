import { BasicTableOptions } from "@/components/Table/src/types";
import { BasicFormOption } from "@/components/Form/src/types";

export const searchOption: Partial<BasicFormOption> = {
  labelWidth: "80px",
  labelPosition: "left",
  column: [
    {
      label: "字典名称",
      prop: "label",
      span: 8,
      maxWidth: "300px",
      minWidth: "300px",
    },
  ],
};
export const tableOption: BasicTableOptions = {
  border: true,
  align: "center",
  height: "100%",
  stripe: true,
  full: true,
  columns: [
    {
      label: "字典名称",
      prop: "label",
    },
    {
      label: "字典值",
      prop: "value",
    },
    {
      label: "字典类型",
      prop: "type",
    },
    {
      label: "排序",
      prop: "sort",
    },
    {
      label: "备注",
      prop: "remarks",
    },
    {
      label: "操作",
      prop: "menu",
      width: 250,
      slot: true,
    },
  ],
};
