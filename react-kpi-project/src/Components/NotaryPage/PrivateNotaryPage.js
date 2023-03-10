import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "src/redux/actions";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const PrivateNotaryPage = () => {
  let { notaryId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm();



  const [isPrivateNotary, setPrivateNotary] = useState(true);

  const currentFirstName = watch().firstName;
  const currentLastName = watch().lastName;
  const currentMiddleName = watch().middleName;
  const currentLicenceNumber = watch().licenceNumber;
  const currentRegion = watch().region;
  const currentArea = watch().area;
  const currentSettlement = watch().settlement;
  const currentAddress = watch().address;
  const currentDateFrom = watch().dateFrom;
  const currentPosition = watch().position;
  const currentOrganization = watch().organization;
  const currentPhoneNumber = watch().phoneNumber;

  const currentNotary = useSelector((state) => state.search.currentNotary);

  const onSubmitBtnClick = () => {
    const resultData = {
      firstName: currentFirstName,
      lastName: currentLastName,
      middleName: currentMiddleName,
      certificateNumber: currentLicenceNumber,
      regionId: currentRegion,
      areaId: currentArea,
      localityId: currentSettlement,
      address: currentAddress,
      phoneNumbers: [currentPhoneNumber],
      isPrivate: !!isPrivateNotary,
    };
    if (!isPrivateNotary) {
      resultData.employment = {
        position: currentPosition,
        dateFrom: currentDateFrom,
        organizationId: currentOrganization,
      };
    }

    console.log('resultData:', resultData)

    if (!!notaryId) {
      resultData.id = notaryId;
      dispatch(actions.updateNotary(resultData));
    } else {
      dispatch(actions.addNewNotary(resultData));
    }
    history.goBack();
  };

  useEffect(() => {
    if (!!notaryId) {
      dispatch(actions.searchNotaryById(notaryId));
    }
    dispatch(actions.fetchAllOrganizations());
  }, []);

  useEffect(() => {
    if (currentRegion === "default") {
      dispatch(actions.fetchRegion());
    } else {
      dispatch(actions.fetchArea(currentRegion));
    }
    if (currentRegion !== currentNotary?.contact?.region?.id) {
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
    if (currentArea !== currentNotary?.contact?.area?.id) {
      setValue("settlement", "default");
    }
  }, [currentArea]);

  React.useEffect(() => {
    return () => {
      localStorage.removeItem("id")
    };
  });

  useEffect(() => {
    console.log('currentNotary:', currentNotary)
    if (!!notaryId && !!Object.keys(currentNotary).length) {
      setValue("firstName", currentNotary.firstName || "");
      setValue("lastName", currentNotary.lastName || "");
      setValue("middleName", currentNotary.middleName || "");
      setValue("licenceNumber", currentNotary.certificateNumber || "");
      setValue("region", currentNotary.contact.region.id || "default"); 
      setValue("area", currentNotary.contact.area.id || "default");
      setValue("settlement", currentNotary.contact.locality.id || "default");
      setValue("address", currentNotary.contact.address || "");
      console.log('currentNotary.employment?.dateFrom:', new Date(currentNotary.employment?.dateFrom).toISOString())
      setValue("dateFrom", new Date() || "default");
      setValue("position", currentNotary.employment?.position || "");
      setValue(
        "organization",
        currentNotary.employment?.organization.id || "default"
      );
      setValue("phoneNumber", currentNotary?.contact.phoneNumbers?.[0]?.phoneNumber);
      setPrivateNotary(currentNotary.isPrivate);
    }
  }, [currentNotary]);

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

  const organizations = useSelector((state) => state.search.organizations);
  const getOrganizationsHtml = () => {
    return organizations.map((organization) => (
      <option value={organization.id}>{organization.name}</option>
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
          <h2>
            {!!notaryId
              ? "???????????????? ???????? ?????? ???????????????? ???? ????????????"
              : "???????????????? ???????????? ?????????????????? ???? ????????????"}
          </h2>
          <form onSubmit={handleSubmit(onSubmitBtnClick)}>
            <div className="row">
              <div className="col-md gap-3">
                <div className="container-fluid d-grid gap-3">
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      ????????????????
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="????????????????"
                      value={getNotary()&&getNotary().lastName}
                      {...register("lastName", { required: true })}
                      //ref={lastName}
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      ????'??
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="????'??"
                      value={getNotary()&&getNotary().firstName}
                      {...register("firstName", { required: true })}
                      //ref={firstName}
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      ????-????????????????
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="???? ????????????????"
                      value={getNotary()&&getNotary().middleName}
                      {...register("middleName", { required: true })}
                      //ref={middleName}
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      ?????????? ????????????????
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="?????????? ????????????????"
                      value={getNotary()&&getNotary().certificateNumber}
                      {...register("licenceNumber", { required: true })}
                      //ref={licenceNumber}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md gap-3">
                <div className="container-fluid d-grid gap-3">
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      ????????????
                    </label>

                    <select
                      className="form-select"
                      aria-label="Default select example"
                      {...register("region", {
                        required: true,
                        validate: validateDropDown,
                      })}
                      //ref={region}
                      placeholder="????????????"
                    >
                      <option selected value="default">
                        ????????????
                      </option>
                      {getRegionsHtml()}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      ??????????
                    </label>

                    <select
                      className="form-select"
                      aria-label="Default select example"
                      {...register("area", {
                        required: true,
                        validate: validateDropDown,
                      })}
                      disabled={currentRegion === "default"}
                      //ref={area}
                    >
                      <option selected value="default">
                        ??????????
                      </option>
                      {getAreasHtml()}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      ?????????????????? ??????????
                    </label>

                    <select
                      className="form-select"
                      aria-label="Default select example"
                      {...register("settlement", {
                        validate: validateDropDown,
                      })}
                      disabled={
                        currentArea === "default" || currentRegion === "default"
                      }
                    >
                      <option selected value="default">
                        ?????????????????? ??????????
                      </option>
                      {getSettlementsHtml()}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      ????????????
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="????????????"
                      {...register("address", { required: true })}
                      //ref={address}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="container-fluid d-flex justify-content-center">
              <div className="col-8  d-grid gap-3">
                <div className="form-check d-flex justify-content-start">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="privateNotary"
                    checked={isPrivateNotary}
                    onClick={() => {
                      setPrivateNotary(true);
                    }}
                  />
                  <label className="form-check-label" htmlFor="privateNotary">
                    ?????????????????? ????????????????
                  </label>
                </div>
                <div className="form-check d-flex justify-content-start">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="stateNotary"
                    checked={!isPrivateNotary}
                    onClick={() => {
                      setPrivateNotary(false);
                    }}
                  />
                  <label className="form-check-label" htmlFor="stateNotary">
                    ???????????????? ?????????????????????? ?????????????? / ??????????
                  </label>
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    ????????????
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="????????????"
                    {...register("position")}
                    disabled={isPrivateNotary}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    ?????????? ?????????????????? ???????????????????????? ?????????????? / ????????????
                  </label>

                  <select
                    className="form-select"
                    aria-label="Default select example"
                    disabled={isPrivateNotary}
                    {...register("organization", {
                      ...(!isPrivateNotary && {validate: validateDropDown}),
                    })}
                  >
                    <option selected value="default">
                      ?????????? ??????????????
                    </option>
                    {getOrganizationsHtml()}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="dateFrom" class="form-label">
                    ???????? ??????????????????????
                  </label>
                  <input
                    disabled={isPrivateNotary}
                    class="form-control"
                    id="dateFrom"
                    type="date"
                    {...register("dateFrom")}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phoneNumber" className="form-label">
                    ?????????????? ??????????????
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id="phoneNumber"
                    placeholder="?????????????? ??????????????"
                    //ref={phoneNumber}
                    {...register("phoneNumber", {
                      required: true,
                      minLength: 6,
                      maxLength: 20,
                    })}
                  />
                </div>
                <button type="submit" className="btn btn-dark w-100">
                  ??????????????????????
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PrivateNotaryPage;
