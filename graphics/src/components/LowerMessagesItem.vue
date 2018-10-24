<template>
  <div class="lower-messages-item">
    <div v-if="message.title" class="title">{{ message.title }}</div>
    <div class="content">{{ message.content }}</div>
  </div>
</template>

<script>
export default {
  name: 'LowerMessagesItem',
  props: {
    message: {
      type: Object,
      required: true
    }
  }
}
</script>
