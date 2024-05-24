<script lang="ts">
    import { onDestroy } from 'svelte';
    import { AlertSeverity } from '../../../enums';
    import { alertStore } from '../../../store';
    import Icon from '@iconify/svelte';

    let severity: AlertSeverity | undefined;
    let mssg: string;

    $: showAlert = severity && mssg ? true : false;

    // Subscribe to the store
    const unsubscribe = alertStore.subscribe((value) => {
        severity = value.severity;
        mssg = value.mssg;
    })

    onDestroy(() => {
        unsubscribe()
    })

    $: {
        if(showAlert){
            setTimeout(() => {
                alertStore.set({
                    severity: undefined,
                    mssg: ""
                })
                showAlert = false;
            }, 3000)
        }
    }
</script>

<div class={`fixed top-24 z-50 left-2 lg:left-8 max-w-64 min-w-32 w-auto rounded p-3 shadow-md drop-shadow-md text-sm h-14 flex justify-center items-center text-center text-base-color1 transform transition duration-300 ease-linear ${severity === AlertSeverity.ERROR ? "bg-red-600" : severity === AlertSeverity.SUCCESS ? "bg-slate-600" : ""} ${showAlert ? "-translate-x-0 opacity-100" : "-translate-x-96 opacity-0"}`}>
    <p role="alert" class="flex justify-center font-rubik text-center items-center gap-2">
        <Icon aria-hidden="true" class="text-2xl" icon={severity === AlertSeverity.ERROR ? "material-symbols:chat-error-outline" : severity === AlertSeverity.SUCCESS ? "icon-park-outline:success" : ""} />
        <span>{mssg}</span>
    </p>
</div>
