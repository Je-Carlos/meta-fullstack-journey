function Promo(props) {
  return (
    <div>
      <div className="text-3xl font-bold underline">
        <h1>{props.title}</h1>
      </div>
      <div>
        <h2>{props.description}</h2>
      </div>
    </div>
  );
}

export default Promo;
