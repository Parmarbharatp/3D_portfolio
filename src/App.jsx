import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Navbar, Hero, About, SafeTech, Experience, Works } from "./components";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#0a0a0a',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '20px',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center'
      }}>
        <div>
          <h1 style={{ marginBottom: '20px', color: '#915EFF' }}>
            Loading Portfolio...
          </h1>
          <div style={{
            width: '200px',
            height: '4px',
            backgroundColor: '#333',
            borderRadius: '2px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: '60%',
              height: '100%',
              backgroundColor: '#915EFF',
              animation: 'loading 2s infinite'
            }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div style={{
        width: '100vw',
        minHeight: '100vh',
        backgroundColor: '#0a0a0a',
        color: '#fff',
        fontFamily: 'Arial, sans-serif'
      }}>
        <Navbar />
        <Hero />
        <About />
        <SafeTech />
        <Experience />
        <Works />
        
        <div style={{
          padding: '50px 20px',
          textAlign: 'center'
        }}>
          <h2 style={{ 
            fontSize: '32px', 
            marginBottom: '20px',
            color: '#915EFF'
          }}>
            Portfolio Components Status
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <div style={{
              backgroundColor: '#1a1a1a',
              padding: '20px',
              borderRadius: '10px',
              border: '1px solid #333'
            }}>
              <h3>✅ Navbar</h3>
              <p>Navigation component loaded</p>
            </div>
            
            <div style={{
              backgroundColor: '#1a1a1a',
              padding: '20px',
              borderRadius: '10px',
              border: '1px solid #333'
            }}>
              <h3>✅ Hero Section</h3>
              <p>Hero component loaded</p>
            </div>
            
            <div style={{
              backgroundColor: '#1a1a1a',
              padding: '20px',
              borderRadius: '10px',
              border: '1px solid #333'
            }}>
              <h3>✅ About Section</h3>
              <p>About component loaded</p>
            </div>
            
            <div style={{
              backgroundColor: '#1a1a1a',
              padding: '20px',
              borderRadius: '10px',
              border: '1px solid #333'
            }}>
              <h3>✅ Tech Section</h3>
              <p>2D version loaded safely</p>
            </div>
            
            <div style={{
              backgroundColor: '#1a1a1a',
              padding: '20px',
              borderRadius: '10px',
              border: '1px solid #333'
            }}>
              <h3>✅ Experience</h3>
              <p>Experience section loaded</p>
            </div>
            
            <div style={{
              backgroundColor: '#1a1a1a',
              padding: '20px',
              borderRadius: '10px',
              border: '1px solid #333'
            }}>
              <h3>✅ Works</h3>
              <p>Projects section loaded</p>
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
