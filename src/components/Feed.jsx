import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';

const Feed = () => {
    const dispatch = useDispatch();
    const feed = useSelector((store) => store.feed);

    const getFeed = async () => {
        try {
            if (feed)
                return;

            const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
            dispatch(addFeed(res.data));
        } catch (error) {
            console.log("Error occurred while loading feed ", error.message);
        }
    };

    useEffect(() => {
        getFeed();
    }, []);

    if (!feed) return;

    if (feed.length <= 0)
        return <h1 className="flex justify-center my-10">No new users founds!</h1>;

    return (
        feed && (<div className="flex justify-center my-10">
            {
                feed.map((user, index) => {
                    return <UserCard key={index} user={user}/>
                })
            }
        </div>)
    )
}

export default Feed