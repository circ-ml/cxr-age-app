import React, { useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateSize from "filepond-plugin-image-validate-size";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";

import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginFileValidateSize,
  FilePondPluginImagePreview,
  FilePondPluginFileEncode,
  FilePondPluginImageResize,
  FilePondPluginFileValidateType,
  FilePondPluginImageTransform
);

export default function Upload({ onUploadComplete }) {
  const [files, setFiles] = useState([]);
  return (
    <div className="relative rounded-md bg-gray-100">
      <FilePond
        acceptedFileTypes={["image/*"]}
        files={files}
        onupdatefiles={setFiles}
        allowMultiple={false}
        name="files"
        labelIdle='Drop a Chest X-Ray Here or <span class="filepond--label-action">Browse</span>'
        onaddfile={(error, file) => {
          if (!error) {
            const image = new Image();
            image.src = file.getFileEncodeDataURL();

            image.onload = () => {
              const canvas = document.createElement("canvas");
              const ctx = canvas.getContext("2d");

              canvas.width = image.width;
              canvas.height = image.height;

              ctx.drawImage(image, 0, 0, image.width, image.height);

              const imageDataURL = canvas.toDataURL();
              const imageBase64 = imageDataURL.split(",")[1];

              onUploadComplete(imageBase64);
            };
          }
        }}
        onremovefile={(error) => {
          if (!error) {
            onUploadComplete("");
          }
        }}
        imageResizeTargetWidth={500}
        imageResizeTargetHeight={500}
        imageResizeMode="contain"
        imageCropAspectRatio={1}
        imageTransformClientTransforms={["resize", "crop"]}
      />
      <style>{`
      .filepond--credits { display: none; }
      .filepond--root {
        height: 289px;
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .filepond--drop-label {
        top: 50%;
        transform: translateY(-50%) !important;
      }
      .filepond--drop-label label {
        font-size: 120%;
      }
      .filepond--label-action {
        color: rgba(59, 130, 246, 1);
        text-decoration-color: rgba(59, 130, 246, 0.5);
      }
      .filepond--panel-root {
        background-color: #fff;
        border: 2px dashed #adadad;
        border-radius: 7px;
      }
      `}</style>
    </div>
  );
}
