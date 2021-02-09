import React from 'react'

function EditForm({EditMeme,open,data,setData}) {

    const handleChange=(e)=>{

        let value={...data};
        value[e.target.name]=e.target.value
        setData(value)
    }
    return (
        <div className="modal_container">
            <button className="close_btn"onClick={()=>open(false)}>X</button>
            <div className="form_wrapper">
            <form className="edit_form" onSubmit={EditMeme}>
          <div className="mb-3">
            <label htmlFor="caption" className="form-label">Caption</label>
            <input type="text" placeholder="Be creative with the caption"className="form-control" name="caption"id="caption"  
            value={data.caption} 
            onChange={handleChange}
            required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="meme_url" className="form-label">Meme URL</label>
            <input type="text" placeholder="Enter URL of your meme here"className="form-control" name="url" id="meme_url"  
            value={data.url} 
            onChange={handleChange}
            required
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
            </div>
        </div>
    )
}

export default EditForm
