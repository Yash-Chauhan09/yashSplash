import { Avatar } from '@material-ui/core'
import React from 'react'
import './Cards.css'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
function Cards({img,desc,user}) {
    const download = () =>{
      console.log(img)
      fetch(img, {
          method:"GET",
          headers: {}
      }).then(res =>{
          res.arrayBuffer().then(function(buffer){
              const url = window.URL.createObjectURL(new Blob([buffer]))
              const link = document.createElement("a");
              link.href=url;
              link.setAttribute("download", "image.jpg")
              document.body.appendChild(link);
              link.click();
          })
      }).catch(err =>{
          console.log(err)
      })
    }
    return (
        <div className='cards'>
           <img  src={img} alt="thumbnail" />
           <div className="cards__detail">
               <div className="cards__detailOwner">
                   <Avatar />
                  <h5>{user} : <span>{desc}</span></h5> 
               </div>
               <div className="card__detailIcons">
               <ArrowDownwardIcon onClick={download} className='cards__icon'/>
               </div>
           </div>
           {/* <div className="cards__desc">
               <p>Car with a beautiful mirror</p>
           </div> */}
        </div>
    )
}

export default Cards
