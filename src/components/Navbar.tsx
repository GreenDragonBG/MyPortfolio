import React from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(24, 26, 32, 0.95);
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  z-index: 1000;
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 2rem;
  height: 70px;
`;

const Logo = styled.a`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1ecb8b;
  text-decoration: none;
  letter-spacing: 1px;
`;

const NavLinks = styled.ul`
  display: flex;
  gap: 2rem;
  list-style: none;
  @media (max-width: 700px) {
    gap: 1rem;
  }
`;

const NavLink = styled.a`
  color: #e6e6e6;
  font-size: 1.08rem;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.18s;
  &:hover {
    color: #1ecb8b;
  }
`;

const Navbar: React.FC = () => (
  <Nav>
    <NavContainer>
      <Logo href="#home">My Portfolio</Logo>
      <NavLinks>
        <li><NavLink href="#home">About</NavLink></li>
        <li><NavLink href="#projects">Projects</NavLink></li>
        <li><NavLink href="#contact">Contact</NavLink></li>
      </NavLinks>
    </NavContainer>
  </Nav>
);

export default Navbar; 