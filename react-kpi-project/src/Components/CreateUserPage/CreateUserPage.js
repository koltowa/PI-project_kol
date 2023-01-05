import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import actions from "../../redux/actions";

const CreateUserPage = (props) => {
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    setValue,
    watch,
    handleSubmit,
  } = useForm();


  const currentLastName = watch().lastName;
  const currentFirstName = watch().firstName;
  const currentMiddleName= watch().middleName;
  const currentEmail = watch().email;
  const currentPassword = watch().password;
  const currentRepeatPassword = watch().repeatPassword;
  const currentBirthDate = watch().birthDate;
  const currentSerieNumber = watch().serieNumber;
  const currentPassportNumber = watch().passportNumber;
  const currentIpn = watch().ipn;
  const history = useHistory();

  const onSubmitBtnClick = () => {
    const data = {
      lastName: currentLastName,
      firstName: currentFirstName,
      middleName: currentMiddleName,
      login: currentEmail,
      password: currentPassword,
      birthday: currentBirthDate,
      passportSeria: currentSerieNumber,
      passportNumber: currentPassportNumber,
      ITN: currentIpn,
      role: 'registrator',
    }
    dispatch(actions.addUser(data))
    history.push('/');
  }

  const validateRepeatPassword = (value) => currentRepeatPassword === currentPassword;

  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <div className="card bg-dark">
        <div className="card-body bg-light m-1">
          <form onSubmit={handleSubmit(onSubmitBtnClick)}>
            <h5 className="card-title">Створення користувача</h5>
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <div className="mb-3">
                  <label htmlFor="lastName" class="form-label">
                    Прізвище
                  </label>
                  <input {...register("lastName", { required: true })} class="form-control" id="lastName" />
                </div>

                <div className="mb-3">
                  <label htmlFor="firstName" class="form-label">
                    Ім'я
                  </label>
                  <input {...register("firstName", { required: true })} class="form-control" id="firstName" />
                </div>

                <div className="mb-3">
                  <label htmlFor="middleName" class="form-label">
                    По батькові
                  </label>
                  <input {...register("middleName", { required: true })} class="form-control" id="middleName" />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" class="form-label">
                    Елктронна пошта
                  </label>
                  <input {...register("email", { required: true })} type="email" class="form-control" id="email" />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" class="form-label">
                    Пароль
                  </label>
                  <input {...register("password", { required: true })} type="password" class="form-control" id="password" />
                </div>

                <div className="mb-3">
                  <label htmlFor="repeatPassword" class="form-label">
                    Повторіть пароль
                  </label>
                  <input
                    type="password"
                    class="form-control"
                    id="repeatPassword"
                    {...register("repeatPassword", { required: true, validate: validateRepeatPassword })}
                  />
                </div>
              </div>
              <div className="col-md-6 col-sm-12">
                <div className="mb-3">
                  <label htmlFor="birthDate" class="form-label">
                    Дата народження
                  </label>
                  <input {...register("birthDate", { required: true })} class="form-control" id="birthDate" type="date" />
                </div>

                <div className="mb-3">
                  <label htmlFor="passportSeries" class="form-label">
                    Серія паспорту
                  </label>
                  <input
                    class="form-control"
                    id="passportSeries"
                    {...register("serieNumber", { required: true })}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="passportNumber" class="form-label">
                    Номер паспорту
                  </label>
                  <input
                    class="form-control"
                    id="passportNumber"
                    {...register("passportNumber", { required: true })}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="ITN" class="form-label">
                    ІПН
                  </label>
                  <input
                    class="form-control"
                    id="ITN"
                    {...register("ipn", { required: true })}
                  />
                </div>
              </div>
            </div>
            <div className="mb-3 mb-0">
              <button type="submit" className="btn btn-dark btn-block">
                Підтвердити
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUserPage;
