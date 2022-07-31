import React, { useLayoutEffect } from "react";
import { useState, useEffect } from "react";
import {
  AiFillPlusCircle,
  AiFillPicture,
  AiFillCloseCircle,
} from "react-icons/ai";
import { FaCalendarAlt } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { TiDeleteOutline } from "react-icons/ti";
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
import axios from "axios";
import { uploadFileToBlob } from "../../utils/uploadFileToBlob";

function AddDetailBody() {
  const [selected, setSelected] = useState(null);
  const [selectKey, setSelectKey] = useState("");
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const [isCreated, setIsCreated] = useState(false);
  const [edit, setEdit] = useState(false);
  const [listImg, setListImg] = useState([]);
  const [locations, setLocations] = useState([
    { id: uuidv4(), coordinate: {}, num: 1 },
  ]);
  const [trip, setTrip] = useState();

  const dispatch = useDispatch();
  const sasToken = useSelector((state) => state.user.sasToken);

  const ApiKey = "AIzaSyCegXjc_zJxyKztste0CKrsy_883NB8tvA";

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
  const tripId = location.pathname.split("/")[3];
  useEffect(() => {
    if (location.pathname.split("/")[1] === "edit") {
      setEdit(true);
    } else {
      setEdit(false);
    }
  }, [location]);

  const handleGetTrip = async () => {
    let res = await api
      .get(`/trips/${tripId}`, config)
      .catch((error) => console.log(error));
    if (res) {
      setTrip(res.data);
    }
  };

  useEffect(() => {
    handleGetTrip();
  }, []);

  useEffect(() => {
    setErr("");
    setSuccess("");
  }, []);

  const tripInfo = useSelector((state) => state.trip);

  const tripInfoLoc = useSelector((state) => state.locations);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = (data) => {
    let temp = [];
    console.log(locations);
    locations.map((location, index) => {
      let loc = { ...location };
      loc.startAt = data[`date${index + 1 || location.num}`];
      loc.images = [data[`imageList${index + 1 || location.num}`]];
      loc.review = data[`description${index + 1 || location.num}`];
      loc.coordinate = location.coordinate;
      temp.push(loc);
    });
    data.locations = [...temp];
    data.locations.map((location) => {
      if (Date.parse(location?.startAt) < Date.parse(trip?.startAt)) {
        setErr("You choose a day before start day");
        setSuccess("");
      } else if (Date.parse(location?.startAt) > Date.parse(trip?.finishAt)) {
        setErr("You choose a day after finish day");
        setSuccess("");
      } else {
        if (edit && typeof location.id === "string") {
          handleCreateLocation(location);
        } else if (edit) {
          handleEditLocation(data.locations, location);
        } else {
          handleCreateLocation(location);
        }
      }
    });
  };

  const handleCreateLocation = async (location) => {
    let res = await api
      .post(
        `/trips/${tripId || tripInfo.tripID}/locations`,
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
        } else {
          console.log(error.response.data.detail[0].msg);
          setErr(error.response.data.detail[0].msg);
        }
        setSuccess("");
        setEdit(false);
      });
    if (res) {
      if (edit) {
        setSuccess("Edit Detail Successfully!");
      } else {
        setSuccess("Add Detail Successfully!");
      }
      setErr("");
      setEdit(Math.random() * 1 + 1);
      dispatch(createLocation(res.data));
      setIsCreated(true);
    }
  };

  const handleEditLocation = async (locations, location) => {
    let res = await api
      .put(
        `/trips/${tripId || tripInfo.tripID}/locations/${
          location.id || location.locationID
        }`,
        {
          startAt: location.startAt,
          review: location.review,
          lat: location.coordinate.lat,
          lng: location.coordinate.lng,
        },
        config
      )
      .catch((error) => {
        setSuccess("");
      });
    if (res) {
      setSuccess("Edit Detail Successfully!");
      setErr("");
      setEdit(Math.random() * 1 + 1);
    }
    dispatch(updateLocations(locations));
  };

  const handleCreateImages = async () => {
    tripInfoLoc.map((tripLoc, index) => {
      listImg.map((img) => {
        if (img.locationId === index + 1) {
          const createImages = async () => {
            let res = await api
              .post(
                `/trips/${tripId || tripInfo.tripID}/locations/${
                  tripLoc.locationID
                }/files`,
                {
                  url: img.url,
                  type: img.type,
                },
                config
              )
              .catch((error) => {
                console.log(error);
              });
            if (res) {
              console.log("Images: ", res.data);
            }
          };
          createImages();
        }
      });
    });
  };

  const handleGetImages = async (locations) => {
    let temp = [];
    locations.map((location) => {
      let getImages = async () => {
        let res = await api
          .get(
            `/trips/${tripId || tripInfo.tripID}/locations/${
              location.id || location.locationID
            }/files`,
            config
          )
          .catch((error) => console.log(error));
        if (res) {
          let images = [...res.data];
          images.map((image) => {
            temp.push(image);
          });
          setListImg(temp);
        }
      };
      getImages();
    });
  };

  useEffect(() => {
    if (isCreated) {
      handleCreateImages();
    }
  }, [isCreated]);

  const handleDelImage = async (id, locationId) => {
    let res = api
      .delete(
        `/trips/${
          tripId || tripInfo.tripID
        }/locations/${locationId}/files/${id}`,
        config
      )
      .catch((error) => console.log(error));
    if (res) {
      console.log("DELETE IMAGE SUCCESSFULLY");
    }
  };

  const handleDeleteImage = (id, locationId) => {
    let temp = [...listImg];
    temp = temp.filter((item) => !((item.num || item.id) === id));
    handleDelImage(id, locationId);
    setListImg(temp);
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
    setIsCreated(false);
  }, [edit]);

  const handleGetDepartures = async (locations) => {
    let temp = [...locations];
    temp.map((item) => {
      let urlDep = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${item.lat},${item.lng}&key=${ApiKey}`;
      let getDepatures = async () => {
        let res = await axios.get(urlDep).catch((error) => console.log(error));
        if (res) {
          item.departure =
            res.data.results[res.data.results.length - 2].formatted_address;
        }
      };
      getDepatures();
    });
    setLocations(temp);
  };

  useEffect(() => {
    tripInfoLoc.map((tripLoc, index) => {
      setValue(`date${index + 1}`, tripLoc.startAt);
      setValue(`description${index + 1}`, tripLoc.review);
    });
    handleGetDepartures(tripInfoLoc);
    handleGetImages(tripInfoLoc);
  }, [edit, tripInfoLoc]);

  const handleAddLoc = () => {
    let temp = [...locations];
    temp.push({
      id: uuidv4(),
      coordinate: {},
      departure: "",
      date: "",
      image: "",
      description: "",
      num: locations.length + 1,
    });
    setLocations(temp);
  };

  const handleDelLocation = async (locations, locationID) => {
    let res = await api
      .delete(
        `/trips/${tripId || tripInfo.tripID}/locations/${locationID}`,
        config
      )
      .catch();
    if (res) {
      setLocations(locations);
      setSuccess("DELETE SUCCESSFULLY!");
      dispatch(updateLocations(locations));
    }
  };

  const handleDel = (id) => {
    let temp = [...locations];
    temp = temp.filter(
      (location) => !((location.id || location.locationID) === id)
    );
    setLocations(temp);
    handleDelLocation(temp, id);
  };

  useEffect(() => {
    let temp = [...locations];
    console.log(selected);
    temp.map((item) => {
      if (item.id === selectKey) {
        item.coordinate = { ...selected };
      }
    });
    setLocations(temp);
  }, [selectKey, selected]);

  const handleUploadImg = (e) => {
    uploadFileToBlob(e.target.files[0], sasToken).then((result) => {
      let temp = [...listImg];
      temp.push({
        locationId: parseInt(e.target.id),
        url: result,
        num: listImg.length + 1,
        type: e.target.files[0].type.split("/")[0],
      });
      setListImg(temp);
    });
  };

  useEffect(() => {
    console.log("IMAGES: ", listImg);
  }, [listImg])

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
                      departure={location.departure}
                    />
                  </div>

                  <div className="flex justify-between w-4/5 mt-3">
                    <p className="text-black mb-2">Images</p>
                    <AiFillPicture className="my-auto" />
                  </div>
                  <div className="w-4/5 flex flex-wrap justify-start items-center border-solid border-gray border-2 p-3 mb-2 rounded-3 font-normal text-sm outline-medium-blue">
                    {listImg.length > 0 ? (
                      listImg.map((img) => {
                        if (
                          img.locationId ===
                            (location.id || location.locationID) ||
                          img.locationId === location.num
                        ) {
                          return (
                            <div key={uuidv4()} className="relative">
                              {img.type === "image" ? (
                                <img
                                  className="w-[120px] h-[120px] object-cover mr-1 mb-1"
                                  src={img.url}
                                  alt=""
                                />
                              ) : (
                                <video
                                  className="w-[120px] h-[120px] object-cover mr-1 mb-1"
                                  src={img.url}
                                  controls
                                />
                              )}

                              <TiDeleteOutline
                                className="absolute top-1 right-1 text-dark-gray text-2xl hover:opacity-70 hover:cursor-pointer"
                                onClick={() =>
                                  handleDeleteImage(
                                    img.num ? img.num : img.id,
                                    location.id || location.locationID
                                  )
                                }
                              />
                            </div>
                          );
                        }
                      })
                    ) : (
                      <></>
                    )}
                    <input
                      id={index + 1}
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
                    onClick={() =>
                      handleDel(location.locationID || location.id)
                    }
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

const PlacesAutocomplete = ({
  setSelected,
  selectkey,
  setSelectKey,
  departure,
}) => {
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

  useEffect(() => {
    setValue();
  }, []);

  useEffect(() => {
    if (departure) {
      // setValue(departure);
      handleSelect(departure);
    }
  }, [departure]);

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
