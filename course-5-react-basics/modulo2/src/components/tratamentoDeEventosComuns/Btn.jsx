export default function Btn() {
  const clickHandler = () => {
    alert("Button clicked!");
  };

  return <button onClick={clickHandler}>Click me</button>;
}
