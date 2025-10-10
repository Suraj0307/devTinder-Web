import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';

const UserCard = ({ user }) => {
    const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
    const dispatch = useDispatch();

    const handleSendRequest = async (status, userId) => {
        try {
            await axios.post(
            BASE_URL + "/request/send/" + status + "/" + userId,
            {},
            { withCredentials: true }
        );
        dispatch(removeUserFromFeed(userId));
        } catch (err) {
            console.log("Error during sending request: ", err.message);
        }
    };

    return (

        <div className="card bg-base-100 w-96 shadow-sm">
            <figure>
                <img
                    src={photoUrl}
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                {age && gender && (<p>{age + ", " + gender}</p>)}
                <p>{about}</p>
                <div className="card-actions justify-center my-4">
                    <button onClick={() => handleSendRequest("ignored", _id)} className="btn btn-primary">Ignore</button>
                    <button onClick={() => handleSendRequest("interested", _id)} className="btn btn-secondary">Interested</button>
                </div>
            </div>
        </div>
    )
}

export default UserCard