<template>
  <div class="wrap">
    <SignInForm :is-sending="isSending" @submit="signIn" />
    <BaseButton to="/" class="mts" is-txt>戻る</BaseButton>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import SignInForm from '~/components/SignInForm'

export default {
  layout: 'account',
  components: {
    SignInForm,
  },
  data() {
    return {
      error: '',
      isSending: false,
    }
  },
  methods: {
    async signIn({ email, password }) {
      this.isSending = true
      const {
        data: { client_id, client_secret },
      } = await this.$axios.get('/api/oauth/client-credentials')
      // ↑この /oauth/client-credentials はAPI側の実装の都合で必要な値の取得、深く考えない

      /*
       * const res = await axios.メソッド() でレスポンスを受け取ることができます。
       *
       * res の中身は
       * {
       *   data: {
       *     APIが返すデータ
       *   },
       *   ...
       * }
       * というオブジェクトになっています。
       * 上記の例では、res から client_id と client_secret を抽出してその変数名にそのまま代入しています。
       **/

      try {
        //  以下がログインAPIで、アクセストークンがレスポンスに入ってくるので代入します
        const {
          data: { access_token },
        } = await this.$axios.post('/api/oauth/token', {
          grant_type: 'password',
          client_id,
          client_secret,
          scope: '*',
          // ↑上4つはAPI側の実装の都合で必要な値、深く考えない
          username: email,
          password,
        })
        // console.log(access_token)
        // このアクセストークンを要認証のAPIで使う
        window.localStorage.setItem('hanly_access_token', access_token) // localStorage に保存
        this.$axios.setToken(access_token, 'Bearer') // ログイン後にすぐにAPIが使えるように axios にトークンをセットする
        this.$router.push('/friends') // 友だち一覧に移動
      } catch (e) {
        this.isSending = false
        this.error = 'メールアドレスが存在しないか、パスワードが間違っています'
        setTimeout(() => {
          this.error = ''
        }, 3000)
      }
    },
  },
}
</script>
