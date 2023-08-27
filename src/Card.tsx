
export default function Card() {
  return (
    <div className="image-container">
      <img src="src/assets/bg-main-desktop.png" id="desktop" alt="" />
      <img id="mobile" src="src/assets/bg-main-mobile.png" alt="" />
      <div className="cards">
        <img src="src/assets/bg-card-front.png" alt="card front" />
        <img src="src/assets/bg-card-back.png" alt="card back" />

      </div>
     
    </div>
  );
}