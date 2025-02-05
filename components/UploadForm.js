// components/UploadForm.js
const UploadForm = () => {
    const handleUpload = async (event) => {
      event.preventDefault();
      const artist = event.target.artist.value;
      const title = event.target.title.value;
      const file = event.target.file.files[0];
  
      if (!artist || !title || !file) {
        alert("Please complete all fields.");
        return;
      }
  
      console.log("Uploading:", { artist, title, file });
      // Later: send these to your backend for processing.
    };
  
    return (
      <form onSubmit={handleUpload} style={{ marginTop: "20px" }}>
        <label>
          Artist:
          <input type="text" name="artist" />
        </label>
        <label>
          Title:
          <input type="text" name="title" />
        </label>
        <label>
          MP3 File:
          <input type="file" name="file" accept=".mp3" />
        </label>
        <button type="submit">Upload</button>
      </form>
    );
  };
  
  export default UploadForm;
  