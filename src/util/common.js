import { MessageBox } from 'element-ui'
// yyyy为年 MM为月 dd为日 HH为小时 mm为分钟 ss为秒
export const timeFormat = (time, format) => {
  let t = new Date(time)
  let y = t.getFullYear()
  let M = t.getMonth() + 1
  if (M < 10) M = '0' + M
  let d = t.getDate()
  if (d < 10) d = '0' + d
  let H = t.getHours()
  if (H < 10) H = '0' + H
  let m = t.getMinutes()
  if (m < 10) m = '0' + m
  let s = t.getSeconds()
  if (s < 10) s = '0' + s
  return format.replace(/yyyy/, y).replace(/MM/, M).replace(/dd/, d).replace(/HH/, H).replace(/mm/, m).replace(/ss/, s)
}
/**
 * 时间
 * @param now
 * @returns {string}
 */
export const formatDate = function (now) {
  // 年-月-日-时-分-秒
  let year = now.getFullYear()
  let month = now.getMonth() + 1
  let date = now.getDate()
  let hour = now.getHours()
  let minute = now.getMinutes()
  let second = now.getSeconds()
  // let arr = [month, date, hour, minute, second]
  if (month < 10) {
    month = '0' + month
  }
  if (date < 10) {
    date = '0' + date
  }
  if (hour < 10) {
    hour = '0' + hour
  }
  if (minute < 10) {
    minute = '0' + minute
  }
  if (second < 10) {
    second = '0' + second
  }
  return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
}
/**
 * 打印
 * @param content
 */
export const onePrint = (content) => {
  let iframe = document.createElement('IFRAME')
  let doc = null
  iframe.setAttribute('style', 'display:none;')
  document.body.appendChild(iframe)
  doc = iframe.contentWindow.document
  doc.write(content)
  doc.close()
  iframe.contentWindow.focus()
  iframe.contentWindow.print()
  document.body.removeChild(iframe)
}
/**
 * 数字金额转换中文大写
 * @param n
 * @returns {string}
 */
export const changeMoney = (n) => {
  var fraction = ['角', '分']
  var digit = [
    '零', '壹', '贰', '叁', '肆',
    '伍', '陆', '柒', '捌', '玖'
  ]
  var unit = [
    ['元', '万', '亿'],
    ['', '拾', '佰', '仟']
  ]
  var head = n < 0 ? '欠' : ''
  n = Math.abs(n)
  var s = ''
  for (var i = 0; i < fraction.length; i++) {
    s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '')
  }
  s = s || '整'
  n = Math.floor(n)

  for (var index = 0; index < unit[0].length && n > 0; index++) {
    var p = ''
    for (var j = 0; j < unit[1].length && n > 0; j++) {
      p = digit[n % 10] + unit[1][j] + p
      n = Math.floor(n / 10)
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][index] + s
  }
  return head + s.replace(/(零.)*零元/, '元')
    .replace(/(零.)+/g, '零')
    .replace(/^整$/, '零元整')
}
/**
 * 获取元素距离顶部的距离
 * @param e
 * @returns {Number|number}
 */
export const getTop = (e) => {
  let y = e.offsetTop
  while ((e = e.offsetParent)) {
    y += e.offsetTop
  }
  return y
}
/**
 * 弹出提示框
 * @param txt
 * @param fn1
 * @param fn2
 */
export const tipBox = (txt, fn1, fn2) => {
  MessageBox.confirm(txt, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    fn1.constructor === Function && fn1()
  }).catch(() => {
    fn2.constructor === Function && fn2()
  })
}
/**
 * 获取订单状态
 * @param n
 * @returns {*}
 */
export const getOrderStatus = (n) => {
  switch (parseInt(n)) {
    case 2:
      return '待入库'
    case 3:
      return '待入库'
    case 21:
      return '部分入库'
    case 22:
      return '已入库'
    case 23:
      return '已配货'
    case 24:
      return '已提货'
    case 25:
      return '已装车'
    case 26:
      return '已发车'
    default:
      return ''
  }
}
export const getStyle = (obj, attr) => {
  if (obj.currentStyle) {
    return obj.currentStyle[attr]
  } else {
    /**
     * 放null参数的那个地方放false也可以，只要带一个参数，值您任意，高兴就好。
     */
    return getComputedStyle(obj, null)[attr]
  }
}
/**
 * 添加横向滚动条
 * @param outerBox
 * @param innerBox
 * @returns {function()}
 */
