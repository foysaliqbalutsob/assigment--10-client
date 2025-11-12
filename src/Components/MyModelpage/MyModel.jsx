import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import ModelCard from "../ModelCard/ModelCard";

const MyModel = () => {
  const [models, setModels] = useState([]);
  const {user } = use(AuthContext)
  console.log(models)


  
  useEffect(() => {
  if (!user?.accessToken) return; // wait for user & token
  fetch(`http://localhost:3000/my-models`, {
    headers: {
      authorization: `Bearer ${user.accessToken}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) setModels(data.result);
    })
    .catch((err) => console.error(err));
}, [user?.accessToken]);


  return (
    <div>
      <h2>My Models</h2>
       <div className='grid grid-cols-3 gap-10'>
            {
                models.map(data =><ModelCard key={data._id} data = {data}></ModelCard>)
            }
           </div>
    </div>
  );
};

export default MyModel;
