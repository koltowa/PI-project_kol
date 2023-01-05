import employmentRepository from '../../data/repositories/employmentRepository';

export const updateEmployment = async (employment, body) => {
  if (employment) {
    employmentRepository.updateById(employment.id, body);
    return employment;
  }
  if (body) {
    return employmentRepository.create(body);
  }
  return { id: null };
};
