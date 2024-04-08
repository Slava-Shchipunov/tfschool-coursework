import { AskUpdatePopup } from 'components/AskUpdatePopup/AskUpdatePopup';
import { Outlet } from 'react-router-dom';

export const App = () => {
  return (
    <>
      <Outlet />
      <AskUpdatePopup />
    </>
  );
};
