<template>
  <div class="modal-overlay" @click="close">
    <div class="modal-content" @click.stop>
      <header>
        <slot name="header"></slot>
      </header>
      <main>
        <slot name="body"></slot>
      </main>
      <footer>
        <button class="hidden-button" @click="close">Close</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
  max-width: 100%;
}
header, footer {
  padding: 10px;
}
.hidden-button {
  display: none;
}
</style>
