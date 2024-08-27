import { useSelector } from "react-redux"
import { useRef, useState,useEffect } from "react"
import { app } from "../firebase"
import {getDownloadURL, getStorage,ref, uploadBytesResumable} from 'firebase/storage'
const Profile = () => {
/*
//firebase storage
      allow read;
      allow write:if 
      request.resource.size < 2 * 1024 * 1024 &&
      request.resource.contentType.matches('image/.*')
*/

  const fileRef = useRef(null);
  const {currentUser} = useSelector((state)=>state.user);
  const [File,setFile] = useState(undefined);
  console.log(File);
  const[filePercent,setFilePercent] =useState(0);
  console.log(filePercent)
const[fileUploadError,setFileloadError] = useState(false);
console.log(fileUploadError)
const [formData,setFormData] = useState({});
console.log(formData)
  useEffect(()=>{
    if(File){
      handleFileUpload(File);
    }
  },[File])
  const handleFileUpload = (file)=>{
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage,fileName);
    const uploadTask = uploadBytesResumable(storageRef,file);
    uploadTask.on('state_changed',
      (snapshot)=>{
        const progress =(snapshot.bytesTransferred/snapshot.totalBytes)*100;
        setFilePercent(Math.round(progress));
      },
      (error)=>{
        setFileloadError(true);
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
          setFormData({...formData,avatar:downloadURL})
        })
      },
    )
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form action="" className="flex flex-col gap-4">
        <input type="file" ref={fileRef} onChange={(e)=>setFile(e.target.files[0])} hidden accept="image/*"/>
        <img src={formData.avatar || currentUser.avatar} alt="profile" onClick={()=>fileRef.current.click()} className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2" />
        <p className="text-sm self-center">
        {
          fileUploadError ? (
            <span className="text-red-700">Error: Image upload failed(image must be less than 2mb)</span>
          ) : filePercent > 0 && filePercent < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePercent}%`}</span>
          ) : filePercent === 100 ? (
            <span className="text-green-700">Image successfully uploaded!</span>
          ) : (
            ""
          )
        }

        </p>
        <input type="text" placeholder="username"  id="username" className="border p-3 rounded-lg"/>
        <input type="email" placeholder="email"  id="email" className="border p-3 rounded-lg"/>
        <input type="password" placeholder="password"  id="password" className="border p-3 rounded-lg"/>
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">update</button>
      </form>
      <div className="flex justify-between mt-5">
      <span className="text-red-700 cursor-pointer">Delete Account</span>
      <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  )
}

export default Profile