import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/FooterPub/Footer";
import pnf from "../../assests/images/pnf.png";
import "./AfterSearchPage.css";
import Modal from "../../components/Modal/Modal";
const AfterSearchPage = () =>{
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
      setShowModal(prev => !prev);
    };
    return(
        <>

        <Navbar/>
        <button onClick={openModal}>tung</button>
        <Modal showModal={showModal} setShowModal={setShowModal} />
        <div className="travelers">
            <div  className="travelerText" >
            <h1>Travelers</h1>
            </div>
            <div className="travelerSearchImg">
                <img src={pnf}/>
            </div>
        </div>
        
        <div className="trips"> 
        <div  className="travelerText" >
            <h1>Trips</h1>
            </div>
            <div className="travelerSearchImg">
                <img src={pnf}/>
            </div>
        </div>

        <Footer/>
       </>
    );
}

export default AfterSearchPage;