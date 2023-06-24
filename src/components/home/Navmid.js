import React,{ useEffect, useState} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import {formatDistanceToNow} from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart,faTrash } from '@fortawesome/fontawesome-free-solid';
import Tweet from './Tweet';
export default function Navmid(){
  const [tweets, setTweets] = useState([])
  const [tweetdata , setTweetdata] = useState()

  useEffect(()=>{getTweets();},[])
  const post_tweet = async () => {
    const tweetText = document.getElementById("tweet_content").innerText;
    if (tweetText.trim().length === 0)
      return;
    try {
      const response = await axios.post("http://localhost:5000/api/tweets/", { content: tweetText, userID: localStorage.getItem('userID') }, {
        headers: {
          'x-token': localStorage.getItem('token')
        }
        
      });
      getTweets();
      document.getElementById("tweet_content").innerText = "";
    } catch (error) {
      console.error(error);
    }
  };

  //   useEffect(()=> {
  //     const fetchData = async () => {
  //     try{
  //       const response = await axios.get("http://localhost:5000/api/tweets/ret");
  //       setTweetdata(response)
  //       console.log(tweetdata)
  //     }
  //     catch(err){console.log(err);}
  //   };
  //   fetchData();
  // },[localStorage.getItem('userID')]);

const getTweets = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/tweets/ret");
     const tweetsData = response.data;

      const tweetList = await Promise.all(
      tweetsData.map(async tweet => {
        const userResponse = await axios.get(`http://localhost:5000/api/user/find/${tweet.userID}`);
        const userData = userResponse.data;
        // const datestr = formatDistanceToNow(new Date(tweet.createdAt), {
        // //   addSuffix: true,
        // //   includeSeconds: true,
        //   prefix: '',
        //   suffix: ''
        // }).replace('about','').trim(); 
        
        return (

          <div key={tweet._id}>
              {/* Render the tweets */}
              {/* {tweets.map((tweet) => ( */}
            <Tweet tweet={tweet} userData={userData} />
          </div>
        );
      })
    );
    setTweets(tweetList);
    getTweets()

  } catch (error) {
    console.error(error);}
};
  return (
    <div className='navmid'>
        <div id="head"><h3>Home</h3></div>
        <div id="post">
            <form id="postform" onSubmit={event => event.preventDefault()}>
                <div id="post_user">
                  <img id="profile_pic"src={localStorage.getItem('pic')}></img>
                  <div id="tweet_content"data-text="What is happening?!" contentEditable='true'></div>

                </div>
                <div id="icons">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><g><path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path></g></svg>
                  <svg viewBox="0 0 24 24" aria-hidden="true"><g><path d="M8 9.5C8 8.119 8.672 7 9.5 7S11 8.119 11 9.5 10.328 12 9.5 12 8 10.881 8 9.5zm6.5 2.5c.828 0 1.5-1.119 1.5-2.5S15.328 7 14.5 7 13 8.119 13 9.5s.672 2.5 1.5 2.5zM12 16c-2.224 0-3.021-2.227-3.051-2.316l-1.897.633c.05.15 1.271 3.684 4.949 3.684s4.898-3.533 4.949-3.684l-1.896-.638c-.033.095-.83 2.322-3.053 2.322zm10.25-4.001c0 5.652-4.598 10.25-10.25 10.25S1.75 17.652 1.75 12 6.348 1.75 12 1.75 22.25 6.348 22.25 12zm-2 0c0-4.549-3.701-8.25-8.25-8.25S3.75 7.451 3.75 12s3.701 8.25 8.25 8.25 8.25-3.701 8.25-8.25z"></path></g></svg>
                  
                <button id="tweet" onClick={post_tweet}>Tweet</button>
                </div>
            </form>
            <div id="posts">
                  {tweets}
              </div>
          </div>
      </div>
  )
}
