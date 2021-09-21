import React from 'react';
import styles from './App.module.css'
import robots from './mockdata/robots.json'
import Robot from './components/Robots';
import logo from './assets/images/logo.svg'
import ShoppingCart from './components/ShoppingCart';
/* 
  CSS in JS(JSS)
*/
const App:React.FC= ()=> {
  return (
    <div className={styles.app}>
      <div className={styles.appHeader}>
        <img src={logo} alt="logo" className={styles.appLogo}/>
        <h1>CyberPunk机器人Inc</h1>
      </div>
    <ShoppingCart/>
    <div className={styles.robotList}>
      {robots.map(r => {
       return <Robot id={r.id} email={r.email} name={r.email} key={r.id}/>
      })}
    </div>
    </div>
  );
}

export default App;
