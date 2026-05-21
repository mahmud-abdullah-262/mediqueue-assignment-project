'use server'

import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";



export const getTutors = async () => {
  const data = await fetch(`${process.env.NEXT_MEDIQUEUE_ASSIGNMENT_SERVER}/tutors`);
  const res = await data.json()

  return res;
}

export const getTutorsDetails = async (id, token) => {
  const data = await fetch(`${process.env.NEXT_MEDIQUEUE_ASSIGNMENT_SERVER}/tutors/${id}`, {
    headers: {
      authorization :`Bearer ${token}`
    }
  });
  const res = await data.json()

  return res;
}

export const addTutor = async (formData, token) => {

  
  console.log('before post', formData);
  const newTutor = formData;
  const res = await fetch(`${process.env.NEXT_MEDIQUEUE_ASSIGNMENT_SERVER}/tutors`, {
   method: 'POST',
   headers: {
    'content-type' : 'application/json',
     authorization :`Bearer ${token}`
   },
   body: JSON.stringify(newTutor)
  });
 
  const data = await res.json()
  console.log('after post', data);
  if(data.insertedId){
  revalidatePath('/tutors')
 
}
  return data;
}


export const deleteTutor = async (userId) => {

const res = await fetch(`${process.env.NEXT_MEDIQUEUE_ASSIGNMENT_SERVER}/tutors/${userId}`, {
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

export const updateTutor = async (id, formData) => {
  console.log('before update', id, formData)
  const updated = formData;
  const res = await fetch(`${process.env.NEXT_MEDIQUEUE_ASSIGNMENT_SERVER}/tutors/${id}`, {
   method: 'PATCH',
   headers: {
    'content-type' : 'application/json'
   },
   body: JSON.stringify(updated)
  });
  const data = await res.json()
  console.log('after update', data);
  if(data.modifiedCount > 0){
  revalidatePath(`/tutors/${id}`)
 
} redirect(`/tutors/${id}`)
  return data;
}

export const postBookig = async (bookingData, token) => { 
  const res = await fetch(`${process.env.NEXT_MEDIQUEUE_ASSIGNMENT_SERVER}/booking`, { 
   method: 'POST',
   headers: {
    'content-type' : 'application/json',
     authorization :`Bearer ${token}`
   },
   body: JSON.stringify(bookingData)
  });
  const data = await res.json()
  revalidatePath(`/tutors/${bookingData.tutorId}`)
  redirect(`/tutors/${bookingData.tutorId}`)


  }
 

  export const cancelSession = async (bookingId) => {
  console.log('cancelSession called, bookingId:', bookingId);
  console.log('server env:', process.env.NEXT_MEDIQUEUE_ASSIGNMENT_SERVER);
  
  const url = `${process.env.NEXT_MEDIQUEUE_ASSIGNMENT_SERVER}/booking/${bookingId}`;
  console.log('full url:', url);

  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({ bookingStatus: "false" })
  });

  console.log('response status:', res.status);
  
  const text = await res.text();
  console.log('raw response:', text);
}


