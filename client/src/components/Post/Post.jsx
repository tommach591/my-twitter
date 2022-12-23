import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../../utils/Profile";
import { useUser } from "../../utils/UserContext";
import "./Post.css";

function Post({ post }) {
  const navigate = useNavigate();
  const user = useUser();
  const [owner, setOwner] = useState({});
  const datePosted = new Date(post.date_created);

  useEffect(() => {
    getProfile(post.user_id).then((res) => {
      res ? setOwner(res) : setOwner({});
    });
  }, [post]);

  return Object.keys(owner).length !== 0 ? (
    <div className="Post">
      <div className="Author">
        <img
          src={
            owner.pfp
              ? owner.pfp
              : "https://api.iconify.design/bi:person-circle.svg?color=%23888888"
          }
          alt="PFP"
          onClick={() => {
            navigate(`/profile/?user=${post.user_id}`);
          }}
        />
        <div className="PostInfo">
          {Object.keys(owner).length !== 0 ? (
            <h1
              className="Name User"
              onClick={() => {
                navigate(`/profile/?user=${post.user_id}`);
              }}
            >{`${owner.first} ${owner.last}`}</h1>
          ) : (
            <h1 className="Name">Anonymous User</h1>
          )}
          <h1 className="Date">{datePosted.toDateString()}</h1>
        </div>
      </div>
      <h1 className="PostContent">{post.content}</h1>
      <div className="Line" style={{ width: "95%" }} />
      <div className="PostInteractions">
        <h1 className="PostLike">Like</h1>
        <h1 className="PostComment">Comment</h1>
        {Object.keys(owner).length !== 0 && user === owner.user_id ? (
          <div />
        ) : (
          <h1 className="PostShare">Share</h1>
        )}
      </div>
    </div>
  ) : (
    <div />
  );
}

export default Post;
