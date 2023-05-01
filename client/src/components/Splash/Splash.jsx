import React,{useState,useEffect} from 'react'
import { PacmanLoader } from 'react-spinners'
import './Splash.scss'

const Splash = ({loading}) => {

  return (
    <>
        <div className='app__splash_loader'>
            <PacmanLoader
            loading={loading}
            color=" #FF0000"
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
            />
        </div>

    </>
  )
}

export default Splash;
