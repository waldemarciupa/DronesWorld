import React from 'react';
import './App.css';
import { Container } from 'reactstrap';
import { ContextWrapper } from './user-context';
import Routes from './routes';

function App() {
  return (
    <ContextWrapper>
      <Container>
        <h1>Sport's App</h1>
        <div className="content">
          <Routes />
        </div>
      </Container>
    </ContextWrapper>
  );
}

export default App;
