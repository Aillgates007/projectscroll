import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router';
import Card from 'react-bootstrap/Card';
import InfiniteScroll from 'react-infinite-scroll-component';
import './styles/Home.css';

<h1>login</h1>

const Home = () => {
  let navigate = useNavigate();

  const [users, setUsers] = React.useState([]);

  const getDetails = async () => {
    try {
      const { data } = await axios.get(`https://randomuser.me/api/?results=20`);
      console.log(data.results);
      setTimeout(() => {
        setUsers([...users, ...data.results]);
      },500);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate('/');
  };

  React.useEffect(() => {
    getDetails();
  },);

  if (!localStorage.user) {
    return (
      <>
        <p>You are not logged in</p>
        <button onClick={() => navigate('/')}>Login</button>
      </>
    );
  }
  

  return (

    <div className='home-screen'>
      <div className='logout-btn-container'>
        <button onClick={logout}>Logout</button>
      </div>

      


      <InfiniteScroll
        dataLength={users.length}
        next={getDetails}
        loader={<h4>Loading...</h4>}
        hasMore={true}
      >
        {users.map((u, idx) => (
          <div className='user' key={idx}>



<Card style={{ width: '15rem' }}>
      <Card.Img variant="top" src= {u.picture.thumbnail} alt='profile' />
      <Card.Body>
           

            <Card.Title>Name:{u.name.first}</Card.Title>
        <Card.Text>
        <p>Contact:{u.cell}</p>
            <p>
              Location:{(u.location.city, u.location.state, u.location.country)}
            </p>
        </Card.Text>
        </Card.Body>
    </Card>


          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Home;
