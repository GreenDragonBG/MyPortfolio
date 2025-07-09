import React from 'react';
import styled from 'styled-components';

const LandingSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(30,43,40,0.93) 0%, rgba(24,51,47,0.93) 100%), url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80') center/cover no-repeat;
  padding-top: 70px;
  @media (max-width: 700px) {
    padding-top: 60px;
  }
`;

const Content = styled.div`
  text-align: center;
  color: #fff;
  max-width: 700px;
  padding: 2rem;
  background: rgba(24, 51, 47, 0.7);
  border-radius: 18px;
  box-shadow: 0 4px 32px rgba(0,0,0,0.18);
`;

const Name = styled.h1`
  font-size: 2.8rem;
  font-weight: 800;
  margin-bottom: 1.2rem;
  letter-spacing: 1.5px;
  color: #1ecb8b;
`;

const Intro = styled.p`
  font-size: 1.35rem;
  font-weight: 400;
  margin-bottom: 1.5rem;
  color: #e6e6e6;
  text-align: justify;
`;

const LocationInfo = styled.div`
  margin: 1.2rem auto 0 auto;
  background: #1ecb8b;
  color: #232a28;
  font-weight: 700;
  font-size: 1.08rem;
  padding: 0.7rem 1.4rem;
  border-radius: 8px;
  max-width: 340px;
  box-shadow: 0 2px 12px rgba(30, 203, 139, 0.10);
  text-align: center;
  letter-spacing: 0.5px;
`;

const StudyInfo = styled.div`
  margin: 0.7rem auto 0 auto;
  background: #1ecb8b;
  color: #232a28;
  font-weight: 700;
  font-size: 1.08rem;
  padding: 0.7rem 1.4rem;
  border-radius: 8px;
  max-width: 440px;
  box-shadow: 0 2px 12px rgba(30, 203, 139, 0.10);
  text-align: center;
  letter-spacing: 0.5px;
`;

// Add a new styled component for the field of study info, similar to LocationInfo and StudyInfo
const FieldInfo = styled.div`
  margin: 0.7rem auto 0 auto;
  background: #1ecb8b;
  color: #232a28;
  font-weight: 700;
  font-size: 1.08rem;
  padding: 0.7rem 1.4rem;
  border-radius: 8px;
  max-width: 440px;
  box-shadow: 0 2px 12px rgba(30, 203, 139, 0.10);
  text-align: center;
  letter-spacing: 0.5px;
`;

const Landing: React.FC = () => (
  <LandingSection id="home">
    <Content>
      <Name>Ivan Koyrushki</Name>
      <Intro>
      Hi, I’m Ivan — a developer passionate about crafting engaging digital experiences. My main focus is 2D game development using Unity and C#, where I love designing gameplay mechanics, creating smooth animations, and bringing creative ideas to life. Beyond games, I also work with React to build dynamic web applications, and use Java for backend development and programming projects. Take a look at my portfolio to see some of the 2D games and other projects I’ve been working on!
      </Intro>
      <LocationInfo>📍 Located in Sofia, Bulgaria</LocationInfo>
      <StudyInfo>🎓 Studying at the Professional High School of Telecommunications</StudyInfo>
      <FieldInfo>💻 Field of Study: Application Programming</FieldInfo>
    </Content>
  </LandingSection>
);

export default Landing; 
