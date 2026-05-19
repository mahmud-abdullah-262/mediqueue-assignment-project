'use server'

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";



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

export const addTutor = async (formData) => {
  console.log('before post', formData);
  const newTutor = formData;
  const res = await fetch(`${process.env.MEDIQUEUE_ASSIGNMENT_SERVER}/tutors`, {
   method: 'POST',
   headers: {
    'content-type' : 'application/json'
   },
   body: JSON.stringify(newTutor)
  });
 
  const data = await res.json()
  console.log('after post', data);
  if(data.insertedId){
  revalidatePath('/tutors')
  alert('Tutor added successfully')
}
  return data;
}


export const deleteTutor = async (userId) => {

const res = await fetch(`${process.env.MEDIQUEUE_ASSIGNMENT_SERVER}/tutors/${userId}`, {
  method: 'delete'
})
if (!res.ok) {
  const text = await res.text();
  console.log('Server error response:', text);
  return
}
const data = await res.json()
console.log('after delete', data)
if(data.deletedCount > 0){
  revalidatePath('/tutors')
  redirect('/tutors') 
}
return data;
}