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
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { createLocation } from "../../redux/actions";
import api from "../../api/axios";
import { uploadFileToBlob } from "../../utils/uploadFileToBlob";

function AddDetailBody() {
  const [selected, setSelected] = useState(null);
  const [selectKey, setSelectKey] = useState("");
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const [edit, setEdit] = useState(false);
  const [urlImg, setUrlImg] = useState();
  const [listImg, setListImg] = useState([]);
  const dispatch = useDispatch();

  const accessToken = localStorage
    .getItem("accessToken")
    .toString()
    .split('"')[1];

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (accessToken) {
    config.headers.Authorization = `bearer ${accessToken}`;
  }

  const location = useLocation();
  useEffect(() => {
    if (location.pathname.split("/")[1] === "edit") {
      setEdit(true);
    } else {
      setEdit(false);
    }
  }, [location]);

  useEffect(() => {
    setErr("");
    setSuccess("");
  }, []);

  const tripInfo = useSelector((state) => state.trip);
  useEffect(() => {
    // console.log(tripInfo);
  }, [tripInfo]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm();

  const onSubmit = (data) => {
    let temp = [];
    locations.map((location) => {
      location.date = data[`date${location.num}`];
      location.image = data[`image${location.num}`];
      location.description = data[`description${location.num}`];
      temp.push(location);
    });
    data.locations = temp;
    data.locations.map((location) => {
      console.log("Loc: ", location);
      if (Date.parse(location.date) < Date.parse(tripInfo.startAt)) {
        setErr("You choose a day before start day");
        setSuccess("");
      } else if (Date.parse(location.date) > Date.parse(tripInfo.finishAt)) {
        setErr("You choose a day after finish day");
        setSuccess("");
      } else {
        const handleCreateLocation = async () => {
          let res = await api
            .post(
              `/trips/${tripInfo.tripID}/locations`,
              {
                startAt: location.date,
                review: location.description,
                lat: location.coordinate.lat,
                lng: location.coordinate.lng,
              },
              config
            )
            .catch((error) => {
              console.log(err);
              if (error.response.status === 405) {
                setErr("You must create a trip first");
              } else if (error.response.status === 422) {
                setErr("You must enter location & choose date");
              }
              setSuccess("");
            });
          if (res) {
            setSuccess("Add Detail Successfully!");
            setErr("");
            dispatch(createLocation(res));

            console.log("res: ", res);
          }
        };

        const handleEditLocation = async () => {
          let res = await api
            .put(
              `/trips/${tripInfo.tripID}/locations/${112}`,
              {
                startAt: location.date,
                review: location.description,
                lat: location.coordinate.lat,
                lng: location.coordinate.lng,
              },
              config
            )
            .catch((error) => {
              console.log(error);
              setSuccess("");
            });
          if (res) {
            setSuccess("Edit Detail Successfully!");
            setErr("");
            dispatch(createLocation(res));
            console.log("res: ", res);
          }
        };
        if (edit) {
          handleEditLocation();
        } else {
          handleCreateLocation();
        }
      }
    });
    console.log(data);
  };

  const [locations, setLocations] = useState([
    { key: uuidv4(), coordinate: {}, num: 1 },
  ]);

  const handleAddLoc = () => {
    let temp = [...locations];
    temp.push({
      key: uuidv4(),
      coordinate: {},
      date: "",
      image: "",
      description: "",
      num: locations.length + 1,
    });
    setLocations(temp);
    resetField("date");
    resetField("location");
    resetField("image");
    resetField("description");
  };

  const handleDel = (key) => {
    let temp = [...locations];
    temp = temp.filter((location) => !(location.key === key));
    setLocations(temp);
  };

  useEffect(() => {
    let temp = [...locations];
    temp.map((item) => {
      if (item.key === selectKey) {
        item.coordinate = { ...selected };
      }
    });
    setLocations(temp);
  }, [selectKey]);

  const handleUploadImg = (e) => {
    uploadFileToBlob(e.target.files[0]).then((result) => setUrlImg(result));
  };

  useEffect(() => {
    let temp = [...listImg];
    temp.push(urlImg);
    setListImg(temp);
  }, [urlImg]);

  return (
    <div className="flex flex-col justify-start h-[100vh] w-1/2 m-auto mt-10">
      <div className="border-1 border-gray flex flex-col justify-between w-full h-full mb-10 rounded-10 shadow-lg overflow-y-auto">
        <div className="w-full">
          <div className="w-full flex flex-col justify-between my-4">
            {success ? (
              <>
                <div className="bg-light-success border-1 border-success text-success py-2 px-2 mx-auto my-3 rounded-3 relative text-center w-1/2">
                  <span className="block sm:inline">{success}</span>
                </div>
              </>
            ) : (
              <></>
            )}
            {err ? (
              <>
                <div className="bg-light-pink border-1 border-red text-red py-2 px-2 mx-auto my-3 rounded-3 relative text-center w-1/2">
                  <span className="block sm:inline">{err}</span>
                </div>
              </>
            ) : (
              <></>
            )}
            <div className="flex justify-between">
              <button
                className="flex items-center hover:text-medium-blue cursor-pointer"
                onClick={handleAddLoc}
              >
                <AiFillPlusCircle className="text-4xl inline-block pl-4" />
                <h1 className="text-xl ml-2">Add location</h1>
              </button>

              <div>
                <button
                  className="block py-2 px-6 text-sm bg-light-blue text-white rounded-5 hover:bg-medium-blue shadow-lg mr-4"
                  onClick={handleSubmit(onSubmit)}
                >
                  {edit ? "SAVE" : "CREATE"}
                </button>
              </div>
            </div>
          </div>

          {locations.map((location) => {
            return (
              <form key={location.key} onSubmit={handleSubmit(onSubmit)}>
                <div className="flex justify-between w-100 py-[5px] ">
                  <span className="text-xl pl-4">Location {location.num}</span>
                  <div className="flex-grow border-t-[0.7px] my-auto mx-4"></div>
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
                      selectkey={location.key}
                      setSelectKey={setSelectKey}
                    />
                  </div>

                  <div className="flex justify-between w-4/5 mt-3">
                    <p className="text-black mb-2">Images</p>
                    <AiFillPicture className="my-auto" />
                  </div>
                  <div className="w-4/5 flex justify-start items-center border-solid border-gray border-2 p-3 mb-2 rounded-3 font-normal text-sm outline-medium-blue overflow-y-auto">
                    {listImg.map((img) => (
                      <img
                        className="w-[90px] h-[90px]"
                        key={uuidv4()}
                        src={img}
                        alt=""
                      />
                    ))}
                    <input type="file" onChange={(e) => handleUploadImg(e)} className="ml-4" />
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

const PlacesAutocomplete = ({ setSelected, selectkey, setSelectKey }) => {
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
    setSelectKey(selectkey);
  };

  return (
    <Combobox onSelect={handleSelect} className="w-full">
      <ComboboxInput
        required={true}
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
