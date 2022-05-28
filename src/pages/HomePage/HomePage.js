import React, {useState} from "react";
import "./HomePage.css";
import {BiFilter} from "react-icons/bi";
import Navbar from "../../components/Navbar/Navbar";
import {AiFillCamera} from "react-icons/ai";


const HomePage = () => {



  return (
    <>
      <Navbar />

      <div className="profile">
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                src="https://thuthuatnhanh.com/wp-content/uploads/2020/01/background-powerpoint-dep.jpg"
                alt=""
                className="profileCoverImg"
              />
              <img
                src="https://scontent.fsgn3-1.fna.fbcdn.net/v/t39.30808-6/280193689_1658632287844383_6743957002648686208_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=7CTOERpbq8MAX89tSXB&tn=dC_nwq0vXcyseg1W&_nc_ht=scontent.fsgn3-1.fna&oh=00_AT9BfUaUmOVnyYwEl_HceMPXjRZj1945kD-OQtF1we1g_w&oe=6293BE73"
                alt=""
                className="profileUserImg"
              />

              <div className="profileInfo">
                <h4 className="profileInfoName">Tungtung</h4>
                <h3>/tungtung</h3>
                <span className="profileInfoDesc">Hế nhô các bạn!</span>
              </div>
              <button className="editProfile">Edit Profile</button>
              <div className="iconcamera">
                <button>
                  <AiFillCamera size={"50px"} />
                </button>
              </div>
              <div className="iconcamera1">
                <button>
                  <AiFillCamera size={"50px"} />
                </button>
              </div>
              <div className="uploadFile1">
                <input type={"file"}/>
              </div>
              <div className="uploadFile2">
                <input type={"file"}/>
              </div>
            </div>
          </div>
          <div className="share">
            <div className="shareWrapper">
              <div className="shareTop">
                <span className="shareOptionText">Description</span>
                <br />
                <input
                  type="text"
                  className="shareInput"
                  placeholder="Add something about you!"
                />
              </div>
            </div>
          </div>
          <br />
          <hr style={{ width: "90%", marginLeft: "5%" }} />
          <div className="smallFilter">
            <div className="f1">All trip</div>
            <div className="f2"><BiFilter /> Filter area </div>
            <div className="f3"><BiFilter display={""}/> Filter type</div>
            <div className="f4"><BiFilter display={""}/>  Filter countries</div>
          </div>          
        </div>
      </div>
      
    </>
  );
};

export default HomePage;
