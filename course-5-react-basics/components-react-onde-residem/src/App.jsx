import Promo from "./components/Promo";
import Footer from "./components/Footer";
import Bag from "./components/props and children/Bag";
import Apples from "./components/props and children/Apples";
import Pears from "./components/props and children/Pears";

const App = () => {
  return (
    <>
      <Promo
        title="Don't miss this deal!"
        description="Subscribe to my newsletter and get all the shop items at 50% off!"
      />
      <Footer copyrightText="All rights reserved." />
      <Bag children={<Apples color="red" number={5} />} />
      <Bag children={<Pears friend="Alice" />} />
    </>
  );
};

export default App;
