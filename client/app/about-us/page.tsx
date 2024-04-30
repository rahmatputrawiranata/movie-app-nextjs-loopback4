import React from 'react';
import ContentWrapper from '../ui/content-wrapper';
import Header from '../layout/header';
import Link from 'next/link';

const AboutUsPage: React.FC = () => {
    return (
        <div>
            <Header className="justify-end">
                <Link href="/" className="text-white text-3xl">X</Link>
            </Header>
            <ContentWrapper>
                <div className="container mx-auto pt-20">
                    <h1 className="text-3xl font-bold mb-4">About Us</h1>
                    <p className="text-lg">
                        Welcome to our website! We are a team of passionate individuals dedicated to providing high-quality movie apps using Next.js and LoopBack 4.
                    </p>
                    <p className="text-lg mt-4">
                        Our mission is to create user-friendly and visually appealing applications that enhance the movie-watching experience for our users.
                    </p>
                </div>
            </ContentWrapper>
        </div>
    );
};

export default AboutUsPage;