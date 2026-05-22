'use server'


import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";



export const getTutors = async () => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_MEDIQUEUE_ASSIGNMENT_SERVER}/tutors`);
  const res = await data.json()

  return res;
}

export const getTutorsDetails = async (id, token) => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_MEDIQUEUE_ASSIGNMENT_SERVER}/tutors/${id}`, {
    headers: {
      authorization :`Bearer ${token}`
    },
     cache: 'no-store',
  });
  const res = await data.json()

  return res;
}

export const addTutor = async (formData, token) => {

  
  console.log('before post', formData);
  const newTutor = formData;
  const res = await fetch(`${process.env.NEXT_PUBLIC_MEDIQUEUE_ASSIGNMENT_SERVER}/tutors`, {
   method: 'POST',
   headers: {
    'content-type' : 'application/json',
     authorization :`Bearer ${token}`
   },
    cache: 'no-store',
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

const res = await fetch(`${process.env.NEXT_PUBLIC_MEDIQUEUE_ASSIGNMENT_SERVER}/tutors/${userId}`, {
  method: 'delete',
  cache: 'no-store',
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
  try {
    console.log('Updating tutor ID:', id);
    const res = await fetch(`${process.env.NEXT_PUBLIC_MEDIQUEUE_ASSIGNMENT_SERVER}/tutors/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      cache: 'no-store',
      body: JSON.stringify(formData)
    });

    if (!res.ok) throw new Error('Failed to update tutor');

    const data = await res.json();
    
    if (data.modifiedCount > 0 || data.matchedCount > 0) {
      revalidatePath(`/tutors/${id}`);
      revalidatePath('/tutors');
    }
    return data;
  } catch (error) {
    return { error: error.message };
  }
}

export const postBooking = async (bookingData, token) => { 
  const res = await fetch(`${process.env.NEXT_PUBLIC_MEDIQUEUE_ASSIGNMENT_SERVER}/booking`, { 
   method: 'POST',
   headers: {
    'content-type' : 'application/json',
     authorization :`Bearer ${token}`
   },
    cache: 'no-store',
   body: JSON.stringify(bookingData)
  });
  const data = await res.json()
  revalidatePath(`/tutors/${bookingData.tutorId}`)
  redirect(`/tutors/${bookingData.tutorId}`)


  }
 

  export const cancelSession = async (bookingId) => {
  console.log('cancelSession called, bookingId:', bookingId);
  console.log('server env:', process.env.NEXT_PUBLIC_MEDIQUEUE_ASSIGNMENT_SERVER);
  
  const url = `${process.env.NEXT_PUBLIC_MEDIQUEUE_ASSIGNMENT_SERVER}/booking/${bookingId}`;
  console.log('full url:', url);

  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json'
    },
     cache: 'no-store',
    body: JSON.stringify({ bookingStatus: "false" })
  });

  console.log('response status:', res.status);
  
  const text = await res.text();
  console.log('raw response:', text);
}
