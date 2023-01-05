import {
  MESSAGE_TYPE_GOVERNMENT_NOTARY,
  MESSAGE_TYPE_ORGANIZATION,
  MESSAGE_TYPE_PRIVATE_NOTARY,
} from "../../../redux/types";

export const tableLabelsMap = {
  [MESSAGE_TYPE_PRIVATE_NOTARY]: {
    status: "Статус повідомлення",
    additionalStatements: "Додаткові відомості",
    archiveName: "Назва архіву",
    area: "Район",
    date: "Дата реєстрації/зупинення/поновлення/припинення нотаріальної діяльності або зміна нотаріального округу",
    documentDate: "Дата видачі свідоцтва про право на зайняття нотаріальною діяльністю",
    documentNumber: "Номер свідоцтва про право на зайняття нотаріальною діяльністю",
    firstName: "Ім'я",
    flatNumber: "кв.",
    houseNumber: "буд.",
    id: "ddccc3",
    index: "Індекс",
    lastName: "Прізвище",
    locality: "Населений пункт",
    middleName: "По батькові",
    notaryActivityStopDate: "Дата зупинення, припинення або поновлення нотаріальної діяльності",
    notaryActivityTerminationPeriod: "Термін зупинення нотаріальної діяльності",
    notaryArchiveArea: "Місцезнаходження архіву - Район",
    notaryArchiveFlatNumber: "Місцезнаходження архіву - кв.",
    notaryArchiveHouseNumber: "Місцезнаходження архіву - корп.",
    notaryArchiveIndex: "Місцезнаходження архіву - Індекс",
    notaryArchiveLocality: "Місцезнаходження архіву - Населений пункт",
    notaryArchiveRegion: "Місцезнаходження архіву - Область",
    notaryArchiveStreet: "Місцезнаходження архіву - Вулиця, провулок, площа",
    notaryArea: "Назва архіву Нотаріальний округ",
    reason: "notaryActivityRegistration",
    reasonDate: "Дата призначення на посаду, переведення або звільнення з посади",
    reasonDocumentDate: "Дата документа про призначення на посаду, переведення або звільнення з посади",
    reasonDocumentIssuer: "Видавець",
    reasonDocumentName: "Назва документа",
    reasonDocumentNumber: "Номер документа",
    region: "Область",
    registrationCertificationDate: "Дата реєстрації реєстраційного посвідчення",
    registrationCertificationNumber: "Номер реєстраційного посвідчення",
    responsiblePersonFullname: "ПІБ відповідальної особи",
    responsiblePersonPosition: "Посада відповідальної особи",
    sectionNumber: "корп.",
    street: "Вулиця, провулок, площа",
    type: "Повідомлення для внесення відомостей про нотаріусів, які займаються приватною нотаріальною діяльністю, до Єдиного реєстру нотаріусів",
    updatedFirstName: "Нове ім'я",
    updatedLastName: "Нове прізвище",
    updatedMiddleName: "Нове по батькові",
  },
  [MESSAGE_TYPE_GOVERNMENT_NOTARY]: {
    status: "Статус повідомлення",
    area: "Регіон",
    documentDate: "Дата документа",
    documentName: "Назва документа, на підставі якого вносяться зміни до Реєстру",
    documentNumber: "Номер документа",
    flatNumber: "кв.",
    houseNumber: "буд.",
    id: null,
    index: "індекс",
    issuer: "Видавець",
    locality: "Населений пункт",
    notaryArea: "Нотаріальний округ",
    notaryAreaChangeDate: "Дата реєстрації/ліквідації/зміни нотаріального округу",
    orgName: "Назва контори або архіву",
    orgType: "Тип організації",
    phoneNumber: "Робочий телефон",
    reason: "Підстава внесення відомостей до Реєстру",
    region: "Регіон",
    responsiblePersonFullname: "ПІБ відповідальної особи",
    responsiblePersonPosition: "Посада відповідальної особи",
    sectionNumber: "корп.",
    street: "вул.",
    type: "Повідомлення для внесення відомостей про нотаріусів, які працюють у державних нотаріальних конторах або архівах, до Єдиного реєстру нотаріусів",
  },
  [MESSAGE_TYPE_ORGANIZATION]: {
    status: "Статус повідомлення",
    area: "Район",
    additionalStatements: "Додаткові відомості",
    documentDate: "Дата документа",
    documentName: "Назва документа",
    documentNumber: "Номер документа",
    flatNumber: "кв.",
    houseNumber: "буд.",
    index: "Індекс",
    issuer: "Видавець документу",
    locality: "Населений пункт",
    notaryArea: "Нотаріальний округ",
    notaryAreaChangeDate: "Дата зміні нотаріального округу",
    orgName: "Назва контори або архіву",
    orgType: "Тип контори",
    phoneNumber: "Робочий телефон",
    reason: "Підстава внесення відомостей до Реєстру",
    region: "Регіон",
    responsiblePersonFullname: "ПІБ відповідальної особи",
    responsiblePersonPosition: "Посада відповідальної особи",
    sectionNumber: "корп.",
    street: "вул.",
    messageRegion: "Регіон організації",
    type: "Повідомлення для внесення відомостей про державні нотаріальні контори та архіви до Єдиного реєстру нотаріусів",
  },
};

export const hiddenDisplayKeys = ['id', 'type'];