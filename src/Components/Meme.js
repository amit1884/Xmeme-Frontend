import React ,{useState,useEffect}from 'react'
function Meme({Loading,EditMeme}) {

    const [Memes,setMemes]=useState([])
    const [Limit,setLimit]=useState(2)
    useEffect(()=>{
        var requestOptions = {
        method: 'GET',
        redirect: 'follow'
        };

        fetch(`http://localhost:5000/memes?limit=${Limit}`, requestOptions)
        .then(response => response.json())
        .then(result => 
            {
            console.log(result)
            setMemes(result.docs)
            })
        .catch(error => console.log('error', error));
    },[Loading,Limit])
    return (
        <div style={{height:'300px'}}>
            {
                Memes.map((items,index)=>{
                    return(
                        <div className="card" key={index}>
                        <div className="card-body">
                            <div style={{display:'flex',justifyContent:'flex-start'}}>
                            <h5 className="card-title">{items.owner}</h5>
                            <span style={{fontSize:'16px',color:'gray'}}>
                                {new Date(items.last_modified).getHours()>12?(new Date(items.last_modified).getHours()-12+':'+new Date(items.last_modified).getMinutes()+' PM'):new Date(items.last_modified).getHours()+':'+new Date(items.last_modified).getMinutes()+' AM'}</span>
                            </div>
                            <button className="edit_btn btn btn-warning" onClick={()=>EditMeme(items._id)}>Edit</button>
                            <p className="card-text">{items.caption}</p>
                            <img src={items.image} className="card-img-top" alt="..."/>
                        </div>
                        </div>
                    )
                })
            }
            <br/>
            <div style={{display:'flex',justifyContent:'center'}}>
            <button className="btn btn-primary" onClick={()=>setLimit(Limit+2)}>Load More</button>
            </div>
        </div>
    )
}

export default Meme
