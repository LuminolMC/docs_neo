<script setup>
if (typeof window !== 'undefined') {
  const lang = navigator.language || navigator.languages?.[0] || 'en'
  if (lang.toLowerCase().startsWith('zh')) {
    window.location.replace('/cn/')
  } else {
    window.location.replace('/en/')
  }
}
</script>

# Lumonil文档站点 / LuminolMC docs

请选择语言 / Please select a language:

## [简体中文](./cn/)
## [English](./en/)
