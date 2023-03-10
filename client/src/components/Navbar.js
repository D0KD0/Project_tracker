import React, { useState, useEffect } from "react";
import "../index.css";

import { useQuery, useMutation } from '@apollo/client'
import { GET_ME } from '../utils/queries';
import { ADD_PROJECT } from '../utils/mutations';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import logo from "../images/logout.png";

const Navbar = () => {
	const [isExpanded, setExpendState] = useState(true);
	const [userData, setUserData] = useState({});

	const { loading, data } = useQuery(GET_ME);

	const logoStyle = { color: "" }
	const imageStyle = { height: "25px", width: "70px" }


	useEffect(() => {
		console.log(userData)
		setUserData(data?.me || {})
	}, [data])

	const userDataLength = Object.keys(userData).length;

	return (
		<div
			className={
				isExpanded
					? "side-nav-container"
					: "side-nav-container side-nav-container-NX"
			}
		>
			<div className="nav-upper">
				<div className="nav-heading">
					{isExpanded && (
						<div className="nav-brand">
							{/*<img style={imageStyle} src={logo} alt="" srcset="" />*/}
							<h4 style={logoStyle}>{userData.username}</h4>
						</div>
					)}
					<button
						className={
							isExpanded ? "hamburger hamburger-in" : "hamburger hamburger-out"
						}
						onClick={() => setExpendState(!isExpanded)}
					>
						<span></span>
						<span></span>
						<span></span>
					</button>
				</div>
				{/* <div className="nav-menu">
					{menuItems.map(({ text, icon }) => (
						<a
							className={isExpanded ? "menu-item" : "menu-item menu-item-NX"}
							href="#"
						>
							<img className="menu-item-icon" src={icon} alt="" srcset="" />
							{isExpanded && <p>{text}</p>}
						</a>
					))}
				</div> */}
				<div className="nav-menu">
					{userData.projects?.map((project) => {
						return (<Link
							as={Link}
							className={isExpanded ? "menu-item" : "menu-item menu-item-NX"}
							to={`/project/${project._id}/TableView`}
						>
							{project.name}
						</Link>);

					})}
					<Link
						as={Link}
						className={isExpanded ? "menu-item" : "menu-item menu-item-NX"}
						to='/createProject'
					>
						+ Add Project
					</Link>
				</div>
			</div>
			<div className="nav-footer">
				{isExpanded && (
					<div className="nav-details">
						<Link onClick={Auth.logout} className="logout-btn">Logout</Link>
						{/* <img
							className="nav-footer-avatar"
							src="icons/admin-avatar.svg"
							alt=""
							srcset=""
						/> */}
						{/*<div className="nav-footer-info">
							<Link onClick={Auth.logout} className="logout-btn">Logout</Link>
						</div>*/}

					</div>
				)}
				{/* <img className="logout-icon" src="/images/logout.png" alt="" srcset="" /> */}
			</div>
		</div>
	);
};

export default Navbar;


