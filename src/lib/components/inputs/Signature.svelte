<script>
    export let layer = {
      width: 0,
      height: 0,
      path: '',
    }
</script>

<div class="h-36">
    <svg class="fill-black" viewBox="0 0 {layer.width * 2} {layer.height * 2}">
        <path d={layer.path} />
    </svg>
</div>
  