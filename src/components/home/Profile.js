import React, { useEffect, useState } from 'react'
import Navleft from './Navleft'
import Navright from './Navright'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import {formatDistanceToNow} from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart,faTrash } from '@fortawesome/fontawesome-free-solid';

export default function Profile() {
  const {id} = useParams();
  const navigate = useNavigate()
  const [user , setuser] = useState(null)
  const [currentUser , setcurrentUser] = useState({following : []})
  const [buttonelement, setbutton] = useState(null)
  const [delbtn, setdelbtn] = useState(null)
  const [tweets, setTweets] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get(`https://backend-tweetify.onrender.com/api/user/find/${id}`);
        await setuser(userResponse.data);
        if(sessionStorage.getItem('userID')){
          // const currentUserResponse = await axios.get(`http://localhost:5000/api/user/find/${sessionStorage.getItem('userID')}`);
          const currentUserResponse = await axios.get(`https://backend-tweetify.onrender.com/api/user/find/${sessionStorage.getItem('userID')}`);
          await setcurrentUser(currentUserResponse.data);}
        //  getTweets();
      } catch (error) {
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    let button,button1;
    if(currentUser && user){
    if (currentUser._id === user._id) 
    { button = null; button1= <button className="follow del" onClick={deletehandler}>Delete my Account</button> }
    else if (currentUser.following.includes(user._id))
    {button = <button className="follow" onClick={followhandler}>Following</button>}
    else
    {button = <button className="follow" onClick={followhandler}>Follow</button>}}
    setbutton(button)
    setdelbtn(button1)
},[user,currentUser]);

  const getTweets = async () => {
    try {
      const response = await axios.get(`https://backend-tweetify.onrender.com/api/tweets/user/${user._id}`);
      const tweetsData = response.data;
      const tweetList = await Promise.all(
        tweetsData.map(async (tweet) => {
          const userResponse = await axios.get(`https://backend-tweetify.onrender.com/api/user/find/${tweet.userID}`);
          const userData = userResponse.data;
          const datestr = formatDistanceToNow(new Date(tweet.createdAt), {
            prefix: '',
            suffix: ''
          }).replace('about','').trim();
          // const currUser = sessionStorage.getItem('userID')   
          const handlelike = async(e)=> {
              e.preventDefault();
              try
              {   if(sessionStorage.getItem('userID')!==null){
                  await axios.put(`https://backend-tweetify.onrender.com/api/tweets/${tweet._id}/like`,
                  {id : sessionStorage.getItem('userID')},{  headers: {
                      'x-token': sessionStorage.getItem('token')
                    }})
                    .then(res=> {
                      console.log(res.data);
                      const likesCountElement = document.getElementById(`likescount_${tweet._id}`);
                      let updatedLikesCount = ''
                      if(res.data ===  "Liked the tweet"){
                        
                          updatedLikesCount = parseInt(likesCountElement.innerText)+1;}
                      else {
                          updatedLikesCount = parseInt(likesCountElement.innerText)-1; }

                      console.log(updatedLikesCount)
                      console.log("true")
                      likesCountElement.innerText = updatedLikesCount.toString();
                      console.log(likesCountElement.innerText )
                    })
              }}
              catch(err){}
              // console.log(err);}
          }     
          const handledelete = async(e) => {
              e.preventDefault();
              try{
                  await axios.delete(`http://localhost:5000/api/tweets/${tweet._id}`,{ headers:{ 'x-token': sessionStorage.getItem('token')}})
                  .then((res)=>{
                      if(res.status !== 200) 
                      alert("cannot delete others tweets")
                      else
                      getTweets()
                  });       
              }
              catch(err){console.log(err);}
          }
          return (
  
            <div key={tweet._id}>
                <div className="post">
                    <div id="cont">
                    <Link to= {`/profile/${tweet.userID}`}><div id="user_info">
                          <img id="profile_pic"src={userData.pic} alt="profile_pic"></img>
                          <p>{userData.name}<span>@{userData.username}</span></p><span>-{datestr}</span>
                      </div></Link>
                      <p id="con">{tweet.content}</p>
                      <div id='post_actions'>
                      <svg id="comment" viewBox="0 0 24 24" aria-hidden="true"><g><path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path></g></svg>
                      {/* <div><svg id="like" viewBox="0 0 24 24" aria-hidden="true" class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"><g><path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path></g></svg>{tweet.likes.length}</div>                       */}
                      <button className="like1" id={`like1_${tweet._id}`} onClick={handlelike}>{tweet.likes.includes(sessionStorage.getItem('userID')) ?  (<FontAwesomeIcon icon={faHeart} size="lg" style={{color: "#ff0000",}} /> ) : <svg id="like" viewBox="0 0 24 24" aria-hidden="true"><g><path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path></g></svg>}
                      <span id={`likescount_${tweet._id}`}>{tweet.likes.length}</span></button>
                      {tweet.userID === sessionStorage.getItem('userID') ? (<button id="delete" onClick={handledelete}><FontAwesomeIcon icon={faTrash} style={{color: "#000000",}} /></button>) : ''}
                      </div>
                    </div>
                </div>
            </div>
          );
        })
      );
      setTweets(tweetList);
    } catch (error) {
      // console.error(error);
    }
  };
  


        const followhandler = async () => {
            try {
              if (currentUser && currentUser.following && user && user._id) {
                if (currentUser.following.includes(user._id)) {
                  await axios.put(`https://backend-tweetify.onrender.com/api/user/unfollow/${user._id}`, null, {
                    headers: {
                      'x-token': sessionStorage.getItem('token'),
                    },
                  });
                } else {
                  await axios.put(`https://backend-tweetify.onrender.com/api/user/follow/${user._id}`, null, {
                    headers: {
                      'x-token': sessionStorage.getItem('token'),
                    },
                  });
                }
        
                const updatedCurrentUserResponse = await axios.get(`https://backend-tweetify.onrender.com/api/user/find/${sessionStorage.getItem('userID')}`);
                const updatedUserResponse = await axios.get(`https://backend-tweetify.onrender.com/api/user/find/${id}`);
                setcurrentUser(updatedCurrentUserResponse.data);
                setuser(updatedUserResponse.data);
              }
            } catch (error) {
              console.log(error);
            }
          };
          
          const deletehandler = async() => {
            try{
                  await axios.delete(`https://backend-tweetify.onrender.com/api/user/${sessionStorage.getItem('userID')}`,{
                    headers: {
                      'x-token': sessionStorage.getItem('token'),
                    },
                  });
                  alert('Your Account has been deleted successfully');
                  sessionStorage.clear();
                  navigate('/')

            }catch (error) {
              console.log(error);
            }
          }

useEffect(()=> {getTweets()},[id,tweets,user])
  return (
    <div className='homep'>
        <Navleft/>
        {user === null ? (  <div className="navmid profile"><div className='center'>Loading....</div></div>):
        (<div className='navmid profile'>
            <div id="head">
                <Link to="/home"><svg id="back" viewBox="0 0 24 24" aria-hidden="true"><g><path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path></g></svg></Link>
                <h2>{user.name}</h2>
            </div>
            <div id="blank"></div>
            <div id="user_info">
                        <img id="profile_pic1"src={user.pic} alt=""></img>
                        <div id="info">
                            <p>{user.name}</p>
                            <p>@{user.username}</p>
                        </div>
                        <div>
                            <p>{user.following.length} Following</p>
                            <p>{user.followers.length} Followers</p>
                        </div>
                        {buttonelement}
                        {delbtn}
                    </div>
                    <div>
                        {tweets}
                    </div>
        </div>)}
        <Navright/>
    </div>
  )
}
