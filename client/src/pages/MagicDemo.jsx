import React, { useState, useEffect, useRef } from 'react'

const TICKERS = [
    { symbol: 'KCB', name: 'KCB Group', basePrice: 38.50 },
    { symbol: 'EQTY', name: 'Equity Group', basePrice: 52.75 },
    { symbol: 'SCOM', name: 'Safaricom', basePrice: 21.30 },
    { symbol: 'COOP', name: 'Co-operative Bank', basePrice: 14.80 },
    { symbol: 'BAT', name: 'BAT Kenya', basePrice: 480.00 },
    { symbol: 'ABSA', name: 'ABSA Bank Kenya', basePrice: 13.60 },
    { symbol: 'EABL', name: 'EABL', basePrice: 182.50 },
    { symbol: 'KQ', name: 'Kenya Airways', basePrice: 4.20 },
]

export default function MagicDemo() {
    const [rows, setRows] = useState(() =>
        TICKERS.map((t) => ({
            ...t,
            price: t.basePrice,
            change: 0,
            flash: null,
        }))
    )

    const intervalRef = useRef(null)

    // ── Price simulation ──
    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setRows((prev) =>
                prev.map((row) => {
                    const delta = (Math.random() * 0.03 - 0.015) * row.price
                    const newPrice = Math.max(0.01, row.price + delta)
                    const change = ((newPrice - row.basePrice) / row.basePrice) * 100

                    return {
                        ...row,
                        price: Number(newPrice.toFixed(2)),
                        change: Number(change.toFixed(2)),
                        flash: delta >= 0 ? 'up' : 'down',
                    }
                })
            )

            // Clear flash after 450ms
            setTimeout(() => {
                setRows((prev) => prev.map((r) => ({ ...r, flash: null })))
            }, 450)
        }, 1800)

        return () => clearInterval(intervalRef.current)
    }, [])

    // ── Scroll reveal ──
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible')
                }
            })
        }, { threshold: 0.15 })

        document.querySelectorAll('#magic .reveal').forEach(el => observer.observe(el))
        return () => observer.disconnect()
    }, [])

    return (
        <section id="magic" className="section-magic">
            <div className="container">
                <div className="magic-layout">
                    {/* Left — text */}
                    <div className="magic-text">
                        <p className="section-label reveal">Live demo</p>
                        <h2 className="section-heading reveal rd1">
                            See the work, <em>not just a description of it.</em>
                        </h2>
                        <p className="reveal rd2">
                            This is a simplified version of the NSE financial analytics dashboard
                            built for The Reggs Platform — a real-time data pipeline processing
                            market feeds, calculating risk metrics, and serving a React frontend
                            via a Spring Boot API.
                        </p>
                        <p className="reveal rd3">
                            The full platform handles live order book data, portfolio analytics,
                            and automated alerts — running on AWS ECS with Redis caching and a
                            PostgreSQL time-series store.
                        </p>
                        <p
                            className="reveal rd4"
                            style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--accent)' }}
                        >
                            <i className="ph ph-github-logo"></i> The complete source code is
                            available in a{' '}
                            <a
                                href="https://github.com/couldbereggsf/nse-analytics-platform"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: 'var(--accent)', textDecoration: 'underline' }}
                            >
                                dedicated repository
                            </a>{' '}
                            — including the backend planned for Phase 2.
                        </p>
                        <div className="reveal rd5" style={{ marginTop: '2rem' }}>
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
                                <span className="demo-title">
                                    NSE MARKET DATA — SIMULATED
                                </span>
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
                                                row.flash === 'up'
                                                    ? 'tick-flash-up'
                                                    : row.flash === 'down'
                                                        ? 'tick-flash-down'
                                                        : ''
                                            }
                                        >
                                            <td>
                                                <div className="ticker-info">
                                                    <span className="ticker-symbol">
                                                        {row.symbol}
                                                    </span>
                                                    <span className="ticker-name">
                                                        {row.name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="ticker-price">
                                                {row.price.toFixed(2)}
                                            </td>
                                            <td>
                                                <span
                                                    className={
                                                        row.change >= 0
                                                            ? 'tick-up'
                                                            : 'tick-down'
                                                    }
                                                >
                                                    {row.change >= 0 ? '+' : ''}
                                                    {row.change.toFixed(2)}%
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="demo-footer">
                                <span>Prices update every 1.8s</span>
                                <a
                                    href="https://github.com/couldbereggsf/nse-analytics-platform"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="github-link"
                                >
                                    <i className="ph ph-github-logo"></i>
                                    View Full Project on GitHub
                                    <i className="ph ph-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}