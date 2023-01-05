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
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const StateNotaryDepartmentPage = () => {
  let { notaryId } = useParams();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm();

  const history = useHistory();

  const currentDepartmentName = watch().departmentName;
  const currentRegion = watch().region;
  const currentArea = watch().area;
  const currentSettlement = watch().settlement;
  const currentAddress = watch().address;
  const currentPhoneNumber = watch().phoneNumber;


  const onSubmitBtnClick = () => {
    const resultData = {
      name: currentDepartmentName,
      regionId: +currentRegion,
      areaId: +currentArea,
      localityId: +currentSettlement,
      address: currentAddress,
      phoneNumbers: [currentPhoneNumber],
    }

    if (!!notaryId) {
      resultData.id = +notaryId;
      dispatch(actions.updateDepartment(resultData));
    } else {
      dispatch(actions.addNewNotaryDepartment(resultData));
    }
    history.goBack();
  }

  const currentNotaryDepartment = useSelector((state) => state.search.currentNotaryDepartment);

  useEffect(() => {
    if (!!notaryId) {
      dispatch(actions.searchNotaryDepartmentById(notaryId));
    }
    dispatch(actions.fetchRegion());
    // dispatch(actions.fetchAllOrganizations())
  }, []);

  useEffect(() => {
    if (currentRegion === "default") {
      dispatch(actions.fetchRegion());
    } else {
      dispatch(actions.fetchArea(currentRegion));
    }
    if (currentRegion !== currentNotaryDepartment?.contact?.region?.id) {
      setValue("area", "default");
      setValue("settlement", "default");
    }
  }, [currentRegion]);

  useEffect(() => {
    if (currentArea === "default") {
      dispatch(actions.fetchArea(currentRegion));
    } else {
      dispatch(actions.fetchSettlement(currentArea));
    }
    if (currentArea !== currentNotaryDepartment?.contact?.area?.id) {
      setValue("settlement", "default");
    }
  }, [currentArea]);

  React.useEffect(() => {
    return () => {
      localStorage.removeItem("id")
    };
  });

  useEffect(() => {
    if (!!notaryId && !!Object.keys(currentNotaryDepartment).length) {
      setValue("departmentName", currentNotaryDepartment.name || "");
      console.log('currentNotaryDepartment.contact:', currentNotaryDepartment.contact)
      setValue("region", currentNotaryDepartment.contact.region.id || "default");
      setValue("area", currentNotaryDepartment.contact.area.id || "default");
      setValue("settlement", currentNotaryDepartment.contact.locality.id || "default");
      setValue("address", currentNotaryDepartment.contact.address || "");
      setValue("phoneNumber", currentNotaryDepartment?.contact?.phoneNumbers?.[0]?.phoneNumber);
      console.log('currentNotaryDepartment:', currentNotaryDepartment)
    }
  }, [currentNotaryDepartment])

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

  const getNotary = ()=>{
    const id = localStorage.getItem("id");
    if(id){
      const messages = JSON.parse(localStorage.getItem("messages"))
      for(let i=0; i<messages.length; i++){
        if(messages[i].id===id){
          let res = messages [i]
          return res;
        }
      }
    }
  }

  const validateDropDown = (value) => value !== "default";


  return (
    <div className="container-md mt-1">
      <div className="card bg-dark">
        <div className="card-body bg-light m-1">
          <h2>Державний нотаріальний заклад</h2>
          <form onSubmit={handleSubmit(onSubmitBtnClick)}>
            <div className="row">
              <div className="col-md gap-3">
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    Назва державної нотаріальної контори / архіву
                  </label>

                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Назва закладу"
                    value={getNotary()&&getNotary().orgName}
                    {...register("departmentName", { required: true })}
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    Робочий телефон
                  </label>

                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    value={getNotary()&&getNotary().phoneNumber}
                    placeholder="Робочий телефон"
                    {...register("phoneNumber", { required: true })}
                  />
                </div>
              </div>

              <div className="col-md gap-3">
                <div className="container-fluid d-grid gap-3">
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      Регіон
                    </label>

                    <select
                      className="form-select"
                      aria-label="Default select example"
                      {...register("region", { required: true, validate: validateDropDown })}
                      //ref={region}
                      placeholder="Регіон"
                    >
                      <option selected value="default">Регіон</option>
                      {getRegionsHtml()}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      Район
                    </label>

                    <select
                      className="form-select"
                      aria-label="Default select example"
                      {...register("area", { required: true, validate: validateDropDown })}
                      disabled={currentRegion === "default"}
                    >
                      <option selected value="default">Район</option>
                      {getAreasHtml()}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      Населений пункт
                    </label>

                    <select
                      className="form-select"
                      aria-label="Default select example"
                      {...register("settlement", { required: true, validate: validateDropDown })}
                      disabled={currentArea === "default" || currentRegion === "default"}
                    >
                      <option selected value="default">Населений пункт</option>
                      {getSettlementsHtml()}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      Адреса
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Адреса"
                      {...register("address", { required: true })}
                    //ref={address}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="container-fluid d-flex justify-content-center">
              <div className="col-8  d-grid gap-3">
                <button type="submit" class="btn btn-dark w-100">
                  Підтвердити
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StateNotaryDepartmentPage;
