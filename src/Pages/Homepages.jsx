import React from 'react';
import LatestUpdatedModel from '../Components/LatestUpdatedModel/LatestUpdatedModel';

import Categories from './Categories';
import Stat from '../Components/statistics _&_volunteer/stat';
import Volunteer from '../Components/statistics _&_volunteer/Volunteer';
import Banner from './Banner';
import CallToAction from '../Components/CallToAction/CallToAction';

const Homepages = () => {
    return (
        <div>
            <div>
                <h1>here bannar</h1>
                <Banner></Banner>
            </div>
            
            <Categories></Categories>
            <LatestUpdatedModel></LatestUpdatedModel>
            <Stat></Stat>
            <CallToAction></CallToAction>
        </div>
    );
};

export default Homepages;