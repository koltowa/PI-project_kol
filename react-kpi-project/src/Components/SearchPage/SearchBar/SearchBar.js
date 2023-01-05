import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "src/redux/actions";
import {
  SWITCH_SEARCH_TYPE,
  SEARCH_BY_ADDRESS,
  SEARCH_BY_NAME,
  SEARCH_BY_NOTARY,
  SEARCH_ADMINISTRATOR,
  SEARCH_REGISTRATOR,
  SEARCH_USERS,
  ADMINISTRATOR,
} from "src/redux/types";
import { useForm } from "react-hook-form";
import randomStr from "src/utils/random";
import { REGISTRATOR } from "../../../redux/types";
import { replaceDefault } from "./SearchBar.utils";

const SearchUsers = (props) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm();


  const onSubmitBtnClick = () => {
    if (props.searchKey === null) {
      return;
    }
    if (!currentUserType) {
      //dispatch eror message with
    }
    dispatch(actions.fetchSearchData({
      email: currentUsername,
      name: '',
    }));
  };

  useEffect(onSubmitBtnClick, [props.searchKey]);

  const currentUserType = watch().userType;
  const currentUsername = watch().username;

  return (
    <form className="container-fluid d-grid gap-3">
      {/* <select class="form-select" aria-label="Default select example"
        {...register("userType")}
      >
        <option value={ADMINISTRATOR}>
          Адміністратори
        </option>
        <option value={REGISTRATOR}>
          Реєстратори
        </option>
      </select> */}
      <input
        type="text"
        class="form-control"
        placeholder="Email користувача"
        {...register("username")}
      ></input>
    </form>
  );
};

const SearchByAddressField = (props) => {
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const currentRegion = watch().region;
  const currentArea = watch().area;
  const currentSettlement = watch().settlement;
  const currentAddress = watch().address;

  useEffect(() => {
    if (currentRegion === "default") {
      dispatch(actions.fetchRegion());
    } else {
      dispatch(actions.fetchArea(currentRegion));
    }
    setValue("area" ,"default");
    setValue("settlement" ,"default");
  }, [currentRegion]);

  useEffect(() => {
    if (currentArea === "default") {
      dispatch(actions.fetchArea(currentRegion));
    } else {
      dispatch(actions.fetchSettlement(currentArea));
    }
    setValue("settlement" ,"default") ;
  }, [currentArea]);

  const regions = useSelector((state) => state.search.region);
  const getRegionsHtml = () => {
    return regions.map((region) => (
      <option value={region.id}>{region.name}</option>
    ));
  };
  const areas = useSelector((state) => state.search.area);
  const getAreasHtml = () => {
    return areas.map((region) => (
      <option value={region.id}>{region.name}</option>
    ));
  };
  const settlements = useSelector((state) => state.search.settlement);
  const getSettlementsHtml = () => {
    return settlements.map((region) => (
      <option value={region.id}>{region.name}</option>
    ));
  };
  const onSubmitBtnClick = () => {
    if (props.searchKey === null) {
      return;
    }
    if (
      currentRegion === "default" ||
      currentArea === "default"
    ) {
      //error
      return;
    }
    dispatch(
      actions.fetchSearchData({
        regionId: replaceDefault(currentRegion),
        areaId: replaceDefault(currentArea),
        localityId: replaceDefault(currentSettlement),
        address: currentAddress,
      })
    );
  };
  useEffect(onSubmitBtnClick, [props.searchKey]);

  return (
    <form className="container-fluid d-grid gap-3">
      <select
        class="form-select"
        {...register("region")}
        aria-label="Default select example"
      >
        <option value="default" disabled selected>
          Регіон
        </option>
        {getRegionsHtml()}
      </select>
      <select
        class="form-select"
        {...register("area")}
        aria-label="Default select example"
        disabled={currentRegion === "default"}
      >
        <option value="default" disabled  selected>
          Район
        </option>
        {getAreasHtml()}
      </select>
      <select
        class="form-select"
        {...register("settlement")}
        disabled={currentArea === "default" || currentRegion==="default"}
        aria-label="Default select example"
      >
        <option value="default" disabled  selected>
          Населений пункт
        </option>
        {getSettlementsHtml()}
      </select>
      <input
        type="text"
        {...register("address")}
        class="form-control"
        id="exampleFormControlInput1"
        placeholder="Адреса"
      ></input>
    </form>
  );
};

const SearchByNameField = (props) => {
  const dispatch = useDispatch();

  const onSubmitBtnClick = () => {
    if (props.searchKey === null) {
      return;
    }
    if (!name.current) {
      //error
    }
    dispatch(actions.fetchSearchData(name.current.value));
  };
  const name = useRef("");
  useEffect(onSubmitBtnClick, [props.searchKey]);
  return (
    <div className="container-fluid d-grid gap-3">
      <input
        type="text"
        class="form-control"
        placeholder="Назва закладу"
        ref={name}
      ></input>
    </div>
  );
};

