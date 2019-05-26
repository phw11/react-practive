import React, { useEffect, useState } from 'react';import PropTypes from 'prop-types';import { useDispatch, useSelector } from 'react-redux';import { LOAD_USER_POSTS_REQUEST } from '../reducers/post';import PostCard from '../components/PostCard';import { Avatar, Card } from 'antd';import { LOAD_USER_REQUEST } from '../reducers/user';const User = ({ id }) => {  const dispatch = useDispatch();  const { mainPosts } = useSelector(state => state.post, []);  const { userInfo } = useSelector(state => state.user, []);  useEffect(() => {    dispatch({      type: LOAD_USER_REQUEST,      data: id,    });    dispatch({      type: LOAD_USER_POSTS_REQUEST,      data: id,    });  }, []);  return (    <div>      {userInfo && (        <Card          style={{ padding: '10px' }}          actions={[            <div key="twit">              게시글              <br />              {userInfo.Posts}            </div>,            <div key="twit">              팔로잉              <br />              {userInfo.Followings}            </div>,            <div key="twit">              팔로워              <br />              {userInfo.Followers}            </div>,          ]}        >          <Card.Meta            avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}            title={userInfo.nickname}          />        </Card>      )}      {mainPosts.map(c => (        <PostCard key={+c.createdAt} post={c} />      ))}    </div>  );};User.propTypes = {  id: PropTypes.number.isRequired,};// getInitialProps에서 리턴을 하게되면 props로 넘겨줄 수 있다.User.getInitialProps = async context => {  console.log('User getInitialProps : ' + context.query.id);  return { id: parseInt(context.query.id, 10) };};export default User;