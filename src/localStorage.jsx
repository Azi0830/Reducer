import { Button } from "antd";

function Local() {
  const onChange = (name) => {
    localStorage.setItem("name", name);
  };

  const onDelete = () => {
    localStorage.removeItem("name");
  };

  const onClear = () => {
    localStorage.clear();
  };

  return (
    <div className="w-fell h-[100vh] flex flex-col items-center justify-center gap-[50px]">
      1111 {localStorage.getItem("name")}
      <Button onClick={() => onChange("AZIM")}>AZIM</Button>
      <Button onClick={() => onChange("ASADBEK")}>ASADBEK</Button>
      <Button onClick={() => onChange("FARRUX")}>FARRUX</Button>
      <Button onClick={onDelete}>DELETE</Button>
      <Button onClick={onClear}>CLEAR</Button>
    </div>
  );
}

export default Local;
