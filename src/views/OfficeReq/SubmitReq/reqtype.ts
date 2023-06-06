import qingjia from '@/assets/icons/jiaqing/qingjia.svg'
import chuchai from '@/assets/icons/jiaqing/chuchai.svg'
import waichu from '@/assets/icons/jiaqing/waichu.svg'
import jiaban from '@/assets/icons/jiaqing/jiaban.svg'

import baoxiao from '@/assets/icons/caiwu/baoxiao.svg'
import jiekuan from '@/assets/icons/caiwu/jiekuan.svg'
import jiangli from '@/assets/icons/caiwu/jiangli.svg'
import caigou from '@/assets/icons/caiwu/caigou.svg'
import jingfei from '@/assets/icons/caiwu/jingfei.svg'

import huiyishi from '@/assets/icons/xingzheng/huiyishi.svg'
import gongwen from '@/assets/icons/xingzheng/gongwen.svg'
import weixiu from '@/assets/icons/xingzheng/weixiu.svg'
import yongche from '@/assets/icons/xingzheng/yongche.svg'
import gaizhang from '@/assets/icons/xingzheng/gaizhang.svg'
import guihuan from '@/assets/icons/xingzheng/guihuan.svg'

import ruzhi from '@/assets/icons/renyuan/ruzhi.svg'
import zhuanzheng from '@/assets/icons/renyuan/zhuanzheng.svg'
import lizhi from '@/assets/icons/renyuan/lizhi.svg'
import zhuangang from '@/assets/icons/renyuan/zhuangang.svg'
import qita from '@/assets/icons/qita/qita.svg'

// 申请类型(用于菜单)
export default [
  // 假勤
  [
    {
      type: '假勤',
      name: '请假',
      icon: qingjia,
    },
    {
      name: '出差',
      icon: chuchai,
    },
    {
      name: '外出',
      icon: waichu,
    },
    {
      name: '加班',
      icon: jiaban,
    },
  ],
  // 财务
  [
    {
      type: '财务',
      name: '报销',
      icon: baoxiao,
    },
    {
      name: '借款',
      icon: jiekuan,
    },
    {
      name: '奖励',
      icon: jiangli,
    },
    {
      name: '采购',
      icon: caigou,
    },
    {
      name: '活动经费',
      icon: jingfei,
    },
  ],
  // 行政
  [
    {
      type: '行政',
      name: '会议室预定',
      icon: huiyishi,
    },
    {
      name: '公文流转',
      icon: gongwen,
    },
    {
      name: '物品维修',
      icon: weixiu,
    },
    {
      name: '用车',
      icon: yongche,
    },
    {
      name: '用章',
      icon: gaizhang,
    },
    {
      name: '归还',
      icon: guihuan,
    },
  ],
  // 人事
  [
    {
      type: '人事',
      name: '入职',
      icon: ruzhi,
    },
    {
      name: '转正',
      icon: zhuanzheng,
    },
    {
      name: '离职',
      icon: lizhi,
    },
    {
      name: '转岗',
      icon: zhuangang,
    },
  ],
  // 其他
  [
    {
      type: '其他',
      name: '其他',
      icon: qita,
    },
  ],
]
