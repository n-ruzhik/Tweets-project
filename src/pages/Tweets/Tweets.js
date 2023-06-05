import { useLocation, Link } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import Notiflix from 'notiflix';
import api from '../../servises/mockapi';
import TweetCard from 'components/TweetCard';
import css from './Tweets.module.css';

export default function Tweets() {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(null);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [page, setPage] = useState(1);

  const location = useLocation();
  const pathBack = useRef(location.state?.from ?? '/');

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('followingUsers'))) {
      return;
    }
    localStorage.setItem('followingUsers', JSON.stringify([]));
  }, []);

  // useEffect(() => {
  //   try {
  //     const getUsers = async () => {
  //       const { data } = await fetchUsers();

  //       if (!data.length) {
  //         Notiflix.Notify.failure('Please, try again');
  //         return;
  //       }

  //       const firstThreeElements = data.slice(0, threeCardsToRender);
  //       const filteredData = dataNormalizer(firstThreeElements);

  //       setUsers(filteredData);

  //       if (threeCardsToRender !== data.length) {
  //         setShowMoreButton(true);
  //       } else if (users.length === data.length) {
  //         setShowMoreButton(false);
  //       } else {
  //         setShowMoreButton(false);
  //         Notiflix.Notify.failure('There is no more tweets');
  //       }
  //     };
  //     getUsers();
  //   } catch (e) {
  //     Notiflix.Notify.failure('Sorry, something went wrong');
  //     console.log(e.message);
  //   }
  // }, [threeCardsToRender]);

  useEffect(() => {
    api
      .fetchTweets(page)
      .then(results => {
        if (page === 1 && !results.length) {
          Notiflix.Notify.failure('Please, try again');
          return;
        }
        setUsers(prevUsers =>
          page === 1 ? results : [...prevUsers, ...results]
        );

        setShowMoreButton(page < Math.ceil(totalUsers / 3));
      })
      .catch(error => {
        Notiflix.Notify.failure('Sorry, something went wrong');
        console.log(error);
      });
  }, [page, totalUsers]);

  useEffect(() => {
    api
      .fetchAllTweets()
      .then(results => {
        if (!results.length) {
          return;
        }
        setTotalUsers(results.length);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const onLoadMore = () => {
    setPage(page => page + 1);
  };

  return (
    <div className={css.tweetsContainer}>
      <Link to={pathBack.current} className={css.backBtn}>
        Back
      </Link>
      <ul className={css.tweetsList}>
        {users.map(({ id, user, tweets, followers, avatar }) => (
          <TweetCard
            className={css.cardItem}
            key={id}
            name={user}
            followers={followers}
            tweets={tweets}
            avatar={avatar}
            id={id}
          ></TweetCard>
        ))}
      </ul>

      {showMoreButton && (
        <button type="button" onClick={onLoadMore} className={css.loadMoreBtn}>
          Load more
        </button>
      )}
    </div>
  );
}
