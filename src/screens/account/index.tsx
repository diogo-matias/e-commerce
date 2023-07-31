import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppSelector } from "../../hooks/redux";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Header } from "../../components/header";
import { BaseButton } from "../../components/base-button";
import { useDispatch } from "react-redux";
import { UserActions } from "../../store/modules/user";

export function AccountScreen() {
    const userInfo = useAppSelector((state) => state.user.userInfo);
    const dispatch = useDispatch();

    function handleLogout() {
        dispatch(UserActions.logout());
    }

    return (
        <div>
            <Header shouldUseCustomStyle={false} />
            <div className="absolute min-w-[300px] left-1/2 bottom-1/2 translate-x-[-50%] translate-y-[60%] bg-gray-100 shadow-xl rounded-xl">
                <div className="relative p-10">
                    <div className="absolute left-0 right-0 flex justify-center translate-y-[-110%]">
                        <div className="w-24 h-24 bg-gray-100 border-4 border-white flex items-center justify-center text-3xl  rounded-full">
                            <FontAwesomeIcon icon={solid("user")} />
                        </div>
                    </div>
                    <div>
                        <p className="font-bold tracking-widest text-xl mb-4 mt-2">
                            USER INFO
                        </p>
                        <div className="font-light break-keep">
                            <div className="flex flex-col mb-4">
                                <p className="text-lg font-medium">Name</p>
                                {userInfo?.name}
                            </div>
                            <div className="flex flex-col ">
                                <p className="text-lg font-medium">Email</p>
                                {userInfo?.email}
                            </div>
                        </div>
                    </div>
                    <div>
                        <BaseButton
                            label="logout"
                            className="mt-10"
                            onClick={handleLogout}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
