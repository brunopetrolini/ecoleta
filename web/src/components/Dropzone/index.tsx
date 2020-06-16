// 00:32:00

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';

import './styles.css';

const Dropzone = () => {
  const [selectedFileUrl, setSelectedFileUrl] = useState('');

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];

    const fileURL = URL.createObjectURL(file);

    setSelectedFileUrl(fileURL);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*'
  });

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} accept="image/*" />
      {
        selectedFileUrl
          ? <img src={selectedFileUrl} alt="Point Thumbnail" />
          : (
            <p>
              <FiUpload />
              Imagem do estabelecimento
            </p>
          )
      }
    </div>
  );
};

export default Dropzone;