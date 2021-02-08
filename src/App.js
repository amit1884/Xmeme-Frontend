import React ,{useState,useEffect}from 'react'
import './App.css'
import Meme from './Components/Meme'
function App() {
  // Form field variables
  const [Name,setName]=useState('')
  const [Caption,setCaption]=useState('')
  const [Image,setImage]=useState('')
  const [Loading,setLoading]=useState(false)
  const [Error,IsError]=useState(false)
  const [Message,setMessage]=useState('')
  // Function to upload memes
  const UploadMeme=(e)=>{
    e.preventDefault();
    setLoading(true)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var data = JSON.stringify({"name":Name,"caption":Caption,"url":Image});

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: data,
        redirect: 'follow'
      };

      fetch(`http://localhost:8080/memes`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result)
          if(result.status)
          {
            console.log(result)
            IsError(true)
            setMessage('Duplicate values exists')
          }
          else if(result.id)
          {
            setMessage('Uploaded Meme Successfully !!')
            setName('')
            setCaption('')
            setImage('')
          }
          setLoading(false)
        })
        .catch(error => console.log('error', error));
  }
  useEffect(()=>{
    setTimeout(()=>{
      setMessage('')
    },2000)
  },[Error,Loading])
    return (
    <div className="conatiner">
      <div className="row">
        <div className="col-sm-12 col-md-3"></div>
        <div className="col-sm-12 col-md-6">
          <h3 style={{overflow:'hidden'}}>MEME STREAM</h3>
        <form style={{padding:'5px'}} className="meme_form" onSubmit={UploadMeme}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Meme Owner</label>
            <input type="text" placeholder="Enter your full name"className="form-control" id="name" required value={Name} onChange={(e)=>setName(e.target.value)}/>
          </div>
          <div className="mb-3">
            <label htmlFor="caption" className="form-label">Caption</label>
            <input type="text" placeholder="Be creative with the caption"className="form-control" id="caption"  required value={Caption} onChange={(e)=>setCaption(e.target.value)}/>
          </div>
          <div className="mb-3">
            <label htmlFor="meme_url" className="form-label">Meme URL</label>
            <input type="text" placeholder="Enter URL of your meme here"className="form-control" id="meme_url"  required value={Image} onChange={(e)=>setImage(e.target.value)}/>
          </div>
          <button type="submit" className="btn btn-primary">{Loading?'Loading...':'Submit meme'}</button>
          &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;<span style={Error?{color:'red'}:{color:'green'}}>{Message}</span>
        </form>
        </div>
      </div>
      <hr/>
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <Meme Loading={Loading}/>
        </div>
      </div>
    </div>
  );
}

export default App;
