import {
  takeEvery,
  put,
  call,
  select,
  all,
  takeLatest,
} from "redux-saga/effects";
import axios from "axios";
import {
  UPDATE_SEARCH_DATA,
  FETCH_SEARCH_DATA,
  FETCH_REGION,
  SEARCH_BY_ADDRESS,
  SEARCH_BY_NAME,
  SEARCH_BY_NOTARY,
  FETCH_AREA,
  FETCH_SETTLEMENT,
  UPDATE_MESSAGE_LIST,
  CREATE_NEW_MESSAGE,
  SEARCH_USERS,
  ADD_USER,
  REMOVE_USER,
  LOGIN_USER,
  ADD_NEW_NOTARY,
  ADD_NEW_DEPARTMENT,
  UPDATE_NOTARY,
  UPDATE_DEPARTMENT,
  DELETE_NOTARY,
  DELETE_DEPARTMENT,
  SEARCH_NOTARY_DEPARTMENT_BY_ID,
  SEARCH_NOTARY_BY_ID,
  FETCH_ALL_ORGANIZATIONS,
  SET_ALL_ORGANIZATIONS,
  LOGOUT_USER,
  SEARCH_PRIVATE_NOTATY,
  SEARCH_STATE_NOTARY_DEPARTMENT
} from "./types";
import actions from "src/redux/actions";

const delay = (time) =>
  new Promise((resolve) => setTimeout(resolve, time * 1000));

export function* sagaWatcher() {
  yield takeLatest(FETCH_SEARCH_DATA, fetchSearchData);
  yield takeLatest(FETCH_REGION, fetchRegion);
  yield takeLatest(FETCH_AREA, fetchArea);
  yield takeLatest(FETCH_SETTLEMENT, fetchSettlement);
  yield takeLatest(FETCH_ALL_ORGANIZATIONS, fetchAllOrganizations);

  //messages
  yield takeLatest(UPDATE_MESSAGE_LIST, updateMessageList);
  yield takeLatest(CREATE_NEW_MESSAGE, createNewMessage);

  //users
  yield takeLatest(ADD_USER, addUser);
  yield takeLatest(REMOVE_USER, removeUser);

  //auth
  yield takeLatest(LOGIN_USER, loginUser);
  yield takeLatest(LOGOUT_USER, logoutUser);

  //notaries
  yield takeLatest(ADD_NEW_NOTARY, addNewNotary);
  yield takeLatest(ADD_NEW_DEPARTMENT, addNewDepartment);
  yield takeLatest(UPDATE_NOTARY, updateNotary);
  yield takeLatest(UPDATE_DEPARTMENT, updateDepartment);
  yield takeLatest(DELETE_NOTARY, deleteNotary);
  yield takeLatest(DELETE_DEPARTMENT, deleteDepartment);

  //update data
  yield takeLatest(SEARCH_NOTARY_BY_ID, searchNotaryById);
  yield takeLatest(SEARCH_NOTARY_DEPARTMENT_BY_ID, searchNotaryDepartmentById);

}
//takeevery takeLatest takeLeading
function* fetchAllOrganizations(){
  try {
    yield put(actions.showLoader());
    const orgs = yield call(fetchAllOrganizationsRequest);
    console.log('orgs:', orgs)
    yield put({ type: SET_ALL_ORGANIZATIONS, payload: orgs});
    yield put(actions.hideLoader());
  }
  catch(e){}
}
async function fetchAllOrganizationsRequest(){
  const { data } = await axios.post('http://localhost:3000/api/search/name', { name: '' })
  return data;
}

function* searchNotaryById(action) {
  try {
    const id = action.payload;
    yield put(actions.showLoader());
    const notary = yield call(searchNotaryByIdRequest, id);
    yield put(actions.setNotaryById(notary));
    yield put(actions.hideLoader());
  } catch (e) { }
}
async function searchNotaryByIdRequest(id) {
  const { data } = await axios.get(`http://localhost:3000/api/notaries/${id}`);
  return data;
}

function* searchNotaryDepartmentById(action) {
  try {
    const id = action.payload;
    yield put(actions.showLoader());
    const notaryDepartment = yield call(searchNotaryDepartmentByIdRequest, id);
    yield put(actions.setNotaryDepartmentById(notaryDepartment));
    yield put(actions.hideLoader());
  } catch (e) { }
}
async function searchNotaryDepartmentByIdRequest(id) {
  const { data } = await axios.get(`http://localhost:3000/api/organizations/${id}`);
  return data;
}

