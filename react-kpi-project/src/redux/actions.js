import appActions from "./appActions";
import messageActions from "./messageActions";
import notariesActions from "./notariesActions";
import searchActions from "./searchActions";
import userActions from "./userActions";

export default {
    ...appActions,
    ...searchActions,
    ...messageActions,
    ...userActions,
    ...notariesActions,
}