export const suspendScrollInit = (outerBox, innerBox) => {
  // console.log('----------------------')
  // console.log(innerBox.offsetWidth)
  // console.log(outerBox.offsetWidth)
  // console.log('-----------------------')
  if (innerBox.offsetWidth <= outerBox.offsetWidth) {
    /**
     * 消除table隐藏部分字段时产生的影响
     */
    let scrollBox = outerBox.getElementsByClassName('scroll-box')[0]
    scrollBox && scrollBox.parentNode.removeChild(scrollBox)
    return
  }
  let scrollBox = outerBox.getElementsByClassName('scroll-box')[0]
  let myScroll
  if (scrollBox) {
    myScroll = scrollBox.getElementsByTagName('div')[0]
  } else {
    scrollBox = document.createElement('div')
    scrollBox.className = 'scroll-box'
    myScroll = document.createElement('div')
    scrollBox.appendChild(myScroll)
    outerBox.appendChild(scrollBox)
  }
  scrollBox.onscroll = () => {
    // innerBox.style.left = '-' + scrollBox.scrollLeft + 'px';
    if (!(scrollBox.style.position === 'fixed')) {
      scrollBox.style.left = scrollBox.scrollLeft + 'px'
    }
    outerBox.scrollLeft = scrollBox.scrollLeft
  }
  /**
   * 滚动条的宽度=table的宽度
   * @type {string}
   */
  myScroll.style.width = innerBox.offsetWidth + 'px'
  scrollBox.style.width = outerBox.offsetWidth + 'px'
  // console.log(scrollBox.style.width)
  // console.log(myScroll.style.width)
  // scrollBox.scrollLeft = -parseFloat(innerBox.style.left);
  let tableScroll = () => {
    /**
     * 缓存页面的滚动事件都会监听到，所以要排除非当前页的滚动条的滚动事件
     */
    if (!document.getElementsByClassName('scroll-box')[0]) return
    if (!document.getElementsByClassName(scrollBox.className)[0]) return
    if (document.getElementsByClassName(scrollBox.className)[0] !== scrollBox) return
    let nowTop = document.body.offsetHeight - outerBox.getBoundingClientRect().top
    scrollBox.style.position = (nowTop < outerBox.offsetHeight && nowTop > 40) ? 'fixed' : 'absolute'
    if (scrollBox.style.position === 'fixed') {
      scrollBox.style.left = 'auto'
    } else {
      scrollBox.style.left = scrollBox.scrollLeft + 'px'
    }
  }
  tableScroll()
  return tableScroll
}
export const suspendScroll = (outerBox, innerBox, warp) => {
  if (!outerBox || !innerBox) return
  let scroll = suspendScrollInit(outerBox, innerBox)
  // console.log(scroll)
  scroll && warp.addEventListener('scroll', scroll)
  // scroll&&(window.onscroll=scroll);
  window.addEventListener('resize', () => {
    suspendScrollInit(outerBox, innerBox)
  })
}
export const lazyScrollInit = (el) => {
  el.dataset.flag = 1
}
// 滚动到底
export const lazyScroll = (el, callback) => {
  lazyScrollInit(el)
  // window.onscroll=()=>{
  //   if ((pageYOffset + document.body.offsetHeight-20 ) >= (el.offsetHeight + getTop(el)) && el.getAttribute('data-flag')==1) {
  //     el.dataset.flag=0;
  //     callback()
  //   }
  // };
  window.addEventListener('scroll', () => {
    if ((el.offsetHeight + getTop(el)) <= (pageYOffset + document.body.offsetHeight - 20) && el.getAttribute('data-flag') === 1) {
      el.dataset.flag = 0
      callback()
    }
  })
}
// 深度遍历
export const deepDelete = (obj, keyList) => {
  for (let key in obj) {
    if (obj.constructor === Object && keyList.includes(key)) {
      delete obj[key]
      continue
    }
    obj[key] && (obj[key].constructor === Array || obj[key].constructor === Object) && deepDelete(obj[key], keyList)
  }
}

export const insertAfter = (newElement, targetElement) => {
  let parent = targetElement.parentNode
  // 如果最后的节点是目标元素，则直接添加
  if (parent.lastChild === targetElement) {
    parent.appendChild(newElement)
  } else {
    // 如果不是，则插入在目标元素的下一个兄弟节点 的前面
    parent.insertBefore(newElement, targetElement.nextSibling)
  }
}

export const hidePartlyTd = (vueTr, checkedIndexArr, tableHead, pageNow) => {
  let add = 0
  if (tableHead.includes('操作') && pageNow) {
    add = 2
  } else if (!tableHead.includes('操作') && !pageNow) {

  } else {
    add = 1
  }
  // console.log(vueTr)
  vueTr.forEach((item, index) => {
    let tr = item
    while (tr.nextSibling !== vueTr[index + 1] && tr.nextSibling.nodeType !== 3) {
      tr = tr.nextSibling
      let tds = tr.getElementsByTagName('td')
      Array.prototype.forEach.call(tds, (td, index2) => {
        // alert(add)
        if (checkedIndexArr.includes(index2 - add) || index2 < add) {
          td.style.display = 'table-cell'
        } else {
          td.style.display = 'none'
        }
      })
    }
  })
}

