<script lang="ts">
  import { setOptions } from "filepond";
  import FilePond, { registerPlugin } from "svelte-filepond";
  import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
  import FilePondPluginImagePreview from "filepond-plugin-image-preview";
  import FilePondPluginMediaPreview from "filepond-plugin-media-preview";
  import {
    getServerConfig,
    uploadManifestKey,
    uploadManifestTargetPath,
  } from "$lib/model/service/upload";

  import "filepond/dist/filepond.css";
  import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
  import "filepond-plugin-media-preview/dist/filepond-plugin-media-preview.min.css";

  export let key: string;
  export let targetPath: string;
  export let onUploaded: Parameters<typeof getServerConfig>["0"];

  let pond: FilePond;

  // NOTE: ref: $lib/model/service/upload.ts
  $: {
    if (key != null || targetPath != null) {
      $uploadManifestKey = key;
      $uploadManifestTargetPath = targetPath;
    }
  }

  registerPlugin(
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview,
    FilePondPluginMediaPreview,
  );

  setOptions({
    labelIdle:
      'ファイルを ドラッグアンドドロップ または, <span class="filepond--label-action"> ファイルを開く </span>',
    labelFileProcessing: "アップロード中...",
    labelFileProcessingComplete: "アップロード完了",
    labelFileProcessingAborted: "アップロードが中断されました",
    labelFileProcessingError: "アップロードエラー",
    labelTapToCancel: "クリックしてキャンセル",
  });
</script>

<FilePond
  bind:this={pond}
  name="filepond"
  allowMultiple={true}
  allowBrowse={true}
  server={getServerConfig(onUploaded)}
  allowRevert={false}
/>
