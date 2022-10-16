import './App.css';
import React,{useState} from 'react';
import axios from 'axios';



function App() {

const [userInfo,setuserInfo] = useState({
  file:[],
  filepreview:null,
  
})

const [list,setList] = useState([

])

  const handleInputChange = (e) => {
    setuserInfo({
      ...userInfo,
      file: e.target.files[0],
      filepreview:URL.createObjectURL(e.target.files[0]),

    })
  }
  const [isSucces, setSuccess] = useState(null);

  const submit = async () => {
    const formData = new FormData();
    formData.append('avatar',userInfo.file)

    const newData = {
      file: userInfo.file,
      filepreview: userInfo.filepreview,
    }

    setList([...list,newData])


    axios.post("http://localhost:8080/imageupload",formData, {
        headers: {"Content-Type" : "multipart.form-data"}
    }).then(res => {
      console.warn(res)
      if(res.data.success===1) {
        setSuccess("Image upload successfully")
      }
    })  
  }

  
  return (
    <div className="container">
      <h3>Image Upload</h3>
      <div>
      {isSucces !== null ? <h4> {isSucces} </h4> :null }
            <div>
                <label>Select Image </label>
                <input type="file" name="upload_file" onChange={handleInputChange}/>

            </div>

        <button onClick={submit} type='submit'>Submit</button>
      </div>
      {userInfo.filepreview !== null ? 
        <img  style={{width:'100px'}}  src={userInfo.filepreview} alt="UploadImage" />
      : null}

      {}

      <div>
        {list.map((element)=>{console.log(element)
          return (
            <img  style={{width:'100px'}}  src={element.filepreview} alt="UploadImage" />

          )
        })}
      </div>
    </div>
  );
}

export default App;
