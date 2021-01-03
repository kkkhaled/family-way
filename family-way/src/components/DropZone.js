import React, { useState } from "react";
import { DropzoneDialog } from "material-ui-dropzone";

const DropZone = ({ open, setOpen, handleSave}) => {
  //  let openState = [status]
  //  let open = status;
  //  const [openState, setOpen] = useState(status);
  //  console.log(open)
  const [files, setFiles] = useState([]);
  const handleChange = (e, files) => {
    setFiles(files);
  };
  const handleCLose = () => {
    setOpen(false);
  };
  const handleDropZoneSave = (files) => {
    // call handle save
    setFiles(files);
    setOpen(false);
    handleSave(files);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div>
      <DropzoneDialog
        filesLimit={100}
        open={open}
        onSave={handleDropZoneSave}
        onClose={handleCLose}
        fullWidth={true}
        acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
        showAlerts={true}
        showPreviews={true}
        showFileNamesInPreview={true}
        showFileNames={true}
        initialFiles={[]}
        onChange={(e) => handleChange(e, files)}
      />
    </div>
  );
};

//  export media upload
export default DropZone;
