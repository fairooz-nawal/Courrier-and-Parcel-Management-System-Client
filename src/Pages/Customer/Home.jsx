import React from 'react';
import Banner from '../../Component/Banner';
import Feature from '../../Component/Feature';
import HowItWorksSection from '../../Component/HowItWorks';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Feature></Feature>
            <HowItWorksSection></HowItWorksSection>
        </div>
    );
};

export default Home;