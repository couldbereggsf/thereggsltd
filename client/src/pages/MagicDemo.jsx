// src/pages/MagicDemo.jsx
//
// Screen 6 — Shows the magic😁
// A live-ticking NSE market dashboard that runs entirely in the browser.
// No backend, no API keys, no cost. Pure client-side simulation.
//
// WHY useEffect + useRef FOR THE INTERVAL:
// setInterval lives outside React's rendering cycle.
// If we just called setInterval at the top level, it would
// create a new interval on every render — a memory leak.
// useEffect runs ONCE after mount, and returns a cleanup function
// that clears the interval when the component unmounts.
// useRef holds the prices between renders without causing re-renders.

import { useState, useEffect, useRef } from 'react'
import useScrollReveal from '../hooks/useScrollReveal'

const TICKERS = [
  { symbol: 'KCB',  name: 'KCB Group',           basePrice: 38.50  },
  { symbol: 'EQTY', name: 'Equity Group',         basePrice: 52.75  },
  { symbol: 'SCOM', name: 'Safaricom',             basePrice: 21.30  },
  { symbol: 'COOP', name: 'Co-operative Bank',     basePrice: 14.80  },
  { symbol: 'BAT',  name: 'BAT Kenya',             basePrice: 480.00 },
  { symbol: 'ABSA', name: 'ABSA Bank Kenya',       basePrice: 13.60  },
]

export default function MagicDemo() {
  const sectionRef = useScrollReveal()

  // prices holds the current price for each ticker
  // I have stored it as an array of objects matching TICKERS
  const [rows, setRows]   = useState(() =>
    TICKERS.map((t) => ({
      ...t,
      price:  t.basePrice,
      change: 0,
      flash:  null,   // 'up' | 'down' | null — drives the flash animation
    }))
  )

  // intervalRef lets me clear the interval in the cleanup function
  const intervalRef = useRef(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setRows((prev) =>
        prev.map((row) => {
          // Random delta between -1.5% and +1.5% of the price
          const delta    = (Math.random() * 0.03 - 0.015) * row.price
          const newPrice = Math.max(0.01, row.price + delta)
          const change   = ((newPrice - row.basePrice) / row.basePrice) * 100
          return {
            ...row,
            price:  +newPrice.toFixed(2),
            change: +change.toFixed(2),
            flash:  delta >= 0 ? 'up' : 'down',
          }
        })
      )

      // Remove the flash class after the animation plays (450ms)
      setTimeout(() => {
        setRows((prev) => prev.map((r) => ({ ...r, flash: null })))
      }, 450)
    }, 1800)

    // Cleanup — runs when the component unmounts
    return () => clearInterval(intervalRef.current)
  }, []) // Empty array = run once on mount only

  return (
    <section
      id="magic"
      className="section-magic"
      ref={sectionRef}
      aria-label="Live market dashboard demo"
    >
      <div className="container">
        <div className="magic-layout">

          {/* Left — text */}
          <div className="magic-text">
            <p className="section-label reveal">Live demo</p>
            <h2 className="section-heading reveal rd1">
              See the work, <em>not just a description of it.</em>
            </h2>
            <p className="reveal rd2">
              This is a simplified version of the NSE financial analytics
              dashboard built for The Reggs Platform — a real-time data
              pipeline processing market feeds, calculating risk metrics,
              and serving a React frontend via a Spring Boot API.
            </p>
            <p className="reveal rd3">
              The full platform handles live order book data, portfolio
              analytics, and automated alerts — running on AWS ECS with
              Redis caching and a PostgreSQL time-series store.
            </p>
            <div className="reveal rd4" style={{ marginTop: '2rem' }}>
              <a href="#projects" className="btn btn-ghost">
                View full case study
                <i className="ph ph-arrow-right" aria-hidden="true"></i>
              </a>
            </div>
          </div>

          {/* Right — live ticker panel */}
          <div className="reveal rd2">
            <div className="demo-panel">

              <div className="demo-header">
                <span className="demo-title">NSE MARKET DATA — SIMULATED</span>
                <span className="demo-live">
                  <span className="live-dot" aria-hidden="true"></span>
                  LIVE
                </span>
              </div>

              <table
                className="ticker-table"
                aria-label="Nairobi Stock Exchange simulated prices"
              >
                <thead>
                  <tr>
                    <th scope="col">Symbol</th>
                    <th scope="col">Price (KES)</th>
                    <th scope="col">Change</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr
                      key={row.symbol}
                      className={
                        row.flash === 'up'   ? 'tick-flash-up'   :
                        row.flash === 'down' ? 'tick-flash-down' :
                        ''
                      }
                    >
                      <td>
                        <span className="tick-name">{row.symbol}</span>
                      </td>
                      <td>
                        <span className="tick-price">{row.price.toFixed(2)}</span>
                      </td>
                      <td>
                        <span className={row.change >= 0 ? 'tick-up' : 'tick-down'}>
                          {row.change >= 0 ? '+' : ''}{row.change.toFixed(2)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="demo-footer">
                <span>Prices update every 1.8s</span>
                <a
                  href="https://github.com/coudbereggsf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View source on GitHub
                  <i className="ph ph-arrow-right" aria-hidden="true"></i>
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
