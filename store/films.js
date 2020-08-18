export const state = () => ({
  films: [], // 初期値は空の配列
})

export const getters = {
  // vueにbindする
  films(state) {
    // モジュールの名前films
    return state.films // stateのfilmsにアクセスする
  },
}

export const mutations = {
  // actionsから呼ぶ
  setFilms(state, films) {
    // 第二引数のfilmsはactionsのcommitの第二引数
    state.films = films // stateのfilmsにcommitで渡したfilmsを代入
  },
}

export const actions = {
  async fetchFilms({ commit }) {
    // axios は AJAX 用の関数
    // 要は JavaScript で、URL からデータをとってきて変数にいれるためのもの
    const res = await this.$axious('https://ghibliapi.herokuapp.com/films')
    const films = res.data // 配列で映画データが入ってくる
    commit('setFilms', films) // mutationsに渡す
  },
}
