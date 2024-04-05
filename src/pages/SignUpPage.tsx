import { SignUpForm } from 'components/Forms/SignUpForm/SignUpForm';
import { getUser } from 'store/user/user.selectors';
import classNames from 'classnames/bind';
import styles from './style.module.css';
import { useSelector } from 'react-redux';
import { Loader } from 'components/Loader/Loader';
import { userSignUpThunk } from 'store/user/user.thunk';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { TUserCreate } from 'types/types';
import { Navigate } from 'react-router-dom';
import { auth } from 'api/firebase';
import { PathRoutes } from 'router/router';
import { ErrorPopup } from 'components/ErrorPopup/ErrorPopup';

const className = classNames.bind(styles);

export const SignUpPage = () => {
  const dispatch = useAppDispatch();
  const { isLoading, userErrorMessage } = useSelector(getUser);

  const handleSignUp = async (data: TUserCreate) => {
    await dispatch(userSignUpThunk(data));
  };

  if (auth.currentUser) {
    return <Navigate to={PathRoutes.player} replace />;
  }

  return (
    <div className="wrapper">
      <h2>Sign up</h2>
      <SignUpForm signUp={handleSignUp} />
      {userErrorMessage && <ErrorPopup errorMessage={userErrorMessage} />}
      {isLoading && (
        <div className={className('loader-wrapper')}>
          <Loader />
        </div>
      )}
    </div>
  );
};
