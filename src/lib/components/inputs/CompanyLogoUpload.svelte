<script>
    import FilePond, { registerPlugin } from 'svelte-filepond';
    import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
    import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
    import 'filepond/dist/filepond.min.css';
    import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
    import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
    import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
    import './filepond-override.css';

    // Register the plugins
    registerPlugin(
        FilePondPluginImageExifOrientation,
        FilePondPluginImagePreview,
        FilePondPluginFileValidateSize,
        FilePondPluginFileValidateType
    )

    export let uploadedLogo;

    let name = 'uploadedLogo';

    const handleFileLoad = (fileItems) => {
        const uploadedFile = fileItems[0].file;
    
        const reader = new FileReader()
        reader.onloadend = () => {
          const base64String = reader.result;
          uploadedLogo = base64String;
        }
    
        reader.readAsDataURL(uploadedFile)
    }
</script>

<div class="relative md:w-80">
    <FilePond
        onupdatefiles={handleFileLoad}
        allowMultiple={false}
        onremovefile={() => uploadedLogo = null}
        allowFileTypeValidation
        labelFileTypeNotAllowed="Added file is invalid"
        acceptedFileTypes={['image/png', 'image/jpeg']}
        maxFiles={1}
        stylePanelAspectRatio="1:0.60"
        allowFileSizeValidation
        maxFileSize="200kb"
        imagePreviewMinHeight={280}
        required
        allowReplace
        {name}
        labelIdle='<span style={{display:"block", fontSize: ".9rem", color: "black"}}>Upload An Image</span> <span class="filepond--label-action" style={{display:"block"}}>Choose File</span>'
    />
</div>