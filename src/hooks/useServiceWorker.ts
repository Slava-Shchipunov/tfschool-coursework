import { useCallback, useEffect } from 'react';
import * as serviceWorkerRegistration from '../serviceWorkerRegistration';
import { useAppDispatch } from './useAppDispatch';
import { setHasUpdates } from 'store/updateApp/updateApp.slice';
import { checkServiceWorkerUpdateThunk } from 'store/updateApp/updateApp.thunk';
import { useLocation } from 'react-router-dom';

export type UseServiceWorker = {
  handleUpdateApp: (registration: ServiceWorkerRegistration) => void;
  handleCancelUpdateApp: () => void;
};

export const useServiceWorker = (): UseServiceWorker => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const onSWUpdate = useCallback(
    (registration: ServiceWorkerRegistration) => {
      dispatch(setHasUpdates({ isOpen: true, registration }));
    },
    [dispatch]
  );

  const handleUpdateApp = useCallback(
    (registration: ServiceWorkerRegistration) => {
      dispatch(setHasUpdates({ isOpen: false, registration: null }));

      if (registration && registration.waiting) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      }
    },
    [dispatch]
  );

  const handleCancelUpdateApp = useCallback(() => {
    dispatch(setHasUpdates({ isOpen: false, registration: null }));
  }, [dispatch]);

  /** Регистрируем service worker и подписываемся на события наличия обновлений */
  useEffect(() => {
    const handleControllerChange = () => {
      window.location.reload();
    };

    const unregisterControllerChange = () => {
      navigator.serviceWorker.removeEventListener(
        'controllerchange',
        handleControllerChange
      );
    };

    serviceWorkerRegistration.register({
      onUpdate: onSWUpdate,
    });

    navigator.serviceWorker.addEventListener(
      'controllerchange',
      handleControllerChange
    );

    return unregisterControllerChange;
  }, [onSWUpdate]);

  /** Проверяем обновления при spa переходах */
  useEffect(() => {
    dispatch(checkServiceWorkerUpdateThunk());
  }, [dispatch, location.pathname]);

  return { handleUpdateApp, handleCancelUpdateApp };
};
