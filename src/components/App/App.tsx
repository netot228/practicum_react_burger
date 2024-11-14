import React from 'react';
import style from './App.module.css'

import AppHeader from '../AppHeader/AppHeader';

function App(){
    return (
        <div className={style.App}>
            <AppHeader />
        </div>
    )
}

export default App;