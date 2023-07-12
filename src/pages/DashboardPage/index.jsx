import { Button, Label, Menu, Popover } from 'evergreen-ui';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BasicLayout from '../../layouts/BasicLayout';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { setAuthUser, setIsAuthenticated } from '../../app/authSlice';
import Navbar from '../../components/Navbar';
import "../../styles/general.css";

function DashboardPage() {

const user = useSelector((state) => state.auth.authUser);
const navigate = useNavigate();
const dispatch = useDispatch();

const logout = async () => {
  const response = await axios
      .get("http://localhost:5000/api/v1/logout", { withCredentials: true })
      .catch((err) => {
        console.log("Something went wrong");
      });

  if (response && response.data) {
    console.log(response.data);
    dispatch(setIsAuthenticated(false));
    dispatch(setAuthUser(null));
    navigate("/");
  }
};


  return (
    <div>
      <Navbar>
        <ul>
          <Popover
            content={
              <Menu>
                <Menu.Item><Link to="/tagEntry" className="nav-link">Enter a new Tag</Link></Menu.Item>
                <Menu.Item><Link to="/tagEdit" className="nav-link">Edit or Delete a Tag</Link></Menu.Item>
              </Menu>
            }
          >
            <li>
              <Label>Tags</Label>
            </li>
          </Popover>
          <Popover
            content={
              <Menu>
                <Menu.Item><Link to="/personEntry" className="nav-link">Enter a new Person</Link></Menu.Item>
                <Menu.Item><Link to="/personEdit" className="nav-link">Edit or Delete a Person</Link></Menu.Item>
              </Menu>
            }
          >
            <li>
              <Label>People</Label>
            </li>
          </Popover>
          <Popover
            content={
              <Menu>
                <Menu.Item><Link to="/groupEntry" className="nav-link">Enter a new Group</Link></Menu.Item>
                <Menu.Item><Link to="/groupEdit" className="nav-link">Edit or Delete a Group</Link></Menu.Item>
              </Menu>
            }
          >
            <li>
              <Label>Groups</Label>
            </li>
          </Popover>
        </ul>
      </Navbar>
      <BasicLayout>
        <h3>{ user && user.fullName }'s Dashboard</h3>
        <Link to="/viewCreation" className="dash-link">Create a New View</Link>
        <Link to="/savedViewsList" className="dash-link">See Saved Views</Link>
        <Link to="/mainEntry" className="dash-link">Input a new Entry</Link>
        <Link to="/entriesViewer" className="dash-link">Edit or Delete an Entry</Link>
        <Button onClick={logout}>Logout</Button>
      </BasicLayout>
    </div>
  );
}

export default DashboardPage;
