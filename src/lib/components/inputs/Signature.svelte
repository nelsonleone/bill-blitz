<script>
  export let layer = {
    width: 0,
    height: 0,
    path: '',
  }
</script>

<svg class="fill-black" height={150} viewBox="0 0 {layer.width * 2} {layer.height * 2}">
    <path d={layer.path} />
</svg>
  