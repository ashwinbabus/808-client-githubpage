import React, { useState } from "react";
import "./header.styles.scss";
import { ReactComponent as Logo } from "../../assets/white.svg";
import { Link } from "react-router-dom";
import { toggleCartHidden } from "../../redux/cart/cart.actions";
import { connect } from "react-redux";

const Header = ({ transparent, background, toggleCartHidden }) => {
  const [isBurgerMenuHidden, setIsBurgerMenuHidden] = useState(true);

  return (
    <div className={`${transparent ? "" : "header"}`}>
      <div
        className={`header__container
      ${background === true ? "header-background" : ""}`}
      >
        <div className="header__navbar">
          <Link to="/">
            <Logo className="header__logo" />
          </Link>

          <div className="header__navigation">
            <div
              className="header__burger"
              onClick={() => setIsBurgerMenuHidden(!isBurgerMenuHidden)}
            >
              <div className="burger__bar"></div>
              <div className="burger__bar"></div>
              <div className="burger__bar"></div>
            </div>

            <div className="header__navlinks">
              <ul>
                <li>
                  <Link to="/shop">SHOP ALL</Link>
                </li>
                <li>
                  <Link to="/shop/keyboard">KEYBOARD</Link>
                </li>
                <li>
                  <Link to="/shop/mouse">MOUSE</Link>
                </li>

                <li className="accessories">
                  ACCESSORIES ▼
                  <div className="options__container">
                    <ul className="accessories__options">
                      <li className="accessories__suboption  suboption__first">
                        <Link to="/shop/keycaps">KEY CAPS</Link>
                      </li>
                      <li className="accessories__suboption">
                        <Link to="/shop/switch">SWITCHES</Link>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>

            <div className="header__cart">
              <ul className="header__carticons">
                <Link to="/my-account">
                  <li className="glyphicon glyphicon-user" />
                </Link>
                <li
                  className="glyphicon glyphicon-shopping-cart"
                  onClick={toggleCartHidden}
                ></li>
              </ul>
            </div>
          </div>

          {isBurgerMenuHidden ? null : (
            <div className="header__mobile-menu">
              <ul>
                <li>
                  <Link to="/shop/keyboard">KEYBOARD</Link>
                </li>
                <li>
                  <Link to="/shop/mouse">MOUSE</Link>
                </li>
                <li>
                  <Link to="/shop/keycaps">KEYCAPS</Link>
                </li>
                <li>
                  <Link to="/shop/Mechanical Switches">SWTICHES</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});

export default connect(null, mapDispatchToProps)(Header);
