function Card({ title, text, color }) {
  console.log(color);
  return (
    <div className="card bg-lg p-8 rounded-xl flex flex-col items-center">
      <h2 className="uppercase tracking-wide">{title}</h2>
      <h2
        className={`m-auto text-5xl font-extrabold ${
          color ? `text-${color}` : "text-red"
        }`}
        style={{ color: color || "red" }}
      >
        {text}
      </h2>
    </div>
  );
}

export default Card;
