import axios from "axios"
import { useState } from "react"



export default function FileUploadpage(){
    const BASE_URL = import.meta.env.VITE_BASE_URL
    const URL = `${BASE_URL}auth/upload` 
    const [file, setFile] = useState<File | null>(null);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0])
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!file) {
      console.error("No file selected!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    axios
      .post(URL, formData, config)
      .then((response) => {
        console.log("File uploaded successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  }

  return (
    <>
      <div>
        <h1>UploadActionFile</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
          <label>Choose a file:</label>
          <input type="file" id="file" name="file" onChange={handleChange} required />
          <br />
          <button type="submit">Upload</button>
        </form>
      </div>
    </>
  );
}