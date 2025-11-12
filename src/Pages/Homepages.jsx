import React from 'react';
import LatestUpdatedModel from '../Components/LatestUpdatedModel/LatestUpdatedModel';
import Banner from './Banner';
import Categories from './Categories';

const Homepages = () => {
    return (
        <div>
            <Banner></Banner>
            <Categories></Categories>
            <LatestUpdatedModel></LatestUpdatedModel>
        </div>
    );
};

export default Homepages;