
import React, { useState, useRef } from 'react';

import styledfrom 'styled-components';


export const Files = styled.input`
  clip: rect(0, 0, 0, 0);
  height: 1px;
  white-space: nowrap;
  width: 1px;
`;
const UploadFiles: NextPage<any> = () => {

const fileRef = useRef(null);

  const [files, setFiles] = useState<any>([]);

 
  
  const handleFile = async e => {
    const newFiles: any[] = [];
    let base64;
    for (let i = 0; i < 5; i++) {
      const fileSize = e.target.files[i]?.size;
      if (fileSize < 512000 && fileSize >= 1024) {
        base64 = await convertBase64(e.target.files[i]);

        newFiles.push(base64);

     
      setFiles(newFiles);
    }
  };

  const convertBase64 = file => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = error => {
        reject(error);
      };
      return fileReader.result;
    });
  };
  
   return (
  <div>
  <span>Upload Image(s)</span>
                  <Files
                    type="file"
                    multiple
                    id="fileSelect"
                    ref={fileRef}
                    onChange={handleFile}
                    accept={'.png,.jpeg,.jpg,.svg'}
                  
                  {files.length > 0 ? 'Images Uploaded' : 'Browse Images'}
       />
                <br></br>
                </div>
                  );
};
