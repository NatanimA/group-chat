import React from 'react'

import "./SideBar.scss"

const SideBar = () => {
  return (
    <>
        <nav>
            <div className='app__navbar_container'>
                <h3>Groups</h3>
                <ul>
                    <div>
                        <li>Abysinia</li>
                    </div>
                    <div>
                        <li>Sheger</li>
                    </div>
                    <div>
                        <li>Mekelle</li>
                    </div>
                </ul>
            </div>
        </nav>
    </>
  )
}

export default SideBar
