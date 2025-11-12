import React from 'react';
import { useLoaderData } from 'react-router';
import ModelCard from '../ModelCard/ModelCard';

const Home = () => {
    const data =useLoaderData()
    console.log(data)
    console.log(data.length)

    return (
        <div>
           <div className='flex justify-center items-center'>
            <p className='text-2xl font-bold'>All Model</p>
            
            
           </div>

           <div  className='flex justify-center items-center'>
            <p className='text-[12px] text-blue-500'>Explore {data.length} model</p>
           </div>
           <div className='grid grid-cols-3 gap-10'>
             {
                data.map(data =><ModelCard key={data._id} data = {data}></ModelCard>)
            } 
           </div>
        </div>
    );
};

export default Home;