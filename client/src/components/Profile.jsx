import React from 'react'


function Profile() {


  let name = window.localStorage.getItem("username")
  let id = window.localStorage.getItem("userid")
  let email = window.localStorage.getItem("useremail")
  return (
    <div className='container pt-5 mt-5'>
      <div className="card container border-light mb-3 " style={{ width: "30rem" }}>
        <div className="card-header text-center text-black fs-3">User Profile</div>
        <div className="card-body bg-black">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">User Name  : {name}</li>
            <li className="list-group-item">User Id    : {id}</li>
            <li className="list-group-item">User Email : {email}</li>
          </ul>
        </div>
      </div>

    </div>
  )
}

export default Profile