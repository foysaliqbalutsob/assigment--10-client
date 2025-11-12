import React, { useEffect, useState } from 'react';
import TopService from './Components/Topservice';

const About = () => {
    const [service, setService] = useState([]);



    useEffect(() => {
        fetch("/pet.json")
          .then((res) => res.json())
          .then((data) => setService(data))
          .catch((err) => console.log( err));
      }, []);
    //   console.log(service)


    return (
        <div>
            <div>
                <h1 className="text-3xl font-bold text-center text-sky-700 mb-8" >Our Provided Services</h1>

                <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6">
          {service.map((Services) => <TopService  key={Services.serviceId} Services={Services}></TopService>)
          }
        </div>
            </div>
            
        </div>
    );
};

export default About;