// export const insertTrEvent=(vueTr,trClickBack,aClickBack)=>{
//   //let tr=this.$refs.table.getElementsByTagName('tr');
//   let tr=vueTr[0].parentNode.getElementsByTagName('tr');
//   vueTr.forEach((value, index) =>{
//     let item=value;
//     for(let i=0;item.nextSibling!=vueTr[index+1];i++){
//       item=item.nextSibling;
//       let item2=item;
//       item2.onclick= () =>{
//         if(item2.className.indexOf('trCheck')==-1){
//           this.trIndex='';
//           for(let j=0;j<tr.length;j++){
//             tr[j].className=tr[j].className.replace(/trCheck/,'')
//           }
//           if(!item2.className)item2.className='';
//           item2.className=item2.className+' trCheck';
//           trClickBack([index,i]);
//           //trClickBack(index);
//         }
//       };
//       Array.prototype.forEach.call(item2.getElementsByTagName('a'),(a,index2)=>{
//         a.onclick=function (e) {
//           aClickBack([index,i,index2]);
//           e.stopPropagation();
//         }
//       })
//     }
//   })
// }

export function insertTr (obj) {
  // this.childContent=obj.childContent;
  // this.data=null;
  // this.index=null;
  // this.operate=null;
  // this.disabled=null;
  this.rowTr = obj.rowTr
  this.tableHead = obj.tableHead
  this.pageNow = obj.pageNow
}

insertTr.prototype = {
  insert (childContent) {
    let data = childContent.content
    let idx = childContent.index
    let operate = childContent.operate
    let disabled = childContent.disabled
    data.forEach((obj, index) => {
      let tr = document.createElement('tr')
      // 判断插入的位置
      if (this.rowTr[idx + 1]) {
        this.rowTr[idx + 1].parentNode.insertBefore(tr, this.rowTr[idx + 1])
      } else {
        this.rowTr[idx].parentNode.appendChild(tr)
      }

      this.pageNow && (tr.innerHTML = '<td></td>')
      // 操作td插入
      if (this.tableHead.includes('操作')) {
        let div = document.createElement('div')
        let td = document.createElement('td')
        td.appendChild(div)
        tr.appendChild(td)
        operate.forEach((value, operateNum) => {
          let a = document.createElement('a')
          if (operateNum !== 0) {
            let text = document.createTextNode('|')
            div.appendChild(text)
          }
          a.className = 'operate'
          if (disabled && disabled.constructor === Array) {
            if (disabled[index] && disabled[index][operateNum]) {
              a.className = a.className + ' disabled'
            }
          }
          a.innerText = value
          div.appendChild(a)
        })
      }
      // if(this.tableHead.includes('操作')){
      //   if(this.pageNow){
      //     tr.innerHTML='<td></td>';
      //   }else{}
      //   td.appendChild(div);
      //   tr.appendChild(td);
      // }else{
      //   if(this.pageNow){
      //     tr.innerHTML='<td></td>';
      //   }else{}
      // }
      // 插入其他td
      Object.keys(obj).forEach((key, index) => {
        // if(data.checkedIndexArr.includes(index)){
        let arr = ['isChecked']
        if (!arr.some(item => item === key)) {
          let td = document.createElement('td')
          let div = document.createElement('div')
          div.innerHTML = obj[key]
          td.appendChild(div)
          tr.appendChild(td)
        }
        // }
      })
      tr.className = 'tr-insert tr-hidden'
    })
  },
  delete (childContent) {
    childContent.forEach((item) => {
      // this.index=item.index;
      while (this.rowTr[item.index].nextSibling !== this.rowTr[item.index + 1]) {
        this.rowTr[item.index].parentNode.removeChild(this.rowTr[item.index].nextSibling)
      }
    })
  },
  addTrEvent (event, clickBack) {
    if (!this.rowTr[0]) return
    let tr = this.rowTr[0].parentNode.getElementsByTagName('tr')
    this.rowTr.forEach((value, index) => {
      let item = value
      for (let i = 0; item.nextSibling !== this.rowTr[index + 1]; i++) {
        item = item.nextSibling
        let item2 = item
        if (event === 'trclick') {
          item2.onclick = () => {
            if (item2.className.indexOf('trCheck') === -1) {
              this.trIndex = ''
              for (let j = 0; j < tr.length; j++) {
                tr[j].className = tr[j].className.replace(/trCheck/, '')
              }
              if (!item2.className) item2.className = ''
              item2.className = item2.className + ' trCheck'
              clickBack([index, i])
              // trClickBack(index);
            }
          }
        }
        if (event === 'aclick') {
          Array.prototype.forEach.call(item2.getElementsByTagName('a'), (a, index2) => {
            a.onclick = function (e) {
              clickBack([index, i, index2])
              e.stopPropagation()
            }
          })
        }
      }
    })
  },
  showOrHide (clickContent) {
    // console.log(this.rowTr)
    let childTr = this.rowTr[clickContent.index]
    let foldIcon = childTr.getElementsByClassName('fold')[0]
    for (let i = 0; i < clickContent.number; i++) {
      childTr = childTr.nextSibling
      if (childTr.className.indexOf('tr-hidden') !== -1) {
        foldIcon.className = foldIcon.className + ' ' + 'fold-active'
        childTr.className = childTr.className.replace(/tr-hidden/, '')
      } else {
        foldIcon.className = 'fold'
        childTr.className = childTr.className + ' tr-hidden'
      }
    }
  }
}
