import { MdOutlineAdd, MdRemove, MdRemoveCircleOutline } from "react-icons/md";
import { Fragment, useState } from "react";
import { getBubbleColor } from "../../utils/utility";
import { useSelector, useDispatch } from "react-redux";
import { updateUserTechnology } from "../../pages/loaders/updateUser";
import { updateTechnologies } from "../../store/slices/userSlice";

const Bubble = ({ text, removable, countable }) => {
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();
  const user = useState(useSelector((state) => state.user));
  const tech = useState(useSelector((state) => state.user.technologies));

  const incrementCount = () => {
    // * Only allow maximum of 9 people per role
    if (count < 9) {
      setCount(count + 1);
    }
  };

  const decrementCount = () => {
    setCount(count - 1);
  };

  const testingClick = () => {
    console.log(text);
    console.log(tech);
    const newList = tech.filter((item) => item !== text);
    console.log(newList);
    //dispatch(updateTechnologies(newList));

    //updateUserTechnology(user.id, newList);
  };

  const bubbleColor = getBubbleColor(text);

  return (
    <div className={`h-8 p-1 flex gap-3 rounded-md ${bubbleColor}`}>
      {/* Count display Field */}
      {countable && (
        <p
          className="aspect-square bg-white text-black poppins font-bold
				flex justify-center items-center rounded-sm"
        >
          {count}
        </p>
      )}
      {/* Text Field */}
      <p className="poppins text-base text-white font-semibold">{text}</p>
      {/* Add, Minus, Remove Buttons  */}
      {(countable || removable) && (
        <div className="flex gap-1">
          {/* Add, Minus Button */}
          {countable && (
            <Fragment>
              <button
                className="bg-white rounded-sm aspect-square text-black
							flex justify-center items-center"
                onClick={incrementCount}
              >
                <MdOutlineAdd className="text-xl" />
              </button>
              <button
                className="bg-white rounded-sm aspect-square text-black
							flex justify-center items-center"
                onClick={decrementCount}
              >
                <MdRemove className="text-xl" />
              </button>
            </Fragment>
          )}
          {/* Remove Field */}
          {removable && (
            <button
              className="rounded-sm aspect-square text-white
						flex justify-center items-center"
              onClick={testingClick}
            >
              <MdRemoveCircleOutline className="text-xl" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Bubble;
