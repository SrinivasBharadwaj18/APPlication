import { useState } from "react"
import { useAppDispatch } from "../hooks";
import { setSnack } from "../features/token/snackSlice";
import APIService from "../services/api.service";



export default function FileUploadpage(){
    const URL = `utils/upload` 
    const [file, setFile] = useState<File | null>(null);
    const dispatch = useAppDispatch();
    const apiService = new APIService()

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0])
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!file) {
      dispatch(setSnack({message:"no file selected", severity:"error"}))
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    apiService
      .post(URL, formData, config)
      .then(() => {
        dispatch(setSnack({message:"File uploaded successfully", severity: "success"}))
      })
      .catch(() => {
        dispatch(setSnack({message:"Error uploading file", severity:"error"}))
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