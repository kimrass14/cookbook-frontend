import React from "react";

const Display = (props) => {
  console.log('props', props)

  const {cookbooks} = props

  const loaded = () => (
    <div style={{textAlign: "center"}}>
      {cookbooks.map(cookbook => (
        <article>
          <h1>{cookbook.title}</h1>
          <h3>{cookbook.yearPublished}</h3>
          <button onClick={() => {
            props.selectCookbook(cookbook)
            props.history.push("/edit")
          }}>Edit</button>
          <button onClick={() => {
            props.deleteCookbook(cookbook)
          }}>Delete</button>
        </article>
      ))}
      </div>
  )
  return cookbooks.length > 0 ? loaded():
  <h1>Loading....</h1>;
};

export default Display;