import Container from "./styles/Feedback.styled";
import Wrapper from "./Wrapper";

const FeedBack = () => {
	return (
		<Wrapper width="30rem">
			<Container className="form">
				<h1>Give Us Feedback</h1>
				<fieldset>
					<label htmlFor="subject">Subject</label>
					<input className="input" id="subject" type="text" required />
					<label htmlFor="textarea">Comments</label>
					<textarea id="textarea" className="input" required />
				</fieldset>
				<button className="btn" type="submit">
					Send my feedback
				</button>
			</Container>
		</Wrapper>
	);
};

export default FeedBack;
