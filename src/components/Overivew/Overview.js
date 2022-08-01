import React, { useEffect, useMemo, useState } from "react";
import { AiFillCamera } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
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
import { useDispatch, useSelector } from "react-redux";
import { createTrip } from "../../redux/actions";
import api from "../../api/axios";
import { uploadFileToBlob } from "../../utils/uploadFileToBlob";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BsThreeDots } from "react-icons/bs";

const Overview = () => {
  const sasToken = useSelector((state) => state.user.sasToken);
  const ApiKey = "AIzaSyCegXjc_zJxyKztste0CKrsy_883NB8tvA";
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: ApiKey,
    libraries: "places",
  });

  const center = useMemo(() => ({ lat: 43.45, lng: -80.49 }), []);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname.split("/")[1] === "edit") {
      setEdit(true);
      setTripId(location.pathname.split("/")[3]);
    } else {
      setEdit(false);
    }
  }, [location]);

  const [display, setDisplay] = useState(false);
  const [displayPublic, setDisplayPublic] = useState(false);
  const [disable, setDisable] = useState(true);
  const [type, setType] = useState("Single Trip");
  const [selected1, setSelected1] = useState(null);
  const [selected2, setSelected2] = useState(null);
  const [coordinate1, setCoordinate1] = useState({ ...center });
  const [coordinate2, setCoordinate2] = useState({});
  const [departure, setDeparture] = useState();
  const [destination, setDestination] = useState();
  const [dep, setDep] = useState();
  const [dest, setDest] = useState();
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const [urlImg, setUrlImg] = useState();
  const [edit, setEdit] = useState(false);
  const [trip, setTrip] = useState();
  const [tripId, setTripId] = useState();
  const [tripPublic, setTripPublic] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [isPast, setIsPast] = useState(false);

  const dispatch = useDispatch();
  const tripInfo = useSelector((state) => state.trip);

  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  useEffect(() => {
    if (location.pathname.includes("past")) {
      setIsPast(true);
    } else {
      setIsPast(false);
    }
  }, [location]);

  const handleChooseType = () => {
    setDisplay(!display);
  };

  const handleChoosePublic = () => {
    setDisplayPublic(!displayPublic);
  };

  const handleType = (e) => {
    setDisplay(false);
    setType(e.target.textContent);
  };

  const handlePublic = (e) => {
    setDisplayPublic(false);
    setTripPublic(e.target.textContent);
  };

  useEffect(() => {
    if (tripPublic === "Public") {
      setIsPublic(true);
    } else if (tripPublic === "Private") {
      setIsPublic(false);
    } else {
      setIsPublic(true);
    }
  }, [tripPublic]);

  useEffect(() => {
    if (type === "Single Trip") {
      setDisable(true);
      resetField("to");
    } else {
      setDisable(false);
    }
  }, [type]);

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
    watch,
    setValue,
  } = useForm();

  const onSubmit = (data) => {
    data.type = type;
    data.from_lat = coordinate1.lat;
    data.from_lng = coordinate1.lng;
    data.to_lat = coordinate2.lat;
    data.to_lng = coordinate2.lng;
    data.tripPublic = tripPublic;
    if (edit) {
      handleEditTrip(data);
    } else {
      handleCreateTrip(data);
    }
  };

  const accessToken = localStorage
    .getItem("accessToken")
    ?.toString()
    .split('"')[1];

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (accessToken) {
    config.headers.Authorization = `bearer ${accessToken}`;
  }

  const handleCreateTrip = async (data) => {
    let res = await api
      .post(
        "/trips",
        {
          name: data.tripname,
          type: data.type,
          fromLat: data.from_lat,
          fromLng: data.from_lng,
          toLat: data.to_lat,
          toLng: data.to_lng,
          startAt: data.from,
          backTripAt: data.to,
          coverImgUrl: urlImg ? urlImg.url : "",
          description: data.description,
          scope: dest === dep ? "local" : "global",
          isPublic: isPublic,
          isFinished: isPast,
        },
        config
      )
      .catch((error) => {
        setErr(error.response.data.detail);
        setSuccess("");
        setEdit(false);
        console.log(error);
      });
    if (res) {
      setSuccess("Create Trip Successfully!");
      setErr("");
      setEdit(true);
      dispatch(createTrip(res.data));
    }
  };

  const handleEditTrip = async (data) => {
    let res = await api
      .put(
        `/trips/${tripId || tripInfo.tripID}`,
        {
          name: data.tripname,
          type: data.type,
          fromLat: data.from_lat,
          fromLng: data.from_lng,
          toLat: data.to_lat,
          toLng: data.to_lng,
          startAt: data.from,
          backTripAt: data.to,
          coverImgUrl: urlImg ? urlImg.url : "",
          description: data.description,
          scope: dest === dep ? "local" : "global",
          isPublic: tripPublic === "Public" || tripPublic === "" ? true : false,
          isFinished: isPast,
        },
        config
      )
      .catch((error) => {
        setErr(error.response.data.detail);
        setSuccess("");
        console.log(error);
      });
    if (res) {
      setSuccess("Edit Trip Successfully!");
      setErr("");
      dispatch(createTrip(res.data));
    }
  };

  useEffect(() => {
    setCoordinate1({ ...selected1 });
  }, [selected1]);

  useEffect(() => {
    setCoordinate2({ ...selected2 });
  }, [selected2]);

  const handleUploadImg = (e) => {
    uploadFileToBlob(e.target.files[0], sasToken).then((result) =>
      setUrlImg({ url: result, type: e.target.files[0].type.split("/")[0] })
    );
  };

  const handleGetTrip = async () => {
    let res = await api
      .get(`/trips/${tripId || tripInfo.tripID}`, config)
      .catch((error) => console.log(error));
    if (res) {
      setTrip(res.data);
    }
  };

  useEffect(() => {
    if (edit) {
      handleGetTrip();
    }
  }, [edit]);

  useEffect(() => {
    if (trip?.isFinished) {
      setIsPast(true);
    }
  }, [trip]);

  const handleGetDeparture = async () => {
    if (coordinate1?.lat && coordinate1?.lng) {
      let urlDep = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinate1.lat},${coordinate1.lng}&key=${ApiKey}`;
      let res = await axios.get(urlDep).catch((error) => console.log(error));
      if (res) {
        setDeparture(
          res.data.results[res.data.results.length - 2].formatted_address
        );
      }
    }
  };

  const handleGetDestination = async () => {
    if (coordinate2?.lat && coordinate2?.lng) {
      let urlDes = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinate2.lat},${coordinate2.lng}&key=${ApiKey}`;
      let res = await axios.get(urlDes).catch((error) => console.log(error));
      if (res) {
        setDestination(
          res.data.results[res.data.results.length - 2].formatted_address
        );
      }
    }
  };

  useEffect(() => {
    if (edit && trip) {
      setValue("tripname", trip.name);
      if (trip.backTripAt) {
        setType("Around Trip");
        setValue("to", trip.backTripAt);
      } else {
        setType("Single Trip");
      }
      setValue("from", trip.startAt);
      setValue("description", trip.description);
      setCoordinate1({ lat: trip.fromLat, lng: trip.fromLng });
      setCoordinate2({ lat: trip.toLat, lng: trip.toLng });
      setUrlImg(trip.coverImgUrl);
    } else {
      resetField("tripname");
      setType("Single Trip");
      resetField("from");
      resetField("to");
      resetField("description");
    }
  }, [edit, trip]);

  useEffect(() => {
    if (edit && coordinate1) {
      handleGetDeparture();
    }
  }, [edit, coordinate1]);

  useEffect(() => {
    if (edit && coordinate2) {
      handleGetDestination();
    }
  }, [edit, coordinate2]);

  return (
    <div className="flex flex-col justify-center mx-auto mt-10 min-w-[1100px]">
      <div
        className="w-full h-96 relative 
          after:absolute after:content-[''] 
          after:top-0 after:right-0 after:left-0 after:bottom-0 
        after:bg-black after:opacity-25 after:rounded-10"
      >
        <img
          src={
            trip?.coverImgUrl || urlImg ? trip?.coverImgUrl || urlImg.url : ""
          }
          className={`min-w-full h-full object-cover rounded-10 relative ${
            urlImg ? "block" : "hidden"
          }`}
        />
        <form
          className="absolute bottom-9 right-11 z-20 opacity-0 cursor-pointer"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="file"
            onChange={(e) => handleUploadImg(e)}
            className="overflow-hidden h-10 w-10 file:cursor-pointer border-0 outline-none cursor-pointer"
          ></input>
        </form>
        <AiFillCamera className="text-5xl text-gray absolute bottom-8 right-10 z-10 cursor-pointer" />
      </div>
      <div className="shadow-lg border-1 border-gray h-fit my-10 py-10 flex justify-center rounded-10 relative">
        <form
          className="flex flex-col justify-around items-center w-8/12"
          onSubmit={handleSubmit(onSubmit)}
        >
          {success ? (
            <>
              <div className="bg-light-success border-1 border-success text-success py-2 px-2 mx-auto mt-3 mb-4 rounded-3 relative text-center w-1/2">
                <span className="block sm:inline">{success}</span>
              </div>
            </>
          ) : (
            <></>
          )}
          {err ? (
            <>
              <div className="bg-light-pink border-1 border-danger text-danger py-2 px-2 mx-auto mt-3 mb-4 rounded-3 relative text-center w-1/2">
                <span className="block sm:inline">{err}</span>
              </div>
            </>
          ) : (
            <></>
          )}
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
                    className="w-full px-2 py-1 hover:bg-gray rounded-br-3 rounded-bl-3"
                    onClick={(e) => handleType(e)}
                  >
                    Around Trip
                  </div>
                </div>
              </div>
            </div>
            <div className="cursor-pointer w-[100px]  absolute right-10">
              <div onClick={handleChoosePublic}>
                <BsThreeDots />
              </div>

              <div
                className={`border-2 border-gray rounded-5 mb-1 ${
                  displayPublic ? "block" : "hidden"
                }`}
              >
                <div
                  className="w-full border-b-1 border-gray px-2 py-1 hover:bg-gray rounded-tr-3 rounded-tl-3"
                  onClick={(e) => handlePublic(e)}
                >
                  Public
                </div>
                <div
                  className="w-full px-2 py-1 hover:bg-gray rounded-br-3 rounded-bl-3"
                  onClick={(e) => handlePublic(e)}
                >
                  Private
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-between mb-10">
            <div className="flex flex-col">
              <label htmlFor="departure" className="mb-2">
                Departure
              </label>
              <PlacesAutocomplete1
                setSelected1={setSelected1}
                departure={departure}
                setDep={setDep}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="destination" className="mb-2">
                Destination
              </label>
              <PlacesAutocomplete2
                setSelected2={setSelected2}
                destination={destination}
                setDest={setDest}
              />
            </div>
          </div>

          <div className="w-full flex justify-between">
            <div className="flex flex-col">
              <label htmlFor="from" className="mb-2">
                From
              </label>
              {isPast ? (
                <input
                  id="from"
                  type="date"
                  {...register("from", {
                    required: "You must specify a start date",
                    validate: (value) =>
                      Date.parse(value) <= Date.now() ||
                      " Plan must be not over today",
                  })}
                  className="border-2 border-gray px-2 py-3 w-[360px] rounded-5"
                />
              ) : (
                <input
                  id="from"
                  type="date"
                  {...register("from", {
                    required: "You must specify a start date",
                    validate: (value) =>
                      Date.parse(value) >= Date.now() ||
                      " Plan must be over today",
                  })}
                  className="border-2 border-gray px-2 py-3 w-[360px] rounded-5"
                />
              )}

              {errors?.from && (
                <p className="text-xs mt-2 font-normal text-danger before:inline before:content-[''] ">
                  {errors.from.message}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="to" className="mb-2">
                To
              </label>
              <input
                id="to"
                type="date"
                disabled={disable}
                {...register("to", {
                  required: !disable && "You must specify a finish date",
                  validate: (value) =>
                    (!disable &&
                      (Date.parse(value) >= Date.parse(watch("from")) ||
                        " At least equal to start day")) ||
                    true,
                })}
                className={`border-2 border-gray px-2 py-3 w-[360px] rounded-5 ${
                  disable ? "cursor-not-allowed" : ""
                }`}
              />
              {!disable && errors?.to && (
                <p className="text-xs mt-2 font-normal text-danger before:inline before:content-[''] ">
                  {errors.to.message}
                </p>
              )}
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
            {edit ? "SAVE" : "CREATE"}
          </button>
        </form>
      </div>
      <div className="w-full h-[500px] mt-10 mb-28">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={coordinate1 || center}
            zoom={6}
          >
            <Marker position={coordinate1} />
            <Marker position={coordinate2} />
          </GoogleMap>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

const PlacesAutocomplete1 = ({ setSelected1, departure, setDep }) => {
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
    let temp = results[0].formatted_address.split(",");
    setDep(temp[temp.length - 1]);
    const { lat, lng } = getLatLng(results[0]);
    setSelected1({ lat, lng });
  };

  // useEffect(() => {
  //   setValue();
  // }, []);

  useEffect(() => {
    // setValue(departure);
    handleSelect(departure);
  }, [departure]);

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        required
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="combobox-input border-2 border-gray px-2 py-3 w-[360px] rounded-5"
        placeholder="Enter address"
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

const PlacesAutocomplete2 = ({ setSelected2, destination, setDest }) => {
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
    let temp = results[0].formatted_address.split(",");
    setDest(temp[temp.length - 1]);
    const { lat, lng } = getLatLng(results[0]);
    setSelected2({ lat, lng });
  };

  // useEffect(() => {
  //   setValue();
  // }, []);

  useEffect(() => {
    // setValue(destination);
    handleSelect(destination);
  }, [destination]);

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        required
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="combobox-input border-2 border-gray px-2 py-3 w-[360px] rounded-5"
        placeholder="Enter address"
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

export default Overview;
