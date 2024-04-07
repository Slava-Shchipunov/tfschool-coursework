import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { router } from 'router/router';
import { store } from 'store/store';
import 'index.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from 'reportWebVitals';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'api/firebase';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

onAuthStateChanged(auth, () => {
  root.render(
    <StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </StrictMode>
  );
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
