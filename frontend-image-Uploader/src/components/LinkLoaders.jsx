import copy from 'clipboard-copy';

const LinkLoaders = ({url}) => {

  const handleCopy = () => {
    copy(url);
  };
  
  return (
    <div className="wrapper-LinkLoaders">
      <svg width="46" height="46" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zm4.768 9.14a1 1 0 1 0-1.536-1.28l-4.3 5.159-2.225-2.226a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.475-.067l5-6z" clip-rule="evenodd"></path>
      </svg>
      <label>Uploaded Successfully!</label>
      <div className="content-img">
        <img src={url} alt="image success" />
      </div>
      <div className="content-url">
        <span>{url}</span>
        <button onClick={handleCopy}>Copy Link</button>
      </div>
    </div>
  )
}

export default LinkLoaders
