export enum ColorModeEnum {
  light = 'light',
  dark = 'dark'
}
export enum NavsTypeEnum {
  flat = 'flat',
  card = 'card'
}

// 菜单数据type
export enum MenuDataTypeEnum {
  menu = 0,
  button = 1
}
// 布局模式
export enum LayoutModeTypeEnum {
  twoMenu = 'twoMenu',
  singleMenu = 'singleMenu',
  topMenu = 'topMenu',
  topLeftMenu = 'topLeftMenu',
}

// 审批类型标识枚举
export enum ApproveTypeKeyEnum {
  // 会议室审批
  meetingRoom = 'meeting_room',
  // 离岛审批
  leaveIsland = 'leave_island',
  // 盖章审批
  seal = 'seal',
  // 加班审批
  overtime = 'overtime',
  // 用车审批
  car = 'car',
  // 易耗品申领审批
  consumable = 'consumable',

}

/*
*  用户角色标识枚举
*  @desc dispatcher - 调度员
* */
export enum RoleTypeEnum {
  dispatcher = 'dispatcher' // 调度员
}
