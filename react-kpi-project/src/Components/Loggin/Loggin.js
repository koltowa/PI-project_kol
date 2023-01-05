import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import actions from "../../redux/actions";


const Loggin = () => {

  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    setValue,
    watch,
    handleSubmit,
  } = useForm();

  const history = useHistory();


  const currentEmail = watch().email;
  const currentPassword = watch().password;

  const onSubmitBtnClick = () => {
    console.log('currentEmail, currentPassword:', currentEmail, currentPassword)
    dispatch(actions.loginUser({login: currentEmail, password: currentPassword}))
    history.push('/')
  }

  return (
    <form onSubmit={handleSubmit(onSubmitBtnClick)} className="d-flex justify-content-center align-items-center mt-5">
        <div className="card bg-dark">
          <div className="card-body bg-light m-1">
            <h5 className="card-title">Вхід в систему</h5>
            <div className="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                Електронна адреса
              </label>
              <input
                type="email"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="name@example.com"
                {...register("email", { required: true })}
              />
            </div>
            <div className="mb-3">
              <label for="inputPassword" class="form-label">
                Пароль
              </label>
              <input
                type="password"
                className="form-control"
                id="inputPassword"
                placeholder="Secret phrase"
                {...register("password", { required: true })}
              />
            </div>
            <div className="mb-3 mb-0">
              <button type="submit" className="btn btn-dark w-100">
                Увійти
              </button>
            </div>
          </div>
        </div>
    </form>
  );
};

export default Loggin;
