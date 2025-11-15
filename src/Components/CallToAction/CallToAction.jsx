import React from 'react';

const CallToAction = () => {
    return (
        <div>
            <div className="min-h-screen bg-[#FBD48D] flex items-center justify-center relative">

                {/* Card 1 */}
                <div className="absolute top-16 border left-10 w-80 bg-[#fff7e6] rounded-xl shadow p-5">
                    <img 
                        src="https://i.ibb.co.com/0VZM84GY/27287876-mg7p-9tns-211223.jpg" 
                        alt="cdvdsgcv" 
                        className="w-full border h-32 object-cover rounded mb-4" 
                    />
                    <div className="space-y-2">
                        <h1>Do not pollution </h1>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="absolute top-40 right-10 w-96 bg-white rounded-xl shadow-lg p-6">
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <img  className="w-full border h-32 object-cover rounded mb-4"  src="https://i.ibb.co.com/bgbwHsMc/2105130.jpg" />
                        <img  className="w-full border h-32 object-cover rounded mb-4"  src="https://i.ibb.co.com/8L8xQ3Cq/20945093.jpg" />
                        <img  className="w-full border h-32 object-cover rounded mb-4"  src="https://i.ibb.co.com/dJ3vJtTj/3731738.jpg" />
                        <img  className="w-full border h-32 object-cover rounded mb-4"  src="https://i.ibb.co.com/pjVx95hZ/5220590-2753189.jpg" />
                    </div>
                    <div className="">
                       <h1 className='text-xl '>We Can Work together to solve problem and Create a good city</h1>
                    </div>
                </div>

                {/* Card 3 */}
                <div className="absolute bottom-16 left-32 w-96 bg-white rounded-xl shadow p-6">
                    <div className="space-y-2 mb-4">
                        <h1>Create a Problem Free City</h1>
                        
                    </div>
                    <img 

                        src="https://i.ibb.co.com/WWLLhQbp/27181588-n6a0-be8s-220304.jpg" 
                        alt="card-3" 
                        className="w-full border h-32 object-cover rounded" 
                    />
                </div>

            </div>
        </div>
    );
};

export default CallToAction;
