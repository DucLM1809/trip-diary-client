import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { MdStickyNote2 } from "react-icons/md";
import { BiPlus } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import api from "../../api/axios";
import { useDispatch, useSelector } from "react-redux";
import { createChecklist } from "../../redux/actions";
import { useLocation } from "react-router-dom";

const Checklist = () => {
  const dispatch = useDispatch();
  const tripInfo = useSelector((state) => state.trip);

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

  const [displayAdd, setDisplayAdd] = useState(false);
  const [items, setItems] = useState([]);
  const [item, setItem] = useState("");
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const [note, setNote] = useState(false);
  const [edit, setEdit] = useState(false);
  const [tripId, setTripId] = useState();
  const [openModal, setOpenModal] = useState(false);

  const location = useLocation();
  useEffect(() => {
    if (location.pathname.split("/")[1] === "edit") {
      setEdit(true);
      setTripId(location.pathname.split("/")[3]);
    } else {
      setEdit(false);
    }
  }, [location]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    setValue,
    resetField,
  } = useForm({
    defaultValues: {
      item: "",
      check: false,
      note: "",
    },
  });

  const onSubmitCheckbox = (data) => {
    console.log("DATA: ", data);
    data.list = [...items];
    data.list.map((item) => {
      item.note = data[`note${item.id}`];
      item.name = data[`itemVal${item.id}`];
      if (edit && typeof item.id === "string") {
        handleCreateChecklist(item);
      } else if (edit) {
        handleEditChecklist(data.list, item);
      } else {
        handleCreateChecklist(item);
      }
    });
  };

  const handleCreateChecklist = async (item) => {
    let res = await api
      .post(
        `/trips/${tripId || tripInfo.tripID}/checklist`,
        {
          name: item.value,
          hasPrepared: item?.hasPrepared || item.check,
          notes: item.note,
        },
        config
      )
      .catch((error) => {
        console.log(error);
        if (error.response.status === 405) {
          setErr("You must create a trip first");
        }
        setSuccess("");
      });
    if (res) {
      setSuccess("Add Checklist Successfully!");
      setErr("");
      setEdit(Math.random() * 1 + 1);
      handleGetChecklist();
    }
  };

  const handleEditChecklist = async (checklist, item) => {
    let res = await api
      .put(
        `/trips/${tripId || tripInfo.tripID}/checklist/${item.id}`,
        {
          name: item.value || item.name,
          hasPrepared: item.check || item.hasPrepared,
          notes: item.note || item.notes,
        },
        config
      )
      .catch((error) => console.log(error));
    if (res) {
      console.log(res.data);
      setSuccess("Edit Checklist Successfully");
      handleGetChecklist();
    }
    setItems(checklist);
  };

  const handleGetChecklist = async () => {
    let res = await api
      .get(`/trips/${tripId || tripInfo.tripID}/checklist`, config)
      .catch((error) => console.log(error));

    if (res) {
      setItems(res.data);
    }
  };

  useEffect(() => {
    if (edit) {
      handleGetChecklist();
    }
  }, [edit, location]);

  const onSubmitItem = (data) => {
    console.log(data);
    let temp = [...items];
    temp.push({
      id: uuidv4(),
      value: data.item.toString(),
      check: Boolean(data.check),
      note: data.note,
    });
    setItems(temp);
    setItem(data.item);
    setDisplayAdd(false);
    resetField("item");
    resetField("check");
    resetField("note");
  };

  useEffect(() => {
    setFocus("item");
  }, [displayAdd]);

  const handleAddItem = () => {
    setDisplayAdd(true);
    setNote(false);
  };

  const handleCheck = (id) => {
    console.log(id);
    let temp = [...items];
    temp.map((item) => {
      if (item.id === id) {
        item.hasPrepared = !item.hasPrepared;
      }
    });
    console.log("TEMP: ", temp);
    setItems(temp);
  };

  const handleDeleteAdd = () => {
    setDisplayAdd(false);
  };

  const handleDelItem = async (id) => {
    let res = await api
      .delete(`/trips/${tripId || tripInfo.tripID}/checklist/${id}`, config)
      .catch((error) => console.log(error));
    if (res) {
      setSuccess("DELETE SUCCESSFULLY!");
      handleGetChecklist();
    }
  };

  const handleDeleteItem = (id) => {
    let temp = items.filter((item) => !(item.id === id));
    handleDelItem(id);
    setItems(temp);
    setOpenModal(false);
  };

  const handleDisplayNote = () => {
    setNote(!note);
  };

  useEffect(() => {
    console.log("ITEMS: ", items);
  }, [items]);

  return (
    <>
      <div className="flex flex-col justify-start h-[80vh] w-1/2 mx-auto">
        <div className="shadow-lg border-1 border-gray h-fit my-10 py-10 flex flex-col rounded-10 relative overflow-y-auto">
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
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-2xl ml-14">What to arrange</h1>
              {/* <span className="text-xl ml-5 font-normal">0/8</span> */}
            </div>
            <button
              className="block py-2 px-6 text-sm bg-light-blue text-white rounded-5 hover:bg-medium-blue shadow-lg mr-16"
              onClick={handleSubmit(onSubmitCheckbox)}
            >
              {edit ? "SAVE" : "CREATE"}
            </button>
          </div>
          <form
            className="flex flex-col mx-16 mt-8"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(onSubmitCheckbox);
            }}
          >
            {items.length > 0 ? (
              items.map((item, index) => (
                <div key={item.id}>
                  <div className="flex w-full items-center justify-between pt-3 px-5 mt-8 border-2 border-t-gray border-l-0 border-r-0 border-b-0">
                    <div>
                      <input
                        key={item.id}
                        type="checkbox"
                        defaultValue={item.value || item.name}
                        checked={item.hasPrepared || item.check}
                        {...register("checklist")}
                        className="scale-[1.8]"
                        onClick={() => handleCheck(item.id)}
                      />
                      <input
                        className="ml-4 p-[2px] pl-2"
                        {...register(`itemVal${item.id}`)}
                        defaultValue={item.value || item.name}
                      />
                    </div>
                    <div className="flex justify-center items-center">
                      <div
                        className="mr-2 cursor-pointer"
                        onClick={() => handleDisplayNote()}
                      >
                        <MdStickyNote2 className="text-2xl" />
                      </div>
                      <button
                        className="hover:cursor-pointer"
                        // onClick={() => handleDeleteItem(item.id)}
                        onClick={() => setOpenModal(true)}
                        type="button"
                      >
                        <FaTrashAlt className="text-2xl" />
                      </button>
                      {/* Modal */}
                      {openModal && (
                        <>
                          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                              {/*content*/}
                              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none p-3">
                                <button
                                  className="flex justify-end p-1 ml-autoborder-0 bg-white text-red float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                  onClick={() => setOpenModal(false)}
                                >
                                  <span className="bg-white text-black h-6 w-6 text-3xl block outline-none focus:outline-none hover:opacity-[0.5]">
                                    ×
                                  </span>
                                </button>
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                  <h3 className="text-3xl font-semibold">
                                    Do you want to delete this item?
                                  </h3>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                  <button
                                    className="bg-gray text-black active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => setOpenModal(false)}
                                  >
                                    Close
                                  </button>
                                  <button
                                    className="bg-danger text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg hover:opacity-[0.8] outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => handleDeleteItem(item.id)}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                        </>
                      )}
                      {/* Modal */}
                    </div>
                  </div>
                  <textarea
                    id="note"
                    rows={1}
                    {...register(`note${item.id}`)}
                    className={`border-1 border-gray w-full rounded-5 mt-2 py-2 px-2 ${
                      note ? "block" : "hidden"
                    }`}
                    defaultValue={item.notes}
                  />
                </div>
              ))
            ) : (
              <></>
            )}
          </form>
          <div
            className={`${
              displayAdd ? "flex " : "hidden"
            } mx-16 mt-8 before:absolute pt-3 px-5 border-2 border-t-gray border-l-0 border-r-0 border-b-0`}
          >
            <form
              className="flex w-full items-center justify-between"
              onSubmit={handleSubmit(onSubmitItem)}
            >
              <div className="flex items-center w-full">
                <input
                  type="checkbox"
                  value={item}
                  {...register("check")}
                  className="scale-[1.8]"
                />
                <input
                  {...register("item")}
                  type="text"
                  placeholder="Item name"
                  className="pl-2 py-1 mx-4 flex-1"
                />
              </div>
            </form>
            <button onClick={handleDeleteAdd}>
              <FaTrashAlt className="text-2xl" />
            </button>
          </div>
          <button
            className="flex mx-16 mt-8 before:absolute pt-3 px-3 border-2 border-t-gray border-l-0 border-r-0 border-b-0"
            onClick={handleAddItem}
          >
            <BiPlus className="text-2xl" />
            <span className="ml-4 text-placeholder">Add Item</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Checklist;
