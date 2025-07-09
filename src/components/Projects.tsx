import React from 'react';
import styled from 'styled-components';
import { getPortfolioImgUrl } from '../data/supabase';

const unityProjects = [
  {
    title: 'Adventure & Monsters',
    description: 'A Unity-based adventure game project featuring monsters and exploration. Play as a character and fight monsters in search of valuable colectables. Explore variuse eviurments with diffrent enemys on looks nad mechanics Built with C# and Unity engine.',
    image: getPortfolioImgUrl('adventureImg.png'),
    link: 'https://github.com/GreenDragonBG/Adventure-Monsters',
  },
  {
    title: 'Realms',
    description: 'A Unity-based adventure game project featuring monsters and exploration. Play as a character and fight monsters in search of valuable collectibles. Explore various environments with different enemies on looks and mechanics Built with C# and Unity engine.',
    image: getPortfolioImgUrl('realmsImg.png'),
    link: 'https://github.com/GreenDragonBG/Realms',
  }
];

const reactProjects = [
  {
    title: 'To Do List',
    description: 'A modern, interactive To Do List web app with drag-and-drop, built using React and Supabase. Organize your tasks efficiently and enjoy a clean, responsive UI.',
    image: getPortfolioImgUrl('todolistImg.png'),
    link: 'https://greendragonbg.github.io/ToDoList/',
  },
  {
    title: '3D Online Shop',
    description: 'A beautiful online shop with 3D product models and user authentication system, build with React, Three.js, and Supabase.',
    image: getPortfolioImgUrl('3dshopImg.png'),
    link: 'https://mariaaivanova.github.io/OnlineShop.github.io/',
  }
];

const javaProjects = [
  {
    title: 'Java Projects',
    description: 'A repository full of projects done purely in Java. Explore a variety of Java-based applications and exercises, including OOP, data structures, and more.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80',
    link: 'https://github.com/GreenDragonBG/Java',
  }
];

const Section = styled.section`
  padding: 100px 0 60px 0;
  background: #202a27;
  min-height: 100vh;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const Title = styled.h2`
  color: #1ecb8b;
  font-size: 2.2rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 2.5rem;
`;

const SubTitle = styled.h3`
  color: #1ecb8b;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  margin-top: 2.5rem;
  text-align: left;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
  gap: 2rem;
`;

const Card = styled.div`
  background: #232a28;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(30, 43, 40, 0.18);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.18s, box-shadow 0.18s;
  &:hover {
    transform: translateY(-8px) scale(1.03);
    box-shadow: 0 8px 32px rgba(30, 203, 139, 0.18);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const CardContent = styled.div`
  flex: 1;
  padding: 1.3rem 1.2rem 1.2rem 1.2rem;
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.h4`
  color: #1ecb8b;
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.7rem;
`;

const CardDesc = styled.p`
  color: #e6e6e6;
  font-size: 1.05rem;
  margin-bottom: 1.2rem;
  flex: 1;
`;

const CardButton = styled.a`
  display: inline-block;
  background: #1ecb8b;
  color: #232a28;
  font-weight: 700;
  padding: 0.6rem 1.3rem;
  border-radius: 8px;
  text-decoration: none;
  font-size: 1.05rem;
  text-align: center;
  transition: background 0.18s, color 0.18s;
  box-shadow: 0 2px 8px rgba(30, 203, 139, 0.10);
  &:hover {
    background: #16a06a;
    color: #fff;
  }
`;

const DevBadge = styled.div`
  display: inline-block;
  background: #ffb300;
  color: #232a28;
  font-weight: 800;
  font-size: 1rem;
  padding: 0.35rem 1rem;
  border-radius: 8px;
  margin-bottom: 0.7rem;
  letter-spacing: 1px;
  box-shadow: 0 2px 8px rgba(255, 179, 0, 0.15);
`;

const Projects: React.FC = () => (
  <Section id="projects">
    <Container>
      <Title>Projects</Title>
      <SubTitle>Unity Projects</SubTitle>
      <Grid>
        {unityProjects.length === 0 ? <CardDesc>No Unity projects yet.</CardDesc> : unityProjects.map((project, idx) => (
          <Card key={idx}>
            <CardImage src={project.image} alt={project.title} />
            <CardContent>
              {/* Add badge for Adventure & Monsters and Realms project */}
              {project.title === 'Adventure & Monsters' && (
                <DevBadge>(Prototype version – still in development)</DevBadge>
              )}
              {project.title === 'Realms' && (
                <DevBadge>(Project is still in development)</DevBadge>
              )}
              <CardTitle>{project.title}</CardTitle>
              <CardDesc>{project.description}</CardDesc>
              <CardButton href={project.link} target="_blank" rel="noopener noreferrer">
                View Project
              </CardButton>
            </CardContent>
          </Card>
        ))}
      </Grid>
      <SubTitle>React Projects</SubTitle>
      <Grid>
        {reactProjects.map((project, idx) => (
          <Card key={idx}>
            <CardImage src={project.image} alt={project.title} />
            <CardContent>
              <CardTitle>{project.title}</CardTitle>
              <CardDesc>{project.description}</CardDesc>
              <CardButton href={project.link} target="_blank" rel="noopener noreferrer">
                View Project
              </CardButton>
            </CardContent>
          </Card>
        ))}
      </Grid>
      <SubTitle>Java Projects</SubTitle>
      <Grid>
        {javaProjects.length === 0 ? <CardDesc>No Java projects yet.</CardDesc> : javaProjects.map((project, idx) => (
          <Card key={idx}>
            <CardImage src={project.image} alt={project.title} />
            <CardContent>
              <CardTitle>{project.title}</CardTitle>
              <CardDesc>{project.description}</CardDesc>
              <CardButton href={project.link} target="_blank" rel="noopener noreferrer">
                View Project
              </CardButton>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </Container>
  </Section>
);

export default Projects; 