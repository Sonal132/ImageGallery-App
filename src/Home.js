import React from 'react'
import { useState,useEffect } from 'react'
import {Card,Container,} from 'react-bootstrap';
import Form from "react-bootstrap/Form";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css"
import { BiSearch } from "@react-icons/all-files/bi/BiSearch";
import './Home.css';


const Home = () => {

  const [images,setImages]=useState([]);
  const [inputVal,setInputVal]=useState("");
  const [searchImg,setSearchImg]=useState("nature");

  useEffect(()=>{

   fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=e96335785a6dc9b9656e492402228716&tags=${searchImg}&per_page=10&format=json&nojsoncallback=1`)
   .then((response)=>response.json())
   .then((data)=>{
  const photos=data.photos.photo;

  const fetchImg=photos.map((photo)=>({
    original: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`,
    thumbnail:  `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_t.jpg`,
  }));

  setImages(fetchImg);

   })

   .catch((error)=>{

    console.log(error)

   }) 
  

  },[searchImg]);

  const handleInputChange=(event)=>{
      setInputVal(event.target.value);
  };

  const handleSubmitf=(e)=>{
  e.preventDefault()
      setSearchImg(inputVal);
    
    console.log(inputVal)

    

  };

  const handleKeyPress=(event)=>{
    if(event.key==="Enter"){
      setSearchImg(inputVal);
    }
  }

  
  
  return (
    <div>
    
      <nav className="d-flex justify-content-between bg-danger text-white  overflow-hidden  header1"  >

    <h1 className="fs-3 mx-2 mt-3 imgh" style={{ fontFamily: "serif,Arial" }}>Images</h1>
  </nav> 
  
    <br></br>
   

<Container className='mt-5' >
  <Card>
    <Card.Body >
      <br></br><div className='d-flex justify-content-center'>
      <Form.Control style={{width:'78%'}} type='text' 
      placeholder='search images...'
      value={inputVal}
      onChange={handleInputChange}
       onKeyPress={handleKeyPress}
      /> 
      <button onClick={handleSubmitf} className=" btn btn-danger " >
              <BiSearch size={24} />
              </button>
      </div>
      
              {/* <button onClick={handleSubmitf} className=" btn btn-info mb-2" >
              <BiSearch size={22} />
              </button> */}
            
      <br></br>
      <div>
      <ImageGallery  items={images}/>
      </div>
      <h6 style={{textAlign:"center"}}>images of {searchImg}</h6>
    </Card.Body>
  </Card>
</Container>

</div>

  )
}

export default Home
