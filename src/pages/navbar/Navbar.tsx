import { useState } from "react";
import { CategoryInterface } from "../../types/category.interface";
import { LuMenu } from "react-icons/lu";
import "./Navbar.css";

const Navbar = ({
  active,
  setActive,
}: {
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const categories: CategoryInterface[] = [
    {
      name: "New Games",
      id: "new",
    },
    {
      name: "Slots",
      id: "slots",
    },
    {
      name: "Jackpots",
      id: "jackpots",
    },
    {
      name: "Live",
      id: "live",
    },
    {
      name: "Blackjack",
      id: "blackjack",
    },
    {
      name: "Roulette",
      id: "roulette",
    },
    {
      name: "Table",
      id: "table",
    },
    {
      name: "Poker",
      id: "poker",
    },
    {
      name: "Other",
      id: "other",
    },
  ];

  const handleClick = (id: string) => {
    setActive(id);
  };

  const menuClick = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">Top Games</div>
          <button className="menu-icon me" onClick={() => menuClick()}>
            <LuMenu />
          </button>

          <div className={`nav-menu active ${showMenu ? "responsive" : ""}`}>
            {categories.map((category, index) => {
              return (
                <li
                  key={index}
                  className={`nav-item ${
                    active == category.id ? "nav-active" : ""
                  }`}
                  onClick={() => handleClick(category.id)}
                >
                  <span className="nav-links">{category.name}</span>
                </li>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
