import React ,{useState,useEffect}from 'react'
import Spinner from './Spinner'
import EditForm from './EditForm'
// const Backend_URL='https://xmemeendpoint.herokuapp.com/'
const Backend_URL='http://localhost:8081/'
function Meme({Loading}) {

    // State variable to store the array memes fetched from database
    const [Memes,setMemes]=useState([])
    // State variable to store the number of memes to fetched from data base
    const [Limit,setLimit]=useState(100)
    // State variable to keep track of fetching the meme
    const [Fetching,setFetching]=useState(false)
    // Variable to open and close the modal
    const [open,setopen]=useState(false)
    // Variable to store the sing meme when edit button is clicked
    const [Data,setData]=useState({})
    // Variable to detect error
    const [Error,setError]=useState(false)
    // Variable to show messages
    const [Message,setMessage]=useState('')
     // State variable to keep track of updating the meme
    const [updating,setupdating]=useState(false)

    const [Last,IsLast]=useState(false)
    // UseEffect function to fetch the memes from the backend
    // It runs whenever the loading or limit variable changes state
    useEffect(()=>{
        var requestOptions = {
        method: 'GET',
        redirect: 'follow'
        };
        setFetching(true)
        fetch(`${Backend_URL}memes?limit=${Limit}`, requestOptions)
        .then(response => response.json())
        .then(result => 
            {
            console.log(result)
            setMemes(result.docs)
            setFetching(false)
            if(result.pages===1)
            IsLast(true)
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
    setupdating(true)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({"caption":Data.caption,"image":Data.url});

    var requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch(`${Backend_URL}memes/${Data._id}`, requestOptions)
    .then(response => response.json())
    .then(result => {
        // console.log(result)
        setopen(false)
        if(result.status===204)
        setMessage('!! Updated Successfully !!')
        else if(result.status===404)
        {
            setError(true)
            setMessage('!! Id Not Found !!')
        }
        setupdating(false)
    })
    .catch(error => console.log('error', error));
  }

//   Function to hide the messages after 2s.
  useEffect(()=>{
    setTimeout(()=>{
        setMessage('')
        setError(false)
    },2000)
  },[updating])

    return (
        <div style={{height:'300px'}}>
            <div className="text-center">
                <p style={Error?{color:'red'}:{color:'green'}}> {Message}</p>
            </div>
            {
                Memes.length===0?
                <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'300px',flexDirection:'column'}}>
                    <p>No Memes uploaded</p>
                    <p>(Be the first one to upload {':)'})</p>
                    <Spinner/>
                </div>
                :
                Memes.map((items,index)=>{
                    return(
                        <div className="card" key={index} >
                        <div className="card-body">
                            <div style={{display:'flex',justifyContent:'flex-start'}}>
                            <h5 className="card-title">{items.name}</h5>
                            <span style={{fontSize:'16px',color:'gray'}}>
                                {
                                new Date(items.last_modified).getHours()>12
                                ?(new Date(items.last_modified).getHours()-12+':'+(new Date(items.last_modified).getMinutes()>10?new Date(items.last_modified).getMinutes():'0'+new Date(items.last_modified).getMinutes())+' PM')
                                :new Date(items.last_modified).getHours()+':'+(new Date(items.last_modified).getMinutes()>10?new Date(items.last_modified).getMinutes():'0'+new Date(items.last_modified).getMinutes())+' AM'
                                }
                            </span>
                            </div>
                            <button className="edit_btn btn btn-warning" onClick={()=>openModal(items)}>Edit&nbsp;&nbsp;<i className="fa fa-pencil"></i></button>
                            <p className="card-text">{items.caption}</p>
                            <img src={items.url} className="card-img-top" alt=" Not available"/>
                        </div>
                        </div>
                    )
                })
            }
            <br/>
            {
                Memes.length>0&&!Last?
                <div style={{display:'flex',justifyContent:'center'}}>
                <button className="btn btn-primary" onClick={()=>setLimit(Limit+100)}>
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
