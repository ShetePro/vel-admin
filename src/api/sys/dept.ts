import { request } from "@/utils/http";

// 获取部门下拉树列表
export function getDeptTree() {
  return request.post({
    url: "/rest/sys/dept/treeselect",
  });
}
