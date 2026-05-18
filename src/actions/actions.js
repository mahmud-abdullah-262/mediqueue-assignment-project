export const getTutors = async () => {
  const data = await fetch(`${process.env.MEDIQUEUE_ASSIGNMENT_SERVER}/tutors`);
  const res = await data.json()

  return res;
}

export const getTutorsDetails = async (id) => {
  const data = await fetch(`${process.env.MEDIQUEUE_ASSIGNMENT_SERVER}/tutors/${id}`);
  const res = await data.json()

  return res;
}