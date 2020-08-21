<template>
  <PersonDetail
    :nickname="nickname"
    :latitude="latitude"
    :longitude="longitude"
    :datetime="getDateTime"
    :face-image-url="face_image_url"
  />
</template>

<script>
export default {
  async fetch() {
    const { data } = await this.$axios.get(
      // /api/friends/friendId の部分が友達情報を取得するAPI
      '/api/friends/' + this.$route.params.friendId
      // this.$route開いているページのUrlのparamsからfriendIdを指定
      // この friendId は pages/friends/_friendId/index.vue のフォルダ名の _friendId にあたります。アンダーバーから始まるフォルダ名（ファイル名）は任意の文字列を表していて、その文字列が $route.params のキー名で入ってきます。
    )
    this.nickname = data.nickname
    this.latitude = data.pin ? data.pin.latitude : 0
    this.longitude = data.pin ? data.pin.longitude : 0
    this.datetime = data.pin ? data.pin.datetime : ''
    this.face_image_url = data.face_image_url
  },
  data() {
    return {
      // nickname: 'friend name',
      // latitude: 30,
      // longitude: 120,
      // datetime: new Date(),
      nickname: '',
      latitude: '',
      longitude: '',
      datetime: '',
      face_image_url: '',
    }
  },
  computed: {
    getDateTime() {
      return this.$dayjs(this.datetime).format('YYYY/MM/DD HH:mm')
    },
  },
}
</script>
