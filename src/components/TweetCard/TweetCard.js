import { useState } from 'react';
import bgrPicture from '../../images/bgr-img.png';
import logo from '../../images/logo.png';
import avatarCircle from '../../images/avatar-circle.png';
import css from './TweetCard.module.css';

export default function TweetCard({ name, tweets, followers, avatar, id }) {
  const user = JSON.parse(localStorage.getItem(`user${id}`)) ?? false;
  const userFollowing = user.following;
  const [isFollowing, setIsFollowing] = useState(userFollowing);

  const handleBtn = id => {
    const userObject = { id, following: !isFollowing };
    localStorage.setItem(`user${id}`, JSON.stringify(userObject));

    const userData = JSON.parse(localStorage.getItem(`user${id}`));

    setIsFollowing(userData.following);

    const localStorageFollowingUsers = JSON.parse(
      localStorage.getItem(`followingUsers`)
    );

    if (
      isFollowing &&
      JSON.parse(localStorage.getItem('followingUsers')).includes(id)
    ) {
      const index = localStorageFollowingUsers.indexOf(id);
      console.log(index);
      localStorageFollowingUsers.splice(index, 1);
      const newArr = Array.from(new Set(localStorageFollowingUsers));
      console.log(newArr);
      localStorage.setItem('followingUsers', JSON.stringify(newArr));
    } else {
      localStorageFollowingUsers.push(id);

      localStorage.setItem(
        'followingUsers',
        JSON.stringify(localStorageFollowingUsers)
      );
    }
  };

  const transformFollowersNumber = number => {
    const string = number.toString().split('');
    if (string.length > 6) {
      string.splice(-6, 0, ',');
    }
    string.splice(-3, 0, ',');

    string.join('');
    return string;
  };

  return (
    <div className={css.cardContainer}>
      <div className={css.cardThumb}>
        <div className={css.cardImgThumb}>
          <img
            src={logo}
            alt="logo"
            width="76"
            height="22"
            className={css.cardLogo}
          ></img>
          <img src={bgrPicture} alt="background" width="308" height="168"></img>
        </div>
        <span className={css.cardLine}></span>
        <div className={css.avatarThumb}>
          <img
            src={avatarCircle}
            alt="circle"
            className={css.avatarCircle}
          ></img>
          <img src={avatar} alt="avatar" className={css.avatar}></img>
        </div>
        <ul className={css.dataList}>
          <li>
            <p>{name}</p>
          </li>
          <li>
            <p>{tweets} Tweets</p>
          </li>
          <li>
            <p>
              {isFollowing
                ? transformFollowersNumber(followers + 1)
                : transformFollowersNumber(followers)}{' '}
              Followers
            </p>
          </li>
        </ul>
        {isFollowing ? (
          <button onClick={() => handleBtn(id)} className={css.followBtnActive}>
            Following
          </button>
        ) : (
          <button
            type="button"
            onClick={() => handleBtn(id)}
            className={css.followBtn}
          >
            Follow
          </button>
        )}
      </div>
    </div>
  );
}
