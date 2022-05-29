import React, { useEffect, useRef, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { BiPlus } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

const Checklist = () => {
  const [displayAdd, setDisplayAdd] = useState(false);
  const [items, setItems] = useState([]);
  const [item, setItem] = useState("");

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
    },
  });

  const onSubmitCheckbox = (data) => {
    console.log(data);
  };

  const onSubmitItem = (data) => {
    console.log(data);
    let temp = [...items];
    temp.push({
      key: uuidv4(),
      value: data.item.toString(),
      check: data.check,
    });
    setItems(temp);
    setItem(data.item);
    setDisplayAdd(false);
    resetField("item");
    resetField("check");
  };

  useEffect(() => {
    setFocus("item");
  }, [displayAdd]);

  const handleAddItem = () => {
    setDisplayAdd(true);
  };

  const handleCheck = (key) => {
    let temp = [...items];
    let item = temp.find((item) => item.key === key);
    temp.find((item) => item.key === key).check = !item.check;
    setItems(temp);
  };

  // useEffect(() => {
  //   console.log(items);
  // }, [items]);

  const handleDeleteAdd = () => {
    setDisplayAdd(false);
  };

  const handleDeleteItem = (key) => {
    console.log(key);
    let temp = items.filter((item) => !(item.key === key));
    setItems(temp)
  };

  return (
    <div className="flex flex-col justify-center w-1/2 mx-auto">
      <div className="shadow-lg border-1 border-gray h-fit my-10 py-10 flex flex-col rounded-10 relative">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl ml-14">What to arrange</h1>
            <span className="text-xl ml-5 font-normal">0/8</span>
          </div>
          <button
            className="block py-2 px-6 text-sm bg-light-blue text-white rounded-5 hover:bg-medium-blue shadow-lg mr-16"
            onClick={handleSubmit(onSubmitCheckbox)}
          >
            SAVE
          </button>
        </div>
        <form
          className="flex flex-col mx-16 mt-8"
          onSubmit={handleSubmit(onSubmitCheckbox)}
        >
          <div className="flex w-full items-center justify-between pt-3 px-5 mt-8 border-2 border-t-gray border-l-0 border-r-0 border-b-0">
            <div>
              <input
                type="checkbox"
                value="Shoes"
                {...register("checklist")}
                className="scale-[1.8]"
              />
              <span className="ml-4">Shoes</span>
            </div>
            <button>
              <FaTrashAlt className="text-2xl" />
            </button>
          </div>
          <div className="flex w-full items-center justify-between pt-3 px-5 mt-8 border-2 border-t-gray border-l-0 border-r-0 border-b-0">
            <div>
              <input
                type="checkbox"
                value="Money"
                {...register("checklist")}
                className="scale-[1.8]"
              />
              <span className="ml-4">Money</span>
            </div>
            <button>
              <FaTrashAlt className="text-2xl" />
            </button>
          </div>
          <div className="flex w-full items-center justify-between pt-3 px-5 mt-8 border-2 border-t-gray border-l-0 border-r-0 border-b-0">
            <div>
              <input
                type="checkbox"
                value="Card"
                {...register("checklist")}
                className="scale-[1.8]"
              />
              <span className="ml-4">Card</span>
            </div>
            <button>
              <FaTrashAlt className="text-2xl" />
            </button>
          </div>
          {items.length > 0 ? (
            items.map((item) => (
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
                <div className="hover:cursor-pointer" onClick={() => handleDeleteItem(item.key)}>
                  <FaTrashAlt className="text-2xl" />
                </div>
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
