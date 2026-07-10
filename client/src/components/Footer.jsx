import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import styles from './Footer.module.css'

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    <div className={styles.brand}>
                        <Link to="/" className={styles.logo}>
                            <img src={logo} alt="The Reggs Limited logo" className={styles.logoMark} />
                            <span className={styles.logoName}>Reagan Fwamba</span>
                        </Link>
                        <p>Full-Stack Engineer building secure, scalable systems that deliver measurable business value.</p>
                    </div>
                    <div className={styles.links}>
                        <h4>Navigation</h4>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/projects">Projects</Link></li>
                            <li><Link to="/services">Services</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>
                    </div>
                    <div className={styles.links}>
                        <h4>Expertise</h4>
                        <ul>
                            <li><a href="#">Java Development</a></li>
                            <li><a href="#">Cloud Architecture</a></li>
                            <li><a href="#">Security Consulting</a></li>
                            <li><a href="#">Full-Stack Engineering</a></li>
                            <li><a href="#">DevSecOps</a></li>
                        </ul>
                    </div>
                </div>
                <div className={styles.bottom}>
                    <p>&copy; 2025 Reagan Fwamba. All rights reserved.</p>
                    <p>Nairobi, Kenya</p>
                </div>
            </div>
        </footer>
    )
}