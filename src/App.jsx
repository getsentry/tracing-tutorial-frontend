import { useState } from "react";
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
    <div className="app">
      <header className="navbar">
        <div className="navbar-inner">
          <span className="brand">🛍️ One-Stop Shop</span>
          <nav className="nav-links">
            <a href="#products">Products</a>
            <a href="#about">About</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <h1>Everything you need. Nothing you don't.</h1>
          <p className="hero-tagline">
            "If we don't have it, you don't need it."
          </p>
        </section>

        <section id="products" className="products">
          <h2 className="section-title">Featured Products</h2>
          <div className="product-grid">
            <article className="product-card">
              <div className="product-thumb">🧤</div>
              <h3 className="product-name">Kitten Mittens</h3>
              <button
                className="btn"
                onClick={() => getProduct("kitten-mittens")}
              >
                View details
              </button>
            </article>
            <article className="product-card">
              <div className="product-thumb">🕶️</div>
              <h3 className="product-name">Doggles</h3>
              <button className="btn" onClick={() => getProduct("doggles")}>
                View details
              </button>
            </article>
            <article className="product-card">
              <div className="product-thumb">🤡</div>
              <h3 className="product-name">Clown Shoes</h3>
              <button className="btn" onClick={() => getProduct("clown-shoes")}>
                View details
              </button>
            </article>
            <article className="product-card">
              <div className="product-thumb">💧</div>
              <h3 className="product-name">Nonfat Water</h3>
              <button className="btn" onClick={() => getProduct("nonfat-water")}>
                View details
              </button>
            </article>
          </div>
        </section>
      </main>

      <div className="modal hidden">
        <div className="modal-content">
          <button
            className="modal-exit"
            onClick={toggleModal}
            aria-label="Close"
          >
            ×
          </button>
          {data ? (
            <>
              <img
                className="modal-img"
                src={`${BACKEND_URL}/${data.imgPath}`}
                alt={data.title}
              />
              <h2>{data.title}</h2>
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
