import AboutContainer from "../containers/AboutContainer";
import AuthService from "../services/AuthService";

const AboutPage = function () {

	const token = '6FBCBEF9D0B034C7C1B8E48F61BD1C1664FDBB242C06DBA62B4A8A065EBE8ABB0E411F3096BFD82A6361CA792AD11FE3389565DD74F329F747669716F3FD920A';

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
