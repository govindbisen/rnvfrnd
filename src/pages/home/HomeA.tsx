import { useEffect, useState } from "react";
import "./homeA.css";

const HomeA = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 800);

        return () => clearTimeout(timer);
    }, []);

    return (
        <main className={`home-a ${isOpen ? "door-open" : ""}`}>
            {/* CONTENT BEHIND DOORS */}
            <section className="home-a-content">
                <p className="home-a-subtitle">WELCOME TO NATURE</p>

                <h1>
                    Nature is <span>Luxury</span>
                </h1>

                <p className="home-a-description">
                    Live beside water, trees, fire and animals.
                    <br />
                    Live close to nature. Live beautifully.
                </p>

                <button className="home-a-button">
                    EXPLORE
                </button>
            </section>

            {/* LEFT DOOR */}
            <div className="home-a-door home-a-door-left">
                <div className="home-a-door-panel">
                    <div className="home-a-door-inner">
                        <div className="home-a-door-decoration" />
                    </div>

                    <div className="home-a-door-handle" />
                </div>
            </div>

            {/* RIGHT DOOR */}
            <div className="home-a-door home-a-door-right">
                <div className="home-a-door-panel">
                    <div className="home-a-door-inner">
                        <div className="home-a-door-decoration" />
                    </div>

                    <div className="home-a-door-handle" />
                </div>
            </div>
        </main>
    );
};

export default HomeA;