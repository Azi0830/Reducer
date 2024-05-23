import { Button } from "antd";
import { useEffect, useReducer } from "react";

const action = (state, { type, payload }) => {
  // switch (type) {
  //   case "I":
  //     return {
  //       ...state,
  //       count: state.count + 1,
  //     };
  //   case "D":
  //     return {
  //       ...state,
  //       count: state.count - 1,
  //     };
  //   case "CHANGE":
  //     return {
  //       ...state,
  //       value: payload.value,
  //     };
  //   default:
  //     return state;
  // }
  switch (type) {
    case "DATA_CHANGE":
      return {
        ...state,
        data: payload.data,
      };
    case "DELETE":
      return {
        ...state,
        data: state.data.filter(({ id }) => id != payload.id),
      };
    default:
      return state;
  }
};

function App() {
  const [stare, dispatch] = useReducer(action, {
    // count: 0,
    // value: "",
    data: [],
  });

  useEffect(() => {
    const getData = async () => {
      const respose = await fetch("https://jsonplaceholder.typicode.com/todos");
      const data = await respose.json();

      dispatch({ type: "DATA_CHANGE", payload: { data } });
    };
    getData();
  }, []);

  const onDelete = async (id) => {
    dispatch({ type: "DELETE", payload: { id } });

    await fetch(`https://jsonplaceholder.typicode.com/todos`),
      {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      };
  };

  return (
    <div className="w-fell h-[100vh] flex flex-col items-center justify-center gap-[50px]">
      123
      {stare.data.map(({ id, title }) => (
        <div key={id}>
          {title} <Button onClick={() => onDelete(id)}>delete</Button>
        </div>
      ))}
      {/* <div className="flex gap-[15px]">
        <Button onClick={() => dispatch({ type: "I" })}>+</Button>
        {stare.count}
        <Button onClick={() => dispatch({ type: "D" })}>-</Button>
      </div>
      <div>
        <input
          className="border-solid border-2 border-indigo-600 "
          type="text"
          onChange={(e) =>
            dispatch({ type: "CHANGE", payload: { value: e.target.value } })
          }
        />
        <h1>value:{stare.value}</h1>
      </div> */}
    </div>
  );
}

export default App;
