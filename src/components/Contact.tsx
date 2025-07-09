import React, { useState } from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding: 80px 0 60px 0;
  background: #202a27;
  min-height: 40vh;
`;

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
`;

const Title = styled.h2`
  color: #1ecb8b;
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
`;

const ContactText = styled.p`
  color: #e6e6e6;
  font-size: 1.18rem;
  font-weight: 500;
  margin-bottom: 1.2rem;
`;

const Email = styled.button`
  display: inline-block;
  color: #1ecb8b;
  font-size: 1.25rem;
  font-weight: 600;
  background: #232a28;
  padding: 0.7rem 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(30, 203, 139, 0.10);
  transition: background 0.18s, color 0.18s;
  margin-top: 1rem;
  border: none;
  cursor: pointer;
  text-decoration: none;
  position: relative;
  &:hover {
    background: #1ecb8b;
    color: #232a28;
  }
`;

const Tooltip = styled.span`
  position: absolute;
  top: -36px;
  left: 50%;
  transform: translateX(-50%);
  background: #1ecb8b;
  color: #232a28;
  font-size: 1rem;
  font-weight: 700;
  padding: 0.3rem 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(30, 203, 139, 0.15);
  opacity: 0.95;
  pointer-events: none;
  z-index: 10;
`;

const EMAIL = 'ivan_koyrushki@abv.bg';

const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      // fallback: do nothing
    }
  };

  return (
    <Section id="contact">
      <Container>
        <Title>Contact Me</Title>
        <ContactText>Feel free to reach out to me via email:</ContactText>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <Email onClick={handleCopy} title="Click to copy email">
            {EMAIL}
            {copied && <Tooltip>Copied!</Tooltip>}
          </Email>
        </div>
      </Container>
    </Section>
  );
};

export default Contact; 