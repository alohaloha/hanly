<template>
  <div class="wrap">
    <PersonDetail
      :nickname="nickname"
      :latitude="latitude"
      :longitude="longitude"
      :datetime="getDateTime"
      :face_image_url="face_image_url"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      nickname: 'my name',
      latitude: 33.7,
      longitude: 130.5,
      datetime: new Date(),
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
