import React from 'react';
import LatestUpdatedModel from '../Components/LatestUpdatedModel/LatestUpdatedModel';
import Banner from './Banner';
import Categories from './Categories';
import Stat from '../Components/statistics _&_volunteer/stat';
import Volunteer from '../Components/statistics _&_volunteer/Volunteer';

const Homepages = () => {
    return (
        <div>
            
            
            <Categories></Categories>
            <LatestUpdatedModel></LatestUpdatedModel>
            <Stat></Stat>
        </div>
    );
};

export default Homepages;