function* addNewNotary(action) {
try {
    const notaryData = action.payload;
    yield put(actions.showLoader());
    yield call(addNewNotaryRequest, notaryData);
    const searchQueryData = yield select((state) => state.search.searchQueryData);
    yield put(actions.fetchSearchData(searchQueryData));
    yield put(actions.hideLoader());
  } catch (e) { }
}

async function addNewNotaryRequest(notaryData) {
  const { data } = await axios.post("http://localhost:3000/api/notaries", notaryData);
  return data;
}

function* addNewDepartment(action) {
  try {
    const departmentData = action.payload;
    yield put(actions.showLoader());
    yield call(addNewDepartmentRequest, departmentData);
    const searchQueryData = yield select((state) => state.search.searchQueryData);
    yield put(actions.fetchSearchData(searchQueryData));
    yield put(actions.hideLoader());
  } catch (e) { }
}
async function addNewDepartmentRequest(departmentData) {
  const { data } = await axios.post(`http://localhost:3000/api/organizations`, departmentData);
  return data;
}

function* updateNotary(action) {
  try {
    const notaryData = action.payload;
    yield put(actions.showLoader());
    yield call(updateNotaryRequest, notaryData);
    const searchQueryData = yield select((state) => state.search.searchQueryData);
    yield put(actions.fetchSearchData(searchQueryData));
    yield put(actions.hideLoader());
  } catch (e) { }
}
async function updateNotaryRequest(notaryData) {
  const { id, ...rest } = notaryData;
  const { data } = await axios.put(`http://localhost:3000/api/notaries/${id}`, rest)
  return data;
}

function* updateDepartment(action) {
  try {
    const departmentData = action.payload;
    yield put(actions.showLoader());
    yield call(updateDepartmentRequest, departmentData);
    const searchQueryData = yield select((state) => state.search.searchQueryData);
    yield put(actions.fetchSearchData(searchQueryData));
    yield put(actions.hideLoader());
  } catch (e) { }
}
async function updateDepartmentRequest(departmentData) {
  const { id, ...other } = departmentData;
  const { data } = await axios.put(`http://localhost:3000/api/organizations/${id}`, other)
  return data;
}

function* deleteNotary(action) {
  try {
    const notaryId = action.payload;
    const searchQueryData = yield select((state) => state.search.searchQueryData);
    yield put(actions.showLoader());
    yield call(deleteNotaryRequest, notaryId);
    yield put(actions.fetchSearchData(searchQueryData));
    yield put(actions.hideLoader());
  } catch (e) { }
}
async function deleteNotaryRequest(notaryId) {
  const { data } = await axios.delete(`http://localhost:3000/api/notaries/${notaryId}`);
  return data;
}

function* deleteDepartment(action) {
  try {
    const departmentId = action.payload;
    const searchQueryData = yield select((state) => state.search.searchQueryData);
    yield put(actions.showLoader());
    yield call(deleteDepartmentRequest, departmentId);
    yield put(actions.fetchSearchData(searchQueryData));
    yield put(actions.hideLoader());
  } catch (e) { }
}
async function deleteDepartmentRequest(departmentId) {
  const { data } = await axios.delete(`http://localhost:3000/api/organizations/${departmentId}`);
  return data;
}

function* loginUser(action) {
  try {
    const credentials = action.payload;
    yield put(actions.showLoader());
    const { data: { user }} = yield call(loginUserRequest, credentials);
    yield put(actions.setUserData(user));
    yield put(actions.hideLoader());
    localStorage.setItem('currentUser', yield select(state => state.app.currentUser))
  } catch (e) {
    yield put(actions.hideLoader());
    yield put(actions.showMessage('Некоректні аутентифікаційні дані, спробуйте змініти логін, або пароль'))
    yield call(delay, 3);
    yield put(actions.hideMessage())
   }
}

async function loginUserRequest(userData) {
  return axios.post('http://localhost:3000/api/auth/login', userData);
}

function* logoutUser(action) {
  localStorage.setItem('currentUser', '');
}

function* addUser(action) {
  try {
    const userData = action.payload;
    yield put(actions.showLoader());
    yield call(addUserRequest, userData);
    yield put(actions.hideLoader());
  } catch (e) { }
}

