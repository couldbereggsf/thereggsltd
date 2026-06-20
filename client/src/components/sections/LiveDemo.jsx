import { useEffect, useState } from "react";

const BASE = [
  { symbol: "SCOM", name: "Safaricom",   price: 17.85 },
  { symbol: "EQTY", name: "Equity Group", price: 48.50 },
  { symbol: "KCB",  name: "KCB Group",   price: 35.20 },
  { symbol: "EABL", name: "EABL",        price: 155.00 },
  { symbol: "BAT",  name: "BAT Kenya",   price: 430.00 },
  { symbol: "COOP", name: "Co-op Bank",  price: 12.90 },
];

function randomDelta(price) {
  const pct = (Math.random() - 0.48) * 0.015;
  return parseFloat((price * pct).toFixed(2));
}

export default function LiveDemo() {
  const [stocks, setStocks] = useState(
    BASE.map((s) => ({ ...s, change: 0, pct: 0 }))
  );

  useEffect(() => {
    const id = setInterval(() => {
      setStocks((prev) =>
        prev.map((s) => {
          const delta    = randomDelta(s.price);
          const newPrice = parseFloat((s.price + delta).toFixed(2));
          const pct      = parseFloat(((delta / s.price) * 100).toFixed(2));
          return { ...s, price: newPrice, change: delta, pct };
        })
      );
    }, 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="livedemo">
      <div className="section-inner">
        <p className="eyebrow">Live demo</p>
        <h2 className="section-heading">
          See the work, <em>not just a description of it.</em>
        </h2>
        <p className="livedemo__desc">
          A simplified version of the NSE financial analytics dashboard built for
          The Reggs Platform — a real-time data pipeline processing market feeds,
          calculating risk metrics, and serving a React frontend via a Spring Boot API.
        </p>
        <p className="livedemo__tech">
          The full platform handles live order book data, portfolio analytics, and
          automated alerts — running on AWS ECS with Redis caching and a PostgreSQL
          time-series store.
        </p>
        <a href="#projects" className="btn btn--outline livedemo__case-link">
          View full case study
        </a>

        <div className="livedemo__ticker">
          <div className="livedemo__ticker-header">
            <span className="livedemo__ticker-label">NSE MARKET DATA — SIMULATED</span>
            <span className="livedemo__live-badge">LIVE</span>
          </div>

          <table className="livedemo__table">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Name</th>
                <th>Price (KES)</th>
                <th>Change</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((s) => (
                <tr key={s.symbol}>
                  <td className="livedemo__symbol">{s.symbol}</td>
                  <td>{s.name}</td>
                  <td className="livedemo__price">{s.price.toFixed(2)}</td>
                  <td className={`livedemo__change livedemo__change--${s.change >= 0 ? "up" : "down"}`}>
                    {s.change >= 0 ? "+" : ""}{s.change.toFixed(2)}{" "}
                    ({s.pct >= 0 ? "+" : ""}{s.pct}%)
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="livedemo__footer">
            <span>Prices update every 1.8s</span>
            <a
              href="https://github.com/couldbereggsf"
              target="_blank"
              rel="noreferrer"
              className="livedemo__gh-link"
            >
              View source on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
