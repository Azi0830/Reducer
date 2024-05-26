import { Button, Form, Input, Table } from "antd";
import { useEffect, useReducer } from "react";

const initialState = {
  name: "",
  data: [],
};

const action = (state, { type, payload }) => {
  switch (type) {
    case "CHANGE_NAME":
      return {
        ...state,
        name: payload,
      };
    case "DELETE":
      return {
        ...state,
        data: state.data.filter(({ key }) => key != payload.id),
      };
    case "ADD_DATA":
      const newData = {
        key: (state.data.length + 1).toString(),
        name: state.name,
      };
      return {
        ...state,
        data: [...state.data, newData],
        name: "",
      };
    case "DATA_CHANGE":
      return {
        ...state,
        data: payload.data,
      };
    default:
      return state;
  }
};

function Work() {
  const [state, dispatch] = useReducer(action, initialState);

  useEffect(() => {
    const getData = async () => {
      const respose = await fetch("https://jsonplaceholder.typicode.com/todos");
      const data = await respose.json();

      // Ma'lumotni moslashtirish ..........?????
      const formattedData = data.slice(0, 10).map((item) => ({
        key: item.id.toString(),
        name: item.title,
      }));

      dispatch({ type: "DATA_CHANGE", payload: { data: formattedData } });
    };
    getData();
  }, []);

  //table u-n
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <a onClick={() => onDelete(record.key)}>Delete</a>
      ),
    },
  ];

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

  //form u-n function
  const onFinish = async () => {
    dispatch({ type: "ADD_DATA" });

    await fetch(`https://jsonplaceholder.typicode.com/todos`),
      {
        method: "POST",
      };
  };

  return (
    <div className="w-fell h-[100vh] flex flex-col items-center justify-center gap-[50px]">
      <Table
        className="w-full"
        columns={columns}
        dataSource={state.data}
        bordered
        title={() => "Header"}
        footer={() => "Footer"}
      />
      <Form name="basic" onFinish={onFinish} autoComplete="off">
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <Input
            value={state.title}
            onChange={(e) =>
              dispatch({
                type: "CHANGE_NAME",
                payload: e.target.value,
              })
            }
          />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Work;
