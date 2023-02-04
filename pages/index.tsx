import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { FormEvent } from 'react'


import  { useEffect, useState } from "react";
  import {
  ConnectWallet,
  useAddress,
  useContract,
  useMetamask,
  useNFTs,
} from "@thirdweb-dev/react";
import styles from '../styles/Home.module.css'
import  Card from "../componants/Card"



const Home: NextPage = () => {
const [nftCount, setNftCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [showPopup, setShowPopup] = useState(false)
 const address = useAddress();
  const connectWithMetamask = useMetamask();

const { contract } = useContract(
  "0xE62d775E3Cc91659034dFC3b09a46259D6942c2c",
  "signature-drop"
);



  useEffect(() => {
    const fetchNftCount = async () => {
      const nfts = await contract.getOwned(address);
      setNftCount(nfts.length);
      setIsLoading(false);
    };
    fetchNftCount();
  }, []);

  const vcount = nftCount
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    let form = {
      firstname,
      lastname,
      email,
      phone,
      message,
    }

    const rawResponse = await fetch('/api/submit', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
    const content = await rawResponse.json()

    // print to screen
    setShowPopup(true)
    // Reset the form fields
    setMessage('')
    setPhone('')
    setFirstname('')
    setLastname('')
    setEmail('')

  }


  return (<div> 
        <div>
           
      
      <ConnectWallet />
        </div>
    <div className='min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12 bg-cover'
  style={{ backgroundImage: "url('https://unsplash.com/photos/Uj3S6JiXxaA')" }}>
    <div className='relative py-3 sm:max-w-xl sm:mx-auto mb-14'>
        <ConnectWallet />
  <main className='relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20 bg-clip-padding bg-opacity-60 border border-gray-200' >
   <div>
          <img src="https://presend.io/wp-content/uploads/2022/08/cropped-PreSend-Logo2B-2048x597.png" className="h-16 sm:h-24" />
        </div>   <div className='max-w-5xl mx-auto py-2'>
        <form className='py-4 space-y-4' onSubmit={handleSubmit}>
          <div className='flex items-center justify-center'>
            <label htmlFor='firstname' className='sr-only'>
              First Name
            </label>
            <input
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              type='text'
              name='firstname'
              id='firstname'
              className='shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-96 sm:text-md border-gray-300 rounded-md'
              placeholder='First Name'
            />
          </div>
          <div className='flex items-center justify-center'>
            <label htmlFor='lastname' className='sr-only'>
              Last Name
            </label>
            <input
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              type='text'
              name='lastname'
              id='lastname'
              className='shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-96 sm:text-md border-gray-300 rounded-md'
              placeholder='Last Name'
            />
          </div>
          <div className='flex items-center justify-center'>
            <label htmlFor='email' className='sr-only'>
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type='email'
              name='email'
              id='email'
              className='shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-96 sm:text-md border-gray-300 rounded-md'
              placeholder='Your Email'
            />
          </div>
          <div className='flex items-center justify-center'>
            <label htmlFor='phone' className='sr-only'>
              Phone
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type='tel'
              name='phone'
              id='phone'
              className='shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-96 sm:text-md border-gray-300 rounded-md'
              placeholder='Your Phone'
            />
          </div>
          <div className='flex items-center justify-center'>
            <label htmlFor='message' className='sr-only'>
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              id='message'
              className='shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-96 sm:text-md border-gray-300 rounded-md'
              placeholder='Your Message'
            />
          </div>
          <div className='flex items-center justify-center'>
            <button
              type='submit'
              className='flex items-center justify-center text-sm w-96 rounded-md shadow py-3 px-2 text-white bg-indigo-600'
            >
              Save
            </button>
          </div>
        </form>
  {isLoading ? (
          <p>Loading...</p>
        ) : (
          <p>Total NFTs Owned: {nftCount}</p>
        )}
        {showPopup && (
          <div className='fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center'>
            <div className='fixed inset-0 transition-opacity'>
              <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
            </div>
            <div className='bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full'>
              <div>
                <div className='mb-4'>
                  <div className='text-lg leading-5 font-medium text-gray-900'>
                    Success
                  </div>
                  <div className='mt-2 text-base leading-6 text-gray-500'>
                    Your form has been successfully submitted.
                  </div>
                </div>
                <div className='mt-5 sm:mt-6'>
                  <span className='flex w-full rounded-md shadow-sm'>
                    <button
                      type='button'
                      className='inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-indigo-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5'
                      onClick={() => setShowPopup(false)}
                    >
                      OK
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

     
    </main></div>
    <div className='  flex object-center items-center'>
      <div className='max-w-4xl mx-auto  flex flex-col p-6'><Card /></div>  </div></div> </div> 
  )

}
export default Home
