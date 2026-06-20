// client/src/App.jsx
import Navbar from './components/Navbar'
import Hero from './pages/Hero'


// import Problem        from './pages/Problem'
// import Personalize    from './pages/Personalize'
// import Features       from './pages/Features'
// import MagicDemo      from './pages/MagicDemo'
// import QuickWin       from './pages/QuickWin'
// import Projects       from './pages/Projects'
// import Pricing        from './pages/Pricing'
// import CTA            from './pages/CTA'
// import Contact        from './pages/Contact'
// import Footer         from './components/Footer'

export default function App() {
    return (
        <>
            {/* Global decorations */}
            <div className="noise-overlay" aria-hidden="true"></div>
            <div className="scroll-progress" aria-hidden="true"></div>
            <div className="cursor-dot" aria-hidden="true"></div>
            <div className="cursor-ring" aria-hidden="true"></div>

            <Navbar />

            <main>
                <Hero />
                {/* Add sections here as you build them */}
            </main>
        </>
    )
}