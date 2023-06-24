import React,{useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrash } from '@fortawesome/fontawesome-free-solid';

const Tweet = ({ tweet , userData, }) => { 
    const handleLike = async (e) => {
    e.preventDefault();
    try {
      const like = await axios.put(
        `http://localhost:5000/api/tweets/${tweet._id}/like`,
        { id: localStorage.getItem('userID') },
        {
          headers: {
            'x-token': localStorage.getItem('token'),
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:5000/api/tweets/${tweet._id}`, {
        headers: { 'x-token': localStorage.getItem('token') },
      });
    } catch (err) {
      console.log(err);
    }
  };

        const datestr = formatDistanceToNow(new Date(tweet.createdAt), {
        //   addSuffix: true,
        //   includeSeconds: true,
          prefix: '',
          suffix: ''
        }).replace('about','').trim();
        // useEffect(() => {
        //     // Update the tweet's likes array when the component mounts
        //     // This ensures that the UI reflects the updated likes without refreshing the page
        //     const updatedTweet = { ...tweet };
        //     updatedTweet.likes = tweet.likes;
        //     setTweets((prevTweets) => {
        //       const updatedTweets = prevTweets.map((t) => {
        //         if (t._id === tweet._id) {
        //           return updatedTweet;
        //         }
        //         return t;
        //       });
        //       return updatedTweets;
        //     });
        //   }, [tweet.likes, setTweets]);

  return (
    <div className="post">
        <div id="cont">
            <Link to= {`/profile/${tweet.userID}`}>
                <div id="user_info">
                <img id="profile_pic"src={userData.pic}></img>
                <p>{userData.name}<span>@{userData.username}</span></p><span>-{datestr}</span>
                </div>
            </Link>
            <p id="con">{tweet.content}</p>
            <div id='post_actions'>
                <svg id="comment" viewBox="0 0 24 24" aria-hidden="true"><g><path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path></g></svg>
                {/* <div><svg id="like" viewBox="0 0 24 24" aria-hidden="true" class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"><g><path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path></g></svg>{tweet.likes.length}</div>                       */}
                <button id="like1" onClick={handleLike}>{tweet.likes.includes(localStorage.getItem('userID')) ?  (<FontAwesomeIcon icon={faHeart} size="lg" style={{color: "#ff0000",}} /> ) : <svg id="like" viewBox="0 0 24 24" aria-hidden="true"><g><path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path></g></svg>}{tweet.likes.length}</button>
                {tweet.userID === localStorage.getItem('userID') ? (<button id="delete" onClick={handleDelete}><FontAwesomeIcon icon={faTrash} style={{color: "#000000",}} /></button>) : ''}
            </div>
        </div>
    </div>
            )}

export default Tweet;
