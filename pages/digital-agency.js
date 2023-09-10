import React from 'react';
import MainBanner from "@/components/DigitalAgency/MainBanner";
import WhatWeOffer from '@/components/DigitalAgency/WhatWeOffer';
import AboutUsContent from '@/components/DigitalAgency/AboutUsContent';
import OurServices from '@/components/DigitalAgency/OurServices';
import DigitalAgencyFunFacts from '@/components/DigitalAgency/DigitalAgencyFunFacts';
import Projects from '@/components/DigitalAgency/Projects';
import FeedbackStyleThree from '@/components/Common/FeedbackStyleThree';
import BlogPostStyleTwo from '@/components/Common/BlogPostStyleTwo';
import CTAStyleTwo from '@/components/Common/CTAStyleTwo';
import Footer from "@/components/_App/Footer";
import Navbar from '@/components/_App/Navbar';
import PricingStyleFour from '@/components/PricingPlans/PricingStyleFour';


const DigitalAgency = () => {
    return (
        <>
            <Navbar />

            <MainBanner />

            <WhatWeOffer />

            <AboutUsContent />

            <OurServices />

            <DigitalAgencyFunFacts />

            <Projects />

            <PricingStyleFour />

            <FeedbackStyleThree />

            <BlogPostStyleTwo />

            <CTAStyleTwo />
            
            <Footer />
        </>
    )
}

export default DigitalAgency;