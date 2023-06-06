<template>
  <el-card class="message">
    <div class="header">代办事项</div>
    <div class="calendar">
      <div class="calendar-header">
        <el-button @click="prevMonth" text>
          <el-icon><ArrowLeftBold /></el-icon>
        </el-button>
        <h2>{{ monthYear }}</h2>
        <el-button @click="nextMonth" text>
          <el-icon><ArrowRightBold /></el-icon>
        </el-button>
      </div>
      <table class="calendar-table">
        <thead>
          <tr>
            <th v-for="day in daysOfWeek" :key="day">{{ day }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(week, i) in weeks" :key="i">
            <td
              v-for="(date, j) in week"
              :key="j"
              :class="{
                today: isToday(date),
                'other-month': isOtherMonth(date),
              }"
              @click="clickDate(date)"
            >
              <div>{{ date.getDate() }}</div>
              <div class="dian" v-if="showdian(date)"></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="todo">
      <p>会议通知：10:00-11:00 301会议室</p>
      <p>用车通知：14:00-18:00 轿车 赣A12345</p>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import '../style/cardheader.scss'
import { computed, ref } from 'vue'
const currentDate = new Date()
const selectedDate = ref(currentDate)

const daysOfWeek = ['日', '一', '二', '三', '四', '五', '六']

const weeks = computed(() => {
  const year = selectedDate.value.getFullYear()
  const month = selectedDate.value.getMonth()
  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const prevMonthLastDay = new Date(year, month, 0).getDate()

  const weeksArr = []
  let daysArr = []

  for (let i = 1; i < firstDayOfMonth.getDay(); i++) {
    daysArr.push(
      new Date(
        year,
        month - 1,
        prevMonthLastDay - firstDayOfMonth.getDay() + i + 1,
      ),
    )
  }

  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    const date = new Date(year, month, i)
    daysArr.push(date)
    if (daysArr.length === 7) {
      weeksArr.push(daysArr)
      daysArr = []
    }
  }

  if (daysArr.length > 0) {
    while (daysArr.length < 7) {
      daysArr.push(
        new Date(year, month + 1, daysArr.length - lastDayOfMonth.getDay() + 1),
      )
    }
    weeksArr.push(daysArr)
  }

  return weeksArr
})

const monthYear = computed(() => {
  const year = selectedDate.value.getFullYear()
  const month = selectedDate.value.toLocaleString('default', { month: 'long' })
  return `${month} ${year}`
})

const isToday = (date: any) => {
  const today = new Date()
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  )
}

const isOtherMonth = (date: any) => {
  return date.getMonth() !== selectedDate.value.getMonth()
}

const prevMonth = () => {
  const year = selectedDate.value.getFullYear()
  const month = selectedDate.value.getMonth()
  selectedDate.value = new Date(year, month - 1, 1)
}

const nextMonth = () => {
  const year = selectedDate.value.getFullYear()
  const month = selectedDate.value.getMonth()
  selectedDate.value = new Date(year, month + 1, 1)
}

const clickDate = (Date: any) => {
  ElMessage.success({
    message: Date,
    showClose: true,
  })
}

const showdian = (Date: any) => {
  if (isToday(Date)) return true
  return Date.getDate() % 3 === 0 ? true : false
}
</script>

<style lang="scss" scoped>
.calendar {
  color: #9d8d8d;
  .calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    .el-icon {
      :hover {
        color: #9d8d8d;
      }
    }
  }

  .calendar-table {
    border-collapse: collapse;
    width: 100%;
    margin-top: 1rem;
    th {
      text-align: center;
    }
    tbody {
      td {
        text-align: center;
        padding: 0.5rem;
        height: 35px;
        line-height: 35px;
        cursor: pointer;
        :hover {
          border-radius: 15px;
          background-color: #d3c8c8;
          color: #ffffff;
        }
        .dian {
          margin: 0 auto;
          width: 4px;
          height: 4px;
          border-radius: 2px;
          background-color: #6ed257;
        }
      }
    }
  }

  .other-month {
    color: #ccc;
  }

  .today {
    color: #1f8ddc;
  }
}
.todo {
  margin-top: 15px;
  color: #41aae6;
  p {
    height: 30px;
    line-height: 30px;
    font-size: 13px;
    border-bottom: 1px solid $dividing-line-color;
  }
}
</style>
