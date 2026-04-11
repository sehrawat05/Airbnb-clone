import React, { useContext } from 'react'

import Nav from '../component/Nav'

import Card from '../component/Card'

import { ListingDataContext } from '../context/ListingContext'



const Home = () => {

    let { listingData, setListingData } = useContext(ListingDataContext)

    return (

        <div>

            <Nav />

            <div className='w-[100vw] h-[77vh] flex items-center justify-center gap-[15px] flex-wrap mt-[25px] md:mt-[18px]'>

                {listingData.map((list) => (

                    <Card key={list._id} id={list._id} title={list.title} landmark={list.landmark} city={list.city} image1={list.image1} image2={list.image2} image3={list.image3} rent={list.rent} rating={list.ratings} isBooked={list.isBooked} host={list.host} />

                ))}

            </div>

        </div>

    )

}



export default Home