import React ,{useState,useEffect}from 'react'
import Spinner from './Spinner'
import EditForm from './EditForm'
function Meme({Loading}) {

    // State variable to store the array memes fetched from database
    const [Memes,setMemes]=useState([])
    // State variable to store the number of memes to fetched from data base
    const [Limit,setLimit]=useState(2)
    const [Fetching,setFetching]=useState(false)
    const [open,setopen]=useState(false)
    const [Data,setData]=useState({})
    const [Error,setError]=useState(false)
    const [Message,setMessage]=useState('')
    // UseEffect function to fetch the memes from the backend
    // It runs whenever the loading or limit variable changes state
    useEffect(()=>{
        var requestOptions = {
        method: 'GET',
        redirect: 'follow'
        };
        setFetching(true)
        fetch(`http://localhost:8080/memes?limit=${Limit}`, requestOptions)
        .then(response => response.json())
        .then(result => 
            {
            console.log(result)
            setMemes(result.docs)
            setFetching(false)
            })
        .catch(error => console.log('error', error));
    },[Loading,Limit,open])

    // Function to open modal 
    const openModal=(item)=>{

        setopen(true)
        setData(item)
    }

    // Function to edit memes
  const EditMeme=(e)=>{
      e.preventDefault()

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({"caption":Data.caption,"image":Data.image});

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch(`http://localhost:8080/memes/${Data._id}`, requestOptions)
    .then(response => response.json())
    .then(result => {
        setopen(false)
        console.log(result)
    })
    .catch(error => console.log('error', error));
  }

    return (
        <div style={{height:'300px'}}>
            {
                Memes.length===0?
                <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'300px',flexDirection:'column'}}>
                    <p>No Memes uploaded</p>
                    <p>(Be the first to upload {':)'})</p>
                    <Spinner/>
                </div>
                :
                Memes.map((items,index)=>{
                    return(
                        <div className="card" key={index}>
                        <div className="card-body">
                            <div style={{display:'flex',justifyContent:'flex-start'}}>
                            <h5 className="card-title">{items.owner}</h5>
                            <span style={{fontSize:'16px',color:'gray'}}>
                                {new Date(items.last_modified).getHours()>12?(new Date(items.last_modified).getHours()-12+':'+new Date(items.last_modified).getMinutes()+' PM'):new Date(items.last_modified).getHours()+':'+new Date(items.last_modified).getMinutes()+' AM'}</span>
                            </div>
                            <button className="edit_btn btn btn-warning" onClick={()=>openModal(items)}>Edit</button>
                            <p className="card-text">{items.caption}</p>
                            <img src={items.image} className="card-img-top" alt="..."/>
                        </div>
                        </div>
                    )
                })
            }
            <br/>
            {
                Memes.length>0?
                <div style={{display:'flex',justifyContent:'center'}}>
                <button className="btn btn-primary" onClick={()=>setLimit(Limit+2)}>
                    {Fetching?'Loading..':'Load More'}
                </button>
                </div>
            :null
            }
            {
                open?
                <EditForm 
                open={setopen} 
                EditMeme={EditMeme}
                data={Data}
                setData={setData}
                />
                :null
            }
        </div>
        )    
}

export default Meme
