export const Marketing = () => {
  return (
    <div className={"grid grid-cols-4"}>
      <div
        className={
          "bg-indigo-500 w-52 h-52 transition duration-500 hover:scale-110 hover:shadow-lg hover:shadow-fuchsia-400"
        }
      >
        1
      </div>
      <div className={"bg-red-500 w-52 h-52"}>2</div>
      <div className={"bg-green-500 w-52 h-52"}>3</div>
      <div className={"bg-blue-500 w-52 h-52"}>4</div>
      <div className={"bg-blue-500 w-52 h-52"}>4</div>
      <div className={"bg-blue-500 w-52 h-52 w-"}>4</div>
      <div
        className={"w-52 h-52 bg-cover"}
        style={{ backgroundImage: "url(/img/bg.jpg)" }}
      ></div>
    </div>
  );
};
