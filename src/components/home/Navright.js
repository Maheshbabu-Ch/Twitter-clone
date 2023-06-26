import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'


export default function Navright() {
  return (
    <div id="navright">
      {/* <div id="search">
      <FontAwesomeIcon id='i' icon={faMagnifyingGlass} />
      {/* <input type='search' placeholder="Search Tweetify"></input> }
      <input type="search" name="search" placeholder="Search Twitter" title='We are currently working on this'/>
      </div> */}
      <div id="tagbox">
          <h2>What's happening</h2>
          <p>#MArvel</p>
          <p>#Naruto</p>
          <p>#Adipurush</p>
          <p>#Codegnan</p>
      </div>
    </div>
  )
}
