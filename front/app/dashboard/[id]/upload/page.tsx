"use client"
import  { useReducer, useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [assign,setAssign]=useState(false)
  const router=useRouter()
  const {id} =useParams()



  const { getRootProps, getInputProps } = useDropzone({
    accept: {
        "text/csv": [".csv"],
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
        "application/vnd.ms-excel": [".xls"],
      },
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
  });

  const uploadFile = async () => {
    if (!file) {
      setMessage("Please select a file.");
      return;
    }
      
  if (!id) {
    setMessage("User ID is missing.");
    return;
  }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("Id",String(id))


    console.log(formData)

    try {
      const response = await axios.post("http://localhost:3001/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(response.data.message);

      
    } catch (error) {
      setMessage("File upload failed.");
    }
  };

  const AssignTasks=async()=>{
      router.push(`http://localhost:3000/dashboard/${id}?returning=true`)
  }

  return (
    <div className="p-4 border-2 rounded-lg shadow-md flex justify-center items-center h-screen flex-col bg-gray-100" >
      <div className="p-4 border-2 rounded-lg shadow-md w-[400px] h-[300px] bg-white" >
      <div {...getRootProps()} className=" p-4 cursor-pointer border-2">
        <input {...getInputProps()} />
        {file ? <p>{file.name}</p> : <p>Drag & drop a file or click to select</p>}
      </div>
      <Button onClick={uploadFile} className=" ml-34 mt-4 px-6 py-2 bg-blue-500 text-white rounded ">
        Upload
      </Button>
      {message=="File processed successfully" ? <p className="mt-4 text-green-500 text-bold text-2xl text-center" >{message}</p> :
      <p className="mt-4 text-red-500  text-center" >{message}</p> }
      {message=="File processed successfully" ? <Button className="ml-30 mt-4 px-6 py-2 bg-blue-500 text-white rounded" onClick={AssignTasks}>Assign Tasks</Button>:
       <p className="mt-4 text-green-500 text-bold text-2xl text-center" >Upload File to Assign Tasks</p> }
      </div>
    </div>
  );
};

export default FileUpload;
