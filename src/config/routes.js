
import Welcome from "../containers/welcome";
import Loader from "../components/common/Loader";
import SignUp from "../containers/signup";
import Startup from "../containers/startup";
import ForgotPassword from "../containers/forgotpassword";
import ResetPassword from "../containers/reset";
import ChangePassword from "../containers/changepassword";
import Profile from "../containers/profile";
import PersonalDetail from "../containers/personal_detail";
import FrontView from "../containers/front_view.js";
import SignIn from "../containers/signin.js";
import Payment from "../containers/payment.js";
import Measurement from "../containers/measurement_detail";
import Info from "../containers/info.js";
import Splash from "../containers/splash";
import dashboard from "../containers/dashboard";

// export list of routes.
export default routes = {
	Loader : { screen: Loader },
	Splash	: { screen: Splash },
	signup	: { screen: SignUp },
	startup	: { screen: Startup },
	forgotPassword	: { screen: ForgotPassword },
	ResetPassword	: { screen: ResetPassword },
	ChangePassword	: { screen: ChangePassword },
	Profile	: { screen: Profile },
	PersonalDetail	: { screen: PersonalDetail },
	FrontView	: { screen: FrontView },
	SignIn	: { screen: SignIn },
	Payment	: { screen: Payment },
	Measurement	: { screen: Measurement },
	Info	: { screen: Info },
	dashboard	: { screen: dashboard },


};