async function addUserRequest(userData) {
  await axios.post("http://localhost:3000/api/auth/register", userData);
}

function* removeUser(action) {
  try {
    const userId = action.payload;
    const searchQueryData = yield select((state) => state.search.searchQueryData);
    yield put(actions.showLoader());
    yield call(removeUserRequest, userId);
    yield put(actions.fetchSearchData(searchQueryData));
    yield put(actions.hideLoader());
  } catch (e) { }
}

async function removeUserRequest(userId) {
  const { data } = await axios.delete(`http://localhost:3000/api/users/${userId}`)
  return data;
}

function* createNewMessage(action) {
  try {
    const messages = JSON.parse(localStorage.getItem('messages') || '[]');
    messages.push(action.payload);
    localStorage.setItem('messages', JSON.stringify(messages))
    yield put(actions.updateMessageList());
  } catch (e) { }
}

function* updateMessageList(action) {
  try {
    const messages = JSON.parse(localStorage.getItem('messages'));
    yield put(actions.setMessageListData(messages));
  } catch (e) { }
}

function* fetchRegion(action) {
  try {
    const searchType = yield select((state) => state.search.searchType);
    if (searchType !== SEARCH_BY_ADDRESS) {
      return;
    }
    yield put(actions.showLoader());
    yield call(delay, 1);
    const regions = yield call(getRegions);
    yield put(actions.setRegion(regions));
    yield put(actions.hideLoader());
  } catch (e) { }
}

function* fetchArea(action) {
  try {
    const searchType = yield select((state) => state.search.searchType);
    if (searchType !== SEARCH_BY_ADDRESS) {
      return;
    }
    yield put(actions.showLoader());
    //yield call(delay, 1);
    const region = action.payload;
    const areas = yield call(getAreasByRegionId, region);
    yield put(actions.setArea(areas));
    yield put(actions.hideLoader());
  } catch (e) { }
}

function* fetchSettlement(action) {
  try {
    const searchType = yield select((state) => state.search.searchType);
    if (searchType !== SEARCH_BY_ADDRESS) {
      return;
    }
    yield put(actions.showLoader());
    const area = action.payload;
    const settlements = yield call(getLocalitiesByAreaId, area);
    yield put(actions.setSettlement(settlements));
    yield put(actions.hideLoader());
  } catch (e) { }
}

function* fetchSearchData(action) {
  try {
    const searchType = yield select((state) => state.search.searchType);
    const data = action ? action.payload : {};
    yield put(actions.setSearchQueryData(data));
    let searchData = [];
    yield put(actions.showLoader());
    if (searchType === SEARCH_BY_ADDRESS) {
      const flags = yield select((state) => state.search.departmentTypes);
      searchData = yield call(searchByAddress, { 
        ...data, 
        getNotaries: flags.includes(SEARCH_PRIVATE_NOTATY),
        getOrganizations: flags.includes(SEARCH_STATE_NOTARY_DEPARTMENT),
      });
    } else if (searchType === SEARCH_BY_NAME) {
      searchData = yield call(searchByName, data);
    } else if (searchType === SEARCH_BY_NOTARY) {
      searchData = yield call(searchByNotary, data);
    } else if (searchType === SEARCH_USERS) {
      searchData = yield call(searchUsers, data);
    }
    console.log('searchData:', searchData)
    yield put(actions.updateSearchData(searchData));
    yield put(actions.hideLoader());
  }
  catch (e) { 
    console.log('e:', e)
  }
}

async function searchByAddress(query) {
  const { data } = await axios.post('http://localhost:3000/api/search/address', query)
  return data;
}

async function searchByName(name) {
  console.log('name:', name)
  const { data } = await axios.post('http://localhost:3000/api/search/name', { name });
  return data;
}

async function searchByNotary(query) {
  const { data } = await axios.post('http://localhost:3000/api/search/notary', query)
  // @todo search
  return data;
}

async function searchUsers(query) {
  const { data } = await axios.post('http://localhost:3000/api/users', query)
  // @todo search
  return data;
}

async function getRegions() {
  const { data } = await axios.get("http://localhost:3000/api/regions");
  return data;
}

async function getAreasByRegionId(id) {
  const { data } = await axios.get(`http://localhost:3000/api/areas?id=${id}`);
  return data;
}

