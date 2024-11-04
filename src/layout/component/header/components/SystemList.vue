<template>
  <div :class="prefixCls">
    <ul
      :class="`${prefixCls}-list`"
      ref="notifyRef"
      v-infinite-scroll="notifyLoad"
      style="overflow: auto"
      v-if="notifyList.length"
    >
      <li
        v-for="item in notifyList"
        :data-key="item.id"
        :class="`${prefixCls}-list-item dark:text-white dark:hover:bg-gray-700`"
        :key="item.id"
        @click="setNotify(item)"
      >
        <el-avatar
          :size="40"
          style="min-width: 40px; background: transparent"
          :src="notifyImage"
        ></el-avatar>
        <div :class="`${prefixCls}-list-item-title`">
          <span class="text-ellipsis">{{ item.content }}</span>
          <div :class="`${prefixCls}-list-item-title-desc`">
            <div>{{ getSendDate(item.date) }}</div>
            <div style="margin-left: 10px">{{ item.user }}</div>
          </div>
        </div>
      </li>
      <li :class="`${prefixCls}-hint flex-ac`">
        <span>没有更多了...</span>
      </li>
    </ul>
    <div class="flex flex-col items-center justify-center text-gray-400 pb-2" v-else>
      <img src="@/assets/image/common/empty.png" width="150" alt="empty" />
      <span>暂无未读信息</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import moment from "moment";
import { ref } from "vue";
import notifyImage from "../../../../assets/image/common/notify_img.png";
moment.locale("zh-cn");
type NotifyItemProps = {
  id: string;
  content: string;
  date: string;
  user: string;
};
const prefixCls = "notify-system";
const notifyList = ref<NotifyItemProps[]>([
  { id: "1", content: "消息通知", date: "2023-04-01 12:12:12", user: "admin" },
]);
const notifyRef = ref<HTMLElement>();
const getSendDate = (date: string) => {
  const nowTime = new Date().getTime();
  const infoTime = new Date(date).getTime();
  if (nowTime - infoTime > 86400000) {
    return date;
  } else {
    return moment(date).startOf("hour").fromNow();
  }
};
const notifyLoad = () => {};
// 已读移除消息
const moveMsg = (id: string) => {
  const liList = notifyRef.value?.children as HTMLCollection;
  let cell = undefined
  for (const element of Array.from(liList)) {
    if (element.getAttribute("data-key") === id) {
      cell = element;
      break
    }
  }
  console.log(cell);
  if (cell) {
    cell.className = cell.className + " animate__animated animate__fadeOutLeft";
    // 设置移除后的回调
    setTimeout(() => {
      notifyList.value = notifyList.value.filter(
        (item: NotifyItemProps) => item.id !== id
      );
    }, 1000);
  }
};
const setNotify = (item: NotifyItemProps) => {
  console.log(item);
  moveMsg(item.id);
};
</script>

<style lang="scss" scoped>
.notify-system {
  min-width: 300px;
  &-list {
    list-style-type: none;
    padding: 0;
    max-height: 350px;
    &-item {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: flex-start;
      cursor: pointer;
      padding: 10px;
      transition: all 0.5s ease-in-out;
      &:hover {
        background: rgb(236, 245, 255);
      }
      &-title {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex-grow: 1;
        margin: 0 10px;
        max-width: 300px;
        font-size: 14px;

        &-desc {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          color: #999;
        }
        span:first-child {
          padding-bottom: 5px;
        }
      }
    }
  }
  &-hint {
    color: #999;
    padding: 10px 0;
  }
}
.msg-hide {
  height: 0;
}
</style>
