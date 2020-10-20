import React from 'react';
import './App.css';
import { Route, Link, Switch } from "react-router-dom";
import Display from "./Display";
import Form from "./Form";

function App() {
  const url = "http://localhost:4500"

    const [cookbooks, setCookbooks] = React.useState([])

    const emptyCookbook = {
      title: "",
      yearPublished: ""
    }

  const [selectedCookbook, setSelectedCookbook] = React.useState(emptyCookbook)

  const handleCreate = (newBook) => {
    fetch(url + "/cookbook/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook)
    })
    .then(response => getCookbooks())
  }

  //handleUpdate to update a cookbook when form is clicked
  const handleUpdate = (cookbook) => {
    fetch(url + "/api/cookbook/" + cookbook._id, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cookbook)
      })
      .then(response => getCookbooks())
    }

  //selectCookbook which selects a cookbook
    const selectCookbook = (cookbook) => {
      setSelectedCookbook(cookbook)
    }

  const deleteCookbook = (cookbook) => {
      fetch(url + "/cookbook/" + cookbook._id, {
        method: "delete"
      })
      .then(response => getCookbooks())
    }


  // FUNCTION TO FETCH COOKBOOKS
  const getCookbooks = () => {
    fetch(url + '/api/cookbooks/')
    .then(response => response.json())
    .then(data => {
      setCookbooks(data)
    })
  }
  //Get cookbooks on page load
  React.useEffect(() => {
    getCookbooks()
  }, [])

  return (
    <div className="App">
      <h1>COOKBOOKS SITE</h1>
      <hr />
      <Link to="/create">
        <button>Add Cookbook</button>
      </Link>
      <main>
        <Switch>
          <Route exact path="/" render={(rp) => <Display {...rp} cookbooks={cookbooks} selectCookbook={selectCookbook} deleteCookbook={deleteCookbook}/>} />
          <Route
            exact
            path="/create"
            render={(rp) => (
              <Form {...rp} label="create" cookbook={emptyCookbook} handleSubmit={handleCreate} />
            )}
          />
          <Route
            exact
            path="/edit"
            render={(rp) => (
              <Form {...rp} label="update" cookbook={selectedCookbook} handleSubmit={handleUpdate} />
            )}
          />
        </Switch>
      </main>
      
    </div>
  );
}

export default App;
