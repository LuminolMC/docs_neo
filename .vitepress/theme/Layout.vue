<script setup>
import DefaultTheme from 'vitepress/theme'
const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #layout-top>
      <div class="luminol-ambient" aria-hidden="true">
        <div class="luminol-blob luminol-blob-1"></div>
        <div class="luminol-blob luminol-blob-2"></div>
        <div class="luminol-blob luminol-blob-3"></div>
      </div>
    </template>
  </Layout>
</template>

<style scoped>
.luminol-ambient {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.luminol-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
}

.luminol-blob-1 {
  width: 700px;
  height: 700px;
  background: radial-gradient(circle, rgba(56, 189, 248, 0.18), transparent 70%);
  top: -250px;
  right: -150px;
  animation: blob-drift 12s ease-in-out infinite;
}

.luminol-blob-2 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(129, 140, 248, 0.15), transparent 70%);
  bottom: -200px;
  left: -150px;
  animation: blob-drift 15s ease-in-out infinite reverse;
}

.luminol-blob-3 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(167, 139, 250, 0.12), transparent 70%);
  top: 40%;
  left: 40%;
  animation: blob-drift 18s ease-in-out infinite 3s;
}

@keyframes blob-drift {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25%       { transform: translate(40px, -40px) scale(1.06); }
  50%       { transform: translate(-20px, 30px) scale(0.96); }
  75%       { transform: translate(30px, 20px) scale(1.03); }
}
</style>
