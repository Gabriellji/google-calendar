const LoginPage = () => {
	const handleLogin = () => {
	  window.location.href = 'http://yourbackend.com/auth/google'; // URL to initiate OAuth flow
	};
  
	return (
	  <div>
		<button onClick={handleLogin}>Login with Google</button>
	  </div>
	);
  };

  export default LoginPage;
