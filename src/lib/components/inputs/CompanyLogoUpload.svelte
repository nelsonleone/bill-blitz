<script>
    import FilePond, { registerPlugin } from 'svelte-filepond';
    import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
    import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
    import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
    import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
    import 'filepond/dist/filepond.min.css';
    import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
    import './filepond-override.css';
    import { createEventDispatcher } from 'svelte';
  
    // Register the plugins
    registerPlugin(
      FilePondPluginImageExifOrientation,
      FilePondPluginImagePreview,
      FilePondPluginFileValidateSize,
      FilePondPluginFileValidateType
    )
  
    export let uploadedLogo;
    const dispatch = createEventDispatcher()
  
    // Convert base64 string to File object
    const fileFromString = (base64String) => {
      if (!base64String) return null;
  
      const byteCharacters = atob(base64String.split(',')[1])
      const byteNumbers = new Uint8Array(byteCharacters.length)
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i)
      }
      return new File([byteNumbers], 'uploadedLogo.png', { type: 'image/png' })
    }
  
    $: files = uploadedLogo ? [fileFromString(uploadedLogo)] : [];
  
    const handleFileLoad = (fileItems) => {
      if (fileItems.length > 0) {
        const uploadedFile = fileItems[0].file;
        const reader = new FileReader()
        reader.onloadend = () => {
          const base64String = reader.result;
          dispatch('setUploadedLogo', base64String)
        }
        reader.readAsDataURL(uploadedFile)
      } else {
        // Handle case when no files are uploaded
        dispatch('setUploadedLogo', null)
      }
    }
  
    const handleRemoveFile = () => {
      uploadedLogo = null;
      files = []
      dispatch('setUploadedLogo', null)
    }
  </script>

<div class="relative md:w-80">
    <FilePond
        files={files}
        onupdatefiles={handleFileLoad}
        allowMultiple={false}
        onremovefile={handleRemoveFile}
        allowFileTypeValidation
        labelFileTypeNotAllowed="Added file is invalid"
        acceptedFileTypes={['image/png', 'image/jpeg']}
        maxFiles={1}
        stylePanelAspectRatio="1:0.60"
        allowFileSizeValidation
        maxFileSize="200kb"
        imagePreviewMinHeight={280}
        required={false}
        allowReplace
        name="uploadedLogo"
        labelIdle='<span style="display:block; font-size: .9rem; color: black">Upload An Image</span> <span class="filepond--label-action" style="display:block">Choose File</span>'
    />
</div>
  