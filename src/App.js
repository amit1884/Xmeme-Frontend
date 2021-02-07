import React ,{useState}from 'react'
import './App.css'
import Meme from './Components/Meme'
function App() {
  const [Name,setName]=useState('')
  const [Caption,setCaption]=useState('')
  const [Image,setImage]=useState('')
  const [Loading,setLoading]=useState(false)
  const UploadMeme=(e)=>{
    e.preventDefault();
    setLoading(true)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({"owner":Name,"caption":Caption,"image":Image});

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch(`http://localhost:5000/memes`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result)
          setLoading(false)
        })
        .catch(error => console.log('error', error));
  }
  const EditMeme=(id)=>{
    console.log('clicked',id)
  }
  return (
    <div className="conatiner">
      <div className="row">
        <div className="col-sm-12 col-md-3"></div>
        <div className="col-sm-12 col-md-6">
          <h3 style={{overflow:'hidden'}}>MEME STREAM</h3>
        <form style={{padding:'5px'}} className="meme_form" onSubmit={UploadMeme}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Meme Owner</label>
            <input type="text" placeholder="Enter your full name"className="form-control" id="name" value={Name} onChange={(e)=>setName(e.target.value)}/>
          </div>
          <div className="mb-3">
            <label htmlFor="caption" className="form-label">Caption</label>
            <input type="text" placeholder="Be creative with the caption"className="form-control" id="caption"  value={Caption} onChange={(e)=>setCaption(e.target.value)}/>
          </div>
          <div className="mb-3">
            <label htmlFor="meme_url" className="form-label">Meme URL</label>
            <input type="text" placeholder="Enter URL of your meme here"className="form-control" id="meme_url"  value={Image} onChange={(e)=>setImage(e.target.value)}/>
          </div>
          <button type="submit" className="btn btn-primary">Submit Meme</button>
        </form>
        </div>
      </div>
      <hr/>
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <Meme Loading={Loading} EditMeme={EditMeme}/>
        </div>
      </div>
    </div>
  );
}

export default App;
