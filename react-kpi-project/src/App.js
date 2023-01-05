import logo from "./logo.svg";
import "./App.scss";
import { useDispatch, useSelector } from "react-redux";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";

import { ADMINISTRATOR, REGISTRATOR } from "./redux/types";


import Loggin from "./Components/Loggin/Loggin";
import Header from "./Components/Header/Header";
import GloabalMessage from "./Components/GloabalMessage/GlobalMessage";
import SearchPage from "./Components/SearchPage/SearchPageTemplate/SearchPage";
import PrivateNotaryPage from "./Components/NotaryPage/PrivateNotaryPage"
import StateNotaryDepartment from "./Components/NotaryPage/StateNotaryDepartmentPage"
import CreateUserPage from './Components/CreateUserPage/CreateUserPage';
import GovernmentNotaryMessage from './Components/RegistratorMessages/GovernmentNotary/GovernmentNotaryMessage';
import PrivateNotaryMessage from './Components/RegistratorMessages/PrivateNotary/PrivateNotary';
import OrganizationMessage from './Components/RegistratorMessages/Organization/OrganizationMessage';
import MessageListPage from './Components/RegistratorMessages/MessageList/MessageListPage'
import MessageList from "./Components/RegistratorMessages/MessageList";


function App() {
  const currentUser = useSelector((state) => state.app.currentUser);
  const message = !!(useSelector((state) => state.app.message));

  return (
    <div className="App">
      {message && <GloabalMessage />}
      <Router>
        <Header />
        <Switch>
          <Route path="/search">
            <SearchPage />
          </Route>
          <Route path="/login">
            <Loggin />
          </Route>
          {currentUser === ADMINISTRATOR ? (<Route path="/register">
            <CreateUserPage />
          </Route>) : null}
          {currentUser === ADMINISTRATOR ? (
          <Route path="/private-notary-page/:notaryId">
            <PrivateNotaryPage />
          </Route>) : null}
          {currentUser === ADMINISTRATOR ? (
          <Route path="/state-notary-department-page/:notaryId">
            <StateNotaryDepartment />
          </Route>) : null}
          {currentUser === ADMINISTRATOR ? (
          <Route path="/new-private-notary-page">
            <PrivateNotaryPage />
          </Route>) : null}
          {currentUser === ADMINISTRATOR ? (
          <Route path="/new-state-notary-department-page">
            <StateNotaryDepartment />
          </Route>) : null}
          <Route path="/help">
            <div className="container-md mt-1">
              <div className="card bg-dark">
                <div className="card-body bg-light m-1">
                  <h2>Допомога</h2>
                  <div>
                    Даний веб-ресурс надає інформацію про державні нотаріальні контори, архіви та нотаріуси України.
                    <br />
                    <br />
                    <br />
                    У випадку виникнення проблем під час роботи з сайтом просимо
                    зв'язатися з нами за електронною адресою:

                      <p></p><b>example@gmail.com</b>
                    <br />
                    <br />
                    <br />
                    <a
                      href="https://ern.minjust.gov.ua/docs/ern_search_rules.pdf"
                      style={{ textDecoration: "underlined" }}
                      disabled=""
                    >
                      Правила пошуку інформації на сайті
                    </a>
                    <br />
                    <br />

                  </div>
                </div>
              </div>
            </div>
          </Route>
          {currentUser === REGISTRATOR ? (
          <Route path="/government-notary-message">
            <GovernmentNotaryMessage />
          </Route>) : null}
          {currentUser === REGISTRATOR ? (
          <Route path="/private-notary-message">
            <PrivateNotaryMessage />
          </Route>) : null}
          {currentUser === REGISTRATOR ? (
          <Route path="/organization-message">
            <OrganizationMessage />
          </Route>) : null}
          {currentUser === REGISTRATOR ? (
              <Route path="/my-message-list-page">
                <MessageList />
              </Route>) : null}
          {currentUser === ADMINISTRATOR ? (
          <Route path="/message-list-page">
            <MessageListPage />
          </Route>) : null}
          <Route path="/">
            <div className="container-md mt-1">
              <div className="card bg-dark">
                <div className="card-body bg-light m-1">
                  <h2>Головна</h2>
                  <hr class="dropdown-divider mb-3 mt-3" />
                  <Link to="/search" style={{ color: 'black' }}>Пошук державних нотаріальних контор</Link>
                  <hr class="dropdown-divider mb-3 mt-3" />
                  <Link to="/search" style={{ color: 'black' }}>Пошук нотаріусів</Link>
                  <hr class="dropdown-divider mb-3 mt-3" />
                  <Link to="/search" style={{ color: 'black' }}>Пошук за адресою</Link>
                </div>
              </div>
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
