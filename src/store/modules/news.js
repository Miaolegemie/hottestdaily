import * as types from '../mutations-types'

const state = {
  showTypes: false, // 是否展示分类导航栏
  allTypes: ['全部', '政治', '社会', '财经', '教育', '科技', '时尚', '体育'],
  nowType: '',
  nextColunms: null,
  latestPage: 1,
  news: {
    column0: [],
    column1: [],
    column2: []
  }
}

const getters = {
  getShowTypes: state => state.showTypes,
  getAllTypes: state => state.allTypes,
  getNowType: state => state.nowType,
  getLatestPage: state => state.latestPage,
  getNewsData: state => state.news
}

const actions = {
  // 切换分类导航栏是否展示
  toggleShowTypes ({ commit }) {
    commit(types.TOGGLESHOWTYPES)
  },
  addNews ({ commit }, pageData) {
    commit(types.ADDNEWS, { pageData })
  },
  changenextColunms ({ commit }, newnextColunms) {
    commit(types.CHANGENEXTCOLUNMS, { newnextColunms })
  },
  // 更新当前 news 的分类，同时重置页数
  changeNowType ({ commit }, newType) {
    commit(types.CHANGENOWTYPE, { newType })
    commit(types.RESETLATESTPAGE)
  },
  resetLatestPage ({ commit }) {
    commit(types.RESETLATESTPAGE)
  },
  // 清除 news 及 nextColunms 中的数据
  clearNews ({ commit }) {
    commit(types.CLEARNEWS)
    commit(types.CLEARNEXTCOLUNMS)
  }
}

const mutations = {
  [types.TOGGLESHOWTYPES] (state) {
    state.showTypes = !state.showTypes
  },
  /*
  根据 nextColunms 向三列数据分别加入10，10，10或11，10，9个数据
  */
  [types.ADDNEWS] (state, { pageData }) {
    const columns = state.nextColunms
    // 如果不是加载的第一次的数据，则分别加入11，10，9个数据
    if (columns) {
      const supply = pageData.splice(0, 3)
      state.news[`column${columns[0]}`].push(supply[0], supply[1])
      state.news[`column${columns[1]}`].push(supply[2])
    }
    state.latestPage++
    var i = 0
    for (const news of pageData) {
      const column = `column${i % 3}`
      state.news[column].push(news)
      i++
    }
  },
  [types.CHANGENEXTCOLUNMS] (state, { newnextColunms }) {
    state.nextColunms = newnextColunms
  },
  [types.CHANGENOWTYPE] (state, { newType }) {
    state.nowType = newType
  },
  [types.RESETLATESTPAGE] (state) {
    state.latestPage = 1
  },
  [types.CLEARNEWS] (state) {
    state.news = {
      column0: [],
      column1: [],
      column2: []
    }
  },
  [types.CLEARNEXTCOLUNMS] (state) {
    state.nextColunms = null
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
