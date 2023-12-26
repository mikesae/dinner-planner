import { Amplify } from 'aws-amplify';
import 'bootstrap/dist/css/bootstrap.min.css';
import config from './aws-exports';
import AuthenticatedApp from './components/app/AuthenticatedApp';
import './index.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import ReactDOM from 'react-dom/client';

Amplify.configure(config);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<AuthenticatedApp />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

// Keep as unregister until UI is more final.
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals(console.log);
