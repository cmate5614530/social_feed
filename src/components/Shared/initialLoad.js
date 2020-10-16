import ContentLoader from 'react-content-loader'
import React from 'react'
import './initialLoad.css'
export const MyInstagramLoader = () => {
  return (
    <div>
      {[...Array(1).keys()].map((item, index) => {
        return (
          <div key={index} className='loadercontainer'>
            <div className='maincontainer'>
              <div className='header flexboxrow'>
                <div className='avatar'>
                  <div />
                </div>
                <div className='flexboxcolumn content'>
                  <div />
                  <div />
                </div>
              </div>
              <div className='imageplaceholder' />
              <div className='footer flexboxcolumn'>
                <div classname='content1' />
                <div classname='content2' />
                <div classname='content3' />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