async function getLocalitiesByAreaId(id) {
  const { data } = await axios.get(`http://localhost:3000/api/localities?id=${id}`);
  return data;
}

function getNotaries() {
  return JSON.parse(localStorage.getItem("notaries"));
}

function addNotaries(notaries) {
  localStorage.setItem("notaries", JSON.stringify(notaries));
}

const notaries = [
  // {
  //   firstName: "Барська",
  //   lastName: "державна нотаріальна",
  //   middleName: "контора",
  //   phoneNumbers: "(04341) 2-10-11",
  //   certificateNumber: "Барський р., м. Бар, вул. Героїв Майдану, 6"
  // }
  //   {
  //   firstName: "Володимир ",
  //   lastName: "Мельник",
  //   middleName: "Олексійович",
  //   certificateNumber: "3163",
  //   isPrivate: true,
  //   phoneNumbers: "+380592949243",
  //   regionId: 1,
  //   areaId: 1,
  //   localityId: 1, 
  //   address: "вул. Робоча, 20",
  //   id: "4354654624135646"
  // },
  // {
  //   firstName: "Людмила",
  //   lastName: "Ковальчук",
  //   middleName: "Вікторівна ",
  //   certificateNumber: "7604",
  //   isPrivate: true,
  //   phoneNumbers: "+380592949243",
  //   regionId: 1,
  //   areaId: 2,
  //   localityId: 1, 
  //   address: "ул. Незалежності, 36",
  //   id: "3211827661462414"
  // },
  {
    firstName: "Антон",
    lastName: "Воробйов",
    middleName: "Олексійович",
    certificateNumber: "170",
    isPrivate: true,
    phoneNumbers: "+380592949243",
    regionId: 2,
    areaId: 1,
    localityId: 1,
    address: "вул. Центральна, 15",
    id: "143183517351375137"
  },
  {
    firstName: "Анатолій",
    lastName: "Воробйов",
    middleName: "Олексійович",
    certificateNumber: "2109",
    isPrivate: true,
    phoneNumbers: "+380592949243",
    regionId: 2,
    areaId: 1,
    localityId: 1,
    address: "бул. Шевченка, 6",
    id: "271268874776867164"
  },
  // {
  //   firstName: "Віктор",
  //   lastName: "Дробаха",
  //   middleName: "Анастасійович",
  //   certificateNumber: "7162",
  //   isPrivate: true,
  //   phoneNumbers: "+380592949243",
  //   regionId: 3,
  //   areaId: 1,
  //   localityId: 1, 
  //   address: "вул. Духновича, 32-а",
  //   id: "8439847398839476873"
  // },
  // {
  //   firstName: "Євгеній",
  //   lastName: "Заліпський",
  //   middleName: "Вікторович",
  //   certificateNumber: "3878",
  //   isPrivate: true,
  //   phoneNumbers: "+380592949243",
  //   regionId: 3,
  //   areaId: 1,
  //   localityId: 1, 
  //   address: "ул. Героїв Майдану, буд.25",
  //   id: "35438485135131385112"
  // },
  // {
  //   firstName: "Сергій",
  //   lastName: "Авдієнко",
  //   middleName: "Вікторович",
  //   certificateNumber: "5564",
  //   isPrivate: true,
  //   phoneNumbers: "+380592949243",
  //   regionId: 4,
  //   areaId: 1,
  //   localityId: 1, 
  //   address: "пр-т Миру, 52",
  //   id: "131929874913794017349"
  // },
  // {
  //   firstName: "Юрій",
  //   lastName: "Бендеров",
  //   middleName: "Вікторович",
  //   certificateNumber: "5597",
  //   isPrivate: true,
  //   phoneNumbers: "+380592949243",
  //   regionId: 4,
  //   areaId: 1,
  //   localityId: 1, 
  //   address: "ул. С.Крушельницької, 35",
  //   id: "81857138571835187131153"
  // },
  // {
  //   firstName: "Богатов",
  //   lastName: "Сергій",
  //   middleName: "Гейоргійович",
  //   certificateNumber: "2930",
  //   isPrivate: true,
  //   phoneNumbers: "+380592949243",
  //   regionId: 5,
  //   areaId: 1,
  //   localityId: 1, 
  //   address: "р-т Леніна, 151",
  //   id: "58435874357894334446"
  // },
];
