/**
 * @descriptor 时间工具函数
 * @author obf1313
 */
import dayjs from 'dayjs'

/**
 * 日期格式化
 */
export const formatDate = (date: Date) => {
  return dayjs(date).format('YYYY-MM-DD')
}

/** 日期时间格式化 */
export const formatTime = (date: Date) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
}
