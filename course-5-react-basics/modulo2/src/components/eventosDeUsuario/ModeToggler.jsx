import { useState } from "react";

export default function ModeToggler() {
  const [darkModeOn, setDarkModeOn] = useState(false);
  const darkMode = <h1>Dark Mode</h1>;
  const lightMode = <h1>Light Mode</h1>;

  const handleClick = () => {
    const nextMode = !darkModeOn;
    setDarkModeOn(nextMode);

    if (nextMode) {
      alert("Dark mode is on");
    } else {
      alert("Light mode is on");
    }
  };

  return (
    <>
      {darkModeOn ? darkMode : lightMode}
      <button onClick={handleClick}>Toggle Mode</button>
    </>
  );
}
