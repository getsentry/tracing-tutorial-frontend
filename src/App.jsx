import { useState } from "react";
import shoppingPic from "./img/shopping.png";
import "./App.css";

// URL of the companion Express backend. Override with VITE_BACKEND_URL in a
// .env file; defaults to the local backend from the tutorial.
const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL ?? "http://localhost:3001";

function App() {
  const [data, setData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  async function getProduct(slug) {
    setData(null);
    const url = `${BACKEND_URL}/products/${slug}/`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error.message);
      throw error;
    }
    if (!modalOpen) toggleModal();
  }

  function toggleModal() {
    const modalDiv = document.querySelector(".modal");
    if (modalDiv.classList.contains("hidden")) {
      modalDiv.classList.remove("hidden");
      setModalOpen(true);
    } else {
      modalDiv.classList.add("hidden");
      setModalOpen(false);
    }
  }

  return (
    <div className="App">
      <header className="App-header"></header>
      <div className="page-container">
        <h1>This is your one-stop shop!</h1>
        <img src={shoppingPic} className="App-logo" alt="logo" />
        <p>Click on an item to learn more about our products</p>
        <div className="btn-container">
          <div className="btn-parent">
            <button
              className="btn"
              onClick={() => getProduct("kitten-mittens")}
            >
              Kitten Mittens
            </button>
          </div>
          <div className="btn-parent">
            <button className="btn" onClick={() => getProduct("doggles")}>
              Doggles
            </button>
          </div>
          <div className="btn-parent">
            <button className="btn" onClick={() => getProduct("clown-shoes")}>
              Clown Shoes
            </button>
          </div>
          <div className="btn-parent">
            <button className="btn" onClick={() => getProduct("nonfat-water")}>
              Nonfat Water
            </button>
          </div>
        </div>

        <p>"If we don't have it, you don't need it."</p>

        <div className="modal hidden">
          <p className={"modal-exit"} onClick={toggleModal}>
            X
          </p>
          {data ? (
            <>
              <h2>{data.title}</h2>
              <img
                src={`${BACKEND_URL}/${data.imgPath}`}
                alt="item-image"
              />
              <p className="modal-description">{data.description}</p>
            </>
          ) : (
            <p>Something went wrong.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
