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
  
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const response = await fetch("/api/upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              file: reader.result,
              artist,
              title,
            }),
          });
  
          const result = await response.json();
          if (result.success) {
            alert("Upload successful!");
          } else {
            alert("Upload failed.");
          }
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      };
      reader.readAsDataURL(file); // Convert file to Base64
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
  