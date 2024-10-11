/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const UserProfile = ({ userId, token }) => {
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [editMode, setEditMode] = useState(false);
  const dbUrl = `https://restaurant-app-cc3a3-default-rtdb.firebaseio.com/users/${userId}.json?auth=${token}`;

  // Fetch user data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch(dbUrl);
      const data = await response.json();
      console.log(data);
      setProfile({ name: data.name, email: data.email });
    };
    fetchProfile();
  }, [dbUrl]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(dbUrl, {
      method: "PATCH",
      body: JSON.stringify({ name: profile.name }),
      headers: { "Content-Type": "application/json" },
    });
    setEditMode(false);
  };

  return (
    <div className="p-5">
      <h1 className="text-4xl font-bold mb-10">User Profile</h1>
      {editMode ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            className="outline-none border-b-2 border-b-black px-1 mr-4"
          />
          <button className="bg-blue-300 p-2 px-4 rounded-lg" type="submit">Save</button>
        </form>
      ) : (
        <>
          <p className="my-5"> <span className="font-semibold">Name:</span> {profile.name}</p>
          <p className="my-5"><span className="font-semibold">Email:</span> {profile.email}</p>
          <button className="bg-blue-300 p-2 px-4 rounded-lg" onClick={() => setEditMode(true)}>Edit</button>
        </>
      )}
    </div>
  );
};

export default UserProfile;
