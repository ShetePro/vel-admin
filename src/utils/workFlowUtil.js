import snowflakeId from 'snowflake-id'
import {getDictData, getDictLabelByValue} from "@/utils/dict";
function All() {}
All.prototype = {
  snowflake: new snowflakeId({
    mid: 42,
    offset: (2019 - 1970) * 31536000 * 1000
  }),
  timer: '',
  debounce(fn, delay = 500) {
    var _this = this
    return function (arg) {
      //获取函数的作用域和变量
      let that = this
      let args = arg
      clearTimeout(_this.timer) // 清除定时器
      _this.timer = setTimeout(function () {
        fn.call(that, args)
      }, delay)
    }
  },
  setCookie(val) {
    //cookie设置[{key:value}]、获取key、清除['key1','key2']
    for (var i = 0, len = val.length; i < len; i++) {
      for (var key in val[i]) {
        document.cookie = key + '=' + encodeURIComponent(val[i][key]) + '; path=/'
      }
    }
  },
  getCookie(name) {
    var strCookie = document.cookie
    var arrCookie = strCookie.split('; ')
    for (var i = 0, len = arrCookie.length; i < len; i++) {
      var arr = arrCookie[i].split('=')
      if (name == arr[0]) {
        return decodeURIComponent(arr[1])
      }
    }
  },
  clearCookie(name) {
    var myDate = new Date()
    myDate.setTime(-1000) //设置时间
    for (var i = 0, len = name.length; i < len; i++) {
      document.cookie = '' + name[i] + "=''; path=/; expires=" + myDate.toGMTString()
    }
  },
  arrToStr(arr) {
    if (arr) {
      return arr
        .map((item) => {
          return item.name
        })
        .toString()
    }
  },
  toggleClass(arr, elem, key = 'id') {
    return arr.some((item) => {
      return item[key] == elem[key]
    })
  },
  toChecked(arr, elem, key = 'id') {
    var isIncludes = this.toggleClass(arr, elem, key)
    !isIncludes ? arr.push(elem) : this.removeEle(arr, elem, key)
  },
  removeEle(arr, elem, key = 'id') {
    let includesIndex
    arr.map((item, index) => {
      if (item[key] == elem[key]) {
        includesIndex = index
      }
    })
    arr.splice(includesIndex, 1)
  },
  getNodeTypeText(nodeConfig) {
    switch (nodeConfig.settype) {
    case 0:
      return '不需要配置'
    case 1:
      return nodeConfig.userName || ''
    case 2:
      // 当前部门的角色
      return nodeConfig.roleName ? '当前部门的' + nodeConfig.roleName : ''
    case 3:
      // 指定部门的角色
      return nodeConfig.deptName && nodeConfig.roleName ? `${nodeConfig.deptName}的${nodeConfig.roleName}` : ''
    case 4:
      // 根据部门人员关联表
      return nodeConfig.deptReviewerTable.map(item => `${item.deptName}:${item.userName}`).join(',')
    case 5:
      // 根据角色
      return nodeConfig.roleName ? '根据角色: ' + nodeConfig.roleName : ''
    case 6:
      // 多个人
      return nodeConfig.recipients.map(item => item.name || item.recipientsName).join(',')
    }
  },
  dealStr(str, obj) {
    let arr = []
    let list = str.split(',')
    for (var elem in obj) {
      list.map((item) => {
        if (item == elem) {
          arr.push(obj[elem].value)
        }
      })
    }
    return arr.join('或')
  },
  conditionStr(nodeConfig, index) {
    const { conditionList } = nodeConfig.conditionNodes[index]
    if (conditionList.length === 0) {
      return index === nodeConfig.conditionNodes.length - 1 &&
        nodeConfig.conditionNodes[0].conditionList.length !== 0
        ? '其他条件进入此流程'
        : '请设置条件'
    } else {
      let str = conditionList.map(item => {
        return `${item.fieldName} ${getDictLabelByValue('conditional_operator',item.conditionalOperator)} ${getDictLabelByValue(item.fieldName, item.fieldValue)}`
      })
      return str.length ? str.join(';') : '请设置条件'
    }
  },
  
  copyerStr(nodeConfig) {
    if (nodeConfig?.nodeUserList?.length != 0) {
      return this.arrToStr(nodeConfig.nodeUserList)
    } else {
      if (nodeConfig.ccSelfSelectFlag == 1) {
        return '发起人自选'
      }
    }
  },
  toggleStrClass(item, key) {
    let a = item.zdy1 ? item.zdy1.split(',') : []
    return a.some((item) => {
      return item == key
    })
  },
  getNodeId() {
    return this.snowflake.generate()
  }
}

export default new All()
