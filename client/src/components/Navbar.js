import React, { useState } from "react";
import "../index.css";


const Navbar = () => {
	const [isExpanded, setExpendState] = useState(false);
	const menuItems = [
		{
			text: "Dashboard",
			
		},
		
		{
			text: "Project 1",
			icon: "images/message.svg",
		},
		{
			text: "Project 2",
			icon: "images/folder.svg",
		},
		{
			text: "+ New Task",
			
		},
        {
			text: "+ (add other buttons)",
			
		},
		
		
	];
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
							<img src="" alt="" srcset="" />
							<h4>LOGO/Brand</h4>
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
				<div className="nav-menu">
					{menuItems.map(({ text, icon }) => (
						<a
							className={isExpanded ? "menu-item" : "menu-item menu-item-NX"}
							href="#"
						>
							<img className="menu-item-icon" src={icon} alt="" srcset="" />
							{isExpanded && <p>{text}</p>}
						</a>
					))}
				</div>
			</div>
			<div className="nav-footer">
				{isExpanded && (
					<div className="nav-details">
						<img
							className="nav-footer-avatar"
							src="icons/admin-avatar.svg"
							alt=""
							srcset=""
						/>
						<div className="nav-footer-info">
							<p className="nav-footer-user-name">UserName</p>
							
						</div>
					</div>
				)}
				<img className="logout-icon" src="/images/logout.png" alt="" srcset="" />
			</div>
		</div>
	);
};

export default Navbar;


