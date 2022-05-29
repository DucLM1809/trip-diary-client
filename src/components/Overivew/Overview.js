import React, { useCallback, useEffect, useRef, useState } from "react";
import { AiFillCamera } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";
// import { Editor, editorState } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useForm } from "react-hook-form";
import banner from "../../assests/images/hero.png";

const Overview = () => {
  const [display, setDisplay] = useState(false);
  const [type, setType] = useState();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBMlWHzz9j3Q3MIcsGeO5d_MaS1kspQ3dk",
    libraries: ["places"],
  });

  const [map, setMap] = useState(/** @type google.maps.Map */ (null));

  const center = { lat: 48.8584, lng: 2.2945 };

  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const handleChooseType = () => {
    setDisplay(!display);
  };

  const handleType = (e) => {
    setDisplay(false)
    setType(e.target.textContent);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.type = type;
    console.log(data);
  };

  return (
    <div className="flex flex-col justify-center mx-28 mt-10">
      <div
        className="w-full h-96 relative 
          after:absolute after:content-[''] 
          after:top-0 after:right-0 after:left-0 after:bottom-0 
        after:bg-black after:opacity-25 after:rounded-10"
      >
        <img
          src={banner}
          alt="banner"
          className="w-full h-full object-cover rounded-10 relative"
        />
        <form className="absolute bottom-9 right-11 z-20 opacity-0 cursor-pointer">
          <input
            type="file"
            className="overflow-hidden h-10 w-10 file:cursor-pointer border-0 outline-none cursor-pointer"
          ></input>
        </form>
        <AiFillCamera className="text-5xl text-gray absolute bottom-8 right-10 z-10 cursor-pointer" />
      </div>
      <div className="shadow-lg border-1 border-gray h-fit my-10 py-10 flex justify-center rounded-10">
        <form
          className="flex flex-col justify-around items-center w-8/12"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full flex justify-between mb-10">
            <div className="flex flex-col">
              <label htmlFor="name" className="mb-2">
                Trip name
              </label>
              <input
                id="name"
                type="text"
                {...register("tripname")}
                placeholder="Enter trip name"
                className="border-2 border-gray pl-3 py-3 w-[560px] pr-10 rounded-5"
              ></input>
            </div>
            <div className="flex flex-col">
              <label htmlFor="type" className="mb-2">
                Type
              </label>
              <div className="cursor-pointer w-[148px]">
                <div
                  className="border-2 border-gray w-full px-2 py-3 rounded-5 mb-[1px] flex justify-between items-center"
                  onClick={handleChooseType}
                >
                  <span className="mr-2">{type ? type : "Choose Type"}</span>
                  <FiChevronDown />
                </div>

                <div
                  className={`border-2 border-gray rounded-5 mb-1 ${
                    display ? "block" : "hidden"
                  }`}
                >
                  <div
                    className="w-full border-b-1 border-gray px-2 py-1 hover:bg-gray rounded-tr-3 rounded-tl-3"
                    onClick={(e) => handleType(e)}
                  >
                    Single Trip
                  </div>
                  <div
                    className="w-full px-2 py-1 h-full hover:bg-gray rounded-br-3 rounded-bl-3"
                    onClick={(e) => handleType(e)}
                  >
                    Around Trip
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-between mb-10">
            <div className="flex flex-col">
              <label htmlFor="depature" className="mb-2">
                Depature
              </label>
              <input
                id="departure"
                type="text"
                {...register("departure")}
                placeholder="Departure"
                className="border-2 border-gray px-2 py-3 w-[360px] rounded-5"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="destination" className="mb-2">
                Destination
              </label>
              <input
                id="to"
                type="text"
                {...register("destination")}
                placeholder="Destination"
                className="border-2 border-gray px-2 py-3 w-[360px] rounded-5"
              />
            </div>
          </div>

          <div className="w-full flex justify-between">
            <div className="flex flex-col">
              <label htmlFor="from" className="mb-2">
                From
              </label>
              <input
                id="from"
                type="date"
                {...register("from")}
                className="border-2 border-gray px-2 py-3 w-[360px] rounded-5"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="to" className="mb-2">
                To
              </label>
              <input
                id="to"
                type="date"
                {...register("to")}
                className="border-2 border-gray px-2 py-3 w-[360px] rounded-5"
              />
            </div>
          </div>
          <div className="w-full flex flex-col my-10">
            <label className="mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              className="border-2 border-gray p-3 rounded-5"
              rows="10"
              id="description"
              {...register("description")}
            ></textarea>
          </div>
          <button className="bg-light-blue text-white rounded-5 py-2 px-10 hover:bg-medium-blue shadow-lg">
            SAVE
          </button>
        </form>
        {/* <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={this.onEditorStateChange}
        /> */}
      </div>
      <div className="w-full h-[400px] mt-10 mb-28">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            Child components, such as markers, info windows, etc.
            <></>
          </GoogleMap>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Overview;