const SearchByNotaryField = (props) => {
  const dispatch = useDispatch();
  const {
    register,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmitBtnClick = () => {
    if (props.searchKey === null) {
      return;
    }
    if (
      !currentNumber &&
      !currentLastName &&
      !currentFirstName &&
      !currentMiddleName
    ) {
      //dispatch eror message with
    }
    const data = {}
    currentNumber ? data["certificateNumber"] = currentNumber : (()=>{})();
    currentLastName ? data["lastName"] = currentLastName : (()=>{})();
    currentFirstName ? data["firstName"] = currentFirstName : (()=>{})();
    currentMiddleName ? data["middleName"] = currentMiddleName : (()=>{})();
    dispatch(actions.fetchSearchData(data));
  };

  const currentNumber = watch().number;
  const currentLastName = watch().lastName;
  const currentFirstName = watch().firstName;
  const currentMiddleName = watch().middleName;

  useEffect(onSubmitBtnClick, [props.searchKey]);
  return (
    <form className="container-fluid d-grid gap-3">
      <input
        type="text"
        class="form-control"
        placeholder="Номер свідоцтва"
        {...register("number")}
      ></input>
      <input
        type="text"
        class="form-control"
        placeholder="Прізвище"
        {...register("lastName")}
      ></input>
      <input
        type="text"
        class="form-control"
        placeholder="Ім'я"
        {...register("firstName")}
      ></input>
      <input
        type="text"
        class="form-control"
        placeholder="По батькові"
        {...register("middleName")}
      ></input>
    </form>
  );
};

const SearchBar = () => {
  const dispatch = useDispatch();

  const [key, setKey] = useState(null);

  const searchBarType = useSelector((state) => state.search.searchType);
  const currentUser = useSelector((state) => state.app.currentUser);

  const onSearchTypeSelect = (searchType) => {
    setKey(null);
    dispatch(actions.clearSearchData())
    dispatch(actions.switchSearchType(searchType));
  };

  return (
    <div className="card bg-dark">
      <div className="card-body bg-light m-1">
        <h3 className="card-title">Пошук</h3>
        <div className="flex-column">
          <div className="form-check d-flex justify-content-start">
            <input
              className="form-check-input"
              type="radio"
              name="SEARCH_BY_ADDRESS"
              id="SEARCH_BY_ADDRESS"
              checked={searchBarType == SEARCH_BY_ADDRESS}
              onClick={() => {
                onSearchTypeSelect(SEARCH_BY_ADDRESS);
              }}
            />
            <label className="form-check-label" htmlFor="SEARCH_BY_ADDRESS">
              Пошук за адресою
            </label>
          </div>
          <div className="form-check d-flex justify-content-start">
            <input
              className="form-check-input"
              type="radio"
              name="SEARCH_BY_NAME"
              id="SEARCH_BY_NAME"
              checked={searchBarType == SEARCH_BY_NAME}
              onClick={() => {
                onSearchTypeSelect(SEARCH_BY_NAME);
              }}
            />
            <label className="form-check-label" htmlFor="SEARCH_BY_NAME">
              Пошук за назвою
            </label>
          </div>
          <div className="form-check d-flex justify-content-start">
            <input
              className="form-check-input"
              type="radio"
              name="SEARCH_BY_NOTARY"
              id="SEARCH_BY_NOTARY"
              checked={searchBarType == SEARCH_BY_NOTARY}
              onClick={() => {
                onSearchTypeSelect(SEARCH_BY_NOTARY);
              }}
            />
            <label className="form-check-label" htmlFor="SEARCH_BY_NOTARY">
              Пошук нотаріусу
            </label>
          </div>
          {currentUser === ADMINISTRATOR ? (
            <div className="form-check d-flex justify-content-start">
              <input
                className="form-check-input"
                type="radio"
                name="SEARCH_USERS"
                id="SEARCH_USERS"
                checked={searchBarType == SEARCH_USERS}
                onClick={() => {
                  onSearchTypeSelect(SEARCH_USERS);
                }}
              />
              <label className="form-check-label" htmlFor="SEARCH_USERS">
                Пошук користувачів
              </label>
            </div>
          ) : null}
          <hr class="dropdown-divider mb-3 mt-3" />
          {searchBarType === SEARCH_BY_ADDRESS ? (
            <SearchByAddressField searchKey={key} />
          ) : null}
          {searchBarType === SEARCH_BY_NOTARY ? (
            <SearchByNotaryField searchKey={key} />
          ) : null}
          {searchBarType === SEARCH_BY_NAME ? (
            <SearchByNameField searchKey={key} />
          ) : null}
          {searchBarType === SEARCH_USERS && currentUser === ADMINISTRATOR ? (
            <SearchUsers searchKey={key} />
          ) : null}
          <hr class="dropdown-divider mb-3 mt-3" />
          <button
            type="button"
            class="btn btn-dark w-100"
            onClick={() => {
              setKey(randomStr());
            }}
          >
            Пошук
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
