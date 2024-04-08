import classNames from 'classnames/bind';
import styles from './style.module.css';
import { useSelector } from 'react-redux';
import { getUpdateApp } from 'store/updateApp/updateApp.selectors';
import { useServiceWorker } from 'hooks/useServiceWorker';

const className = classNames.bind(styles);

export const AskUpdatePopup = () => {
  const { isOpen, registration } = useSelector(getUpdateApp);
  const { handleUpdateApp, handleCancelUpdateApp } = useServiceWorker();

  const handleClickOk = () => {
    registration && handleUpdateApp(registration);
  };

  if (!isOpen) {
    return <span id="sw-update-popup"></span>;
  }

  return (
    <>
      <div className={className('popup-wrapper')}>
        <div className={className('popup')}>
          <h2 className={className('popup-title')}>Good news! &#128522;</h2>
          <p className={className('popup-text')}>
            We have just updated the app version! To get updates, click on the
            button below (the page will reload)
          </p>
          <div className={className('buttons-wrapper')}>
            <button
              className={className('button')}
              type="button"
              data-testid="closeBtn"
              onClick={handleClickOk}
            >
              Update
            </button>
            <button
              className={className('button')}
              type="button"
              data-testid="closeBtn"
              onClick={handleCancelUpdateApp}
            >
              Don&apos;t update
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
