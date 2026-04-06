const Example = () => {
  const getRandom = () => Math.floor(Math.random() * 10) + 1;
  return (
    <div className="text-2xl font-bold">
      <h1>{getRandom() >= 0.5 ? "Yes" : "No"}</h1>
    </div>
  );
};
export default Example;
