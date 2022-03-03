
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalStyles, Header, Sidebar } from "../components";
import ErrorBoundary from "../components/ErrorBoundary";
import Provider from "../context/GlobalContext";
import Routes from "./Routes";



const App = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [openModal, setOpenModal] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth > 650) {
				setIsOpen(false);
				setOpenModal(false);
			}
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	});

	isOpen
		? document.body.classList.add("open")
		: document.body.classList.remove("open");

	return (
		<ErrorBoundary>
			<Provider>
				<GlobalStyles />
				<ToastContainer />
				<Header handleOpen={() => setIsOpen(true)} />
				<Sidebar
					open={isOpen}
					setIsOpen={setIsOpen}
					openModal={openModal}
					setOpenModal={setOpenModal}
				/>
					<Routes />
			</Provider>
		</ErrorBoundary>
	);
};

export default App;
