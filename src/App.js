import './App.css';
import Main from './components/Main';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
    <div>
      <ChakraProvider>
        <Main />
      </ChakraProvider>
    </div>
  );
}

export default App;
