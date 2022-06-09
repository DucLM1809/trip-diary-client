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
import {
  createLocation,
  updateLocation,
  updateLocations,
} from "../../redux/actions";
import api from "../../api/axios";
import { uploadFileToBlob } from "../../utils/uploadFileToBlob";

function AddDetailBody() {
  const [selected, setSelected] = useState(null);
  const [selectKey, setSelectKey] = useState("");
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const [edit, setEdit] = useState(false);
  const [listImg, setListImg] = useState([]);
  const [locations, setLocations] = useState([
    { id: uuidv4(), coordinate: {}, num: 1 },
  ]);
  const [tripId, setTripId] = useState();

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
      setTripId(location.pathname.split("/")[3]);
    } else {
      setEdit(false);
    }
  }, [location]);

  useEffect(() => {
    setErr("");
    setSuccess("");
  }, []);

  const tripInfo = useSelector((state) => state.trip);

  const tripInfoLoc = useSelector((state) => state.locations);
  // useEffect(() => {
  //   tripInfoLoc.map((tripLoc) => {console.log(tripLoc.id);})
  // }, [tripInfoLoc]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    let temp = [];
    locations.map((location, index) => {
      console.log("LOCATE: ", location);
      let loc = { ...location };
      loc.startAt = data[`date${index || location.num}`];
      loc.images = [data[`imageList${index || location.num}`]];
      loc.review = data[`description${index || location.num}`];
      console.log("Loc: ", loc);
      temp.push(loc);
    });
    console.log("Temp: ", temp);
    data.locations = temp;
    console.log(data.locations);
    data.locations.map((location) => {
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
                startAt: location.startAt,
                review: location.review,
                lat: location.coordinate.lat,
                lng: location.coordinate.lng,
              },
              config
            )
            .catch((error) => {
              console.log(error);
              if (error.response.status === 405) {
                setErr("You must create a trip first");
              } else if (error.response.status === 422) {
                setErr("You must enter location & choose date");
              }
              setSuccess("");
              setEdit(false);
            });
          if (res) {
            setSuccess("Add Detail Successfully!");
            setErr("");
            setEdit(true);
            dispatch(createLocation(res.data));
            console.log("res: ", res);
          }
        };

        const handleEditLocation = async () => {
          tripInfoLoc.map((tripLoc) => {
            const editTripInfoLoc = async () => {
              let res = await api
                .put(
                  `/trips/${tripId || tripInfo.tripID}/locations/${
                    tripLoc.id || tripLoc.locationID
                  }`,
                  {
                    startAt: location.startAt,
                    review: location.review,
                    lat: location.lat,
                    lng: location.lng,
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
                dispatch(updateLocation(res.data));
                console.log("res: ", res.data);
              }
            };
            editTripInfoLoc();
          });
        };

        if (edit) {
          handleEditLocation();
        } else {
          handleCreateLocation();
        }
      }
    });
    // console.log(data);
  };

  const handleGetLocations = async () => {
    let res = await api
      .get(`/trips/${tripId || tripInfo.tripID}/locations`, config)
      .catch((error) => console.log(error));
    if (res) {
      setLocations(res.data);
      dispatch(updateLocations(res.data));
    }
  };

  useEffect(() => {
    if (edit && tripId) {
      handleGetLocations();
    }
  }, [edit]);

  const handleCreateImages = async () => {
    tripInfoLoc.map((tripLoc, index) => {
      listImg.map((img) => {
        if (img.id === index + 1) {
          const createImages = async () => {
            let res = await api
              .post(
                `/trips/${tripInfo.tripID}/locations/${tripLoc.locationID}/images`,
                {
                  url: img.url,
                },
                config
              )
              .catch((error) => {
                console.log(error);
              });
            if (res) {
              console.log("Images: ", res);
            }
          };
          createImages();
        }
      });
    });
  };

  useEffect(() => {
    if (success && edit === false) {
      handleCreateImages();
    }
  }, [tripInfoLoc]);

  const handleAddLoc = () => {
    let temp = [...locations];
    temp.push({
      id: uuidv4(),
      coordinate: {},
      date: "",
      image: "",
      description: "",
      num: locations.length + 1,
    });
    setLocations(temp);
  };

  const handleDel = (id) => {
    let temp = [...locations];
    temp = temp.filter((location) => !(location.id === id));
    setLocations(temp);
  };

  // useEffect(() => {
  //   if (edit) {
  //     locations.map((location, index) => {
  //       setValue(`date${index + 1}`, location.startAt);
  //       setValue(`description${index + 1}`, location.review);
  //     });
  //   }
  // }, [edit, locations]);

  useEffect(() => {
    let temp = [...locations];
    temp.map((item) => {
      if (item.id === selectKey) {
        item.coordinate = { ...selected };
      }
    });
    setLocations(temp);
  }, [selectKey]);

  const handleUploadImg = (e) => {
    uploadFileToBlob(e.target.files[0]).then((result) => {
      let temp = [...listImg];
      temp.push({ id: parseInt(e.target.id), url: result });
      setListImg(temp);
    });
  };

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
              <div
                className="flex items-center hover:text-medium-blue cursor-pointer"
                onClick={handleAddLoc}
              >
                <AiFillPlusCircle className="text-4xl inline-block pl-4" />
                <h1 className="text-xl ml-2">Add location</h1>
              </div>

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

          {locations.map((location, index) => {
            return (
              <form key={location.id} onSubmit={handleSubmit(onSubmit)}>
                <div className="flex justify-between w-100 py-[5px] ">
                  <span className="text-xl pl-4">
                    Location {location.num || index + 1}
                  </span>
                  <div className="flex-grow border-t-[0.7px] my-auto mx-4"></div>
                  <span className="flex justify-end pr-4 align-middle w-[12rem] items-center">
                    <FaCalendarAlt className=" my-auto" />
                    <p className="ml-2 pr-2">Date</p>
                    <input
                      type="date"
                      {...register(`date${index + 1}`)}
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
                      selectkey={location.id}
                      setSelectKey={setSelectKey}
                    />
                  </div>

                  <div className="flex justify-between w-4/5 mt-3">
                    <p className="text-black mb-2">Images</p>
                    <AiFillPicture className="my-auto" />
                  </div>
                  <div className="w-4/5 flex flex-wrap justify-start items-center border-solid border-gray border-2 p-3 mb-2 rounded-3 font-normal text-sm outline-medium-blue">
                    {listImg.length > 0 ? (
                      listImg.map((img) => {
                        if (img.id === location.num) {
                          return (
                            <img
                              className="w-[120px] h-[120px] object-cover mr-1 mb-1"
                              key={uuidv4()}
                              src={img.url}
                              alt=""
                            />
                          );
                        }
                      })
                    ) : (
                      <></>
                    )}
                    <input
                      id={location.num}
                      type="file"
                      {...register(`${index + 1}`)}
                      onChange={(e) => handleUploadImg(e)}
                      className="ml-4"
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
                      {...register(`description${index + 1}`)}
                      placeholder="Description"
                      className="border-solid border-gray border-2 w-full p-3 mb-2 rounded-3 font-normal text-sm outline-medium-blue"
                    />
                  </div>
                </div>
                <div
                  key={location.id}
                  className="flex justify-betwwen w-2/5 mt-3 mb-3 pb-3 mx-auto"
                >
                  <div className="flex-grow border-t-[0.7px]  my-auto mx-4"></div>
                  <div
                    onClick={() => handleDel(location.id || location.id)}
                    className="hover:text-medium-blue cursor-pointer"
                  >
                    <AiFillCloseCircle className="flex justify-center py-auto text-4xl" />
                  </div>
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
