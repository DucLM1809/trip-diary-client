import React from "react";
import { useState, useEffect } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { FaCalendarAlt } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { AiFillPicture } from "react-icons/ai";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import { useForm } from "react-hook-form";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { useJsApiLoader } from "@react-google-maps/api";
import { v4 as uuidv4 } from "uuid";

function AddDetailBody() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDAlsOlLHsgwjxpE-Vy3kylucbFURIPH5g",
    libraries: ["places"],
  });

  const [selected, setSelected] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    resetField,
  } = useForm();

  const onSubmit = (data) => {
    let temp = [];
    locations.map((location) => {
      location.date = data[`date${location.num}`]
      location.image = data[`image${location.num}`]
      location.description = data[`description${location.num}`]
      console.log(data[`date${location.num}`]);
      temp.push(location);
    });
    data.locations = temp;
    console.log(data);
  };

  const [locations, setLocations] = useState([
    { key: uuidv4(), coordinate: {}, num: 1 },
  ]);

  const handleAddLoc = () => {
    let temp = [...locations];
    temp.push({ key: uuidv4(), coordinate: {}, date: '', image: '', description: '', num: locations.length + 1 });
    setLocations(temp);
    resetField("date");
    resetField("location");
    resetField("image");
    resetField("description");
  };

  // useEffect(() => {
  //   console.log(locations);
  // }, [locations]);

  const handleDel = (key) => {
    var temp = locations.filter((location) => !(location.key === key));
    setLocations(temp);
  };

  // useEffect(() => {
  //   console.log("Locations: ", locations);
  //   setCoordinate1({ ...selected1 });
  // }, [selected]);

  return (
    <div className="flex flex-col justify-start h-[100vh] w-1/2 m-auto mt-10">
      <div className="border-1 border-gray flex justify-between w-full h-full mb-10 rounded-10 shadow-lg overflow-y-auto">
        <div className="w-full">
          <div className="w-full flex justify-between my-4">
            <button
              className="flex items-center hover:text-medium-blue cursor-pointer"
              onClick={handleAddLoc}
            >
              <AiFillPlusCircle className="text-4xl inline-block  pl-4 " />
              <h1 className="text-xl ml-2 ">Add location</h1>
            </button>

            <div>
              <button
                className="block py-2 px-6 text-sm bg-light-blue text-white rounded-5 hover:bg-medium-blue shadow-lg mr-4"
                onClick={handleSubmit(onSubmit)}
              >
                SAVE
              </button>
            </div>
          </div>

          {locations.map((location) => {
            return (
              <form key={location.key} onSubmit={handleSubmit(onSubmit)}>
                <div className="flex justify-between w-100 py-[5px] ">
                  <span className="text-xl pl-4">Location {location.num}</span>
                  <div className="flex-grow border-t-[0.7px]  my-auto mx-4"></div>
                  <span className="flex justify-end pr-4 align-middle w-[12rem] items-center">
                    <FaCalendarAlt className=" my-auto" />
                    <p className="ml-2 pr-2">Date</p>
                    <input
                      type="date"
                      {...register(`date${location.num}`)}
                      className="border-solid border-gray border-2 w-[7rem] rounded-3 font-normal text-sm outline-medium-blue"
                    />
                  </span>
                </div>

                <div className="flex flex-col items-center mb-5">
                  <div className="flex justify-between w-4/5 mt-3">
                    <p className="text-black mb-2">Location</p>
                    <HiLocationMarker className="my-auto" />
                  </div>
                  <div className="w-4/5 flex">
                    <PlacesAutocomplete
                      setSelected={setSelected}
                      selected={selected}
                      selectkey={location.key}
                      locations={locations}
                      setLocations={setLocations}
                    />
                    {/* <input
                      type="text"
                      placeholder="Location"
                      {...register(`location${location.num}`)}
                      className="border-solid border-gray border-2 w-full p-3 mb-2 rounded-3 font-normal text-sm outline-medium-blue"
                    /> */}
                  </div>

                  <div className="flex justify-between w-4/5 mt-3">
                    <p className="text-black mb-2">Images</p>
                    <AiFillPicture className="my-auto" />
                  </div>
                  <div className="w-4/5 flex">
                    <input
                      type="file"
                      {...register(`image${location.num}`)}
                      placeholder="Location"
                      className="border-solid border-gray border-2 w-full p-3 mb-2 rounded-3 font-normal text-sm outline-medium-blue"
                    />
                  </div>

                  <div className="flex justify-between w-4/5 mt-3">
                    <p className="text-black mb-2">Description</p>
                    <BsFillBookmarkHeartFill className="my-auto" />
                  </div>
                  <div className="w-4/5 flex overflow-y-auto">
                    <textarea
                      rows="5"
                      cols="50"
                      name="description"
                      {...register(`description${location.num}`)}
                      placeholder="Description"
                      className="border-solid border-gray border-2 w-full p-3 mb-2 rounded-3 font-normal text-sm outline-medium-blue"
                    />
                  </div>
                </div>
                <div
                  key={location.key}
                  className="flex justify-betwwen w-2/5 mt-3 mb-3 pb-3 mx-auto"
                >
                  <div className="flex-grow border-t-[0.7px]  my-auto mx-4"></div>
                  <button
                    onClick={() => handleDel(location.key)}
                    className="hover:text-medium-blue cursor-pointer"
                  >
                    <AiFillCloseCircle className="flex justify-center py-auto text-4xl" />
                  </button>
                  <div className="flex-grow border-t-[0.7px]  my-auto mx-4"></div>
                </div>
              </form>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const PlacesAutocomplete = ({
  setSelected,
  selected,
  selectkey,
  locations,
  setLocations,
}) => {
  let temp = [...locations];
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = getLatLng(results[0]);
    setSelected({ lat, lng });

    temp.map((item) => {
      if (item.key === selectkey) {
        item.coordinate = { ...selected };
      }
    });
  };

  useEffect(() => {
    setLocations(temp);
  }, [selected]);

  return (
    <Combobox onSelect={handleSelect} className="w-full">
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="border-solid border-gray border-2 w-full p-3 mb-2 rounded-3 font-normal text-sm outline-medium-blue"
        placeholder="Enter location"
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};

export default AddDetailBody;
