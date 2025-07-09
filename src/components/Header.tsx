import React, { useState } from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100px;
  background: #181a20;
  border-bottom: 1px solid #23242b;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.h1`
  font-size: 1.3rem;
  font-weight: 600;
  color: #e6e6e6;
  margin: 0 0 0.5rem 0;
`;

const AddTaskBar = styled.form`
  width: 100%;
  max-width: 500px;
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const AddTaskInput = styled.input`
  flex: 1;
  padding: 0.85rem 1.1rem;
  border: 1.5px solid #444a5a;
  border-radius: 8px;
  font-size: 1.08rem;
  background: #23242b;
  color: #e6e6e6;
  transition: border 0.2s, background 0.2s;
  &:focus {
    outline: none;
    border-color: #4e7fff;
    background: #23272f;
  }
`;

const AddTaskButton = styled.button`
  background: #4e7fff;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0 1.5rem;
  font-size: 1.08rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.18s;
  &:hover {
    background: #3456b0;
  }
`;

interface HeaderProps {
  onAddTask: (text: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onAddTask }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onAddTask(input.trim());
    setInput('');
  };

  return (
    <HeaderContainer>
      <Logo>To-Do List App</Logo>
      <AddTaskBar onSubmit={handleSubmit}>
        <AddTaskInput
          type="text"
          placeholder="Add a new task..."
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <AddTaskButton type="submit">Add</AddTaskButton>
      </AddTaskBar>
    </HeaderContainer>
  );
};

export default Header; 