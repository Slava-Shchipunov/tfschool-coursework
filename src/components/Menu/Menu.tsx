import classNames from 'classnames/bind';
import styles from './style.module.css';
import { Link } from 'react-router-dom';
import { PathRoutes } from 'router/router';
import { SignOutBtn } from 'components/SignOutBtn/SignOutBtn';
import { Icon } from 'components/Icon/Icon';
import topIconUrl from 'assets/svg/chart.svg';
import searchIconUrl from 'assets/svg/search.svg';
import heartIconUrl from 'assets/svg/heart.svg';
import { useCallback, useRef, useState } from 'react';
import { Burger } from './Burger';

const className = classNames.bind(styles);

export const Menu = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleCloseMenuClick = useCallback(() => {
    setIsOpenMenu(!isOpenMenu);
  }, [isOpenMenu]);

  const navRef = useRef(null);

  const handleClickOutsideMenu = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (navRef.current) {
      const nav: HTMLElement = navRef.current;

      if (!nav.contains(e.target as HTMLElement)) {
        setIsOpenMenu(!isOpenMenu);
      }
    }
  };
  return (
    <header
      className={className('header', { open: isOpenMenu })}
      data-testid="header"
    >
      <Burger handleClick={handleCloseMenuClick} />
      <div className={className('wrapper')} onClick={handleClickOutsideMenu}>
        <nav className={className('nav')} ref={navRef} data-testid="menu">
          <ul className={className('nav-list')}>
            <li className={className('nav-item')}>
              <Link
                to={PathRoutes.player}
                className={className('nav-link')}
                onClick={handleCloseMenuClick}
                data-testid="search-link"
              >
                <Icon url={searchIconUrl} width="20px" height="20px" />
                Search
              </Link>
            </li>
            <li className={className('nav-item')}>
              <Link
                to={PathRoutes.top}
                className={className('nav-link')}
                onClick={handleCloseMenuClick}
                data-testid="top-link"
              >
                <Icon url={topIconUrl} width="20px" height="20px" />
                Top Songs
              </Link>
            </li>
            <li className={className('nav-item')}>
              <Link
                to={PathRoutes.liked}
                className={className('nav-link')}
                onClick={handleCloseMenuClick}
                data-testid="liked-link"
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
