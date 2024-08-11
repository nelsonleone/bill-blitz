<script lang="ts">
  export let layer = {
    width: 0,
    height: 0,
    path: '',
  };

  export let fill: string | undefined = "#212020";
</script>

<div class="relative pb-2 overflow-hidden max-w-40">
  <svg viewBox="0 0 {layer.width * 2} {layer.height * 2}">
    <path d={layer.path} fill={fill} />
  </svg>
</div>
