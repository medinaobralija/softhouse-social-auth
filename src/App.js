import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import { Card, Image, InputGroup, FormControl, Button } from 'react-bootstrap';
import { save } from 'save-file';

import './App.css';
import Header from './components/Header.js';

function App() {
  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});
  const [picture, setPicture] = useState('');
  const [rainLover, setRainLover] = useState('');
  const [isLoading, setIsLoading] = useState('');

  const responseFacebook = (response) => {
    setData(response);
    setPicture(response.picture.data.url);
    if (response.accessToken) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }

  const answerQuestion = (event) => {
    setRainLover(event.currentTarget.value)
  }

  const saveJSON = () => {
    setIsLoading(true);

    let collection = {
      name: data.name,
      email: data.email,
      likeRain: rainLover,
    }

    let jsonData = JSON.stringify(collection, null, 2);
    save(jsonData, 'softhouse.json');

    setRainLover('');
    setIsLoading(false);
  }

  return (
    <div className="App">
      <Header />
      <div className="Container">
        <Card className="Card">
          <Card.Header>
            { !login &&
              <FacebookLogin
                appId="389696619101842"
                autoLoad={false}
                fields="name,email,picture"
                scope="public_profile,user_friends"
                callback={responseFacebook}
                icon="fa-facebook" />
            }
            { login &&
              <Image src={picture} roundedCircle />
            }
          </Card.Header>
            <Card.Body>
              <Card.Title>{login ? data.name : "Login to make changes to your profile"}</Card.Title>
              <Card.Text>
                {login ? data.email : "Once you are logged in you would be able to enter your birthday and save profile locally."}
              </Card.Text>
              {login &&
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>Do you like rain?</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl value={rainLover} as="textarea" onChange={answerQuestion} aria-label="With textarea" />
                </InputGroup>
              }
              {login &&
                <Button
                  className="Button"
                  variant="primary"
                  disabled={rainLover === '' || isLoading}
                  onClick={saveJSON}
                >
                  {isLoading ? "Please wait.." : "Save"}
                </Button>
              }
            </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default App;
