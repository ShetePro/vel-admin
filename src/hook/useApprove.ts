import { ApproveTypeKeyEnum } from '@/enum/settingsEnum'
import { request } from '@/utils/http'

type UseApproveProps = {}

interface UseApproveMethods {
  getDetailByTypeKey: (typeKey: string, data: Recordable) => any
  getApproveUrlByTypeKey: (typeKey: string) => any
  approveCreateApi: (typeKey: string, data: Recordable) => any
  approveApi: (typeKey: string, data: Recordable) => any
  discardApi: (typeKey: string, data: Recordable) => any
}
export function useApprove(props?: UseApproveProps): UseApproveMethods {
  const apiMap: KeyRecordable<string> = {
    [ApproveTypeKeyEnum.meetingRoom]: '/rest/approval/meeting-room', // 会议室审批
    [ApproveTypeKeyEnum.car]: '/rest/approval/car', // 用车
    [ApproveTypeKeyEnum.consumable]: '/rest/approval/consumables', // 易耗品
    [ApproveTypeKeyEnum.seal]: '/rest/approval/seal', // 盖章
    [ApproveTypeKeyEnum.leaveIsland]: '/rest/approval/leave-island', // 离岛
    [ApproveTypeKeyEnum.overtime]: '/rest/approval/overtime' // 加班
  }

  // 根据审核类型标识获取审批详情
  const getDetailByTypeKey = (typeKey: string, data: Recordable) => {
    return request.post({
      url: `${getApproveUrlByTypeKey(typeKey)}/getDetail`,
      data
    })
  }

  // 新增接口
  function approveCreateApi(typeKey: string, data: Recordable) {
    return request.post({
      url: `${getApproveUrlByTypeKey(typeKey)}/add`,
      data
    })
  }
  // 审批接口
  function approveApi(typeKey: string, data: Recordable) {
    return request.post({
      url: `${getApproveUrlByTypeKey(typeKey)}/approve`,
      data
    })
  }
  // 撤销接口
  function discardApi(typeKey: string, data: Recordable) {
    return request.post({
      url: `${getApproveUrlByTypeKey(typeKey)}/discard`,
      data
    })
  }

  function getApproveUrlByTypeKey(key: string) {
    return apiMap[key]
  }

  return {
    getDetailByTypeKey,
    getApproveUrlByTypeKey,
    approveCreateApi,
    approveApi,
    discardApi
  }
}
