// import React, { useReducer } from "react";
// import { Button, Form, Input, InputNumber, Table } from "antd";

// const action = (state, { type, payload }) => {
//   console.log("working...");
//   switch (type) {
//     case "CHANGE_NAME":
//       return {
//         ...state,
//         name: payload.name,
//       };
//     case "CAHNGE_AGE":
//       return {
//         ...state,
//         age: payload.age,
//       };
//     case "CHANGE_ADRESS":
//       return {
//         ...state,
//         address: payload.address,
//       };
//     default:
//       state;
//   }
// };

// const dataSource = [
//   {
//     key: "1",
//     name: "Mike",
//     age: 32,
//     address: "10 Downing Street",
//   },
//   {
//     key: "2",
//     name: "John",
//     age: 42,
//     address: "10 Downing Street",
//   },
//   {
//     key: "3",
//     name: "Jon",
//     age: 40,
//     address: "10 Downing Street",
//   },
// ];

// const columns = [
//   {
//     title: "Name",
//     dataIndex: "name",
//     key: "name",
//   },
//   {
//     title: "Age",
//     dataIndex: "age",
//     key: "age",
//   },
//   {
//     title: "Address",
//     dataIndex: "address",
//     key: "address",
//   },
// ];

// const onFinish = (values) => {
//   console.log("Success:", values);
// };
// const onFinishFailed = (errorInfo) => {
//   console.log("Failed:", errorInfo);
// };

// function Work() {
//   const [state, dispatch] = useReducer(action, {
//     name: "",
//     age: "",
//     address: "",
//   });

//   return (
//     <div>
//       <Table dataSource={dataSource} columns={columns} />
//       <Form
//         name="basic"
//         labelCol={{
//           span: 8,
//         }}
//         wrapperCol={{
//           span: 16,
//         }}
//         style={{
//           maxWidth: 600,
//         }}
//         initialValues={{
//           remember: true,
//         }}
//         onFinish={onFinish}
//         onFinishFailed={onFinishFailed}
//         autoComplete="off"
//       >
//         <Form.Item
//           label="Username"
//           name="username"
//           rules={[
//             {
//               required: true,
//               message: "Please input your username!",
//             },
//           ]}
//         >
//           {/* name */}
//           <Input
//             onChange={(e) =>
//               dispatch({
//                 type: "CHANGE_NAME",
//                 payload: { name: e.target.name },
//               })
//             }
//           />
//         </Form.Item>
//         <Form.Item
//           label="Age"
//           name="age"
//           rules={[
//             {
//               required: true,
//               message: "Please input your Age!",
//             },
//           ]}
//         >
//           {/* age */}
//           <Input
//             onChange={(e) =>
//               dispatch({
//                 type: "CHANGE_AGE",
//                 payload: { age: e.target.age },
//               })
//             }
//           />
//         </Form.Item>
//         <Form.Item
//           label="Address"
//           name="address"
//           rules={[
//             {
//               required: true,
//               message: "Please input your Address!",
//             },
//           ]}
//         >
//           {/* adres */}
//           <Input
//             onChange={(e) =>
//               dispatch({
//                 type: "CHANGE_ADRESS",
//                 payload: { address: e.target.address },
//               })
//             }
//           />
//         </Form.Item>
//         <Form.Item
//           wrapperCol={{
//             offset: 8,
//             span: 16,
//           }}
//         >
//           <Button type="primary" htmlType="submit">
//             Submit
//           </Button>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// }

// export default Work;
import React, { useReducer } from "react";
import { Button, Form, Input, Table } from "antd";

const initialState = {
  name: "",
  age: "",
  address: "",
  data: [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
    {
      key: "3",
      name: "Jon",
      age: 40,
      address: "10 Downing Street",
    },
  ],
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "CHANGE_NAME":
      return {
        ...state,
        name: payload,
      };
    case "CHANGE_AGE":
      return {
        ...state,
        age: payload,
      };
    case "CHANGE_ADDRESS":
      return {
        ...state,
        address: payload,
      };
    case "ADD_DATA":
      const newData = {
        key: (state.data.length + 1).toString(),
        name: state.name,
        age: state.age,
        address: state.address,
      };
      return {
        ...state,
        data: [...state.data, newData],
        name: "",
        age: "",
        address: "",
      };
    default:
      return state;
  }
};

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];

const Work = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onFinish = () => {
    dispatch({ type: "ADD_DATA" });
  };

  // const onSubmit = (e) => {
  //   {
  //     e.target[0].value = "";
  //     e.target[1].value = "";
  //     e.target[2].value = "";
  //   }
  // };
  return (
    <div>
      <Table dataSource={state.data} columns={columns} />
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <Input
            value={state.name}
            onChange={(e) =>
              dispatch({
                type: "CHANGE_NAME",
                payload: e.target.value,
              })
            }
          />
        </Form.Item>
        <Form.Item
          label="Age"
          name="age"
          rules={[
            {
              required: true,
              message: "Please input your age!",
            },
          ]}
        >
          <Input
            value={state.age}
            onChange={(e) =>
              dispatch({
                type: "CHANGE_AGE",
                payload: e.target.value,
              })
            }
          />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[
            {
              required: true,
              message: "Please input your address!",
            },
          ]}
        >
          <Input
            value={state.address}
            onChange={(e) =>
              dispatch({
                type: "CHANGE_ADDRESS",
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
};

export default Work;
