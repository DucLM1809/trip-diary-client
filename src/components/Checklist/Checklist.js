import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { MdStickyNote2 } from "react-icons/md";
import { BiPlus } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import api from "../../api/axios";
import { useDispatch, useSelector } from "react-redux";
import { createChecklist } from "../../redux/actions";

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

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    resetField,
  } = useForm({
    defaultValues: {
      item: "",
      check: false,
      note: "",
    },
  });

  const onSubmitCheckbox = (data) => {
    console.log(data);
    data.list = [...items];
    data.list.map((item) => {
      item.note = data[`note${item.key}`]
      const handleCreateChecklist = async () => {
        let res = await api
          .post(
            `/trips/${tripInfo.tripID}/checklist`,
            {
              name: item.value,
              hasPrepared: item.check,
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
          dispatch(createChecklist(res));
          console.log(res);
        }
      };
      handleCreateChecklist();
    });
  };

  const onSubmitItem = (data) => {
    let temp = [...items];
    temp.push({
      key: uuidv4(),
      value: data.item.toString(),
      check: data.check,
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

  const handleCheck = (key) => {
    let temp = [...items];
    let item = temp.find((item) => item.key === key);
    temp.find((item) => item.key === key).check = !item.check;
    setItems(temp);
  };

  const handleDeleteAdd = () => {
    setDisplayAdd(false);
  };

  const handleDeleteItem = (key) => {
    let temp = items.filter((item) => !(item.key === key));
    setItems(temp);
  };

  const handleDisplayNote = () => {
    setNote(!note);
  };

  return (
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
            CREATE
          </button>
        </div>
        <form
          className="flex flex-col mx-16 mt-8"
          onSubmit={handleSubmit(onSubmitCheckbox)}
        >
          {items.length > 0 ? (
            items.map((item) => (
              <div key={item.key}>
                <div className="flex w-full items-center justify-between pt-3 px-5 mt-8 border-2 border-t-gray border-l-0 border-r-0 border-b-0">
                  <div>
                    <input
                      key={item.key}
                      type="checkbox"
                      value={item.value}
                      checked={item.check}
                      {...register("checklist")}
                      className="scale-[1.8]"
                      onClick={() => handleCheck(item.key)}
                    />
                    <span className="ml-4">{item.value}</span>
                  </div>
                  <div className="flex justify-center items-center">
                    <div
                      className="mr-2 cursor-pointer"
                      onClick={() => handleDisplayNote()}
                    >
                      <MdStickyNote2 className="text-2xl" />
                    </div>
                    <div
                      className="hover:cursor-pointer"
                      onClick={() => handleDeleteItem(item.key)}
                    >
                      <FaTrashAlt className="text-2xl" />
                    </div>
                  </div>
                </div>
                <textarea
                  id="note"
                  rows={1}
                  {...register(`note${item.key}`)}
                  className={`border-1 border-gray w-full rounded-5 mt-2 py-2 px-2 ${
                    note ? "block" : "hidden"
                  }`}
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
  );
};

export default Checklist;
