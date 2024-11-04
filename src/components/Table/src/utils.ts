import { isArray } from "@/utils/is";
import { BasicTableColumn, BasicTableOptions } from "@/components/Table/src/types";

export function getTableDefaultOption(
  option: Partial<BasicTableOptions>
): BasicTableOptions {
  const defaultOption: BasicTableOptions = {
    width: '100%',
    height: "100%",
    border: true,
    align: "center",
    stripe: true,
    full: true,
    columns: [],
  };
  return {
    ...defaultOption,
    ...option,
    columns: getTableDefaultColumn(option.columns).filter(item => item.display),
  };
}

// 处理column 设置默认参数
export function getTableDefaultColumn(
  column: BasicTableColumn[] = []
): BasicTableColumn[] {
  return isArray(column)
    ? column.map((col) => {
      return {
        type: "text",
        display: true,
        ...col,
      };
    })
    : [];
}
