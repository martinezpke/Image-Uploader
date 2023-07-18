import React, { useRef, useState } from 'react';
import axios from 'axios';
import Loader from './Loader'
import LinkLoaders from './LinkLoaders'


const Uploader = () => {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loaderBar, setLoaderBar] = useState(true);
  const [loaderLink, setLoaderLink] = useState(true);
  const [url, setUrl] = useState();

  const handleUploader = async (file) => {
    setLoaderBar(false);
    try {
      const formData = new FormData();
      formData.append('img', file);

      const response = await axios.post(
        'https://apiimage-uploader.onrender.com/mi-app/api/image-uploader/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }
      );
      setUrl(response.data.url);
      setLoaderLink(false)
      console.log(response.data);
      // Procesa la respuesta de la solicitud POST
    } catch (e) {
      console.error('Error al enviar la imagen:', e);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleUploader(file);
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleInputFile = (e) => {
    const file = e.target.files[0];
    handleUploader(file);
  };

  const handleUploadBoxClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      {loaderLink ? loaderBar ? <div className="wrapper">
        <div className="content column">
          <label>Upload your image</label>
          <span className="file-img">File should be Jpeg, Png,...</span>
          <div
            className={`content__img column ${isDragging ? 'draggable' : ''}`}
            /* onClick={handleUploadBoxClick} */
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <img src="../../public/image-uploader-master/image.svg" alt="Uploader" />
            <span>Drag & Drop your image here</span>
            <input ref={fileInputRef} type="file" name="img" onChange={handleInputFile} hidden />
          </div>
          <span>Or</span>
          <button onClick={handleUploadBoxClick}>Choose a file</button>
        </div>
      </div> : <Loader /> : <LinkLoaders url={url} />}

    </div>

  );
};

export default Uploader;
