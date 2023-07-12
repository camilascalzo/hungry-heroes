import AboutContainer from "../containers/AboutContainer";
import AuthService from "../services/AuthService";

const AboutPage = function () {

	const token = '735D069AB9EFDB1CE1B4C9791B2B515982516A82F8B4D90A84E6044FB9848345745F863D067FC47F1FF1F0D1AC42C9A91C7F5DC059101034CC9DC0195FA842B7';

	AuthService.verifyAccount(token)
	.then((response) => {
		console.log(response)
		
	})
	.catch((error) => {
		console.log(error)
	})

  return (
    <AboutContainer />
  );
};

export default AboutPage;
