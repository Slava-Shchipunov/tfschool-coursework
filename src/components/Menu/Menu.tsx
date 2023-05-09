import classNames from 'classnames/bind';
import styles from './style.module.css';
import { Link } from 'react-router-dom';
import { PathRoutes } from 'router/router';
import { SignOutBtn } from 'components/SignOutBtn/SignOutBtn';
import { Icon } from 'components/Icon/Icon';
import searchIconUrl from 'assets/svg/search.svg';
import heartIconUrl from 'assets/svg/heart.svg';
import { useState } from 'react';
import { Burger } from './Burger';

const className = classNames.bind(styles);

export const Menu = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleCloseMenuClick = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  const handleClickOutsideMenu = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const target = e.target as HTMLElement;
    if (!target.closest('nav')) {
      setIsOpenMenu(!isOpenMenu);
    }
  };

  return (
    <header className={className('header', { open: isOpenMenu })}>
      <Burger handleClick={handleCloseMenuClick} />
      <div className={className('wrapper')} onClick={handleClickOutsideMenu}>
        <nav className={className('nav')}>
          <ul className={className('nav-list')}>
            <li className={className('nav-item')}>
              <Link
                to={PathRoutes.player}
                className={className('nav-link')}
                onClick={handleCloseMenuClick}
              >
                <Icon url={searchIconUrl} width="20px" height="20px" />
                Search
              </Link>
            </li>
            <li className={className('nav-item')}>
              <Link
                to={PathRoutes.liked}
                className={className('nav-link')}
                onClick={handleCloseMenuClick}
              >
                <Icon url={heartIconUrl} width="20px" height="20px" />
                Liked Songs
              </Link>
            </li>
            <SignOutBtn />
          </ul>
        </nav>
      </div>
    </header>
  );
};
