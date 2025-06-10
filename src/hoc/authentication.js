import locationHelperBuilder from "redux-auth-wrapper/history4/locationHelper";
import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect";

const locationHelper = locationHelperBuilder({});

export const userIsAuthenticated = connectedRouterRedirect({
  authenticatedSelector: (state) =>
    state.user.isLoggedIn && state.user.lv !== "",
  wrapperDisplayName: "UserIsAuthenticated",
  redirectPath: (state) => {
    if (state.user.lv === "1") {
      return "/system"; // Chuyển đến trang admin nếu lv = 1
    } else if (state.user.lv === "2") {
      return "/home"; // Chuyển đến trang home nếu lv = 2
    }
    return "/"; 
  },
  allowRedirectBack: false,
});

export const userIsNotAuthenticated = connectedRouterRedirect({
  // Người dùng chưa đăng nhập
  authenticatedSelector: (state) => !state.user.isLoggedIn,
  wrapperDisplayName: "UserIsNotAuthenticated",
  redirectPath: (state, ownProps) =>
    locationHelper.getRedirectQueryParam(ownProps) || "/",
  allowRedirectBack: false, // Không cho phép chuyển hướng quay lại trang trước
});
