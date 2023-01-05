import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "src/redux/actions";
import SearchBar from "../SearchBar/SearchBar";
import { useHistory } from "react-router-dom";
import {
  SEARCH_PRIVATE_NOTATY,
  SEARCH_STATE_NOTARY_DEPARTMENT,
  SEARCH_BY_ADDRESS,
  ADMINISTRATOR,
} from "src/redux/types";
import { SEARCH_USERS } from "../../../redux/types";

const SearchItemUser = (props) => {
  const currentUser = useSelector((state) => state.app.currentUser);
  const dispatch = useDispatch();

  return (
    <div className="card">
      <div className="card-body">
        <div className="card-title">
          <img
            style={{ width: 30 + "px", height: 30 + "px", margin: 5 + "px" }}
            src="https://image.flaticon.com/icons/png/128/2919/2919600.png"
          />
          <span className="fw-bold">Електронна адреса: </span>
          {props.login}
        </div>
        <div className="card-text">
          Ім'я: {`${props.firstName} ${props.lastName} ${props.middleName}`};
          Роль: {props?.role}
        </div>
        {currentUser === ADMINISTRATOR && props?.role !== "admin" ? (
          <div class="d-flex justify-content-end">
            <button
              onClick={() => {
                if (window.confirm('Видалити користувача?')) {
                  dispatch(actions.removeUser(props.id));
                }
              }}
              className="btn btn-danger m-1"
            >
              Видалити
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const SearchItemDepartment = (props) => {
  const currentUser = useSelector((state) => state.app.currentUser);
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <div className="card">
      <div className="card-body">
        <div className="card-title">
          <img
            style={{ width: 30 + "px", height: 30 + "px", margin: 5 + "px" }}
            src="https://icons.iconarchive.com/icons/icons8/windows-8/512/Business-Department-icon.png"
          />
          <span className="fw-bold">Відомості про заклад: </span>
          {props.name}
        </div>
        <div className="card-text">Контактні дані: {props?.contact?.phoneNumbers?.[0]?.phoneNumber}</div>
        <div className="card-text">Адреса: {props?.contact?.address}</div>
        {currentUser === ADMINISTRATOR ? (
          <div class="d-flex justify-content-end">
            <button
              onClick={() =>
                history.push("/state-notary-department-page/" + props.id)
              }
              className="btn btn-primary m-1"
            >
              Редагувати
            </button>
            <button
              onClick={() => { 
                if (window.confirm('Видалити організацію?')) {
                  dispatch(actions.deleteDepartment(props.id));
                }
              }}
              className="btn btn-danger m-1"
            >
              Видалити
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const SearchItemNotary = (props) => {
  console.log("props:", props);
  const currentUser = useSelector((state) => state.app.currentUser);
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <div className="card">
      <div className="card-body">
        <div className="card-title">
          <img
            style={{ width: 30 + "px", height: 30 + "px", margin: 5 + "px" }}
            src="https://icon-library.com/images/department-icon/department-icon-0.jpg"
          />
          <span className="fw-bold">Відомості про нотаріуса: </span>
          {props.lastName} {props.firstName} {props.middleName}
        </div>
        <div className="card-text">
          Номер свідоцтва: {props.certificateNumber}, Телефонний номер:{" "}
          {props?.contact?.phoneNumbers[0]?.phoneNumber}
        </div>
        <p className="card-text">
          Адреса: {props.contact.address}
        </p>
        {currentUser === ADMINISTRATOR ? (
          <div class="d-flex justify-content-end">
            <button
              onClick={() => history.push("/private-notary-page/" + props.id)}
              className="btn btn-primary m-1"
            >
              Редагувати
            </button>
            <button
              onClick={() => {
                if (window.confirm('Видалити нотаріуса?')) {

                  dispatch(actions.deleteNotary(props.id));
                }
              }}
              className="btn btn-danger m-1"
            >
              Видалити
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const SearchResults = () => {
  const dispatch = useDispatch();
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const items = useSelector((state) => state.search.data);
  const departmentTypes = useSelector((state) => state.search.departmentTypes);
  const searchBarType = useSelector((state) => state.search.searchType);

  const checkDepartmentType = (type) => {
    const index = departmentTypes.indexOf(type);
    if (index !== -1) {
      dispatch(
        actions.changeNotaryType(
          departmentTypes.filter((depType) => depType !== type)
        )
      );
      return;
    }
    dispatch(actions.changeNotaryType([...departmentTypes, type]));
  };

  const getPageNumber = () => {
    if (!items || !items.length) {
      return 0;
    }
    if (items.length / itemsPerPage && items.length % itemsPerPage != 0) {
      return Math.floor(items.length / itemsPerPage) + 1;
    }
    if (items.length / itemsPerPage && items.length % itemsPerPage == 0) {
      return items.length / itemsPerPage;
    }
  };

  const nextPage = () => {
    if (items && getPageNumber() > currentPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (1 < currentPage) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getItemsHtml = () => {
    if (items && items.length) {
      return items.slice(currentPage - 1, itemsPerPage).map((item) => {
        if (searchBarType !== SEARCH_USERS) {
          if (!!item.name) {
            return <SearchItemDepartment {...item}></SearchItemDepartment>;
          } else {
            return <SearchItemNotary {...item}></SearchItemNotary>;
          }
        } else {
          return <SearchItemUser {...item}></SearchItemUser>;
        }
      });
    } else {
      return <h4>Інформацію не знайдено</h4>;
    }
  };

  return (
    <div className="card bg-dark">
      <div className="card-body bg-light m-1">
        <h3>Результати пошуку</h3>
        {searchBarType === SEARCH_BY_ADDRESS ? (
          <div className="container-fluid">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
                checked={departmentTypes.includes(
                  SEARCH_STATE_NOTARY_DEPARTMENT
                )}
                onClick={() =>
                  checkDepartmentType(SEARCH_STATE_NOTARY_DEPARTMENT)
                }
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Державні нотаріальні контори
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckChecked"
                checked={departmentTypes.includes(SEARCH_PRIVATE_NOTATY)}
                onClick={() => checkDepartmentType(SEARCH_PRIVATE_NOTATY)}
              />
              <label className="form-check-label" htmlFor="flexCheckChecked">
                Приватні нотаріуси
              </label>
            </div>
          </div>
        ) : null}
        <hr className="dropdown-divider mb-3 mt-3" />
        <div
          className="container-fluid overflow-auto"
          style={{ height: 450 + "px" }}
        >
          {getItemsHtml()}
        </div>
        <hr className="dropdown-divider mb-3 mt-3" />
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <a
              className="page-link"
              onClick={() => {
                prevPage();
              }}
              aria-label="Previous"
            >
              <span aria-hidden="true" style={{ color: 'black' }}>&laquo;</span>
            </a>
          </li>
          <li className="page-item">
            <span className="page-link" style={{ color: 'black' }} href="#">
              {currentPage}
            </span>
          </li>
          <li className="page-item">
            <span className="page-link" style={{ color: 'black' }} href="#">
              /
            </span>
          </li>
          <li className="page-item">
            <span className="page-link" style={{ color: 'black' }} href="#">
              {getPageNumber()}
            </span>
          </li>
          <li className="page-item">
            <a
              className="page-link"
              onClick={() => {
                nextPage();
              }}
              aria-label="Next"
            >
              <span aria-hidden="true" style={{ color: 'black' }}>&raquo;</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SearchResults;
