import React, { useState } from "react";

const FOODS = [
  { id: 1, name: "Chicken Adobo", category: "Meals", price: 85, description: "Classic Filipino chicken in a savory sauce.", image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=600&q=80" },
  { id: 2, name: "Beef Tapa", category: "Meals", price: 95, description: "Savory beef with garlic rice and egg.", image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80" },
  { id: 3, name: "Creamy Pasta", category: "Meals", price: 110, description: "Creamy pasta with cheesy sauce.", image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=600&q=80" },
  { id: 4, name: "French Fries", category: "Snacks", price: 60, description: "Golden and crispy fries.", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80" },
  { id: 5, name: "Siomai", category: "Snacks", price: 50, description: "Steamed dumplings with dipping sauce.", image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80" },
  { id: 6, name: "Halo-Halo", category: "Desserts", price: 55, description: "Sweet Filipino dessert with ice.", image: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=600&q=80" },
  { id: 7, name: "Chocolate Cake", category: "Desserts", price: 70, description: "Soft, rich chocolate treat.", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80" },
  { id: 8, name: "Iced Coffee", category: "Drinks", price: 45, description: "Chilled coffee to refresh your day.", image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80" },
  { id: 9, name: "Strawberry Milk", category: "Drinks", price: 40, description: "Sweet and creamy strawberry drink.", image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80" },
];

const CATEGORIES = ["All", "Meals", "Snacks", "Desserts", "Drinks"];

export default function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState([]);

  const foods = FOODS.filter(
    (f) =>
      (category === "All" || f.category === category) &&
      f.name.toLowerCase().includes(search.toLowerCase())
  );

  const count = cart.reduce((s, i) => s + i.quantity, 0);
  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  const add = (food) =>
    setCart((prev) => {
      const found = prev.find((i) => i.id === food.id);
      return found
        ? prev.map((i) => (i.id === food.id ? { ...i, quantity: i.quantity + 1 } : i))
        : [...prev, { ...food, quantity: 1 }];
    });

  const change = (id, amt) =>
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + amt } : i)).filter((i) => i.quantity > 0)
    );

  const remove = (id) => setCart((prev) => prev.filter((i) => i.id !== id));

  const checkout = () => {
    if (!cart.length) return alert("Your cart is empty!");
    alert(
      "Order Summary:\n\n" +
        cart.map((i) => `${i.name} x ${i.quantity}`).join("\n") +
        `\n\nTotal: ₱${total.toFixed(2)}`
    );
  };

  return (
    <div style={{ fontFamily: "Arial", background: "#fffaf7", color: "#51443f", minHeight: "100vh" }}>
      {/* Header */}
      <header style={{ background: "#f5dce0", padding: "20px 8%", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 15 }}>
        <div style={{ color: "#a75d70", fontSize: 26, fontWeight: "bold" }}>Sweet &amp; Savory</div>
        <nav>
          <a href="#menu" style={{ margin: 10, color: "#51443f", fontWeight: "bold" }}>Menu</a>
          <a href="#cart" style={{ margin: 10, color: "#51443f", fontWeight: "bold" }}>Cart ({count})</a>
          <a href="#about" style={{ margin: 10, color: "#51443f", fontWeight: "bold" }}>About</a>
        </nav>
      </header>

      {/* Hero */}
      <section style={{ background: "#e5eadb", padding: "65px 8%" }}>
        <h1 style={{ fontSize: 48, color: "#68785b" }}>Good Food, Happy Mood!</h1>
        <p style={{ fontSize: 18, marginTop: 10 }}>Delicious meals made with love.</p>
      </section>

      {/* Menu */}
      <section id="menu" style={{ padding: "45px 8%" }}>
        <h2 style={{ textAlign: "center", color: "#a75d70", marginBottom: 20 }}>Our Menu</h2>

        <input
          placeholder="Search food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ display: "block", margin: "0 auto 20px", padding: 13, width: "100%", maxWidth: 450, borderRadius: 25, border: "1px solid #e5c8ca", outline: "none" }}
        />

        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 10, marginBottom: 30 }}>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              style={{
                padding: "11px 22px",
                borderRadius: 25,
                border: "none",
                cursor: "pointer",
                background: category === c ? "#d98596" : "#eee5f5",
                color: category === c ? "#fff" : "#51443f",
              }}
            >
              {c}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 22 }}>
          {foods.length === 0 ? (
            <p style={{ gridColumn: "1/-1", textAlign: "center" }}>No food found.</p>
          ) : (
            foods.map((f) => (
              <div key={f.id} style={{ background: "#fff", borderRadius: 15, overflow: "hidden", border: "1px solid #f0e5df", boxShadow: "0 4px 14px #0000000b" }}>
                <img src={f.image} alt={f.name} style={{ width: "100%", height: 180, objectFit: "cover" }} />
                <div style={{ padding: 18 }}>
                  <h3 style={{ color: "#75604f", marginBottom: 8 }}>{f.name}</h3>
                  <p style={{ fontSize: 14, color: "#82746d", minHeight: 42 }}>{f.description}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
                    <span style={{ color: "#a75d70", fontWeight: "bold" }}>₱{f.price.toFixed(2)}</span>
                    <button
                      onClick={() => add(f)}
                      style={{ background: "#e7b6bf", border: "none", padding: "10px 13px", borderRadius: 20, cursor: "pointer" }}
                    >
                      + Add
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Cart */}
      <section id="cart" style={{ background: "#f8e9e9", padding: "40px 8%" }}>
        <h2 style={{ textAlign: "center", color: "#a75d70", marginBottom: 25 }}>Your Cart 🛒</h2>

        {cart.length === 0 ? (
          <p style={{ textAlign: "center" }}>Your cart is empty.</p>
        ) : (
          cart.map((i) => (
            <div key={i.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: "1px solid #e8d3d3" }}>
              <div>
                <strong>{i.name}</strong>
                <p style={{ fontSize: 14 }}>₱{i.price.toFixed(2)} × {i.quantity}</p>
              </div>
              <div>
                <button onClick={() => change(i.id, -1)}>−</button>
                <span style={{ margin: "0 8px" }}>{i.quantity}</span>
                <button onClick={() => change(i.id, 1)}>+</button>
                <button onClick={() => remove(i.id)} style={{ marginLeft: 8 }}>Remove</button>
              </div>
            </div>
          ))
        )}

        <div style={{ textAlign: "right", fontSize: 20, fontWeight: "bold", margin: "25px 0", color: "#a75d70" }}>
          Total: ₱{total.toFixed(2)}
        </div>

        <button
          onClick={checkout}
          style={{ width: "100%", padding: 14, background: "#a7b99a", border: "none", borderRadius: 25, color: "#fff", fontWeight: "bold", cursor: "pointer" }}
        >
          Place Your Order
        </button>
      </section>

      {/* About */}
      <section id="about" style={{ padding: "50px 8%", textAlign: "center" }}>
        <h2 style={{ color: "#a75d70", marginBottom: 15 }}>About Sweet &amp; Savory</h2>
        <p style={{ maxWidth: 650, margin: "auto", lineHeight: 1.8 }}>
          Welcome to Sweet &amp; Savory, where every meal is made with love. Good food, made with love!
        </p>
      </section>

      <footer style={{ background: "#dce5d3", padding: 25, textAlign: "center", color: "#5e7055" }}>
        <p>Sweet &amp; Savory Restaurant</p>
        <p style={{ fontSize: 14 }}>© 2026 Sweet &amp; Savory</p>
      </footer>
    </div>
  );
}