import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/GlobalContext";
import Avatar from "./common/Avatar";
import { Container } from "./styles/Header.styled";
import { BarsIcon, LogoIcon, UserIcon } from "./svg";
import UserModal from "./UserModal";

type Props = {
	handleOpen: () => void;
};

const Header: React.FC<Props> = ({ handleOpen }) => {
	const { searchQuery, onSearch, user } = useContext(Context);
	const [openModal, setOpenModal] = useState(false);

	useEffect(() => {
		const handleResize = () => window.innerWidth < 650 && setOpenModal(false);

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	});

	return (
		<Container>
			{openModal && (
				<UserModal openModal={openModal} setOpenModal={setOpenModal} />
			)}
			<div className="container">
				<Link to="/" className="logo flex">
					<LogoIcon />
					<h1>Vidly</h1>
				</Link>
				<input
					type="search"
					id="search"
					placeholder="Search..."
					aria-label="Search"
					value={searchQuery}
					onChange={(e) => onSearch?.(e.currentTarget.value)}
				/>
				<Link to="/login" className="btn">
					<UserIcon /> &nbsp; Sign in
				</Link>
				{user && user._id && (
					<div className="avatar">
						<Avatar handleOpenModal={() => setOpenModal(true)} />
					</div>
				)}
				<div className="bars" onClick={handleOpen}>
					<BarsIcon />
				</div>
			</div>
		</Container>
	);
};

export default Header;
