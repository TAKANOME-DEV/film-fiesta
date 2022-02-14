// import { useState } from "react";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalStyles, Header, Sidebar } from "../components";
import Provider from "../context/GlobalContext";
import Routes from "./Routes";

const App = () => {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const handleResize = () => window.innerWidth > 650 && setIsOpen(false);

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	});

	isOpen
		? document.body.classList.add("open")
		: document.body.classList.remove("open");

	return (
		<Provider>
			<GlobalStyles />
			<ToastContainer />
			<Header handleOpen={() => setIsOpen(true)} />
			<Sidebar open={isOpen} setIsOpen={setIsOpen} />
			<Routes />
		</Provider>
	);
};

export default App;
